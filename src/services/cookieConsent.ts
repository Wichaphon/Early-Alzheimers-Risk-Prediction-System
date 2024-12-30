import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export interface CookieConsent {
  analytics_consent: boolean;
  marketing_consent: boolean;
  functional_consent: boolean;
}

export async function saveCookieConsent(consent: CookieConsent) {
  const sessionId = localStorage.getItem('sessionId') || uuidv4();
  localStorage.setItem('sessionId', sessionId);

  const { data, error } = await supabase
    .from('cookie_consents')
    .upsert({
      session_id: sessionId,
      ...consent,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'session_id'
    });

  if (error) throw error;
  return data;
}

export async function getCookieConsent() {
  const sessionId = localStorage.getItem('sessionId');
  if (!sessionId) return null;

  const { data, error } = await supabase
    .from('cookie_consents')
    .select('*')
    .eq('session_id', sessionId)
    .single();

  if (error) return null;
  return data;
}