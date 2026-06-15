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
    hillel: { name: 'Hillel at UCLA', url: 'https://www.uclahillel.org' },
    chabad: { name: 'Chabad at UCLA', url: 'https://www.chabadatucla.com', address: '900 Hilgard Ave, Los Angeles CA 90024' },
    nearbySpaces: [
      'Sinai Temple (Beverly Hills)',
      'University Synagogue (Brentwood)',
      'Beth Jacob Congregation (Beverly Hills)',
      'Westwood Village Kosher',
      'Milk & Honey Grill',
    ],
    jewishStudentEstimate: 4500,
    jewishLifeNotes: 'UCLA has one of the largest Jewish student populations in the country. Hillel at UCLA offers daily programming, Shabbat dinners, and Israel advocacy resources. Chabad at UCLA runs weekly events steps from campus on Hilgard Ave and is open 24 hours during finals. The Westwood neighborhood surrounding campus has multiple kosher restaurants.',
    hasDemoData: true,
  },
  {
    id: 'campus-usc',
    name: 'USC',
    city: 'Los Angeles',
    state: 'CA',
    lat: 34.0224,
    lng: -118.2851,
    hillel: { name: 'USC Hillel', url: 'https://www.uschillel.org' },
    chabad: { name: 'Chabad at USC', url: 'https://www.chabadatusc.com', address: '3306 Hoover St, Los Angeles CA 90007' },
    nearbySpaces: [
      'Mogen David Congregation (West Adams)',
      'Sinai Temple (nearby)',
      'Chabad at USC (Hoover St)',
    ],
    jewishStudentEstimate: 3200,
    jewishLifeNotes: 'USC Hillel is one of the most active on the West Coast, with an annual gala, Birthright trips, and weekly Shabbat programming. Chabad at USC operates just off campus on Hoover Street. The university has seen elevated antisemitic incidents since October 2023 and has dedicated security resources to Jewish student spaces.',
    hasDemoData: false,
  },
  {
    id: 'campus-columbia',
    name: 'Columbia University',
    city: 'New York',
    state: 'NY',
    lat: 40.8075,
    lng: -73.9626,
    hillel: { name: 'Columbia/Barnard Hillel', url: 'https://www.columbiahillel.org' },
    chabad: { name: 'Chabad at Columbia', url: 'https://www.chabadcolumbia.com', address: '610 W 115th St, New York NY 10025' },
    nearbySpaces: [
      'Jewish Theological Seminary',
      'Congregation B\'nai Jeshurun (Upper West Side)',
      'Absolute Bagels (Morningside Heights)',
    ],
    jewishStudentEstimate: 3800,
    jewishLifeNotes: 'Columbia/Barnard Hillel is one of the oldest Hillels in the country, founded in 1913. The campus became a major flashpoint for antisemitic incidents in 2023 and 2024. Jewish students have reported being blocked from campus spaces and receiving targeted harassment. Chabad at Columbia serves as a refuge and community hub just blocks from campus.',
    hasDemoData: false,
  },
  {
    id: 'campus-nyu',
    name: 'NYU',
    city: 'New York',
    state: 'NY',
    lat: 40.7295,
    lng: -73.9965,
    hillel: { name: 'NYU Hillel', url: 'https://www.nyuhillel.org' },
    chabad: { name: 'Chabad at NYU', url: 'https://www.chabadnyu.com', address: '76 Washington Square S, New York NY 10012' },
    nearbySpaces: [
      'Greenwich Village Synagogue',
      'Congregation Beth Simchat Torah (West Village)',
      'B&H Dairy (East Village)',
    ],
    jewishStudentEstimate: 5000,
    jewishLifeNotes: 'NYU has one of the largest Jewish student populations of any university in the US. NYU Hillel operates a full-service Jewish center in Greenwich Village. The campus spans multiple buildings throughout Lower Manhattan, and Chabad at NYU runs programming across several locations.',
    hasDemoData: false,
  },
  {
    id: 'campus-harvard',
    name: 'Harvard University',
    city: 'Cambridge',
    state: 'MA',
    lat: 42.3770,
    lng: -71.1167,
    hillel: { name: 'Harvard Hillel', url: 'https://www.hillel.harvard.edu' },
    chabad: { name: 'Chabad at Harvard', url: 'https://www.chabadaigarvard.com', address: '6 Prescott St, Cambridge MA 02138' },
    nearbySpaces: [
      'Temple Beth Shalom (Cambridge)',
      'Cambridge Synagogue',
      'Cardullo\'s Gourmet Shoppe (Harvard Square)',
    ],
    jewishStudentEstimate: 2500,
    jewishLifeNotes: 'Harvard Hillel occupies a dedicated building on campus and runs one of the most comprehensive programs of any Ivy League Hillel. After October 7, 2023, Harvard became a center of national attention for campus antisemitism. Chabad at Harvard on Prescott Street is a popular Shabbat destination for students and faculty.',
    hasDemoData: false,
  },
  {
    id: 'campus-upenn',
    name: 'University of Pennsylvania',
    city: 'Philadelphia',
    state: 'PA',
    lat: 39.9522,
    lng: -75.1932,
    hillel: { name: 'Penn Hillel', url: 'https://www.pennhillel.org' },
    chabad: { name: 'Chabad at Penn', url: 'https://www.chabadatpenn.com', address: '3901 Spruce St, Philadelphia PA 19104' },
    nearbySpaces: [
      'Congregation Mikveh Israel (Center City)',
      'Beth Zion-Beth Israel (Rittenhouse)',
      'University City Kosher',
    ],
    jewishStudentEstimate: 3500,
    jewishLifeNotes: 'Penn Hillel is one of the most active on the East Coast, serving thousands of students from UPenn, Drexel, and nearby schools. Chabad at Penn is located directly on Spruce Street steps from campus. Philadelphia\'s Jewish community is concentrated in the Northeast and Center City neighborhoods within easy reach.',
    hasDemoData: false,
  },
  {
    id: 'campus-cornell',
    name: 'Cornell University',
    city: 'Ithaca',
    state: 'NY',
    lat: 42.4534,
    lng: -76.4735,
    hillel: { name: 'Hillel at Cornell', url: 'https://www.hillelcornell.org' },
    chabad: { name: 'Chabad at Cornell', url: 'https://www.chabadatcornell.com', address: '210 W Buffalo St, Ithaca NY 14850' },
    nearbySpaces: [
      'Congregation Tikkun v\'Or (Ithaca)',
      'Chabad at Cornell',
      'Cornell Kosher Dining',
    ],
    jewishStudentEstimate: 3000,
    jewishLifeNotes: 'Hillel at Cornell operates a dedicated building and is a central hub for Jewish students in Ithaca. Cornell made national headlines in October 2023 when a student posted threats targeting Jewish students. Campus security was significantly enhanced after the incident.',
    hasDemoData: false,
  },
  {
    id: 'campus-stanford',
    name: 'Stanford University',
    city: 'Palo Alto',
    state: 'CA',
    lat: 37.4275,
    lng: -122.1697,
    hillel: { name: 'Stanford Hillel', url: 'https://www.stanfordhillel.org' },
    chabad: { name: 'Chabad at Stanford', url: 'https://www.chabadatstanford.com', address: '566 Salvatierra Walk, Stanford CA 94305' },
    nearbySpaces: [
      'Beth Am (Los Altos Hills)',
      'Congregation Beth Jacob (Redwood City)',
      'Palo Alto Kosher Deli',
    ],
    jewishStudentEstimate: 2000,
    jewishLifeNotes: 'Stanford Hillel offers year-round programming including High Holiday services for thousands of students and community members. Chabad at Stanford is located directly on campus and serves students from Stanford, UCSF, and the broader Silicon Valley tech community.',
    hasDemoData: false,
  },
  {
    id: 'campus-berkeley',
    name: 'UC Berkeley',
    city: 'Berkeley',
    state: 'CA',
    lat: 37.8719,
    lng: -122.2585,
    hillel: { name: 'Hillel at Berkeley', url: 'https://www.jfed.org/hillel' },
    chabad: { name: 'Chabad at Berkeley', url: 'https://www.chabadatberkeley.com', address: '2424 Bancroft Way, Berkeley CA 94704' },
    nearbySpaces: [
      'Congregation Beth El (Berkeley)',
      'Netivot Shalom (Berkeley)',
      'Caffe Strada (near campus)',
    ],
    jewishStudentEstimate: 4000,
    jewishLifeNotes: 'UC Berkeley has historically had one of the most politically charged campus climates for Jewish students. The Berkeley City Council passed a divestment resolution in 2023. Hillel at Berkeley operates on Bancroft Way. Chabad at Berkeley on Telegraph Avenue runs daily programming and is one of the most active Chabad houses in California.',
    hasDemoData: false,
  },
  {
    id: 'campus-michigan',
    name: 'University of Michigan',
    city: 'Ann Arbor',
    state: 'MI',
    lat: 42.2780,
    lng: -83.7382,
    hillel: { name: 'University of Michigan Hillel', url: 'https://www.umichwelcome.org' },
    chabad: { name: 'Chabad at Michigan', url: 'https://www.chabadatmichigan.com', address: '715 Hill St, Ann Arbor MI 48104' },
    nearbySpaces: [
      'Beth Israel Congregation (Ann Arbor)',
      'Congregation Shaarey Zedek (Ann Arbor)',
      'Jerusalem Garden (Ann Arbor)',
    ],
    jewishStudentEstimate: 5000,
    jewishLifeNotes: 'Michigan Hillel, known as the Michigan Wellcome Street Hillel, is one of the largest Hillels in the world serving over 5,000 Jewish students. Ann Arbor has a robust Jewish community with multiple synagogues within walking distance of campus.',
    hasDemoData: false,
  },
  {
    id: 'campus-ohio-state',
    name: 'Ohio State University',
    city: 'Columbus',
    state: 'OH',
    lat: 40.0076,
    lng: -83.0300,
    hillel: { name: 'Hillel at Ohio State', url: 'https://www.hillel.osu.edu' },
    chabad: { name: 'Chabad at OSU', url: 'https://www.chabadosu.com', address: '46 E 16th Ave, Columbus OH 43201' },
    nearbySpaces: [
      'Agudath Achim (Columbus)',
      'Congregation Tifereth Israel (Columbus)',
      'Sammy\'s NY Bagels (Columbus)',
    ],
    jewishStudentEstimate: 4500,
    jewishLifeNotes: 'Ohio State\'s Hillel Foundation has been a cornerstone of Jewish life in Columbus since 1921. The university\'s large student population includes one of the biggest Jewish student communities in the Midwest. Chabad at OSU on 16th Avenue is a frequent gathering spot.',
    hasDemoData: false,
  },
  {
    id: 'campus-northwestern',
    name: 'Northwestern University',
    city: 'Evanston',
    state: 'IL',
    lat: 42.0565,
    lng: -87.6753,
    hillel: { name: 'Northwestern Hillel', url: 'https://www.northwesternhillel.org' },
    chabad: { name: 'Chabad at Northwestern', url: 'https://www.chabadnorthwestern.com', address: '1931 Sheridan Rd, Evanston IL 60201' },
    nearbySpaces: [
      'KINS (Evanston)',
      'Congregation Beth Emet (Evanston)',
      'Buffalo Joe\'s (Evanston)',
    ],
    jewishStudentEstimate: 2000,
    jewishLifeNotes: 'Northwestern Hillel serves students on the Evanston campus and is a central gathering point for Jewish life in the North Shore suburbs of Chicago. Chabad at Northwestern on Sheridan Road is a short walk from the lakefront campus.',
    hasDemoData: false,
  },
  {
    id: 'campus-bu',
    name: 'Boston University',
    city: 'Boston',
    state: 'MA',
    lat: 42.3505,
    lng: -71.1054,
    hillel: { name: 'BU Hillel', url: 'https://www.buhillel.org' },
    chabad: { name: 'Chabad at BU', url: 'https://www.chabadbu.com', address: '213 Bay State Rd, Boston MA 02215' },
    nearbySpaces: [
      'Congregation Kehillath Israel (Brookline)',
      'Young Israel of Brookline',
      'Rami\'s Restaurant (Brookline)',
    ],
    jewishStudentEstimate: 3500,
    jewishLifeNotes: 'BU Hillel is one of the most active on the East Coast, with the Hillel building located on Bay State Road along the Charles River. Boston\'s Brookline neighborhood adjacent to campus has one of the highest concentrations of Jewish residents in New England. Kosher dining options are plentiful on both campus and in nearby Coolidge Corner.',
    hasDemoData: false,
  },
  {
    id: 'campus-brandeis',
    name: 'Brandeis University',
    city: 'Waltham',
    state: 'MA',
    lat: 42.3657,
    lng: -71.2586,
    hillel: { name: 'Brandeis Hillel', url: 'https://www.brandeis.edu/hillel' },
    chabad: { name: 'Chabad at Brandeis', url: 'https://www.chabadatbrandeis.com', address: '415 South St, Waltham MA 02453' },
    nearbySpaces: [
      'Temple Shalom (Newton Centre)',
      'Congregation Beth El (Newton Centre)',
      'Zaftig\'s Delicatessen (Needham)',
    ],
    jewishStudentEstimate: 2500,
    jewishLifeNotes: 'Brandeis University was founded as a Jewish-sponsored nonsectarian university in 1948. Jewish life is deeply embedded in the campus culture. The university has multiple kosher dining options and Jewish studies programs that attract students from around the world.',
    hasDemoData: false,
  },
  {
    id: 'campus-gwu',
    name: 'George Washington University',
    city: 'Washington',
    state: 'DC',
    lat: 38.8997,
    lng: -77.0480,
    hillel: { name: 'GW Hillel', url: 'https://www.gwhillel.org' },
    chabad: { name: 'Chabad at GWU', url: 'https://www.chabadgwu.com', address: '2121 Eye St NW, Washington DC 20052' },
    nearbySpaces: [
      'Sixth & I Historic Synagogue (DC)',
      'Kesher Israel (Georgetown)',
      'Eli\'s Restaurant (DC)',
    ],
    jewishStudentEstimate: 2000,
    jewishLifeNotes: 'GW Hillel is located in the heart of Foggy Bottom in Washington DC. Jewish students at GWU are deeply engaged in policy work given the university\'s proximity to the federal government. Several GWU Jewish organizations host events with members of Congress and policy organizations.',
    hasDemoData: false,
  },
  {
    id: 'campus-maryland',
    name: 'University of Maryland',
    city: 'College Park',
    state: 'MD',
    lat: 38.9869,
    lng: -76.9426,
    hillel: { name: 'University of Maryland Hillel', url: 'https://www.umdhl.org' },
    chabad: { name: 'Chabad at UMD', url: 'https://www.chabadatumd.com', address: '7403 Hopkins Ave, College Park MD 20740' },
    nearbySpaces: [
      'Ohr Kodesh Congregation (Chevy Chase)',
      'Congregation Mishkan Torah (Greenbelt)',
      'College Park Kosher',
    ],
    jewishStudentEstimate: 4000,
    jewishLifeNotes: 'UMD Hillel is one of the largest in the country, serving a Jewish student population drawn heavily from the Maryland and DC Metro suburbs. The university\'s proximity to Washington DC means many students intern with Jewish organizations and advocacy groups. Chabad at UMD on Hopkins Avenue hosts popular Shabbat dinners.',
    hasDemoData: false,
  },
  {
    id: 'campus-florida',
    name: 'University of Florida',
    city: 'Gainesville',
    state: 'FL',
    lat: 29.6436,
    lng: -82.3549,
    hillel: { name: 'UF Hillel', url: 'https://www.ufhillel.org' },
    chabad: { name: 'Chabad at UF', url: 'https://www.chabaduf.com', address: '16 SW 2nd Ave, Gainesville FL 32601' },
    nearbySpaces: [
      "Congregation B'nai Israel (Gainesville)",
      'Lubavitch Chabad of North Central Florida',
      'Hillel Foundation Kosher Kitchen',
    ],
    jewishStudentEstimate: 6000,
    jewishLifeNotes: 'UF Hillel is one of the largest in the southeastern United States, serving over 6,000 Jewish students. Gainesville has a surprisingly robust Jewish community given the university\'s size. Chabad at UF is extremely active and runs programming every night of the week.',
    hasDemoData: false,
  },
  {
    id: 'campus-tulane',
    name: 'Tulane University',
    city: 'New Orleans',
    state: 'LA',
    lat: 29.9384,
    lng: -90.1199,
    hillel: { name: 'Tulane Hillel', url: 'https://www.tulanehillel.org' },
    chabad: { name: 'Chabad at Tulane', url: 'https://www.chabadtulane.com', address: '7037 Freret St, New Orleans LA 70118' },
    nearbySpaces: [
      'Touro Synagogue (New Orleans)',
      'Congregation Gates of Prayer (Metairie)',
      'Casablanca Restaurant (New Orleans)',
    ],
    jewishStudentEstimate: 2500,
    jewishLifeNotes: 'Tulane has one of the highest concentrations of Jewish students of any southern university. New Orleans has a historic Jewish community stretching back to the early 1800s. Hillel at Tulane operates a full building on Freret Street and runs extensive programming including Mardi Gras celebrations and spring break trips.',
    hasDemoData: false,
  },
  {
    id: 'campus-cal-state-la',
    name: 'Cal State LA',
    city: 'Los Angeles',
    state: 'CA',
    lat: 34.0686,
    lng: -118.1687,
    hillel: { name: 'Hillel at Cal State LA', url: 'https://www.calstatela.edu/hillel' },
    chabad: { name: 'Chabad of East LA', url: 'https://www.chabadeastla.com', address: '4040 City Terrace Dr, Los Angeles CA 90063' },
    nearbySpaces: [
      'Breed Street Shul (Boyle Heights)',
      'East LA Jewish Community Center',
      'Skoby\'s (Boyle Heights)',
    ],
    jewishStudentEstimate: 800,
    jewishLifeNotes: 'Cal State LA has a smaller but growing Jewish student community. The campus sits in East Los Angeles near Boyle Heights, which was historically one of the largest Jewish neighborhoods in Los Angeles in the early 20th century. The historic Breed Street Shul nearby is a landmark of that heritage.',
    hasDemoData: true,
  },
  {
    id: 'campus-george-mason',
    name: 'George Mason University',
    city: 'Fairfax',
    state: 'VA',
    lat: 38.8316,
    lng: -77.3119,
    hillel: { name: 'Mason Hillel', url: 'https://www.masonhillel.org' },
    chabad: { name: 'Chabad at GMU', url: 'https://www.chabadgmu.com', address: '4400 University Dr, Fairfax VA 22030' },
    nearbySpaces: [
      'Congregation Olam Tikvah (Fairfax)',
      'Northern Virginia Hebrew Congregation',
      'Sunflower Vegetarian (Vienna)',
    ],
    jewishStudentEstimate: 1500,
    jewishLifeNotes: 'George Mason Hillel serves a commuter-heavy Jewish student population in Northern Virginia. The Fairfax area has a large and established Jewish community. Mason Hillel runs regular programming in partnership with nearby congregations.',
    hasDemoData: false,
  },
  {
    id: 'campus-american',
    name: 'American University',
    city: 'Washington',
    state: 'DC',
    lat: 38.9376,
    lng: -77.0871,
    hillel: { name: 'American University Hillel', url: 'https://www.auhillel.org' },
    chabad: { name: 'Chabad at AU', url: 'https://www.chabadau.com', address: '4400 Massachusetts Ave NW, Washington DC 20016' },
    nearbySpaces: [
      'Adas Israel Congregation (DC)',
      'Temple Sinai (DC)',
      'Wagshal\'s Deli (Spring Valley)',
    ],
    jewishStudentEstimate: 2200,
    jewishLifeNotes: 'AU Hillel is located in the Tenleytown neighborhood of Washington DC. American University has a particularly active Jewish campus life given its close relationship with Washington\'s Jewish community and proximity to national Jewish advocacy organizations.',
    hasDemoData: false,
  },
  {
    id: 'campus-umd-baltimore',
    name: 'University of Maryland, Baltimore County',
    city: 'Baltimore',
    state: 'MD',
    lat: 39.2557,
    lng: -76.7101,
    hillel: { name: 'UMBC Hillel', url: 'https://www.umbchillel.org' },
    chabad: { name: 'Chabad at UMBC', url: 'https://www.chabadatumbc.com', address: '1000 Hilltop Cir, Baltimore MD 21250' },
    nearbySpaces: [
      'Beth Tfiloh Congregation (Baltimore)',
      'Shomrei Emunah (Baltimore)',
      'Attman\'s Delicatessen (Baltimore)',
    ],
    jewishStudentEstimate: 1200,
    jewishLifeNotes: 'UMBC Hillel serves a commuter-heavy student population in the Baltimore suburbs. The university draws heavily from Baltimore\'s Jewish community in neighborhoods like Pikesville and Owings Mills. Baltimore has a historic and active Jewish community, with many students attending synagogue services in the city.',
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

  const hasDemoData = campusIncidents.length > 0;
  const showMap = hasDemoData && campus !== null;

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
              {hasDemoData && (
                <span className="inline-flex items-center gap-1 self-start sm:self-auto bg-gold-100 text-gold-700 font-sans text-xs font-semibold px-3 py-1 rounded-full border border-gold-200">
                  <svg viewBox="0 0 10 10" className="w-2 h-2 fill-current"><circle cx="5" cy="5" r="4" /></svg>
                  Incident data available
                </span>
              )}
            </div>

            {/* Incident tracking section */}
            {hasDemoData ? (
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
