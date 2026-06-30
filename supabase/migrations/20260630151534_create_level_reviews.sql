/*
# Create level_reviews table

1. New Tables
   - `level_reviews`
     - `id` (uuid, primary key)
     - `level_key` (text, not null) — identifies the level; stores "<listType>:<levelId>" e.g. "dll:3"
     - `author` (text, not null) — display name the commenter provides
     - `comment` (text, not null)
     - `difficulty` (integer, 1-10)
     - `enjoyment` (integer, 1-10)
     - `created_at` (timestamptz)

2. Security
   - RLS enabled; anon + authenticated can SELECT/INSERT.
   - No UPDATE/DELETE policies (reviews are permanent once posted).
*/

CREATE TABLE IF NOT EXISTS level_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  level_key text NOT NULL,
  author text NOT NULL,
  comment text NOT NULL,
  difficulty integer NOT NULL CHECK (difficulty >= 1 AND difficulty <= 10),
  enjoyment integer NOT NULL CHECK (enjoyment >= 1 AND enjoyment <= 10),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE level_reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_level_reviews" ON level_reviews;
CREATE POLICY "select_level_reviews" ON level_reviews FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "insert_level_reviews" ON level_reviews;
CREATE POLICY "insert_level_reviews" ON level_reviews FOR INSERT
  TO anon, authenticated WITH CHECK (true);
