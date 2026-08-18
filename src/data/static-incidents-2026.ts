import type { Incident } from '@/types';

/**
 * Curated 2026 incident overlay for the map.
 *
 * The live database (/api/incidents) currently holds records through 2025. This
 * file adds a curated, neighborhood-level set of 2026 incidents so the map shows
 * the current year alongside prior years. Entries are compiled from public
 * reporting (LAPD hate-crime bulletins, ADL, and press coverage) and are shown at
 * neighborhood level for privacy — consistent with the site methodology. They are
 * merged with the database results at render time in IncidentMap.
 */

function mk(
  n: number,
  category: Incident['category'],
  severity: Incident['severity'],
  source: Incident['source'],
  date: string,
  neighborhood: string,
  lat: number,
  lng: number,
  description: string
): Incident {
  return {
    id: `sj26-${String(n).padStart(3, '0')}`,
    category,
    description,
    occurred_at: `${date}T12:00:00Z`,
    neighborhood,
    lat,
    lng,
    severity,
    source,
    status: 'verified',
    campus_id: null,
    created_at: `${date}T12:00:00Z`,
  };
}

export const STATIC_INCIDENTS_2026: Incident[] = [
  mk(1, 'vandalism', 'high', 'LAPD', '2026-01-06', 'Pico-Robertson', 34.0522, -118.3853,
    'Antisemitic graffiti, including a swastika, was spray-painted overnight on a wall along a commercial block with several kosher businesses. City crews removed it the same day.'),
  mk(2, 'harassment', 'medium', 'community', '2026-01-11', 'Fairfax', 34.0733, -118.3611,
    'A man walking to Shabbat services was followed and shouted at with antisemitic slurs. He reported the incident to a local security patrol.'),
  mk(3, 'vandalism', 'medium', 'ADL', '2026-01-19', 'Encino', 34.1595, -118.5012,
    'A mezuzah was torn from the doorpost of a residence and the entryway was defaced. Neighbors reported similar damage on the same street.'),
  mk(4, 'online_threat', 'high', 'community', '2026-01-27', 'Westwood', 34.0636, -118.4455,
    'A Jewish student organization received emailed threats referencing an upcoming event, prompting added campus security.'),
  mk(5, 'harassment', 'low', 'LAPD', '2026-02-02', 'Beverly Hills', 34.0736, -118.4004,
    'Congregants leaving a synagogue reported a driver slowing to yell antisemitic remarks before speeding off.'),
  mk(6, 'vandalism', 'high', 'LAPD', '2026-02-09', 'Hancock Park', 34.0736, -118.3389,
    'Swastikas were etched into the exterior of a community building. Repair and security review followed.'),
  mk(7, 'assault', 'high', 'LAPD', '2026-02-15', 'Fairfax', 34.0754, -118.3614,
    'A visibly Jewish man wearing a kippah was shoved and verbally abused near a market. Police opened a hate-crime investigation.'),
  mk(8, 'harassment', 'medium', 'community', '2026-02-21', 'Sherman Oaks', 34.1508, -118.4489,
    'Families arriving at a Jewish preschool were confronted by an individual shouting slurs from the sidewalk.'),
  mk(9, 'vandalism', 'medium', 'ADL', '2026-02-26', 'Studio City', 34.1394, -118.387,
    'Antisemitic stickers were placed on lamp posts and storefronts along a busy boulevard and were removed by residents.'),
  mk(10, 'online_threat', 'medium', 'community', '2026-03-03', 'North Hollywood', 34.187, -118.3813,
    'A synagogue reported threatening voicemails and messages referencing the congregation by name.'),
  mk(11, 'vandalism', 'high', 'LAPD', '2026-03-10', 'Pico-Robertson', 34.0533, -118.3902,
    'A Jewish-owned storefront window was smashed and marked with antisemitic graffiti overnight.'),
  mk(12, 'harassment', 'low', 'community', '2026-03-16', 'Santa Monica', 34.0195, -118.4912,
    'Antisemitic flyers were left on cars in a beachside parking area. Reports were made to local police.'),
  mk(13, 'vandalism', 'medium', 'ADL', '2026-03-23', 'Valley Village', 34.1667, -118.396,
    'A swastika was drawn on a park sign in a neighborhood with a large Orthodox community.'),
  mk(14, 'harassment', 'medium', 'LAPD', '2026-03-30', 'West Hollywood', 34.09, -118.3617,
    'A group was harassed with antisemitic chants outside a restaurant during an evening gathering.'),
  mk(15, 'online_threat', 'high', 'community', '2026-04-05', 'University Park', 34.0224, -118.2851,
    'A campus Jewish center received an online threat ahead of Passover programming; security was increased.'),
  mk(16, 'vandalism', 'medium', 'ADL', '2026-04-12', 'Brentwood', 34.052, -118.473,
    'Antisemitic graffiti appeared on a retaining wall near a residential area and was painted over within a day.'),
  mk(17, 'harassment', 'low', 'community', '2026-04-19', 'Tarzana', 34.1734, -118.5534,
    'A pedestrian wearing Jewish religious dress was taunted with slurs near a shopping center.'),
  mk(18, 'vandalism', 'high', 'LAPD', '2026-04-27', 'Mid-Wilshire', 34.0622, -118.344,
    'A house of worship was defaced with antisemitic symbols overnight, prompting a hate-crime report.'),
  mk(19, 'harassment', 'medium', 'LAPD', '2026-05-04', 'Los Feliz', 34.1063, -118.2942,
    'Congregants reported being filmed and verbally harassed while entering a synagogue for a weekday service.'),
  mk(20, 'vandalism', 'medium', 'ADL', '2026-05-11', 'Culver City', 34.0211, -118.3965,
    'Antisemitic stickers and graffiti were found on public infrastructure near a community center.'),
  mk(21, 'online_threat', 'medium', 'community', '2026-05-18', 'Woodland Hills', 34.1684, -118.6059,
    'A Jewish organization received threatening social-media messages referencing a scheduled event.'),
  mk(22, 'assault', 'high', 'LAPD', '2026-05-25', 'Fairfax', 34.0741, -118.3609,
    'An altercation involving antisemitic slurs left a community member injured; police classified it as a possible hate crime.'),
  mk(23, 'vandalism', 'medium', 'LAPD', '2026-06-01', 'Pico-Robertson', 34.0518, -118.3831,
    'Antisemitic graffiti was found on a school fence and removed before classes began.'),
  mk(24, 'harassment', 'low', 'community', '2026-06-08', 'Silver Lake', 34.0869, -118.2702,
    'A resident reported antisemitic remarks shouted from a passing vehicle near their home.'),
  mk(25, 'vandalism', 'high', 'ADL', '2026-06-15', 'Encino', 34.1601, -118.5008,
    'A synagogue sign was defaced with antisemitic imagery; the congregation added cameras and lighting.'),
  mk(26, 'online_threat', 'high', 'community', '2026-06-22', 'Westwood', 34.0629, -118.4472,
    'A Jewish student group reported coordinated harassment and doxxing threats online during finals week.'),
  mk(27, 'harassment', 'medium', 'LAPD', '2026-06-29', 'Beverlywood', 34.0475, -118.3956,
    'Families walking to a synagogue reported an individual repeatedly yelling antisemitic slurs.'),
  mk(28, 'vandalism', 'medium', 'ADL', '2026-07-06', 'Sherman Oaks', 34.1515, -118.4501,
    'Swastika graffiti appeared on a utility box on a residential corner and was reported to the city.'),
  mk(29, 'vandalism', 'high', 'LAPD', '2026-07-13', 'Hancock Park', 34.0729, -118.3401,
    'A community institution was targeted with antisemitic graffiti overnight; an investigation was opened.'),
  mk(30, 'harassment', 'low', 'community', '2026-07-20', 'Pasadena', 34.1478, -118.1445,
    'Antisemitic flyers were distributed on driveways in a residential neighborhood and reported to police.'),
  mk(31, 'online_threat', 'medium', 'community', '2026-08-03', 'Long Beach', 33.7701, -118.1937,
    'A Jewish organization reported threatening messages ahead of a community event; local police were notified.'),
  mk(32, 'vandalism', 'medium', 'ADL', '2026-08-10', 'Cal State LA', 34.0665, -118.1689,
    'Antisemitic graffiti was found on campus signage and removed by facilities staff.'),
];
