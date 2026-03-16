export interface AppEnv {
  appEnv: string;
  apiBaseUrl: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  supabaseProjectId: string;
  openAiModel: string;
}

function readEnvValue(key: string): string {
  return import.meta.env[key] ?? '';
}

// Centralizing environment reads keeps future validation in one place.
export const appEnv: AppEnv = {
  appEnv: readEnvValue('VITE_APP_ENV') || 'development',
  apiBaseUrl: readEnvValue('VITE_API_BASE_URL'),
  supabaseUrl: readEnvValue('VITE_SUPABASE_URL'),
  supabaseAnonKey: readEnvValue('VITE_SUPABASE_ANON_KEY'),
  supabaseProjectId: readEnvValue('VITE_SUPABASE_PROJECT_ID'),
  openAiModel: readEnvValue('VITE_OPENAI_MODEL') || 'gpt-4.1-mini',
};
