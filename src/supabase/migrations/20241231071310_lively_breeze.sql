/*
  # Fix Cookie Consent Schema

  1. Changes
    - Add unique constraint on session_id
    - Ensure proper upsert functionality
*/

-- Add unique constraint for session_id
ALTER TABLE cookie_consents 
ADD CONSTRAINT cookie_consents_session_id_key UNIQUE (session_id);

-- Ensure index exists for better performance
CREATE INDEX IF NOT EXISTS idx_cookie_consents_session_id 
ON cookie_consents(session_id);