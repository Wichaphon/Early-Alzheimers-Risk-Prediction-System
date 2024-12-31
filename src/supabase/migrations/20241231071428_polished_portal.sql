/*
  # Create Cookie Consents Table

  1. New Tables
    - `cookie_consents`
      - `id` (uuid, primary key)
      - `session_id` (text, unique)
      - `analytics_consent` (boolean)
      - `marketing_consent` (boolean)
      - `functional_consent` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policy for public access (since cookie consents are per session)
*/

-- Create the cookie_consents table
CREATE TABLE IF NOT EXISTS cookie_consents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  analytics_consent boolean NOT NULL DEFAULT false,
  marketing_consent boolean NOT NULL DEFAULT false,
  functional_consent boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE cookie_consents ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public access
CREATE POLICY "Allow public access to cookie consents"
  ON cookie_consents
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_cookie_consents_session_id 
ON cookie_consents(session_id);