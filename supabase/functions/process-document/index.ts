import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import * as pdfjsLib from 'https://esm.sh/pdfjs-dist@4.10.38/legacy/build/pdf.mjs';
import { corsHeaders } from '../_shared/cors.ts';

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

async function extractPdfText(fileBytes: ArrayBuffer) {
  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(fileBytes),
    isEvalSupported: false,
    useWorkerFetch: false,
  });

  const pdfDocument = await loadingTask.promise;
  const pages: string[] = [];

  for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
    const page = await pdfDocument.getPage(pageNumber);
    const textContent = await page.getTextContent();
    const text = textContent.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ')
      .trim();

    if (text) {
      pages.push(text);
    }
  }

  return pages.join('\n\n');
}

async function generateSummary(extractedText: string) {
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured.');
  }

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: Deno.env.get('OPENAI_MODEL') || 'gpt-5-mini',
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
              type: 'input_text',
              text: `Summarize this PDF content:\n\n${extractedText}`,
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
    .update({ processing_status: 'processing' })
    .eq('id', document.id)
    .eq('user_id', user.id);

  try {
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('documents')
      .download(document.file_path);

    if (downloadError || !fileData) {
      throw new Error(downloadError?.message || 'Document file could not be downloaded.');
    }

    const extractedText = await extractPdfText(await fileData.arrayBuffer());
    if (!extractedText.trim()) {
      throw new Error('No readable text was found in this PDF.');
    }

    const summary = await generateSummary(extractedText);

    const { error: updateError } = await supabase
      .from('documents')
      .update({
        extracted_text: extractedText,
        summary,
        processing_status: 'complete',
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
