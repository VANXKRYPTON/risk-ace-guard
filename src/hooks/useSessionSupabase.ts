import { useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

/**
 * Creates a Supabase client with session-id header for RLS policy verification.
 * This ensures that database operations are restricted to the user's session.
 */
export const useSessionSupabase = (sessionId: string | null) => {
  const sessionSupabase = useMemo(() => {
    if (!sessionId) {
      return null;
    }

    return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        storage: localStorage,
        persistSession: true,
        autoRefreshToken: true,
      },
      global: {
        headers: {
          'x-session-id': sessionId,
        },
      },
    });
  }, [sessionId]);

  return sessionSupabase;
};

/**
 * Creates a one-time Supabase client with session-id header.
 * Use this for operations outside of React components.
 */
export const createSessionSupabase = (sessionId: string) => {
  return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
    global: {
      headers: {
        'x-session-id': sessionId,
      },
    },
  });
};
