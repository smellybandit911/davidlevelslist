-- Security fix: remove overly-permissive anon write access on all tables.
-- These tables are managed by admins only; public clients only need SELECT.

-- levels table
DROP POLICY IF EXISTS "insert_levels" ON levels;
DROP POLICY IF EXISTS "update_levels" ON levels;
DROP POLICY IF EXISTS "delete_levels" ON levels;

-- records table
DROP POLICY IF EXISTS "insert_records" ON records;
DROP POLICY IF EXISTS "update_records" ON records;
DROP POLICY IF EXISTS "delete_records" ON records;

-- editors table
DROP POLICY IF EXISTS "insert_editors" ON editors;
DROP POLICY IF EXISTS "update_editors" ON editors;
DROP POLICY IF EXISTS "delete_editors" ON editors;
