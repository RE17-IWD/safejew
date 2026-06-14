-- ============================================================
-- campus_schema_v2.sql
-- SafeJew — Campus Data Extension Migration
--
-- WHAT THIS DOES:
--   Adds richer Hillel / Chabad / Jewish-community metadata to the
--   existing `campuses` table, and introduces a new `campus_spaces`
--   table for physical Jewish spaces (synagogues, Chabad houses, Hillel
--   buildings, kosher restaurants, etc.) located near each campus.
--
-- WHEN TO RUN:
--   Run this AFTER schema.sql has already been applied.
--   It is safe to run multiple times — every statement is idempotent.
--
-- ORDER:
--   1. schema.sql          ← must already exist
--   2. campus_schema_v2.sql  ← this file
--   3. campus_seed_v2.sql   ← seeds campuses + spaces data
-- ============================================================


-- ============================================================
-- 1. EXTEND CAMPUSES TABLE
--    All columns added with IF NOT EXISTS so this is re-runnable.
-- ============================================================

ALTER TABLE campuses
  ADD COLUMN IF NOT EXISTS hillel_url           TEXT,
  ADD COLUMN IF NOT EXISTS chabad_url           TEXT,
  ADD COLUMN IF NOT EXISTS chabad_address       TEXT,
  ADD COLUMN IF NOT EXISTS jewish_food_notes    TEXT,
  ADD COLUMN IF NOT EXISTS total_jewish_students INTEGER,
  ADD COLUMN IF NOT EXISTS hillel_chapter_name  TEXT;


-- ============================================================
-- 2. CAMPUS SPACES TABLE
--    Physical Jewish locations near each campus.
-- ============================================================

CREATE TABLE IF NOT EXISTS campus_spaces (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campus_id       UUID REFERENCES campuses (id) ON DELETE SET NULL,
  name            TEXT NOT NULL,
  type            TEXT NOT NULL CHECK (type IN (
                    'synagogue',
                    'chabad',
                    'hillel',
                    'jcc',
                    'kosher_restaurant',
                    'jewish_bookstore',
                    'community_center'
                  )),
  address         TEXT,
  lat             DOUBLE PRECISION,
  lng             DOUBLE PRECISION,
  website         TEXT,
  phone           TEXT,
  distance_miles  NUMERIC(4,1),
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ============================================================
-- 3. INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS campus_spaces_campus_id_idx ON campus_spaces (campus_id);
CREATE INDEX IF NOT EXISTS campus_spaces_type_idx      ON campus_spaces (type);


-- ============================================================
-- 4. ROW-LEVEL SECURITY
--    campus_spaces is public-read, no auth required.
-- ============================================================

ALTER TABLE campus_spaces ENABLE ROW LEVEL SECURITY;

-- Drop and recreate so this file is idempotent on re-run
DO $$
BEGIN
  -- SELECT policy for anonymous + authenticated users (public read)
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'campus_spaces'
      AND policyname = 'public_select_campus_spaces'
  ) THEN
    EXECUTE '
      CREATE POLICY "public_select_campus_spaces"
        ON campus_spaces FOR SELECT
        TO anon, authenticated
        USING (true)
    ';
  END IF;
END
$$;
