import type { Incident } from '@/types';

/**
 * 30 real, individually-sourced antisemitic incidents across Greater Los Angeles.
 * Each entry links to a verified news or official source (shown in the map popup).
 * Compiled August 2026 from public reporting; neighborhood-level coordinates.
 */
export const SOURCED_INCIDENTS: Incident[] = [
  {
    id: 'src-01', category: 'assault', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2023-02-15T12:00:00Z', created_at: '2023-02-15T12:00:00Z',
    neighborhood: 'Pico-Robertson', lat: 34.0533, lng: -118.3862,
    description:
      'Jaime Tran shot two Orthodox Jewish men, each wearing a yarmulke, as they left synagogues in the Pico-Robertson area on consecutive days (Feb. 15 and 16, 2023); both survived. He was later sentenced to 35 years in federal prison for the hate-crime shootings.',
    source_name: 'ABC7 Los Angeles', source_url: 'https://abc7.com/post/jamie-tran-gunman-accused-jewish-hate-crime-shooting-pico-robertson-sentenced-today/15375502/',
  },
  {
    id: 'src-02', category: 'assault', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-05-01T12:00:00Z', created_at: '2024-05-01T12:00:00Z',
    neighborhood: 'Westwood', lat: 34.0689, lng: -118.4452,
    description:
      'During the spring 2024 pro-Palestinian encampment at UCLA, Jewish and Israeli students were physically assaulted and blocked from parts of campus; one student was knocked unconscious with an open head wound. The DOJ and a $6.13M settlement found UCLA deliberately indifferent to the hostile environment.',
    source_name: 'CBS Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/uc-sued-justice-department-ucla-palestinian-protests/',
  },
  {
    id: 'src-03', category: 'harassment', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-06-23T12:00:00Z', created_at: '2024-06-23T12:00:00Z',
    neighborhood: 'Pico-Robertson', lat: 34.0533, lng: -118.3862,
    description:
      'A pro-Palestinian protest outside the Adas Torah synagogue turned violent, with demonstrators blocking congregants from entering, and multiple people bloodied and doused with bear/pepper spray. One arrest was made and officials including President Biden condemned the violence.',
    source_name: 'The Times of Israel', source_url: 'https://www.timesofisrael.com/violent-clashes-erupt-between-pro-and-anti-israel-protesters-outside-la-synagogue/',
  },
  {
    id: 'src-04', category: 'assault', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-06-23T12:00:00Z', created_at: '2024-06-23T12:00:00Z',
    neighborhood: 'Pico-Robertson', lat: 34.0533, lng: -118.3862,
    description:
      'Zaid Gitesatani, 28, of Carlsbad punched a Jewish man in the jaw as he walked his dog near Adas Torah synagogue during the June 23, 2024 protest, then posted about it on Instagram (\'Whooped the Zios today\'). He was federally charged with a hate crime.',
    source_name: '10News (ABC San Diego)', source_url: 'https://www.10news.com/news/local-news/carlsbad-man-charged-with-hate-crime-for-alleged-assault-on-jewish-man-in-los-angeles',
  },
  {
    id: 'src-05', category: 'assault', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2023-12-09T12:00:00Z', created_at: '2023-12-09T12:00:00Z',
    neighborhood: 'Beverly Hills', lat: 34.0736, lng: -118.4004,
    description:
      'Jarris Jay Silagi, 44, struck a 75-year-old Jewish man wearing a yarmulke on the head with a belt buckle, causing a deep laceration, and shouted antisemitic remarks as the man and his wife walked to synagogue for Shabbat. He was charged with hate-crime-enhanced assault, elder abuse and attempted robbery.',
    source_name: 'ABC News', source_url: 'https://abcnews.com/US/beverly-hills-police-arrest-man-alleged-hate-crime/story?id=105542162',
  },
  {
    id: 'src-06', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2023-11-01T12:00:00Z', created_at: '2023-11-01T12:00:00Z',
    neighborhood: 'Fairfax District', lat: 34.0762, lng: -118.3614,
    description:
      'Canter\'s Deli and other Jewish sites in the Fairfax District were defaced with graffiti including \'Free Gaza\' and \'Israels only religion is capitalism,\' painted beneath the Fairfax Community Mural. LAPD investigated the graffiti at multiple locations as possible hate crimes.',
    source_name: 'Los Angeles Times', source_url: 'https://finance.yahoo.com/news/lapd-investigating-reports-graffiti-incidents-193714493.html',
  },
  {
    id: 'src-07', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-08-30T12:00:00Z', created_at: '2025-08-30T12:00:00Z',
    neighborhood: 'Encino', lat: 34.1591, lng: -118.5012,
    description:
      'A man was captured on security video spray-painting a hate symbol in yellow on the front door of Mitzvahland, a Jewish religious supply store in Encino, during Shabbat. LAPD opened a hate-crime investigation.',
    source_name: 'CBS Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/encino-jewish-business-antisemitic-graffiti/',
  },
  {
    id: 'src-08', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-08-10T12:00:00Z', created_at: '2025-08-10T12:00:00Z',
    neighborhood: 'Woodland Hills', lat: 34.1683, lng: -118.6059,
    description:
      'The Israeli-American Council\'s national headquarters (Shepher Community Center) in Woodland Hills was defaced with a yellow swastika, Nazi \'SS\' lightning bolts, the word \'burn,\' and \'F— Jews, BDS\' on nearby barriers. LAPD\'s Topanga Division investigated, with a suspect captured on security footage.',
    source_name: 'The Times of Israel', source_url: 'https://www.timesofisrael.com/israeli-american-council-la-headquarters-vandalized-with-nazi-symbols/',
  },
  {
    id: 'src-09', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-08-30T12:00:00Z', created_at: '2025-08-30T12:00:00Z',
    neighborhood: 'Woodland Hills', lat: 34.1683, lng: -118.6059,
    description:
      'Jose Antonio Montes-Gutierrez was charged with five felonies after allegedly painting backward swastikas and antisemitic graffiti on Jewish-owned businesses and public property in Woodland Hills and Encino on four dates in July and August 2025. He was arrested in January 2026.',
    source_name: 'Canyon News', source_url: 'https://www.canyon-news.com/montes-gutierrez-arrested-for-multiple-vandalism-hate-crimes/',
  },
  {
    id: 'src-10', category: 'assault', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2026-04-27T12:00:00Z', created_at: '2026-04-27T12:00:00Z',
    neighborhood: 'Pico-Robertson', lat: 34.0533, lng: -118.3862,
    description:
      'Semaj De Leone James, 21, was charged with a felony hate crime after allegedly following a Jewish man walking home from synagogue near the 9000 block of West Pico Boulevard, then jumping out of a van and attacking him without provocation while, per the victim, yelling \'Free Palestine.\'',
    source_name: 'Los Angeles County District Attorney', source_url: 'https://da.lacounty.gov/media/news/man-charged-felony-hate-crime-attack-outside-pico-robertson-synagogue',
  },
  {
    id: 'src-11', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2026-07-24T12:00:00Z', created_at: '2026-07-24T12:00:00Z',
    neighborhood: 'Altadena', lat: 34.1897, lng: -118.1312,
    description:
      'A healing mural at the Pasadena Jewish Temple & Center, painted on the wall left standing after the Eaton Fire, was defaced with multiple swastikas and \'Zionizm is not welcome.\' The LA County Sheriff\'s Department investigated it as a hate crime.',
    source_name: 'CBS Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/pasadena-synagogue-mural-vandalized-with-antisemitic-graffiti/',
  },
  {
    id: 'src-12', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-04-05T12:00:00Z', created_at: '2024-04-05T12:00:00Z',
    neighborhood: 'Santa Monica', lat: 34.0195, lng: -118.4912,
    description:
      'Santa Monica police investigated a spree of antisemitic graffiti found on sidewalks, trees and light posts across the city, including in the Pico Neighborhood along Pico Boulevard, in early April 2024.',
    source_name: 'City of Santa Monica', source_url: 'https://www.santamonica.gov/press/2024/04/07/santa-monica-police-department-investigating-anti-semitic-graffiti',
  },
  {
    id: 'src-13', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-07-25T12:00:00Z', created_at: '2024-07-25T12:00:00Z',
    neighborhood: 'Hollywood', lat: 34.0928, lng: -118.3287,
    description:
      'The Kahal Ahavas Yisroel synagogue in Hollywood had its windows smashed twice within a year of opening; the July 25, 2024 incident, in which men used a hammer while filming, was captured on security cameras. LAPD investigated both as hate crimes.',
    source_name: 'The Forward', source_url: 'https://forward.com/fast-forward/639012/a-new-synagogues-rite-of-passage-in-2024-shattered-glass/',
  },
  {
    id: 'src-14', category: 'harassment', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-12-03T12:00:00Z', created_at: '2025-12-03T12:00:00Z',
    neighborhood: 'Koreatown', lat: 34.058, lng: -118.3009,
    description:
      'A community safety event at Wilshire Boulevard Temple was disrupted by protesters chanting \'Baby Killers\' and \'Zionist Pigs\'; individuals who infiltrated the event were removed, and a protester smashed a glass vase inside near attendees. LAPD arrested two people for battery and vandalism.',
    source_name: 'Jewish Journal', source_url: 'https://jewishjournal.com/community/385349/pro-palestinian-protest-turns-violent-at-wilshire-boulevard-temple/',
  },
  {
    id: 'src-15', category: 'harassment', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2026-06-05T12:00:00Z', created_at: '2026-06-05T12:00:00Z',
    neighborhood: 'Pacific Palisades', lat: 34.0452, lng: -118.5265,
    description:
      'Bruce Alfred Lion, 64, was charged with three felony hate crimes after allegedly shouting antisemitic vitriol and death threats from his balcony at Rabbi Zushe Cunin and a congregation holding a Shabbat evening prayer service at a neighboring Pacific Palisades home.',
    source_name: 'ABC7 Los Angeles', source_url: 'https://abc7.com/post/california-raisin-company-heir-bruce-lion-raisins-arrested-alleged-antisemitic-rant-los-angeles/19326121/',
  },
  {
    id: 'src-16', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2026-01-12T12:00:00Z', created_at: '2026-01-12T12:00:00Z',
    neighborhood: 'Altadena', lat: 34.1897, lng: -118.1312,
    description:
      'The ruins of the Pasadena Jewish Temple & Center, destroyed in the January 2025 Eaton Fire, were spray-painted with \'F— Zionizm\' on an exterior wall days after congregants marked the fire\'s one-year anniversary. The LA County Sheriff\'s Department was notified Jan. 12, 2026.',
    source_name: 'Jewish Telegraphic Agency', source_url: 'https://www.jta.org/2026/01/13/united-states/rubble-of-pasadena-synagogue-destroyed-in-wildfire-is-vandalized-with-anti-zionist-graffiti',
  },
  {
    id: 'src-17', category: 'vandalism', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-09-22T12:00:00Z', created_at: '2025-09-22T12:00:00Z',
    neighborhood: 'Beverly Hills', lat: 34.0736, lng: -118.4004,
    description:
      'A swastika was drawn on the sidewalk outside El Rodeo Elementary School in Beverly Hills, discovered around the start of Rosh Hashanah. Surveillance video captured a man drawing the symbol; Beverly Hills police investigated.',
    source_name: 'ABC7 Los Angeles', source_url: 'https://www.aol.com/security-cameras-capture-man-drawing-185008239.html',
  },
  {
    id: 'src-18', category: 'vandalism', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-03-23T12:00:00Z', created_at: '2025-03-23T12:00:00Z',
    neighborhood: 'Fairfax District', lat: 34.0821, lng: -118.3714,
    description:
      'A swastika was painted on the side of an under-construction building at Melrose and Laurel avenues, near the Fairfax Jewish community. LAPD\'s Wilshire Division classified it as a hate incident and investigated.',
    source_name: 'Beverly Press', source_url: 'https://beverlypress.com/2025/03/swastika-found-on-melrose-building/',
  },
  {
    id: 'src-19', category: 'assault', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2021-05-20T12:00:00Z', created_at: '2021-05-20T12:00:00Z',
    neighborhood: 'Beverly Grove', lat: 34.0759, lng: -118.3765,
    description:
      'A group waving Palestinian flags attacked Jewish diners outside a sushi restaurant on La Cienega Boulevard, throwing objects and beating and pepper-spraying patrons after asking who was Jewish. LAPD investigated it as a hate crime.',
    source_name: 'ABC7 Los Angeles', source_url: 'https://abc7.com/post/anti-semitism-fight-la-restaurant-beverly-grove/10661721/',
  },
  {
    id: 'src-20', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2019-09-18T12:00:00Z', created_at: '2019-09-18T12:00:00Z',
    neighborhood: 'Northridge', lat: 34.2381, lng: -118.5301,
    description:
      'Temple Ahavat Shalom in Northridge was vandalized with a message reading \'Six million $ was not enough\' written on its gate, an apparent reference to the Holocaust. Police investigated with the ADL.',
    source_name: 'CBS Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/la-synagogue-vandalism-anti-semitic-hate-crime/',
  },
  {
    id: 'src-21', category: 'vandalism', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2023-10-25T12:00:00Z', created_at: '2023-10-25T12:00:00Z',
    neighborhood: 'Beverly Hills', lat: 34.062, lng: -118.4004,
    description:
      'Antisemitic graffiti was spray-painted at the Bedford Manor apartments on Bedford Drive in Beverly Hills, a building where roughly 60% of residents are Jewish. The graffiti was painted over after discovery.',
    source_name: 'ABC7 Los Angeles', source_url: 'https://abc7.com/post/beverly-hills-antisemitic-graffiti-apartment-complex/13976686/',
  },
  {
    id: 'src-22', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2020-05-30T12:00:00Z', created_at: '2020-05-30T12:00:00Z',
    neighborhood: 'Fairfax District', lat: 34.0762, lng: -118.3614,
    description:
      'Congregation Beth Israel in the Fairfax District was defaced with \'F— Israel\' and \'Free Palestine\' graffiti amid unrest in late May 2020, and several nearby Jewish-owned businesses were also damaged.',
    source_name: 'The Times of Israel', source_url: 'https://www.timesofisrael.com/synagogues-in-los-angeles-and-richmond-vandalized-during-protests/',
  },
  {
    id: 'src-23', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-08-31T12:00:00Z', created_at: '2025-08-31T12:00:00Z',
    neighborhood: 'Encino', lat: 34.1591, lng: -118.5012,
    description:
      '\'Israel did 9/11\' and swastikas were spray-painted at an Encino park and on businesses along Ventura Boulevard, an area neighbors said was targeted because of nearby Jewish-owned businesses. Police increased patrols and removed the graffiti.',
    source_name: 'ABC7 Los Angeles', source_url: 'https://abc7.com/post/antisemitic-messages-spray-painted-encino-park-is-latest-case-hate-speech-spotted-socal/17699298/',
  },
  {
    id: 'src-24', category: 'vandalism', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-08-16T12:00:00Z', created_at: '2025-08-16T12:00:00Z',
    neighborhood: 'Tarzana', lat: 34.1728, lng: -118.5537,
    description:
      'Swastikas were spray-painted on the fence wrap outside Wilbur Charter for Enriched Academics elementary school in Tarzana over a weekend in mid-August 2025. School officials removed the graffiti.',
    source_name: 'CBS Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/wilbur-charter-elementary-tarzana-graffiti-antisemitic-swasitkas',
  },
  {
    id: 'src-25', category: 'vandalism', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2019-12-14T12:00:00Z', created_at: '2019-12-14T12:00:00Z',
    neighborhood: 'Beverly Hills', lat: 34.0736, lng: -118.4004,
    description:
      'Nessah Synagogue, a Persian Jewish congregation in Beverly Hills, was ransacked, with prayer books torn and Torah scrolls strewn on the floor. Nathaniel Anton Redding was arrested and charged with vandalism of religious property with a hate-crime enhancement.',
    source_name: 'The Times of Israel', source_url: 'https://www.timesofisrael.com/suspect-arrested-charged-with-hate-crime-for-vandalism-of-los-angeles-synagogue/',
  },
  {
    id: 'src-26', category: 'harassment', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-07-26T12:00:00Z', created_at: '2025-07-26T12:00:00Z',
    neighborhood: 'West Hollywood', lat: 34.09, lng: -118.3617,
    description:
      'A woman displayed signs with antisemitic messages promoting violence against Jewish people at Crescent Heights and Santa Monica boulevards in West Hollywood. The city condemned the signage and code enforcement confirmed none remained.',
    source_name: 'Beverly Press', source_url: 'https://beverlypress.com/2025/07/weho-condemns-antisemitic-signage/',
  },
  {
    id: 'src-27', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-05-13T12:00:00Z', created_at: '2024-05-13T12:00:00Z',
    neighborhood: 'Beverly Hills', lat: 34.0668, lng: -118.3789,
    description:
      '\'GAZA\' was spray-painted on the Saban Theatre on Wilshire Boulevard and a nearby parking garage on Olympic Boulevard shortly after a large Yom Hazikaron (Israeli Memorial Day) event. Beverly Hills police investigated; a hate-crime determination was left open.',
    source_name: 'Beverly Press', source_url: 'https://beverlypress.com/2024/05/bhpd-investigates-antisemitic-vandalism/',
  },
  {
    id: 'src-28', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2023-12-14T12:00:00Z', created_at: '2023-12-14T12:00:00Z',
    neighborhood: 'Santa Monica', lat: 34.0195, lng: -118.4912,
    description:
      'An 8-foot steel-and-glass menorah at 15th Street and Montana Avenue in Santa Monica was toppled and broken by a man who fled the scene, causing thousands of dollars in damage. Santa Monica police investigated.',
    source_name: 'CBS Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/8-foot-tall-menorah-vandalized-in-santa-monica/',
  },
  {
    id: 'src-29', category: 'harassment', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2023-10-27T12:00:00Z', created_at: '2023-10-27T12:00:00Z',
    neighborhood: 'Studio City', lat: 34.1395, lng: -118.387,
    description:
      'Daniel Garcia, 44, was charged with criminal threats, attempted residential burglary and a hate-crime allegation after yelling \'Free Palestine\' and \'Kill Jews\' at a Jewish family\'s home on the 3000 block of Laurel Canyon Boulevard in Studio City and threatening to kill them.',
    source_name: 'CBS Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/man-faces-hate-crime-charges-after-threatening-to-kill-jewish-family-at-their-studio-city-home/',
  },
  {
    id: 'src-30', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2023-12-01T12:00:00Z', created_at: '2023-12-01T12:00:00Z',
    neighborhood: 'Burbank', lat: 34.1808, lng: -118.309,
    description:
      'Klinton Dion was charged with antisemitic vandalism on public and private property in Burbank and Glendale, including at Temple Emanu El, in cases announced by the LA County DA in December 2023.',
    source_name: 'Los Angeles County District Attorney', source_url: 'https://da.lacounty.gov/about/inside-LADA/district-attorney-gasc-n-announces-charges-against-two-men-two-anti-semitic',
  },
];
