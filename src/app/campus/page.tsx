'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { IncidentCategory } from '@/types';
import { DEMO_INCIDENTS } from '@/lib/demo-data';

const CampusMap = dynamic(() => import('@/components/campus/CampusMap'), {
  ssr: false,
  loading: () => (
    <div
      className="flex items-center justify-center bg-cream-100 rounded-lg border border-cream-200"
      style={{ height: 400 }}
    >
      <div className="text-center">
        <div className="w-6 h-6 border-2 border-navy-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="font-sans text-sm text-gray-500">Loading map...</p>
      </div>
    </div>
  ),
});

const CATEGORY_LABELS: Record<IncidentCategory, string> = {
  vandalism: 'Vandalism',
  harassment: 'Harassment',
  assault: 'Assault',
  online_threat: 'Online Threat',
  other: 'Other',
};

const DEMO_CAMPUS_ID = 'campus-demo-university';

interface CampusHillel {
  name: string;
  url: string | null;
}

interface CampusChabad {
  name: string;
  url: string | null;
  address: string;
}

interface Campus {
  id: string;
  name: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  hillel: CampusHillel | null;
  chabad: CampusChabad | null;
  nearbySpaces: string[];
  jewishStudentEstimate: number | null;
  jewishLifeNotes: string;
  hasDemoData: boolean;
}

const CAMPUSES: Campus[] = [
  {
    id: 'campus-demo-university',
    name: 'UCLA',
    city: 'Los Angeles',
    state: 'CA',
    lat: 34.0689,
    lng: -118.4452,
    hillel: { name: 'Hillel at UCLA', url: 'https://uclahillel.org' },
    chabad: { name: 'Chabad at UCLA', url: 'https://chabadatucla.org', address: '920 Hilgard Ave, Los Angeles, CA 90024' },
    nearbySpaces: ['Sinai Temple (1.2 mi)', 'University Synagogue (0.8 mi)', 'Beth Jacob Congregation (2.1 mi)'],
    jewishStudentEstimate: 3500,
    jewishLifeNotes: 'UCLA has one of the largest Jewish student populations in the US. Hillel at UCLA is a major hub, and Chabad at UCLA runs Shabbat dinners, holiday programming, and a popular cafe. The Pico-Robertson neighborhood, 4 miles south, is the heart of LA kosher dining.',
    hasDemoData: true,
  },
  {
    id: 'campus-usc',
    name: 'USC',
    city: 'Los Angeles',
    state: 'CA',
    lat: 34.0224,
    lng: -118.2851,
    hillel: { name: 'Hillel at USC', url: 'https://uscjewish.org' },
    chabad: { name: 'Chabad at USC', url: 'https://chabadatusc.org', address: '3221 S Hoover St, Los Angeles, CA 90007' },
    nearbySpaces: ['Wilshire Blvd Temple (3 mi)', 'IKAR (3.5 mi)'],
    jewishStudentEstimate: 2000,
    jewishLifeNotes: 'USC Hillel is one of the most active student Jewish organizations on the West Coast. Chabad at USC hosts large Shabbat dinners weekly. USC became a focal point of campus antisemitism concerns in spring 2024.',
    hasDemoData: true,
  },
  {
    id: 'campus-columbia',
    name: 'Columbia University',
    city: 'New York',
    state: 'NY',
    lat: 40.8075,
    lng: -73.9626,
    hillel: { name: 'Columbia/Barnard Hillel', url: 'https://columbiahillel.org' },
    chabad: { name: 'Columbia Chabad', url: 'https://columbiachabad.org', address: '2839 Broadway, New York, NY 10025' },
    nearbySpaces: ["B'nai Jeshurun (3 mi)", 'Jewish Theological Seminary (adjacent)'],
    jewishStudentEstimate: 3000,
    jewishLifeNotes: 'Columbia has one of the oldest Jewish communities in American higher education. The Jewish Theological Seminary is adjacent to campus. Columbia made international news in spring 2024 when its encampment led Hillel to advise Jewish students to shelter in place.',
    hasDemoData: false,
  },
  {
    id: 'campus-nyu',
    name: 'NYU',
    city: 'New York',
    state: 'NY',
    lat: 40.7295,
    lng: -73.9965,
    hillel: { name: 'NYU Bronfman Center / Hillel', url: 'https://nyuhillel.org' },
    chabad: { name: 'Chabad at NYU', url: 'https://chabadatnyu.com', address: '80 Washington Square E, New York, NY 10003' },
    nearbySpaces: ['Temple Emanu-El (3 mi)', 'Village Synagogue (0.5 mi)'],
    jewishStudentEstimate: 5000,
    jewishLifeNotes: 'NYU has the largest Jewish student enrollment of any university in the US. The Bronfman Center is a major Jewish cultural hub in Greenwich Village. Chabad at NYU is one of the busiest campus Chabads in the world.',
    hasDemoData: false,
  },
  {
    id: 'campus-harvard',
    name: 'Harvard University',
    city: 'Cambridge',
    state: 'MA',
    lat: 42.3770,
    lng: -71.1167,
    hillel: { name: 'Harvard Hillel', url: 'https://hillel.harvard.edu' },
    chabad: { name: 'Harvard Chabad', url: 'https://harvardchabad.org', address: '7 Harvard St, Cambridge, MA 02139' },
    nearbySpaces: ['Temple Israel of Boston (4 mi)', 'Brookline Jewish community (5 mi)'],
    jewishStudentEstimate: 1800,
    jewishLifeNotes: 'Harvard Hillel operates in the Rosovsky Hall Jewish Center. Harvard made news in October 2023 when student groups signed a statement blaming Israel before facts were established. Harvard-Chabad runs large Shabbat dinners in Cambridge.',
    hasDemoData: false,
  },
  {
    id: 'campus-upenn',
    name: 'University of Pennsylvania',
    city: 'Philadelphia',
    state: 'PA',
    lat: 39.9522,
    lng: -75.1932,
    hillel: { name: 'Penn Hillel', url: 'https://pennhillel.org' },
    chabad: { name: 'Chabad at Penn', url: 'https://chabadatpenn.com', address: '3942 Spruce St, Philadelphia, PA 19104' },
    nearbySpaces: ['Congregation Mikveh Israel (3 mi)', 'Beth Zion-Beth Israel (4 mi)'],
    jewishStudentEstimate: 3000,
    jewishLifeNotes: "Penn has a large Jewish student population and an active Hillel. The campus saw significant protest activity after Oct 7, including encampments in spring 2024. The famous Penn Book Signing controversy (2024) involved antisemitic incidents.",
    hasDemoData: false,
  },
  {
    id: 'campus-cornell',
    name: 'Cornell University',
    city: 'Ithaca',
    state: 'NY',
    lat: 42.4534,
    lng: -76.4735,
    hillel: { name: 'Hillel at Cornell', url: 'https://cornellhillel.org' },
    chabad: { name: 'Chabad at Cornell', url: 'https://chabadatcornell.com', address: '106 Hoy Rd, Ithaca, NY 14850' },
    nearbySpaces: ['Ithaca is small — Hillel and Chabad are the main Jewish spaces on campus'],
    jewishStudentEstimate: 2500,
    jewishLifeNotes: "Cornell Hillel is very active. In October 2023, Cornell made national news when a student posted anonymous threats to \"shoot\" and \"slit the throats\" of Jewish students in a campus dining hall — he was arrested and charged. Cornell's Jewish community responded with increased security and solidarity events.",
    hasDemoData: false,
  },
  {
    id: 'campus-stanford',
    name: 'Stanford University',
    city: 'Palo Alto',
    state: 'CA',
    lat: 37.4275,
    lng: -122.1697,
    hillel: { name: 'Stanford Hillel', url: 'https://stanfordhillel.org' },
    chabad: { name: 'Chabad at Stanford', url: 'https://chabadatstanford.com', address: '565 Mayfield Ave, Stanford, CA 94305' },
    nearbySpaces: ['Congregation Beth Am (5 mi)', 'Peninsula Jewish Community Center (7 mi)'],
    jewishStudentEstimate: 1200,
    jewishLifeNotes: 'Stanford Hillel hosts large Shabbat dinners. Stanford saw protests and incidents in spring 2024. A Stanford professor made headlines for alleged antisemitic statements during classroom discussions about Oct 7.',
    hasDemoData: false,
  },
  {
    id: 'campus-berkeley',
    name: 'UC Berkeley',
    city: 'Berkeley',
    state: 'CA',
    lat: 37.8719,
    lng: -122.2585,
    hillel: { name: 'Bingham Hillel at Berkeley', url: 'https://binghamhillel.org' },
    chabad: { name: 'Chabad at Berkeley', url: 'https://chabadatberkeley.com', address: '2119 Piedmont Ave, Berkeley, CA 94704' },
    nearbySpaces: ['Congregation Beth Israel (0.5 mi)', 'Chochmat HaLev (1 mi)'],
    jewishStudentEstimate: 3500,
    jewishLifeNotes: 'Berkeley Hillel is one of the largest in the country. Cal has historically been a hotspot for Israel-related campus conflict. Post-Oct 7, Jewish students reported significant hostility and filed complaints with the university. Bingham Hillel provides a major safe space on campus.',
    hasDemoData: false,
  },
  {
    id: 'campus-michigan',
    name: 'University of Michigan',
    city: 'Ann Arbor',
    state: 'MI',
    lat: 42.2780,
    lng: -83.7382,
    hillel: { name: 'Hillel at Michigan', url: 'https://hillel.umich.edu' },
    chabad: { name: 'Chabad House at Michigan', url: 'https://chabadatmichigan.com', address: '715 Hill St, Ann Arbor, MI 48104' },
    nearbySpaces: ['Beth Israel Congregation (0.5 mi)', 'Congregation Etz Chaim (2 mi)'],
    jewishStudentEstimate: 4000,
    jewishLifeNotes: 'Michigan has one of the largest Jewish student populations in the Midwest. The Michigan Hillel building is one of the largest purpose-built Hillels in the world. Ann Arbor has a significant Jewish community that supports campus Jewish life.',
    hasDemoData: false,
  },
  {
    id: 'campus-ohio-state',
    name: 'Ohio State University',
    city: 'Columbus',
    state: 'OH',
    lat: 40.0076,
    lng: -83.0300,
    hillel: { name: 'Hillel at Ohio State', url: 'https://hillel.osu.edu' },
    chabad: { name: 'Chabad at OSU', url: 'https://chabadatosu.com', address: '43 E 11th Ave, Columbus, OH 43201' },
    nearbySpaces: ['Agudas Achim Congregation (1 mi)', 'Beth Tikvah (2 mi)'],
    jewishStudentEstimate: 2000,
    jewishLifeNotes: 'OSU Hillel is a thriving center for Jewish campus life in the Midwest. Columbus has a growing Jewish community with a strong campus-community connection. Jewish Greek life is also significant at OSU.',
    hasDemoData: false,
  },
  {
    id: 'campus-northwestern',
    name: 'Northwestern University',
    city: 'Evanston',
    state: 'IL',
    lat: 42.0565,
    lng: -87.6753,
    hillel: { name: 'Northwestern Hillel', url: 'https://northwesternhillel.org' },
    chabad: { name: 'Chabad at Northwestern', url: 'https://chabadatnorthwestern.com', address: '1561 Maple Ave, Evanston, IL 60201' },
    nearbySpaces: ['North Shore Congregation Israel (4 mi)', 'Evanston Jewish community strong'],
    jewishStudentEstimate: 1500,
    jewishLifeNotes: 'Northwestern has a sizable Jewish community and active Hillel. Evanston itself has a strong Jewish community. Northwestern faced protests and an encampment in spring 2024 that led to negotiations with Jewish community representatives.',
    hasDemoData: false,
  },
  {
    id: 'campus-bu',
    name: 'Boston University',
    city: 'Boston',
    state: 'MA',
    lat: 42.3505,
    lng: -71.1054,
    hillel: { name: 'BU Hillel', url: 'https://buhillel.org' },
    chabad: { name: 'Chabad at BU', url: 'https://chabadatbu.com', address: '226 Bay State Rd, Boston, MA 02215' },
    nearbySpaces: ['Temple Ohabei Shalom (0.5 mi)', 'Chestnut Hill Jewish community (3 mi)'],
    jewishStudentEstimate: 3000,
    jewishLifeNotes: 'BU has a large and active Jewish community. BU Hillel is located right on Commonwealth Avenue. Brookline, adjacent to BU, is home to a major Orthodox Jewish community. Post-Oct 7 BU saw significant protest activity.',
    hasDemoData: false,
  },
  {
    id: 'campus-brandeis',
    name: 'Brandeis University',
    city: 'Waltham',
    state: 'MA',
    lat: 42.3657,
    lng: -71.2586,
    hillel: { name: 'Brandeis Hillel', url: 'https://www.brandeis.edu/jewish-chaplaincy' },
    chabad: { name: 'Chabad at Brandeis', url: 'https://jewishwaltham.com', address: 'Waltham, MA' },
    nearbySpaces: ['Temple Shalom (1 mi)', 'Waltham Jewish community'],
    jewishStudentEstimate: 2200,
    jewishLifeNotes: 'Brandeis was founded in 1948 as a Jewish-sponsored nonsectarian university. It has the highest percentage of Jewish students of any major research university (~50%). Kosher dining is a major focus on campus. Brandeis is unique in having Jewish identity as part of its institutional DNA.',
    hasDemoData: false,
  },
  {
    id: 'campus-gwu',
    name: 'George Washington University',
    city: 'Washington',
    state: 'DC',
    lat: 38.8997,
    lng: -77.0480,
    hillel: { name: 'GWU Hillel', url: 'https://gwuhillel.org' },
    chabad: { name: 'GW Chabad', url: 'https://chabadatgw.org', address: '2121 H St NW, Washington, DC 20052' },
    nearbySpaces: ['Sixth & I Synagogue (3 mi)', 'Washington Hebrew Congregation (4 mi)'],
    jewishStudentEstimate: 2000,
    jewishLifeNotes: 'GWU has a very large Jewish student community given its DC location. Many Jewish students interested in government and policy choose GWU. GWU Hillel is centrally located. DC provides access to Holocaust Memorial Museum and numerous Jewish organizations.',
    hasDemoData: false,
  },
  {
    id: 'campus-maryland',
    name: 'University of Maryland',
    city: 'College Park',
    state: 'MD',
    lat: 38.9869,
    lng: -76.9426,
    hillel: { name: 'Hillel at Maryland', url: 'https://hillelmd.org' },
    chabad: { name: 'Chabad at UMD', url: 'https://chabadatumd.com', address: '7403 Hopkins Ave, College Park, MD 20740' },
    nearbySpaces: ['Adas Israel Congregation DC (8 mi)', 'Beth Shalom (3 mi)'],
    jewishStudentEstimate: 7000,
    jewishLifeNotes: "UMD has one of the largest Jewish student populations in the country by total number (~7,000). The Resnick Hillel Center is one of the largest Hillel buildings in the world at 53,000 sq ft. Maryland's proximity to large suburban Jewish communities in Montgomery County drives this population.",
    hasDemoData: false,
  },
  {
    id: 'campus-florida',
    name: 'University of Florida',
    city: 'Gainesville',
    state: 'FL',
    lat: 29.6436,
    lng: -82.3549,
    hillel: { name: 'Florida Hillel', url: 'https://floridahillel.org' },
    chabad: { name: 'Chabad at UF', url: 'https://chabadatuf.com', address: '16 SW 13th St, Gainesville, FL 32601' },
    nearbySpaces: ["Congregation B'nai Israel (1 mi)"],
    jewishStudentEstimate: 3000,
    jewishLifeNotes: 'UF has a large and growing Jewish community. Florida Hillel is very active with strong Greek life Jewish community overlap. Gainesville\'s Jewish community is small but supportive. Florida draws many Jewish students from South Florida.',
    hasDemoData: false,
  },
  {
    id: 'campus-tulane',
    name: 'Tulane University',
    city: 'New Orleans',
    state: 'LA',
    lat: 29.9384,
    lng: -90.1199,
    hillel: { name: 'Tulane Hillel', url: 'https://tulanehillel.org' },
    chabad: { name: 'Chabad at Tulane', url: 'https://chabadattulane.com', address: '912 Broadway St, New Orleans, LA 70118' },
    nearbySpaces: ['Touro Synagogue (2 mi)', 'Beth Israel (3 mi)'],
    jewishStudentEstimate: 2500,
    jewishLifeNotes: "Tulane has one of the highest percentages of Jewish students outside the Northeast. New Orleans has an old and historic Jewish community. Tulane Jewish students are deeply embedded in the city's social life. Mardi Gras and Jewish holiday overlap creates unique programming challenges.",
    hasDemoData: false,
  },
  {
    id: 'campus-cal-state-la',
    name: 'Cal State LA',
    city: 'Los Angeles',
    state: 'CA',
    lat: 34.0686,
    lng: -118.1687,
    hillel: null,
    chabad: null,
    nearbySpaces: ['Wilshire Blvd Temple (6 mi)'],
    jewishStudentEstimate: 200,
    jewishLifeNotes: 'Cal State LA has a small Jewish student community with limited on-campus Jewish infrastructure. Students interested in Jewish life typically connect with resources in other parts of LA.',
    hasDemoData: true,
  },
  {
    id: 'campus-george-mason',
    name: 'George Mason University',
    city: 'Fairfax',
    state: 'VA',
    lat: 38.8316,
    lng: -77.3119,
    hillel: { name: 'Mason Hillel', url: null },
    chabad: { name: 'Chabad at Mason', url: null, address: 'Fairfax, VA' },
    nearbySpaces: ['Beth El Hebrew Congregation (3 mi)'],
    jewishStudentEstimate: 500,
    jewishLifeNotes: 'GMU has a smaller but growing Jewish student community. Northern Virginia has significant Jewish suburbs that support campus Jewish life.',
    hasDemoData: false,
  },
  {
    id: 'campus-american',
    name: 'American University',
    city: 'Washington',
    state: 'DC',
    lat: 38.9376,
    lng: -77.0871,
    hillel: { name: 'AU Hillel', url: null },
    chabad: { name: 'Chabad at AU', url: null, address: 'Washington, DC' },
    nearbySpaces: ['Washington Hebrew Congregation (3 mi)', 'Adas Israel (4 mi)'],
    jewishStudentEstimate: 1800,
    jewishLifeNotes: 'AU has a large Jewish enrollment for its size. The DC location gives Jewish students access to the many Jewish organizations, the Holocaust Museum, and Israel policy community in Washington.',
    hasDemoData: false,
  },
  {
    id: 'campus-umd-baltimore',
    name: 'University of Maryland, Baltimore County',
    city: 'Baltimore',
    state: 'MD',
    lat: 39.2557,
    lng: -76.7101,
    hillel: { name: 'UMBC Hillel', url: null },
    chabad: null,
    nearbySpaces: ['Baltimore Jewish community (10 mi)', 'Park Heights neighborhood'],
    jewishStudentEstimate: 400,
    jewishLifeNotes: 'UMBC has a small Jewish student population. Baltimore has a major Jewish community (particularly in Pikesville and Owings Mills) that UMBC students can connect with.',
    hasDemoData: false,
  },
];

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white border border-cream-200 rounded-lg px-4 py-3">
      <p className="font-serif text-xl font-bold text-navy-800 leading-none mb-0.5">{value}</p>
      <p className="font-sans text-xs text-gray-500 uppercase tracking-wide">{label}</p>
    </div>
  );
}

function CampusSearch({
  onSelect,
  selected,
  onClear,
}: {
  onSelect: (id: string) => void;
  selected: Campus | null;
  onClear: () => void;
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return CAMPUSES;
    const q = query.toLowerCase();
    return CAMPUSES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q)
    );
  }, [query]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleSelect(id: string) {
    onSelect(id);
    setQuery('');
    setOpen(false);
    inputRef.current?.blur();
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      {selected ? (
        /* Selected pill */
        <div className="flex items-center gap-2 bg-navy-700 text-white rounded-lg px-4 py-2.5 w-full">
          <span className="font-sans text-sm font-semibold flex-1 truncate">
            {selected.name}
            <span className="ml-1.5 font-normal text-white/60 text-xs">
              {selected.city}, {selected.state}
            </span>
          </span>
          <button
            onClick={onClear}
            aria-label="Clear campus selection"
            className="flex-none w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2 2l6 6M8 2l-6 6" />
            </svg>
          </button>
        </div>
      ) : (
        /* Search input */
        <>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="9" cy="9" r="6" />
              <path d="M15 15l3 3" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              placeholder="Search by campus, city, or state…"
              className="w-full pl-9 pr-4 py-2.5 font-sans text-sm bg-white border border-cream-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
            />
          </div>

          {open && (
            <ul
              ref={listRef}
              className="absolute z-50 left-0 right-0 mt-1 bg-white border border-cream-200 rounded-lg shadow-lg overflow-y-auto"
              style={{ maxHeight: '17rem' }}
              role="listbox"
            >
              {filtered.length === 0 ? (
                <li className="px-4 py-3 font-sans text-sm text-gray-400">No campuses found</li>
              ) : (
                filtered.map((c) => (
                  <li key={c.id} role="option" aria-selected={false}>
                    <button
                      onMouseDown={() => handleSelect(c.id)}
                      className="w-full text-left px-4 py-2.5 hover:bg-cream-50 transition-colors group"
                    >
                      <span className="font-sans text-sm font-semibold text-navy-800 group-hover:text-navy-900">
                        {c.name}
                      </span>
                      <span className="ml-2 font-sans text-xs text-gray-400">
                        {c.city}, {c.state}
                      </span>
                      {c.hasDemoData && (
                        <span className="ml-2 inline-block text-xs font-sans font-medium bg-gold-100 text-gold-700 px-1.5 py-0.5 rounded">
                          data available
                        </span>
                      )}
                    </button>
                  </li>
                ))
              )}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default function CampusPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const campus = selectedId ? (CAMPUSES.find((c) => c.id === selectedId) ?? null) : null;

  useEffect(() => {
    document.title = campus
      ? `SafeJew — ${campus.name} Campus Tool`
      : 'SafeJew — Campus Jewish Community Tool';
  }, [campus]);

  const campusIncidents = useMemo(
    () => (campus ? DEMO_INCIDENTS.filter((inc) => inc.campus_id === campus.id) : []),
    [campus]
  );

  const totalIncidents = campusIncidents.length;

  const mostCommonCategory = useMemo((): string => {
    if (!campusIncidents.length) return 'None';
    const counts: Partial<Record<IncidentCategory, number>> = {};
    for (const inc of campusIncidents) {
      counts[inc.category] = (counts[inc.category] ?? 0) + 1;
    }
    const top = (Object.entries(counts) as [IncidentCategory, number][]).sort(
      (a, b) => b[1] - a[1]
    )[0];
    return CATEGORY_LABELS[top[0]];
  }, [campusIncidents]);

  const highSeverityCount = useMemo(
    () => campusIncidents.filter((inc) => inc.severity === 'high').length,
    [campusIncidents]
  );

  const showMap = campus?.hasDemoData === true;

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 pt-28 pb-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold-400 mb-3">
            Free Campus Tool
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Jewish community on campus
          </h1>
          <p className="font-sans text-base text-white/65 max-w-xl leading-relaxed mb-8">
            Antisemitism incidents, nearby synagogues, Chabad houses, and Jewish community
            resources — by campus. No account, no sign-up.
          </p>

          {/* Search embedded in hero */}
          <CampusSearch
            onSelect={setSelectedId}
            selected={campus}
            onClear={() => setSelectedId(null)}
          />
        </div>
      </section>

      {/* Main content — only shown when a campus is selected */}
      {campus ? (
        <section className="bg-cream-50 py-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Campus header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl font-bold text-navy-800">{campus.name}</h2>
                <p className="font-sans text-sm text-gray-500">
                  {campus.city}, {campus.state}
                </p>
                {campus.jewishStudentEstimate !== null && (
                  <p className="font-sans text-xs text-gray-400 mt-1">
                    ~{campus.jewishStudentEstimate.toLocaleString()} estimated Jewish students
                  </p>
                )}
              </div>
              {campus.hasDemoData && (
                <span className="inline-flex items-center gap-1 self-start sm:self-auto bg-gold-100 text-gold-700 font-sans text-xs font-semibold px-3 py-1 rounded-full border border-gold-200">
                  <svg viewBox="0 0 10 10" className="w-2 h-2 fill-current"><circle cx="5" cy="5" r="4" /></svg>
                  Incident data available
                </span>
              )}
            </div>

            {/* Incident tracking section */}
            {campus.hasDemoData ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                  <StatPill value={String(totalIncidents)} label="Incidents tracked" />
                  <StatPill value={mostCommonCategory} label="Most common" />
                  <StatPill value={`${highSeverityCount}`} label="High severity" />
                </div>

                {showMap && (
                  <>
                    <div className="mb-3">
                      <CampusMap
                        campusId={campus.id}
                        campusLat={campus.lat}
                        campusLng={campus.lng}
                        campusName={campus.name}
                      />
                    </div>
                    <p className="font-sans text-xs text-gray-400 mb-10">
                      Incident locations are neighborhood-level only. Exact addresses are never stored.
                    </p>
                  </>
                )}
              </>
            ) : (
              /* Coming soon notice */
              <div className="mb-8 bg-white border border-cream-200 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <p className="font-sans text-sm font-semibold text-navy-800 mb-1">
                    Incident tracking for {campus.name} coming soon
                  </p>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">
                    We don&apos;t yet have verified incident data for this campus. Report an
                    incident to help build this dataset and protect students here.
                  </p>
                </div>
                <Link
                  href="/report"
                  className="flex-none inline-flex items-center justify-center bg-gold-500 text-white px-5 py-2.5 rounded font-sans font-semibold text-sm hover:bg-gold-600 transition-colors"
                >
                  Report an Incident
                </Link>
              </div>
            )}

            {/* Jewish life notes */}
            <div className="mb-8 bg-white border border-cream-200 rounded-lg p-5">
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">
                Jewish Life at {campus.name}
              </p>
              <p className="font-sans text-sm text-gray-700 leading-relaxed">
                {campus.jewishLifeNotes}
              </p>
            </div>

            {/* Community spaces grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* Hillel */}
              <div className="bg-white border border-cream-200 rounded-lg p-5">
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">
                  Hillel
                </p>
                {campus.hillel ? (
                  <>
                    <h3 className="font-sans font-semibold text-navy-800 mb-1">
                      {campus.hillel.name}
                    </h3>
                    {campus.hillel.url ? (
                      <a
                        href={campus.hillel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-sm text-navy-600 hover:text-navy-800 underline"
                      >
                        {campus.hillel.url.replace('https://', '')}
                      </a>
                    ) : (
                      <p className="font-sans text-sm text-gray-500">Website not on record</p>
                    )}
                  </>
                ) : (
                  <>
                    <h3 className="font-sans font-semibold text-navy-800 mb-1">
                      Hillel at {campus.name}
                    </h3>
                    <p className="font-sans text-sm text-gray-500">No Hillel chapter on record</p>
                  </>
                )}
              </div>

              {/* Chabad */}
              <div className="bg-white border border-cream-200 rounded-lg p-5">
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">
                  Chabad
                </p>
                {campus.chabad ? (
                  <>
                    <h3 className="font-sans font-semibold text-navy-800 mb-1">
                      {campus.chabad.name}
                    </h3>
                    {campus.chabad.address && (
                      <p className="font-sans text-xs text-gray-500 mb-1">{campus.chabad.address}</p>
                    )}
                    {campus.chabad.url ? (
                      <a
                        href={campus.chabad.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-sm text-navy-600 hover:text-navy-800 underline"
                      >
                        {campus.chabad.url.replace('https://', '')}
                      </a>
                    ) : (
                      <p className="font-sans text-sm text-gray-500">Website not on record</p>
                    )}
                  </>
                ) : (
                  <>
                    <h3 className="font-sans font-semibold text-navy-800 mb-1">
                      Chabad at {campus.name}
                    </h3>
                    <p className="font-sans text-sm text-gray-500">No Chabad house on record</p>
                  </>
                )}
              </div>

              {/* Nearby spaces */}
              <div className="bg-white border border-cream-200 rounded-lg p-5 md:col-span-2">
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">
                  Nearby Synagogues &amp; Jewish Institutions
                </p>
                <ul className="space-y-1">
                  {campus.nearbySpaces.map((s) => (
                    <li key={s} className="font-sans text-sm text-gray-700">
                      {s}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/map"
                  className="inline-block mt-3 font-sans text-xs text-navy-600 hover:text-navy-800 underline"
                >
                  See all community spaces on the map
                </Link>
              </div>
            </div>

            <div className="mt-10 bg-cream-100 border border-cream-200 rounded-lg p-5">
              <p className="font-sans text-xs text-gray-500 leading-relaxed">
                This tool provides publicly available community information. Incident data is from
                verified community reports and published sources. SafeJew does not assess or
                guarantee the safety of any location listed here.
              </p>
            </div>
          </div>
        </section>
      ) : (
        /* No campus selected — show browse prompt */
        <section className="bg-cream-50 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-sans text-gray-500 text-sm mb-2">
              Search for your campus above to see incident data and community resources.
            </p>
            <p className="font-sans text-xs text-gray-400">
              Covering {CAMPUSES.length} campuses — more being added regularly.
            </p>

            {/* Quick-pick chips for a few well-known campuses */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {CAMPUSES.filter((c) => c.hasDemoData || ['campus-columbia', 'campus-harvard', 'campus-nyu', 'campus-michigan', 'campus-brandeis'].includes(c.id)).map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  className="font-sans text-sm px-4 py-2 rounded-full border border-cream-200 text-gray-600 bg-white hover:border-navy-300 hover:text-navy-700 transition-colors"
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Report CTA */}
      <section className="bg-navy-800 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-sans text-white/70 text-sm mb-5 leading-relaxed">
            {campus
              ? `Experienced or witnessed something at ${campus.name}? Reports help build the data record that protects other students.`
              : 'Experienced antisemitism on campus? Reports help build the data record that protects other students.'}
          </p>
          <Link
            href="/report"
            className="inline-flex items-center justify-center bg-gold-500 text-white px-7 py-3 rounded font-sans font-semibold text-sm hover:bg-gold-600 transition-colors"
          >
            Report an Incident
          </Link>
        </div>
      </section>
    </>
  );
}
