/*
# Create level_reviews table

## Summary
Adds community review functionality so any visitor can post a comment and
rate a level on difficulty (1–10) and enjoyment (1–10).

## New Tables
- `level_reviews`
  - `id`               (uuid, PK) — auto-generated row identifier
  - `level_key`        (text, not null) — stable identifier for the level,
                        formatted as "<list_type>:<level_id>" e.g. "dll:1"
  - `author_name`      (text, not null) — display name entered by the visitor
  - `comment`          (text, not null) — free-text comment body
  - `difficulty_rating`(integer 1–10) — visitor's difficulty score
  - `enjoyment_rating` (integer 1–10) — visitor's enjoyment score
  - `created_at`       (timestamptz) — when the review was submitted

## Security
- RLS enabled.
- `anon` + `authenticated` SELECT — all reviews are public/readable by everyone.
- `anon` + `authenticated` INSERT — any visitor can submit a review.
- NO UPDATE or DELETE policies — reviews are permanent once submitted.
- Input constraints (CHECK) prevent out-of-range ratings and empty strings.
*/

CREATE TABLE IF NOT EXISTS level_reviews (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  level_key        text NOT NULL,
  author_name      text NOT NULL CHECK (char_length(trim(author_name)) >= 1 AND char_length(author_name) <= 50),
  comment          text NOT NULL CHECK (char_length(trim(comment)) >= 1 AND char_length(comment) <= 1000),
  difficulty_rating integer NOT NULL CHECK (difficulty_rating >= 1 AND difficulty_rating <= 10),
  enjoyment_rating  integer NOT NULL CHECK (enjoyment_rating >= 1 AND enjoyment_rating <= 10),
  created_at       timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_level_reviews_level_key ON level_reviews (level_key);

ALTER TABLE level_reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_reviews" ON level_reviews;
CREATE POLICY "public_select_reviews" ON level_reviews FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_insert_reviews" ON level_reviews;
CREATE POLICY "public_insert_reviews" ON level_reviews FOR INSERT
  TO anon, authenticated WITH CHECK (true);
