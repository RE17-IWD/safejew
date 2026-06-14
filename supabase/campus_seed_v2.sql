-- ============================================================
-- campus_seed_v2.sql
-- SafeJew — Campus & Jewish Spaces Seed Data (v2)
--
-- WHAT THIS DOES:
--   Inserts/upserts 20 major US campuses with Hillel/Chabad metadata,
--   then seeds physical Jewish spaces for UCLA and USC.
--
-- WHEN TO RUN:
--   Run AFTER campus_schema_v2.sql.
--   Safe to re-run: all inserts use ON CONFLICT ... DO UPDATE.
--
-- Campus ID format: matches existing seed.sql UUID pattern
--   a00002XX-0000-0000-0000-000000000000
-- Space ID format:
--   d00000XX-0000-0000-0000-000000000000
-- ============================================================


-- ============================================================
-- CAMPUSES  (20 major US universities)
-- ============================================================

INSERT INTO campuses (
  id, name, city, state, lat, lng,
  hillel_contact,
  hillel_url, chabad_url, chabad_address,
  jewish_food_notes, total_jewish_students, hillel_chapter_name
) VALUES

-- 1. UCLA
(
  'a0000200-0000-0000-0000-000000000001',
  'University of California, Los Angeles',
  'Los Angeles', 'CA', 34.0689, -118.4452,
  'info@uclahillel.org',
  'https://www.uclahillel.org',
  'https://www.chabadatucla.org',
  '920 Hilgard Ave, Los Angeles, CA 90024',
  'Kosher dining at Hillel (574 Hilgard Ave). Multiple kosher restaurants in Westwood Village within walking distance.',
  3500,
  'UCLA Hillel'
),

-- 2. USC
(
  'a0000200-0000-0000-0000-000000000002',
  'University of Southern California',
  'Los Angeles', 'CA', 34.0224, -118.2851,
  'info@uscjewish.org',
  'https://www.uscjewish.org',
  'https://www.chabadatusc.org',
  '3221 S Hoover St, Los Angeles, CA 90089',
  'Kosher kitchen at USC Hillel. Kosher options available through Hillel catering for campus events.',
  2000,
  'USC Hillel'
),

-- 3. Cal State LA
(
  'a0000001-0000-0000-0000-000000000002',
  'California State University, Los Angeles',
  'Los Angeles', 'CA', 34.0689, -118.1717,
  NULL,
  NULL,
  NULL,
  NULL,
  'Limited kosher options on campus. Nearest kosher food in Pico-Robertson (~8 miles).',
  200,
  NULL
),

-- 4. Columbia University
(
  'a0000200-0000-0000-0000-000000000004',
  'Columbia University',
  'New York', 'NY', 40.8075, -73.9626,
  'info@columbiahillel.org',
  'https://www.columbiahillel.org',
  'https://www.chabadatcolumbia.com',
  '619 W 113th St, New York, NY 10025',
  'Kosher meal plan available through Columbia Dining. Hillel serves Shabbat dinners weekly.',
  3000,
  'Columbia/Barnard Hillel'
),

-- 5. New York University
(
  'a0000200-0000-0000-0000-000000000005',
  'New York University',
  'New York', 'NY', 40.7295, -73.9965,
  'info@nyuhillel.org',
  'https://www.nyuhillel.org',
  'https://www.chabadnyu.org',
  '18 W 4th St, New York, NY 10012',
  'Multiple kosher dining options near Washington Square Park. NYU Hillel offers Shabbat dinners.',
  5000,
  'NYU Hillel'
),

-- 6. Harvard University
(
  'a0000200-0000-0000-0000-000000000006',
  'Harvard University',
  'Cambridge', 'MA', 42.3770, -71.1167,
  'info@hillel.harvard.edu',
  'https://hillel.harvard.edu',
  'https://www.chabadatharvard.com',
  '7 Maple Ave, Cambridge, MA 02139',
  'Hillel hosts Shabbat dinners with kosher options. Kosher certification available at select Harvard dining halls.',
  1800,
  'Harvard Hillel'
),

-- 7. University of Pennsylvania
(
  'a0000200-0000-0000-0000-000000000007',
  'University of Pennsylvania',
  'Philadelphia', 'PA', 39.9522, -75.1932,
  'info@pennhillel.org',
  'https://www.pennhillel.org',
  'https://www.chabadatupenn.com',
  '3942 Spruce St, Philadelphia, PA 19104',
  'Kosher dining at 1920 Commons and Hill House. Penn Hillel runs a full-service kosher kitchen.',
  3000,
  'Penn Hillel'
),

-- 8. Cornell University
(
  'a0000200-0000-0000-0000-000000000008',
  'Cornell University',
  'Ithaca', 'NY', 42.4534, -76.4735,
  'info@cornellhillel.org',
  'https://www.cornellhillel.org',
  'https://www.chabadcornell.org',
  '108 Edgemoor Ln, Ithaca, NY 14853',
  'Kosher meal plan through Cornell Dining (Kosher Kitchen at North Star). Hillel Shabbat dinners weekly.',
  2500,
  'Cornell Hillel'
),

-- 9. Stanford University
(
  'a0000200-0000-0000-0000-000000000009',
  'Stanford University',
  'Stanford', 'CA', 37.4275, -122.1697,
  'info@stanfordhillel.org',
  'https://www.stanfordhillel.org',
  'https://www.chabadatstanford.com',
  '565 Mayfield Ave, Stanford, CA 94305',
  'Kosher kitchen at Stern Hall. Stanford Hillel provides Friday night Shabbat dinners.',
  1200,
  'Stanford Hillel'
),

-- 10. UC Berkeley
(
  'a0000200-0000-0000-0000-000000000010',
  'University of California, Berkeley',
  'Berkeley', 'CA', 37.8719, -122.2585,
  'info@binghamhillel.org',
  'https://www.binghamhillel.org',
  'https://www.chabadatberkeley.com',
  '2515 Hillegass Ave, Berkeley, CA 94704',
  'Kosher options near Telegraph Ave. Hillel Shabbat dinners. Several kosher restaurants on/near campus.',
  3500,
  'Bingham Hillel at Berkeley'
),

-- 11. University of Michigan
(
  'a0000200-0000-0000-0000-000000000011',
  'University of Michigan',
  'Ann Arbor', 'MI', 42.2780, -83.7382,
  'info@hillel.umich.edu',
  'https://www.hillel.umich.edu',
  'https://www.chabadmichigan.com',
  '715 Hill St, Ann Arbor, MI 48104',
  'Largest Hillel building in the world at Michigan. Full kosher dining program with Shabbat and holiday meals.',
  4000,
  'University of Michigan Hillel'
),

-- 12. Ohio State University
(
  'a0000200-0000-0000-0000-000000000012',
  'Ohio State University',
  'Columbus', 'OH', 39.9612, -83.0021,
  'info@hillel.osu.edu',
  'https://www.hillel.osu.edu',
  'https://www.chabadosu.org',
  '46 E 16th Ave, Columbus, OH 43201',
  'Kosher certification at select dining halls. Ohio State Hillel runs Shabbat dinners weekly.',
  2000,
  'Ohio State Hillel'
),

-- 13. Northwestern University
(
  'a0000200-0000-0000-0000-000000000013',
  'Northwestern University',
  'Evanston', 'IL', 42.0565, -87.6753,
  'info@northwesternhillel.org',
  'https://www.northwesternhillel.org',
  'https://www.chabadnorthwestern.com',
  '1936 Sheridan Rd, Evanston, IL 60208',
  'Kosher meal plan options available. Northwestern Hillel Friday night Shabbat dinners are well-attended.',
  1500,
  'Northwestern University Hillel'
),

-- 14. Boston University
(
  'a0000200-0000-0000-0000-000000000014',
  'Boston University',
  'Boston', 'MA', 42.3505, -71.1054,
  'info@buhillel.org',
  'https://www.buhillel.org',
  'https://www.chabadatbu.com',
  '213 Bay State Rd, Boston, MA 02215',
  'Kosher meal plan at BU. Hillel provides Shabbat dinners and holiday programming with catering.',
  3000,
  'BU Hillel'
),

-- 15. Brandeis University
(
  'a0000200-0000-0000-0000-000000000015',
  'Brandeis University',
  'Waltham', 'MA', 42.3601, -71.2603,
  'info@brandeis.edu',
  'https://www.brandeis.edu/hillel',
  'https://www.chabadatbrandeis.com',
  '415 South St, Waltham, MA 02453',
  'Brandeis is a Jewish-founded university — full kosher dining throughout campus dining halls.',
  2000,
  'Brandeis Hillel'
),

-- 16. George Washington University
(
  'a0000200-0000-0000-0000-000000000016',
  'George Washington University',
  'Washington', 'DC', 38.8997, -77.0480,
  'info@gwuhillel.org',
  'https://www.gwuhillel.org',
  'https://www.chabadatgwu.com',
  '2300 H St NW, Washington, DC 20052',
  'Kosher dining through GWU catering. Hillel provides Shabbat dinners. Vibrant DC Jewish community nearby.',
  2000,
  'GWU Hillel'
),

-- 17. University of Maryland
(
  'a0000200-0000-0000-0000-000000000017',
  'University of Maryland',
  'College Park', 'MD', 38.9869, -76.9426,
  'info@hillelmd.org',
  'https://www.hillelmd.org',
  'https://www.chabadmd.org',
  '7612 Mowatt Ln, College Park, MD 20740',
  'Largest Jewish student population of any public university. Full kosher dining at Yahentamitsi Hall.',
  7000,
  'Hineni at University of Maryland'
),

-- 18. University of Florida
(
  'a0000200-0000-0000-0000-000000000018',
  'University of Florida',
  'Gainesville', 'FL', 29.6436, -82.3549,
  'info@floridahillel.org',
  'https://www.floridahillel.org',
  'https://www.chabaduf.org',
  '2020 W University Ave, Gainesville, FL 32603',
  'Kosher kitchen at UF Hillel. Shabbat dinners and holiday meals provided. Kosher options in dining halls.',
  3000,
  'Florida Hillel'
),

-- 19. George Mason University
(
  'a0000200-0000-0000-0000-000000000019',
  'George Mason University',
  'Fairfax', 'VA', 38.8314, -77.3131,
  NULL,
  NULL,
  'https://www.chabadatgmu.com',
  '4511 Daly Dr, Chantilly, VA 20151',
  'Limited kosher options on campus. Chabad provides Shabbat dinners nearby.',
  500,
  NULL
),

-- 20. Tulane University
(
  'a0000200-0000-0000-0000-000000000020',
  'Tulane University',
  'New Orleans', 'LA', 29.9511, -90.1184,
  'info@tulane.hillel.org',
  'https://www.tulane.hillel.org',
  'https://www.chabadtulane.com',
  '912 Broadway St, New Orleans, LA 70118',
  'Kosher dining at Hillel (Hillel of Greater New Orleans). Active Hillel with frequent Shabbat programming.',
  2500,
  'Hillel of Greater New Orleans at Tulane'
)

ON CONFLICT (id) DO UPDATE SET
  name                  = EXCLUDED.name,
  city                  = EXCLUDED.city,
  state                 = EXCLUDED.state,
  lat                   = EXCLUDED.lat,
  lng                   = EXCLUDED.lng,
  hillel_contact        = EXCLUDED.hillel_contact,
  hillel_url            = EXCLUDED.hillel_url,
  chabad_url            = EXCLUDED.chabad_url,
  chabad_address        = EXCLUDED.chabad_address,
  jewish_food_notes     = EXCLUDED.jewish_food_notes,
  total_jewish_students = EXCLUDED.total_jewish_students,
  hillel_chapter_name   = EXCLUDED.hillel_chapter_name;


-- ============================================================
-- CAMPUS SPACES  (physical Jewish locations near UCLA & USC)
-- ============================================================

INSERT INTO campus_spaces (
  id, campus_id,
  name, type,
  address, lat, lng,
  website, phone,
  distance_miles, notes
) VALUES

-- ── UCLA spaces ──────────────────────────────────────────────

-- UCLA Chabad
(
  'd0000001-0000-0000-0000-000000000001',
  'a0000200-0000-0000-0000-000000000001',
  'Chabad at UCLA',
  'chabad',
  '920 Hilgard Ave, Los Angeles, CA 90024',
  34.0660, -118.4444,
  'https://www.chabadatucla.org',
  '(310) 208-7511',
  0.3,
  'Full-service Chabad house on Hilgard Ave. Shabbat dinners, High Holiday services, and daily minyan. Free meals open to all students.'
),

-- UCLA Hillel
(
  'd0000001-0000-0000-0000-000000000002',
  'a0000200-0000-0000-0000-000000000001',
  'UCLA Hillel',
  'hillel',
  '574 Hilgard Ave, Los Angeles, CA 90024',
  34.0700, -118.4432,
  'https://www.uclahillel.org',
  '(310) 208-6639',
  0.1,
  'Main Hillel building on Hilgard Ave adjacent to campus. Kosher kitchen, Shabbat dinners, cultural and social programming throughout the year.'
),

-- Sinai Temple (near UCLA)
(
  'd0000001-0000-0000-0000-000000000003',
  'a0000200-0000-0000-0000-000000000001',
  'Sinai Temple',
  'synagogue',
  '10400 Wilshire Blvd, Los Angeles, CA 90024',
  34.0604, -118.4509,
  'https://www.sinaitemple.org',
  '(310) 474-1518',
  0.9,
  'Large Conservative synagogue on Wilshire Blvd. Student-friendly Friday night services and High Holiday programming. About a mile from campus.'
),

-- University Synagogue (near UCLA)
(
  'd0000001-0000-0000-0000-000000000004',
  'a0000200-0000-0000-0000-000000000001',
  'University Synagogue',
  'synagogue',
  '11960 Sunset Blvd, Los Angeles, CA 90049',
  34.0731, -118.4611,
  'https://www.universitynsynagogue.org',
  '(310) 472-1255',
  1.4,
  'Reform synagogue on Sunset Blvd. Active student outreach program and welcoming community. Slightly north and west of UCLA main campus.'
),

-- ── USC spaces ───────────────────────────────────────────────

-- USC Chabad
(
  'd0000001-0000-0000-0000-000000000005',
  'a0000200-0000-0000-0000-000000000002',
  'Chabad at USC',
  'chabad',
  '3221 S Hoover St, Los Angeles, CA 90089',
  34.0224, -118.2839,
  'https://www.chabadatusc.org',
  '(213) 747-6244',
  0.2,
  'Chabad house directly adjacent to USC campus. Weekly Shabbat dinners, holiday celebrations, and one-on-one learning. No membership required.'
),

-- USC Hillel
(
  'd0000001-0000-0000-0000-000000000006',
  'a0000200-0000-0000-0000-000000000002',
  'USC Hillel',
  'hillel',
  '3395 S Hoover St, Los Angeles, CA 90089',
  34.0156, -118.2831,
  'https://www.uscjewish.org',
  '(213) 747-4459',
  0.3,
  'USC Jewish Student Union / Hillel. Kosher kitchen, Shabbat programming, Israel advocacy, and Jewish cultural events throughout the academic year.'
)

ON CONFLICT (id) DO UPDATE SET
  campus_id      = EXCLUDED.campus_id,
  name           = EXCLUDED.name,
  type           = EXCLUDED.type,
  address        = EXCLUDED.address,
  lat            = EXCLUDED.lat,
  lng            = EXCLUDED.lng,
  website        = EXCLUDED.website,
  phone          = EXCLUDED.phone,
  distance_miles = EXCLUDED.distance_miles,
  notes          = EXCLUDED.notes;
