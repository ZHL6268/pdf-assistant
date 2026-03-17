import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatDocumentRequest {
  documentId: string;
  question: string;
}

interface DocumentRecord {
  id: string;
  user_id: string;
  title: string;
  file_path: string;
  summary: string | null;
}

interface MessageRecord {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
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

async function uploadPdfToOpenAi(apiKey: string, fileBytes: Uint8Array, fileName: string) {
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

  return uploadedFile.id;
}

async function deleteOpenAiFile(apiKey: string, fileId: string) {
  await fetch(`https://api.openai.com/v1/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  }).catch(() => null);
}

async function generateAnswer(
  apiKey: string,
  document: DocumentRecord,
  fileBytes: Uint8Array,
  priorMessages: MessageRecord[],
  question: string,
) {
  const fileId = await uploadPdfToOpenAi(apiKey, fileBytes, document.title);

  try {
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
                  'You answer questions about a single PDF document for professionals. Answer only from the provided PDF and prior chat context. If the answer is not supported by the PDF, say that clearly. Keep answers concise but useful, and quote exact figures, dates, or actions when available.',
              },
            ],
          },
          ...(document.summary
            ? [
                {
                  role: 'developer',
                  content: [
                    {
                      type: 'input_text',
                      text: `Document summary for orientation: ${document.summary}`,
                    },
                  ],
                },
              ]
            : []),
          {
            role: 'user',
            content: [
              {
                type: 'input_file',
                file_id: fileId,
              },
              {
                type: 'input_text',
                text: `Document title: ${document.title}`,
              },
            ],
          },
          ...priorMessages.map((message) => ({
            role: message.role,
            content: [
              message.role === 'assistant'
                ? {
                    type: 'output_text',
                    text: message.content,
                  }
                : {
                    type: 'input_text',
                    text: message.content,
                  },
            ],
          })),
          {
            role: 'user',
            content: [
              {
                type: 'input_text',
                text: question,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI document chat request failed: ${errorText}`);
    }

    const payload = await response.json();
    const answer =
      (typeof payload.output_text === 'string' && payload.output_text.trim()) ||
      payload.output
        ?.flatMap((item: { content?: Array<{ text?: string }> }) => item.content ?? [])
        ?.map((contentItem: { text?: string }) => contentItem.text ?? '')
        ?.join('\n')
        ?.trim();

    if (!answer) {
      throw new Error('OpenAI returned an empty document answer.');
    }

    return answer;
  } finally {
    await deleteOpenAiFile(apiKey, fileId);
  }
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

  const { documentId, question } = (await request.json()) as ChatDocumentRequest;
  if (!documentId) {
    return jsonResponse({ error: 'documentId is required.' }, 400);
  }

  if (!question?.trim()) {
    return jsonResponse({ error: 'question is required.' }, 400);
  }

  const { data: document, error: documentError } = await supabase
    .from('documents')
    .select('id, user_id, title, file_path, summary')
    .eq('id', documentId)
    .eq('user_id', user.id)
    .single<DocumentRecord>();

  if (documentError || !document) {
    return jsonResponse({ error: documentError?.message || 'Document not found.' }, 404);
  }

  const { data: priorMessagesData, error: priorMessagesError } = await supabase
    .from('messages')
    .select('id, role, content, created_at')
    .eq('document_id', document.id)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(12)
    .returns<MessageRecord[]>();

  if (priorMessagesError) {
    return jsonResponse({ error: priorMessagesError.message }, 500);
  }

  const { data: userMessage, error: userMessageError } = await supabase
    .from('messages')
    .insert({
      document_id: document.id,
      user_id: user.id,
      role: 'user',
      content: question.trim(),
    })
    .select('id, role, content, created_at')
    .single<MessageRecord>();

  if (userMessageError || !userMessage) {
    return jsonResponse({ error: userMessageError?.message || 'User message could not be saved.' }, 500);
  }

  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey) {
    return jsonResponse({ error: 'OPENAI_API_KEY is not configured.' }, 500);
  }

  try {
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('documents')
      .download(document.file_path);

    if (downloadError || !fileData) {
      throw new Error(downloadError?.message || 'Document file could not be downloaded.');
    }

    const fileBytes = new Uint8Array(await fileData.arrayBuffer());
    const answer = await generateAnswer(
      apiKey,
      document,
      fileBytes,
      [...(priorMessagesData ?? [])].reverse(),
      question.trim(),
    );

    const { data: assistantMessage, error: assistantMessageError } = await supabase
      .from('messages')
      .insert({
        document_id: document.id,
        user_id: user.id,
        role: 'assistant',
        content: answer,
      })
      .select('id, role, content, created_at')
      .single<MessageRecord>();

    if (assistantMessageError || !assistantMessage) {
      throw new Error(assistantMessageError?.message || 'Assistant message could not be saved.');
    }

    const { data: allMessagesData, error: allMessagesError } = await supabase
      .from('messages')
      .select('id, role, content, created_at')
      .eq('document_id', document.id)
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })
      .returns<MessageRecord[]>();

    if (allMessagesError) {
      throw new Error(allMessagesError.message);
    }

    return jsonResponse({
      documentId: document.id,
      messages: allMessagesData ?? [userMessage, assistantMessage],
    });
  } catch (error) {
    return jsonResponse(
      {
        error: error instanceof Error ? error.message : 'Document chat failed.',
      },
      500,
    );
  }
});
