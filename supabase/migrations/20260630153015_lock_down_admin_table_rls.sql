/*
# Fix RLS policies — lock down write access on admin tables

## Problem
The `levels`, `records`, and `editors` tables had unrestricted INSERT/UPDATE/DELETE
policies for anon + authenticated. These tables are managed exclusively via migrations
(service-role); no frontend user should ever mutate them.

The `level_reviews` table had an unrestricted INSERT policy and no UPDATE/DELETE policies,
which is fine for reviews but was flagged as "always true".

## Changes

### levels, records, editors
- DROP the INSERT / UPDATE / DELETE policies for anon/authenticated.
- SELECT remains open to anon + authenticated (public read).

### level_reviews
- Re-scope INSERT to `authenticated` only — anon users cannot post reviews.
  Actually: this app has NO login screen, so all users are anon. Keep INSERT open to
  anon + authenticated but tighten the WITH CHECK to only allow non-empty author/comment
  (enforced by DB NOT NULL constraints already). The policy itself stays USING (true)
  for SELECT and WITH CHECK (true) for INSERT — those are acceptable for a genuinely
  public/shared data table with no ownership concept.
  The real fix is dropping the UPDATE/DELETE policies that don't exist (they were never
  created), and leaving INSERT as-is since this is intentionally public.

NOTE: For levels/records/editors the "always true" write policies are the actual risk —
anonymous visitors could insert, modify or delete list data. Those are dropped here.
*/

-- ── levels ──────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "insert_levels" ON levels;
DROP POLICY IF EXISTS "update_levels" ON levels;
DROP POLICY IF EXISTS "delete_levels" ON levels;

-- ── records ─────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "insert_records" ON records;
DROP POLICY IF EXISTS "update_records" ON records;
DROP POLICY IF EXISTS "delete_records" ON records;

-- ── editors ─────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "insert_editors" ON editors;
DROP POLICY IF EXISTS "update_editors" ON editors;
DROP POLICY IF EXISTS "delete_editors" ON editors;
