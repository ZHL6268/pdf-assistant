import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ProcessDocumentRequest {
  documentId: string;
}

interface DocumentRecord {
  id: string;
  user_id: string;
  title: string;
  file_path: string;
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}

async function generateSummary(fileBytes: Uint8Array, fileName: string) {
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured.');
  }

  const uploadFormData = new FormData();
  uploadFormData.append('purpose', 'user_data');
  uploadFormData.append('file', new Blob([fileBytes], { type: 'application/pdf' }), fileName);

  const uploadResponse = await fetch('https://api.openai.com/v1/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: uploadFormData,
  });

  if (!uploadResponse.ok) {
    const errorText = await uploadResponse.text();
    throw new Error(`OpenAI file upload failed: ${errorText}`);
  }

  const uploadedFile = (await uploadResponse.json()) as { id?: string };
  if (!uploadedFile.id) {
    throw new Error('OpenAI file upload did not return a file id.');
  }

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: Deno.env.get('OPENAI_MODEL') || 'gpt-4o-mini',
      input: [
        {
          role: 'developer',
          content: [
            {
              type: 'input_text',
              text:
                'You summarize PDF documents for professionals. Return a concise summary in 2 short paragraphs. Focus on decisions, risks, dates, budgets, and key actions. Do not invent facts that are not in the document.',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'input_file',
              file_id: uploadedFile.id,
            },
            {
              type: 'input_text',
              text: 'Summarize this PDF. Focus on the core objective, major findings, deadlines, financial figures, and any concrete actions.',
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI summary request failed: ${errorText}`);
  }

  const payload = await response.json();
  const summary =
    (typeof payload.output_text === 'string' && payload.output_text.trim()) ||
    payload.output
      ?.flatMap((item: { content?: Array<{ text?: string }> }) => item.content ?? [])
      ?.map((contentItem: { text?: string }) => contentItem.text ?? '')
      ?.join('\n')
      ?.trim();

  if (!summary) {
    throw new Error('OpenAI returned an empty summary.');
  }

  return summary;
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

  if (!supabaseUrl || !supabaseAnonKey) {
    return jsonResponse({ error: 'Supabase environment is not configured.' }, 500);
  }

  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return jsonResponse({ error: 'Missing authorization header.' }, 401);
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: authHeader,
      },
    },
  });

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return jsonResponse({ error: authError?.message || 'Unauthorized.' }, 401);
  }

  const { documentId } = (await request.json()) as ProcessDocumentRequest;
  if (!documentId) {
    return jsonResponse({ error: 'documentId is required.' }, 400);
  }

  const { data: document, error: documentError } = await supabase
    .from('documents')
    .select('id, user_id, title, file_path')
    .eq('id', documentId)
    .eq('user_id', user.id)
    .single<DocumentRecord>();

  if (documentError || !document) {
    return jsonResponse({ error: documentError?.message || 'Document not found.' }, 404);
  }

  await supabase
    .from('documents')
    .update({ processing_status: 'processing', processing_error: null })
    .eq('id', document.id)
    .eq('user_id', user.id);

  try {
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('documents')
      .download(document.file_path);

    if (downloadError || !fileData) {
      throw new Error(downloadError?.message || 'Document file could not be downloaded.');
    }

    const fileBytes = new Uint8Array(await fileData.arrayBuffer());
    const summary = await generateSummary(fileBytes, document.title);

    const { error: updateError } = await supabase
      .from('documents')
      .update({
        extracted_text: null,
        summary,
        processing_status: 'complete',
        processing_error: null,
      })
      .eq('id', document.id)
      .eq('user_id', user.id);

    if (updateError) {
      throw new Error(updateError.message);
    }

    return jsonResponse({
      documentId: document.id,
      title: document.title,
      summary,
    });
  } catch (error) {
    await supabase
      .from('documents')
      .update({
        processing_status: 'failed',
        processing_error: error instanceof Error ? error.message : 'Document processing failed.',
      })
      .eq('id', document.id)
      .eq('user_id', user.id);

    return jsonResponse(
      {
        error: error instanceof Error ? error.message : 'Document processing failed.',
      },
      500,
    );
  }
});
