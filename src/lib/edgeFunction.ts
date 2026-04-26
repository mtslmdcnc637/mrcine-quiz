import { supabase } from './supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const PUBLIC_FUNCTIONS = new Set(['tmdb-proxy', 'admin-stats', 'send-push-notification']);

let refreshPromise: Promise<string | null> | null = null;

async function refreshWithMutex(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;
  refreshPromise = (async () => {
    try {
      const { data, error } = await supabase!.auth.refreshSession();
      if (error || !data.session) return null;
      return data.session.access_token;
    } finally {
      refreshPromise = null;
    }
  })();
  return refreshPromise;
}

async function getFreshToken(): Promise<string> {
  if (!supabase) throw new Error('Supabase not initialized');
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    const token = await refreshWithMutex();
    if (!token) throw new Error('No active session');
    return token;
  }
  try {
    const payload = JSON.parse(atob(session.access_token.split('.')[1]));
    const expiresAt = payload.exp * 1000;
    const now = Date.now();
    if (expiresAt - now < 5 * 60 * 1000) {
      const token = await refreshWithMutex();
      if (!token) throw new Error('Session expired');
      return token;
    }
  } catch (e) {
    if (e instanceof Error && e.message === 'Session expired') throw e;
    const token = await refreshWithMutex();
    if (!token) throw new Error('Session expired');
    return token;
  }
  return session.access_token;
}

export async function invokeEdgeFunction<T = unknown>(
  functionName: string,
  body: unknown,
  retryOn401 = true,
): Promise<T> {
  if (!supabaseUrl || !supabaseAnonKey) throw new Error('Supabase not configured');
  const url = `${supabaseUrl}/functions/v1/${functionName}`;

  if (PUBLIC_FUNCTIONS.has(functionName)) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'apikey': supabaseAnonKey,
    };
    const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`[HTTP ${response.status}] ${errorData.error || 'Edge function error'}`);
    }
    return response.json() as Promise<T>;
  }

  const accessToken = await getFreshToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'apikey': supabaseAnonKey,
    'Authorization': `Bearer ${accessToken}`,
  };
  const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });

  if (response.status === 401 && retryOn401) {
    const freshToken = await refreshWithMutex();
    if (freshToken) {
      const retryHeaders = { ...headers, Authorization: `Bearer ${freshToken}` };
      const retryResponse = await fetch(url, { method: 'POST', headers: retryHeaders, body: JSON.stringify(body) });
      if (retryResponse.ok) return retryResponse.json() as Promise<T>;
    }
    throw new Error('Authentication failed');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`[HTTP ${response.status}] ${errorData.error || 'Edge function error'}`);
  }
  return response.json() as Promise<T>;
}
