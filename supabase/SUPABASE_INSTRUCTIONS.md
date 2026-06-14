# Supabase SQL Upload Instructions — Campus Data Extension

These instructions explain how to run the three SQL files in this folder
to extend the SafeJew database with richer campus data.

---

## 1. Open the Supabase SQL Editor

1. Go to [https://supabase.com](https://supabase.com) and sign in.
2. Open your SafeJew project.
3. In the left sidebar, click **SQL Editor**.
4. Click **New query** (or the `+` button) to open a blank editor tab.

---

## 2. Run the Files in This Order

Run each file one at a time. Copy the full contents of each file, paste
into the SQL editor, and click **Run** (or press `Ctrl+Enter`).

### Step 1 — schema.sql (already done)

This file was run when you first set up the database. You do NOT need
to run it again. It created the base `campuses`, `incidents`, and
`reports` tables.

### Step 2 — campus_schema_v2.sql

**What it does:**
- Adds six new columns to the `campuses` table:
  `hillel_url`, `chabad_url`, `chabad_address`, `jewish_food_notes`,
  `total_jewish_students`, `hillel_chapter_name`
- Creates a new `campus_spaces` table for physical Jewish locations
  (Chabad houses, Hillel buildings, synagogues, etc.) near each campus
- Adds indexes on `campus_spaces` for fast lookups
- Enables Row-Level Security on `campus_spaces` with a public-read policy

This file is safe to run multiple times — it uses `IF NOT EXISTS` and
idempotent checks throughout.

### Step 3 — campus_seed_v2.sql

**What it does:**
- Inserts or updates 20 major US university campuses with Hillel/Chabad
  URLs, addresses, Jewish food notes, and estimated Jewish student counts
- Inserts 6 physical campus_spaces for UCLA and USC (Chabad houses,
  Hillel buildings, and nearby synagogues)

This file is safe to run multiple times — all inserts use
`ON CONFLICT ... DO UPDATE` so existing rows are updated rather than
duplicated.

### Note on seed.sql (the original seed file)

`seed.sql` was run during initial setup and contains synthetic incident
data. You do not need to re-run it unless you reset the database.

---

## 3. How to Verify It Worked

After running both new files, check the following in the
**Table Editor** (left sidebar -> Table Editor):

### Check campuses table
- Open the `campuses` table.
- You should see 20 rows (or more if you had additional rows from seed.sql).
- Confirm the new columns appear: `hillel_url`, `chabad_url`,
  `chabad_address`, `jewish_food_notes`, `total_jewish_students`,
  `hillel_chapter_name`.
- UCLA should show `total_jewish_students = 3500` and
  `hillel_url = 'https://www.uclahillel.org'`.

### Check campus_spaces table
- Open the `campus_spaces` table.
- You should see 6 rows: 4 for UCLA and 2 for USC.
- Each row should have a `campus_id`, `type`, `address`, `lat`, `lng`.

### Quick SQL verification query

Paste this into the SQL editor and click Run:

```sql
SELECT c.name, c.total_jewish_students, c.hillel_url,
       COUNT(cs.id) AS spaces_count
FROM campuses c
LEFT JOIN campus_spaces cs ON cs.campus_id = c.id
GROUP BY c.id, c.name, c.total_jewish_students, c.hillel_url
ORDER BY c.total_jewish_students DESC NULLS LAST;
```

This should show all 20 campuses ranked by Jewish student population,
with UCLA and USC showing `spaces_count` of 4 and 2 respectively.

---

## 4. What This Enables in the SafeJew App

Once these files have been run, the SafeJew app can:

- **Campus Detail Pages** — display Hillel and Chabad links, addresses,
  and estimated Jewish student population for each campus.

- **Campus Spaces Map** — show a map of nearby synagogues, Chabad houses,
  Hillel buildings, and kosher restaurants pinned near each campus.

- **Jewish Food Notes** — display dining guidance (kosher meal plans,
  nearby restaurants) on campus profile pages.

- **"Find a Minyan / Shabbat Dinner"** — use the `campus_spaces` table
  to suggest the nearest Jewish space for any given campus.

- **Safety + Community Context** — combine incident data (from the
  `incidents` table) with nearby Jewish space data to give students a
  fuller picture of the Jewish landscape at their campus.

---

## File Summary

| File | Purpose | Run Order |
|------|---------|-----------|
| `schema.sql` | Base tables (already done) | 1 |
| `seed.sql` | Synthetic incident data (already done) | 2 |
| `campus_schema_v2.sql` | Extend campuses + create campus_spaces | 3 |
| `campus_seed_v2.sql` | Seed 20 campuses + 6 campus spaces | 4 |
