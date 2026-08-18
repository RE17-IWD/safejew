import type { Incident } from '@/types';

/**
 * 49 real, individually-sourced antisemitic incidents across Greater Los Angeles.
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
  {
    id: 'src-31', category: 'vandalism', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2014-04-01T12:00:00Z', created_at: '2014-04-01T12:00:00Z',
    neighborhood: 'Van Nuys', lat: 34.1866, lng: -118.4487,
    description:
      'A Jewish-owned plumbing business in Van Nuys was vandalized twice with swastikas and the message \'Adolf was right. Kill Jews!\' spray-painted on its rear fence and dumpster. Amos Hason, 49, was arrested and charged with hate crimes and vandalism.',
    source_name: 'CBS News Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/man-49-faces-hate-crime-charges-in-anti-semitic-vandalism-case/',
  },
  {
    id: 'src-32', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2022-12-20T12:00:00Z', created_at: '2022-12-20T12:00:00Z',
    neighborhood: 'Beverly Hills', lat: 34.081, lng: -118.413,
    description:
      'On the first night of Hanukkah, a man threw objects at a residential menorah and carved Nazi symbols into its base near Sunset Boulevard and Foothill Road. Eric Brian King, 47, of Dallas was arrested on suspicion of felony vandalism and a hate crime.',
    source_name: 'ABC7 Los Angeles', source_url: 'https://abc7.com/beverly-hills-menorah-vandalized-nazi-symbols-man-arrested/12591810/',
  },
  {
    id: 'src-33', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2021-05-28T12:00:00Z', created_at: '2021-05-28T12:00:00Z',
    neighborhood: 'Century City / Pico-Robertson', lat: 34.0553, lng: -118.4004,
    description:
      'During a week-long spree of 13 vandalism incidents along Westwood and Pico boulevards, a suspect hurled a concrete brick at the windows of Young Israel of Century City synagogue and broke a window at Pat\'s, a kosher restaurant. Jon Knight Prince, 26, was arrested on felony vandalism charges.',
    source_name: 'CBS News Los Angeles', source_url: 'https://www.cbsnews.com/amp/losangeles/news/jon-knight-prince-arrested-on-suspicion-of-felony-vandalism/',
  },
  {
    id: 'src-34', category: 'online_threat', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-01-02T12:00:00Z', created_at: '2024-01-02T12:00:00Z',
    neighborhood: 'Hollywood', lat: 34.1016, lng: -118.3376,
    description:
      'Temple Israel of Hollywood received an emailed bomb threat claiming explosives were hidden on its campus and evacuated per its emergency protocols; LAPD searched the site and found no threat. It was one of roughly 90 California Jewish sites hit that day with threats law enforcement deemed a hoax.',
    source_name: 'Jewish Journal', source_url: 'https://jewishjournal.com/news/366887/nearly-100-jewish-sites-across-california-receive-bomb-threats-law-enforcement-deem-threats-hoax/',
  },
  {
    id: 'src-35', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2026-02-16T12:00:00Z', created_at: '2026-02-16T12:00:00Z',
    neighborhood: 'Burbank', lat: 34.1899, lng: -118.32,
    description:
      'Two large swastikas were painted on the exterior wall of Temple Emanu El on the 1300 block of North Glenoaks Boulevard in Burbank. A 17-year-old, also linked to neo-Nazi recruitment materials posted at Los Angeles Mission College, was arrested on suspicion of felony vandalism and hate-motivated graffiti.',
    source_name: 'CBS News Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/burbank-temple-emanu-el-swastikas-vandalism-arrest/',
  },
  {
    id: 'src-36', category: 'harassment', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-12-06T12:00:00Z', created_at: '2025-12-06T12:00:00Z',
    neighborhood: 'Burbank', lat: 34.1808, lng: -118.309,
    description:
      'A man was recorded on video at a Burbank post office shouting obscenity-laced antisemitic remarks and giving Nazi salutes to Hitler. The video circulated widely on social media; Burbank police had no record of responding.',
    source_name: 'FOX 11 Los Angeles', source_url: 'https://www.foxla.com/news/burbank-antisemitic-tirade-caught-on-video',
  },
  {
    id: 'src-37', category: 'assault', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2026-05-24T12:00:00Z', created_at: '2026-05-24T12:00:00Z',
    neighborhood: 'Santa Monica', lat: 34.0195, lng: -118.4912,
    description:
      'A man displayed a bat and chased a Jewish couple in Santa Monica while calling them \'genocidal\' and making Israel-related accusations. Santa Monica police made an arrest and detectives reviewed whether the incident involved hate-motivated conduct.',
    source_name: 'JNS (Jewish News Syndicate)', source_url: 'https://www.jns.org/news/u-s-news/man-arrested-after-calling-jewish-couple-genocidal-chasing-them-with-bat-in-los-angeles-area',
  },
  {
    id: 'src-38', category: 'vandalism', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-09-20T12:00:00Z', created_at: '2025-09-20T12:00:00Z',
    neighborhood: 'Long Beach', lat: 33.771, lng: -118.165,
    description:
      'A utility box outside the Long Beach Pride headquarters was spray-painted with a swastika alongside anti-LGBTQ graffiti. Long Beach police opened an investigation and the city\'s graffiti-removal team cleaned the vandalism.',
    source_name: 'CBS News Los Angeles', source_url: 'https://www.cbsnews.com/amp/losangeles/news/long-beach-pride-anti-lgbtq-antisemitic-graffiti',
  },
  {
    id: 'src-39', category: 'harassment', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2022-11-19T12:00:00Z', created_at: '2022-11-19T12:00:00Z',
    neighborhood: 'Culver City', lat: 34.0211, lng: -118.3965,
    description:
      'Antisemitic hate literature produced by a known hate group was distributed to homes throughout a Culver City neighborhood over a weekend. Culver City police investigated and said they were coordinating with neighboring agencies that had seen similar distributions.',
    source_name: 'CBS News Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/antisemitic-literature-distributed-throughout-culver-city-neighborhood/',
  },
  {
    id: 'src-40', category: 'harassment', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2022-10-22T12:00:00Z', created_at: '2022-10-22T12:00:00Z',
    neighborhood: 'West Los Angeles (405 Freeway overpass)', lat: 34.043, lng: -118.456,
    description:
      'Members of the Goyim Defense League hung banners reading \'Kanye is right about the Jews\' over the 405 Freeway in Los Angeles while some gave Nazi salutes. The display followed Kanye West\'s string of antisemitic public statements.',
    source_name: 'Jewish Telegraphic Agency', source_url: 'https://www.jta.org/2022/10/23/united-states/kanye-was-right-about-the-jews-antisemitic-group-says-on-los-angeles-highway-banner',
  },
  {
    id: 'src-41', category: 'vandalism', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2023-11-09T12:00:00Z', created_at: '2023-11-09T12:00:00Z',
    neighborhood: 'Tarzana', lat: 34.158, lng: -118.547,
    description:
      'A woman rammed her vehicle twice into the gates of the Eretz Synagogue and Cultural Center on Wilbur Avenue in Tarzana, damaging two sections of the perimeter fencing. Tikvah Mottahedeh, 54, was arrested on hate crime and vandalism charges.',
    source_name: 'CBS News Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/woman-arrested-for-hate-crime-after-allegedly-ramming-her-vehicle-into-tarzana-synagogue-gates/',
  },
  {
    id: 'src-42', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2019-01-29T12:00:00Z', created_at: '2019-01-29T12:00:00Z',
    neighborhood: 'Tarzana', lat: 34.172, lng: -118.554,
    description:
      'Antisemitic graffiti was spray-painted on the walls of the Mishkan Torah / Valley Community Kollel synagogue in Tarzana and painted over the same day it was discovered. Local officials and the ADL condemned the vandalism.',
    source_name: 'Jewish Journal', source_url: 'https://jewishjournal.com/san_fernando_valley/293157/tarzana-synagogue-vandalized-with-anti-semitic-graffiti/',
  },
  {
    id: 'src-43', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-06-04T12:00:00Z', created_at: '2024-06-04T12:00:00Z',
    neighborhood: 'University Park (USC)', lat: 34.025, lng: -118.287,
    description:
      'Four people on bicycles approached the USC Chabad House on Severance Street; two smashed the glass front door before fleeing, in an incident captured on surveillance video. A report was filed and the LAPD did not classify it as a hate crime.',
    source_name: 'ABC7 Los Angeles', source_url: 'https://abc7.com/post/usc-chabad-house-vandalized-overnight-incident-caught-video/14914052/',
  },
  {
    id: 'src-44', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-01-06T12:00:00Z', created_at: '2024-01-06T12:00:00Z',
    neighborhood: 'Canoga Park', lat: 34.2011, lng: -118.5983,
    description:
      'A suspect threw rocks through the windows of roughly 15 businesses in Canoga Park and Woodland Hills over several days, some rocks bearing painted words such as \'Pay Up\' and \'Glory\'; several targeted businesses were Jewish-owned with visible religious symbols. Edelidio David Wallace, 64, was arrested for felony vandalism.',
    source_name: 'ABC7 Los Angeles', source_url: 'https://abc7.com/canoga-park-businesses-vandalized-investigation/14302464/',
  },
  {
    id: 'src-45', category: 'vandalism', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-11-05T12:00:00Z', created_at: '2024-11-05T12:00:00Z',
    neighborhood: 'Pico-Robertson', lat: 34.0537, lng: -118.384,
    description:
      'Six Jewish-owned businesses on the 8700 block of Pico Boulevard, including the Got Kosher? bakery and Glatt Mart, had windows broken and were tagged with graffiti, with police reporting possible bullet holes. The LAPD investigated the incidents as hate crimes.',
    source_name: 'Patch (Los Angeles)', source_url: 'https://patch.com/california/los-angeles/jewish-businesses-targeted-hate-crimes-lapd',
  },
  {
    id: 'src-46', category: 'vandalism', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2020-01-02T12:00:00Z', created_at: '2020-01-02T12:00:00Z',
    neighborhood: 'West Hollywood', lat: 34.09, lng: -118.385,
    description:
      'A suspect spray-painted two Stars of David and the letters \'GDLK\' on the Block Party store in West Hollywood, caught on video from a neighboring business. The letters referenced the antisemitic Goyim Defense League.',
    source_name: 'CBS News Los Angeles', source_url: 'https://www.cbsnews.com/amp/losangeles/news/weho-store-vandalized-with-anti-semitic-graffiti/',
  },
  {
    id: 'src-47', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-09-28T12:00:00Z', created_at: '2025-09-28T12:00:00Z',
    neighborhood: 'Glendale (Adams Hill)', lat: 34.14, lng: -118.256,
    description:
      'Multiple swastikas were drawn in chalk on private and public property in Glendale\'s Adams Hill neighborhood, along with the number \'1488\' and the phrase \'Jews control gov,\' including a swastika on a fire hydrant on East Palmer Avenue. Glendale police investigated it as a suspected hate crime.',
    source_name: 'FOX 11 Los Angeles', source_url: 'https://www.foxla.com/news/antisemitic-hate-symbols-found-glendale',
  },
  {
    id: 'src-48', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2019-09-11T12:00:00Z', created_at: '2019-09-11T12:00:00Z',
    neighborhood: 'Fairfax', lat: 34.076, lng: -118.361,
    description:
      'The Moroccan Orthodox Baba Sale Congregation in the Fairfax district was spray-painted with \'Free Palestine\' graffiti on the morning of the 9/11 anniversary, while worshippers were inside for early services. Surveillance video showed hooded suspects fleeing in a waiting vehicle.',
    source_name: 'Jewish Journal', source_url: 'https://jewishjournal.com/los_angeles/304267/baba-sale-congregation-vandalized-with-free-palestine-graffiti/',
  },
  {
    id: 'src-49', category: 'vandalism', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2019-12-17T12:00:00Z', created_at: '2019-12-17T12:00:00Z',
    neighborhood: 'Bel Air / Westwood', lat: 34.084, lng: -118.44,
    description:
      'A swastika and messages including \'time to pay\' were spray-painted at three Los Angeles Jewish schools: American Jewish University in Bel Air, Westwood Charter School, and Milken Community High School. The vandalism came days after the Nessah Synagogue was ransacked in Beverly Hills.',
    source_name: 'Jewish Journal', source_url: 'https://jewishjournal.com/online/308746/3-la-jewish-schools-spray-painted-with-anti-semitic-graffiti-days-after-beverly-hills-synagogue-vandalized/',
  },
];
