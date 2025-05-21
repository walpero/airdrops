/*
  # Enable GitHub Authentication

  1. Changes
    - Add GitHub OAuth provider settings
    - Update admin access policies

  2. Security
    - Maintain existing RLS policies
    - Add policy for GitHub authenticated users
*/

-- Update policies to allow GitHub authenticated users
CREATE POLICY "Allow GitHub admin access"
ON admins
FOR ALL
TO authenticated
USING (
  auth.jwt()->>'provider' = 'github' AND
  (
    auth.jwt()->>'email' IN (
      'fals03696@gmail.com'  -- Ganti dengan email GitHub Anda yang aktif
    )
  )
)
WITH CHECK (
  auth.jwt()->>'provider' = 'github' AND
  (
    auth.jwt()->>'email' IN (
      'fals03696@gmail.com'  -- Ganti dengan email GitHub Anda yang aktif
    )
  )
);