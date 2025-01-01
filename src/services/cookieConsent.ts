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

const DEFAULT_CONSENT: CookieConsent = {
  analytics_consent: false,
  marketing_consent: false,
  functional_consent: true,
};

export async function saveCookieConsent(consent: CookieConsent) {
  try {
    const sessionId = localStorage.getItem('sessionId') || uuidv4();
    localStorage.setItem('sessionId', sessionId);

    const { error } = await supabase
      .from('cookie_consents')
      .upsert({
        session_id: sessionId,
        ...consent,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'session_id'
      });

    if (error) throw error;
    return consent;
  } catch (error) {
    console.error('Error saving cookie consent:', error);
    return DEFAULT_CONSENT;
  }
}

export async function getCookieConsent(): Promise<CookieConsent | null> {
  try {
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) return null;

    const { data, error } = await supabase
      .from('cookie_consents')
      .select('analytics_consent, marketing_consent, functional_consent')
      .eq('session_id', sessionId)
      .single();

    if (error && error.code === 'PGRST116') {
      return null;
    }

    if (error) throw error;
    return data || null;
  } catch (error) {
    console.error('Error getting cookie consent:', error);
    return null;
  }
}