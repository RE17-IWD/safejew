// Single source of truth for supported campuses.
// Used by: campus page (display), /api/incidents (UUID mapping), /api/reports (campus reports).
// Every URL here has been verified reachable. Do not add links without checking them.

export interface CampusOrg {
  name: string;
  url: string | null;
}

export interface CampusInfo {
  id: string;
  uuid: string;
  name: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  hillel: CampusOrg | null;
  chabad: CampusOrg | null;
  jewishStudentEstimate: number | null;
  jewishLifeNotes: string;
}

export const CAMPUSES: CampusInfo[] = [
  {
    id: 'campus-ucla',
    uuid: 'a0000001-0000-0000-0000-000000000001',
    name: 'UCLA',
    city: 'Los Angeles',
    state: 'CA',
    lat: 34.0689,
    lng: -118.4452,
    hillel: { name: 'Hillel at UCLA', url: 'https://www.uclahillel.org' },
    chabad: { name: 'Chabad House at UCLA', url: 'https://www.chabaducla.com' },
    jewishStudentEstimate: 4500,
    jewishLifeNotes:
      'UCLA has one of the largest Jewish student populations in the country. Hillel at UCLA offers regular programming, Shabbat dinners, and advocacy resources, and Chabad House at UCLA runs weekly events near campus. The surrounding Westwood neighborhood has multiple kosher dining options.',
  },
  {
    id: 'campus-usc',
    uuid: 'a0000001-0000-0000-0000-000000000003',
    name: 'USC',
    city: 'Los Angeles',
    state: 'CA',
    lat: 34.0224,
    lng: -118.2851,
    hillel: { name: 'USC Hillel', url: 'https://www.uschillel.org' },
    chabad: { name: 'Chabad at USC', url: 'https://www.chabadatusc.com' },
    jewishStudentEstimate: 3200,
    jewishLifeNotes:
      'USC Hillel is one of the most active on the West Coast, with weekly Shabbat programming and Birthright trips. Chabad at USC operates just off campus. The university has seen elevated antisemitic incidents since October 2023 and has dedicated security resources to Jewish student spaces.',
  },
  {
    id: 'campus-columbia',
    uuid: 'a0000001-0000-0000-0000-000000000004',
    name: 'Columbia University',
    city: 'New York',
    state: 'NY',
    lat: 40.8075,
    lng: -73.9626,
    hillel: { name: 'Columbia/Barnard Hillel', url: 'https://columbiabarnardhillel.org' },
    chabad: { name: 'Chabad at Columbia', url: 'https://www.chabadcolumbia.org' },
    jewishStudentEstimate: 3800,
    jewishLifeNotes:
      'Columbia/Barnard Hillel is one of the oldest Hillels in the country. The campus became a major flashpoint for antisemitic incidents in 2023 and 2024, with Jewish students reporting being blocked from campus spaces and receiving targeted harassment. Chabad at Columbia serves as a community hub near campus.',
  },
  {
    id: 'campus-nyu',
    uuid: 'a0000001-0000-0000-0000-000000000005',
    name: 'NYU',
    city: 'New York',
    state: 'NY',
    lat: 40.7295,
    lng: -73.9965,
    hillel: { name: 'The Bronfman Center for Jewish Student Life (NYU Hillel)', url: 'https://www.bronfmancenter.org' },
    chabad: { name: 'Chabad at NYU', url: null },
    jewishStudentEstimate: 5000,
    jewishLifeNotes:
      'NYU has one of the largest Jewish student populations of any university in the US. The Bronfman Center, NYU\'s Hillel, operates a full-service Jewish center in Greenwich Village, and Chabad runs programming for students across Lower Manhattan.',
  },
  {
    id: 'campus-harvard',
    uuid: 'a0000001-0000-0000-0000-000000000006',
    name: 'Harvard University',
    city: 'Cambridge',
    state: 'MA',
    lat: 42.377,
    lng: -71.1167,
    hillel: { name: 'Harvard Hillel', url: 'https://www.hillel.harvard.edu' },
    chabad: { name: 'Harvard Chabad', url: 'https://www.harvardchabad.org' },
    jewishStudentEstimate: 2500,
    jewishLifeNotes:
      'Harvard Hillel occupies a dedicated building on campus and runs one of the most comprehensive programs of any Ivy League Hillel. After October 7, 2023, Harvard became a center of national attention for campus antisemitism. Harvard Chabad is a popular Shabbat destination for students and faculty.',
  },
  {
    id: 'campus-upenn',
    uuid: 'a0000001-0000-0000-0000-000000000007',
    name: 'University of Pennsylvania',
    city: 'Philadelphia',
    state: 'PA',
    lat: 39.9522,
    lng: -75.1932,
    hillel: { name: 'Penn Hillel', url: 'https://www.pennhillel.org' },
    chabad: { name: 'Chabad at Penn', url: 'https://www.chabadatpenn.com' },
    jewishStudentEstimate: 3500,
    jewishLifeNotes:
      'Penn Hillel is one of the most active on the East Coast, serving thousands of students from Penn and nearby schools. Chabad at Penn operates steps from campus. Philadelphia\'s established Jewish community is within easy reach of University City.',
  },
  {
    id: 'campus-cornell',
    uuid: 'a0000001-0000-0000-0000-000000000008',
    name: 'Cornell University',
    city: 'Ithaca',
    state: 'NY',
    lat: 42.4534,
    lng: -76.4735,
    hillel: { name: 'Cornell Hillel', url: 'https://www.cornellhillel.org' },
    chabad: { name: 'Roitman Chabad Center at Cornell', url: 'https://www.chabadcornell.com' },
    jewishStudentEstimate: 3000,
    jewishLifeNotes:
      'Cornell Hillel is a central hub for Jewish students in Ithaca. Cornell made national headlines in October 2023 when a student posted violent threats targeting Jewish students; campus security was significantly enhanced after the incident.',
  },
  {
    id: 'campus-stanford',
    uuid: 'a0000001-0000-0000-0000-000000000009',
    name: 'Stanford University',
    city: 'Stanford',
    state: 'CA',
    lat: 37.4275,
    lng: -122.1697,
    hillel: { name: 'Hillel at Stanford', url: 'https://www.stanfordhillel.org' },
    chabad: { name: 'Chabad at Stanford', url: 'https://www.chabadstanford.org' },
    jewishStudentEstimate: 2000,
    jewishLifeNotes:
      'Hillel at Stanford offers year-round programming including High Holiday services for students and community members. Chabad at Stanford serves students and the broader Silicon Valley Jewish community.',
  },
  {
    id: 'campus-berkeley',
    uuid: 'a0000001-0000-0000-0000-000000000010',
    name: 'UC Berkeley',
    city: 'Berkeley',
    state: 'CA',
    lat: 37.8719,
    lng: -122.2585,
    hillel: { name: 'Berkeley Hillel', url: 'https://berkeleyhillel.org' },
    chabad: { name: 'Chabad at UC Berkeley', url: 'https://www.chabadberkeley.org' },
    jewishStudentEstimate: 4000,
    jewishLifeNotes:
      'UC Berkeley has historically had one of the most politically charged campus climates for Jewish students. Berkeley Hillel and Chabad both run active programming and serve as community anchors for one of the largest Jewish student populations in the UC system.',
  },
  {
    id: 'campus-michigan',
    uuid: 'a0000001-0000-0000-0000-000000000011',
    name: 'University of Michigan',
    city: 'Ann Arbor',
    state: 'MI',
    lat: 42.278,
    lng: -83.7382,
    hillel: { name: 'University of Michigan Hillel', url: 'https://michiganhillel.org' },
    chabad: { name: 'Chabad at University of Michigan', url: 'https://www.jewmich.com' },
    jewishStudentEstimate: 5000,
    jewishLifeNotes:
      'Michigan Hillel is one of the largest Hillels in the world, serving thousands of Jewish students. Ann Arbor has a robust Jewish community with multiple synagogues within reach of campus.',
  },
  {
    id: 'campus-osu',
    uuid: 'a0000001-0000-0000-0000-000000000012',
    name: 'Ohio State University',
    city: 'Columbus',
    state: 'OH',
    lat: 40.0076,
    lng: -83.03,
    hillel: { name: 'Hillel at The Ohio State University', url: 'https://www.osuhillel.org' },
    chabad: { name: 'Chabad at Ohio State', url: null },
    jewishStudentEstimate: 4500,
    jewishLifeNotes:
      'Ohio State\'s Hillel has been a cornerstone of Jewish life in Columbus for over a century. The university\'s large student body includes one of the biggest Jewish student communities in the Midwest.',
  },
  {
    id: 'campus-northwestern',
    uuid: 'a0000001-0000-0000-0000-000000000013',
    name: 'Northwestern University',
    city: 'Evanston',
    state: 'IL',
    lat: 42.0565,
    lng: -87.6753,
    hillel: { name: 'Northwestern Hillel', url: 'https://www.northwesternhillel.org' },
    chabad: { name: 'Chabad at Northwestern', url: 'https://www.chabadnu.com' },
    jewishStudentEstimate: 2000,
    jewishLifeNotes:
      'Northwestern Hillel serves students on the Evanston campus and is a central gathering point for Jewish life on Chicago\'s North Shore. Chabad at Northwestern runs regular programming near the lakefront campus.',
  },
  {
    id: 'campus-bu',
    uuid: 'a0000001-0000-0000-0000-000000000014',
    name: 'Boston University',
    city: 'Boston',
    state: 'MA',
    lat: 42.3505,
    lng: -71.1054,
    hillel: { name: 'BU Hillel', url: 'https://www.bu.edu/hillel' },
    chabad: { name: 'Chabad at BU', url: null },
    jewishStudentEstimate: 3500,
    jewishLifeNotes:
      'BU Hillel is one of the most active on the East Coast, located along the Charles River campus. The adjacent Brookline neighborhood has one of the highest concentrations of Jewish residents in New England, with plentiful kosher dining nearby.',
  },
  {
    id: 'campus-brandeis',
    uuid: 'a0000001-0000-0000-0000-000000000015',
    name: 'Brandeis University',
    city: 'Waltham',
    state: 'MA',
    lat: 42.3657,
    lng: -71.2586,
    hillel: { name: 'Brandeis Hillel', url: 'https://www.brandeis.edu/hillel' },
    chabad: { name: 'Chabad at Brandeis', url: 'https://www.chabadbrandeis.org' },
    jewishStudentEstimate: 2500,
    jewishLifeNotes:
      'Brandeis was founded as a Jewish-sponsored nonsectarian university in 1948, and Jewish life is deeply embedded in campus culture. The university has kosher dining options and Jewish studies programs that attract students from around the world.',
  },
  {
    id: 'campus-gwu',
    uuid: 'a0000001-0000-0000-0000-000000000016',
    name: 'George Washington University',
    city: 'Washington',
    state: 'DC',
    lat: 38.8997,
    lng: -77.048,
    hillel: { name: 'GW Hillel', url: 'https://www.gwhillel.org' },
    chabad: { name: 'Chabad GW', url: 'https://www.chabadgwu.com' },
    jewishStudentEstimate: 2000,
    jewishLifeNotes:
      'GW Hillel is located in the heart of Foggy Bottom. Jewish students at GW are deeply engaged in policy work given the university\'s proximity to the federal government and national Jewish advocacy organizations.',
  },
  {
    id: 'campus-maryland',
    uuid: 'a0000001-0000-0000-0000-000000000017',
    name: 'University of Maryland',
    city: 'College Park',
    state: 'MD',
    lat: 38.9869,
    lng: -76.9426,
    hillel: { name: 'Maryland Hillel', url: 'https://marylandhillel.org' },
    chabad: { name: 'Chabad at UMD', url: null },
    jewishStudentEstimate: 4000,
    jewishLifeNotes:
      'Maryland Hillel is one of the largest in the country, serving a Jewish student population drawn heavily from the Maryland and DC Metro suburbs. Many students intern with Jewish organizations and advocacy groups in nearby Washington.',
  },
  {
    id: 'campus-florida',
    uuid: 'a0000001-0000-0000-0000-000000000018',
    name: 'University of Florida',
    city: 'Gainesville',
    state: 'FL',
    lat: 29.6436,
    lng: -82.3549,
    hillel: { name: 'UF Hillel', url: 'https://www.ufhillel.org' },
    chabad: { name: 'Chabad UF', url: 'https://www.chabaduf.com' },
    jewishStudentEstimate: 6000,
    jewishLifeNotes:
      'UF Hillel is one of the largest in the southeastern United States, serving one of the biggest Jewish student populations of any public university. Chabad UF is extremely active with programming throughout the week.',
  },
  {
    id: 'campus-tulane',
    uuid: 'a0000001-0000-0000-0000-000000000019',
    name: 'Tulane University',
    city: 'New Orleans',
    state: 'LA',
    lat: 29.9384,
    lng: -90.1199,
    hillel: { name: 'Tulane Hillel', url: 'https://www.tulanehillel.org' },
    chabad: { name: 'Chabad at Tulane', url: null },
    jewishStudentEstimate: 2500,
    jewishLifeNotes:
      'Tulane has one of the highest concentrations of Jewish students of any southern university, and New Orleans has a historic Jewish community stretching back to the early 1800s. Tulane Hillel runs extensive year-round programming.',
  },
  {
    id: 'campus-cal-state-la',
    uuid: 'a0000001-0000-0000-0000-000000000002',
    name: 'Cal State LA',
    city: 'Los Angeles',
    state: 'CA',
    lat: 34.0686,
    lng: -118.1687,
    hillel: null,
    chabad: null,
    jewishStudentEstimate: 800,
    jewishLifeNotes:
      'Cal State LA has a smaller but growing Jewish student community. The campus sits in East Los Angeles near Boyle Heights, historically one of the largest Jewish neighborhoods in Los Angeles in the early 20th century — the landmark Breed Street Shul nearby is a monument to that heritage.',
  },
  {
    id: 'campus-george-mason',
    uuid: 'a0000001-0000-0000-0000-000000000020',
    name: 'George Mason University',
    city: 'Fairfax',
    state: 'VA',
    lat: 38.8316,
    lng: -77.3119,
    hillel: { name: 'Mason Hillel', url: 'https://www.masonhillel.org' },
    chabad: { name: 'Chabad at George Mason', url: 'https://www.chabadgmu.com' },
    jewishStudentEstimate: 1500,
    jewishLifeNotes:
      'Mason Hillel serves a commuter-heavy Jewish student population in Northern Virginia, an area with a large and established Jewish community, and runs regular programming in partnership with nearby congregations.',
  },
  {
    id: 'campus-american',
    uuid: 'a0000001-0000-0000-0000-000000000021',
    name: 'American University',
    city: 'Washington',
    state: 'DC',
    lat: 38.9376,
    lng: -77.0871,
    hillel: { name: 'American University Hillel', url: 'https://www.auhillel.org' },
    chabad: { name: 'Chabad AU', url: 'https://www.chabadau.com' },
    jewishStudentEstimate: 2200,
    jewishLifeNotes:
      'AU Hillel serves a particularly engaged Jewish campus community, benefiting from close relationships with Washington\'s Jewish institutions and national advocacy organizations headquartered nearby.',
  },
  {
    id: 'campus-umd-baltimore',
    uuid: 'a0000001-0000-0000-0000-000000000022',
    name: 'University of Maryland, Baltimore County',
    city: 'Baltimore',
    state: 'MD',
    lat: 39.2557,
    lng: -76.7101,
    hillel: { name: 'UMBC Hillel', url: 'https://www.umbchillel.org' },
    chabad: null,
    jewishStudentEstimate: 1200,
    jewishLifeNotes:
      'UMBC Hillel serves a commuter-heavy student population in the Baltimore suburbs. The university draws heavily from Baltimore\'s historic Jewish community in neighborhoods like Pikesville and Owings Mills.',
  },
];

// String id → Supabase UUID. Includes legacy aliases used in older data.
export const CAMPUS_UUID: Record<string, string> = {
  ...Object.fromEntries(CAMPUSES.map((c) => [c.id, c.uuid])),
  'campus-demo-university': 'a0000001-0000-0000-0000-000000000001', // legacy alias for campus-ucla
  'campus-ohio-state': 'a0000001-0000-0000-0000-000000000012', // legacy alias for campus-osu
};

export function findCampus(id: string): CampusInfo | undefined {
  return CAMPUSES.find((c) => c.id === id || c.uuid === id);
}
