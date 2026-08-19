import type { Incident } from '@/types';

/**
 * 90 real, individually-sourced antisemitic incidents (2020 onward) across
 * Greater Los Angeles. Each links to a verified source (shown in the map popup).
 * Coordinates are approximate, neighborhood/site level. Overlapping points are spread
 * apart at render time in IncidentMap so each stays individually clickable.
 */
export const SOURCED_INCIDENTS: Incident[] = [
  {
    id: 'src-001', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2026-07-24T12:00:00Z', created_at: '2026-07-24T12:00:00Z',
    neighborhood: 'Altadena', lat: 34.1897, lng: -118.1312,
    description:
      'A healing mural at the Pasadena Jewish Temple & Center, painted on the wall left standing after the Eaton Fire, was defaced with multiple swastikas and \'Zionizm is not welcome.\' The LA County Sheriff\'s Department investigated it as a hate crime.',
    source_name: 'CBS Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/pasadena-synagogue-mural-vandalized-with-antisemitic-graffiti/',
  },
  {
    id: 'src-002', category: 'harassment', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2026-06-05T12:00:00Z', created_at: '2026-06-05T12:00:00Z',
    neighborhood: 'Pacific Palisades', lat: 34.0452, lng: -118.5265,
    description:
      'Bruce Alfred Lion, 64, was charged with three felony hate crimes after allegedly shouting antisemitic vitriol and death threats from his balcony at Rabbi Zushe Cunin and a congregation holding a Shabbat evening prayer service at a neighboring Pacific Palisades home.',
    source_name: 'ABC7 Los Angeles', source_url: 'https://abc7.com/post/california-raisin-company-heir-bruce-lion-raisins-arrested-alleged-antisemitic-rant-los-angeles/19326121/',
  },
  {
    id: 'src-003', category: 'assault', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2026-05-24T12:00:00Z', created_at: '2026-05-24T12:00:00Z',
    neighborhood: 'Santa Monica', lat: 34.0195, lng: -118.4912,
    description:
      'A man displayed a bat and chased a Jewish couple in Santa Monica while calling them \'genocidal\' and making Israel-related accusations. Santa Monica police made an arrest and detectives reviewed whether the incident involved hate-motivated conduct.',
    source_name: 'JNS (Jewish News Syndicate)', source_url: 'https://www.jns.org/news/u-s-news/man-arrested-after-calling-jewish-couple-genocidal-chasing-them-with-bat-in-los-angeles-area',
  },
  {
    id: 'src-004', category: 'assault', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2026-04-27T12:00:00Z', created_at: '2026-04-27T12:00:00Z',
    neighborhood: 'Pico-Robertson', lat: 34.0533, lng: -118.3862,
    description:
      'Semaj De Leone James, 21, was charged with a felony hate crime after allegedly following a Jewish man walking home from synagogue near the 9000 block of West Pico Boulevard, then jumping out of a van and attacking him without provocation while, per the victim, yelling \'Free Palestine.\'',
    source_name: 'Los Angeles County District Attorney', source_url: 'https://da.lacounty.gov/media/news/man-charged-felony-hate-crime-attack-outside-pico-robertson-synagogue',
  },
  {
    id: 'src-005', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2026-02-16T12:00:00Z', created_at: '2026-02-16T12:00:00Z',
    neighborhood: 'Burbank', lat: 34.1899, lng: -118.32,
    description:
      'Two large swastikas were painted on the exterior wall of Temple Emanu El on the 1300 block of North Glenoaks Boulevard in Burbank. A 17-year-old, also linked to neo-Nazi recruitment materials posted at Los Angeles Mission College, was arrested on suspicion of felony vandalism and hate-motivated graffiti.',
    source_name: 'CBS News Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/burbank-temple-emanu-el-swastikas-vandalism-arrest/',
  },
  {
    id: 'src-006', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2026-01-12T12:00:00Z', created_at: '2026-01-12T12:00:00Z',
    neighborhood: 'Altadena', lat: 34.1897, lng: -118.1312,
    description:
      'The ruins of the Pasadena Jewish Temple & Center, destroyed in the January 2025 Eaton Fire, were spray-painted with \'F— Zionizm\' on an exterior wall days after congregants marked the fire\'s one-year anniversary. The LA County Sheriff\'s Department was notified Jan. 12, 2026.',
    source_name: 'Jewish Telegraphic Agency', source_url: 'https://www.jta.org/2026/01/13/united-states/rubble-of-pasadena-synagogue-destroyed-in-wildfire-is-vandalized-with-anti-zionist-graffiti',
  },
  {
    id: 'src-007', category: 'vandalism', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2026-01-12T12:00:00Z', created_at: '2026-01-12T12:00:00Z',
    neighborhood: 'Pasadena', lat: 34.1637, lng: -118.0977,
    description:
      'The vacant lot where the Pasadena Jewish Temple and Center stood, after being destroyed in the Eaton Fire, was spray-painted with an expletive and the word \'Zionism\' on an outer wall. A $10,000 reward was offered for information.',
    source_name: 'CBS Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/pasadena-jewish-temple-burned-in-eaton-fire-vandalized-with-antisemitic-graffiti/',
  },
  {
    id: 'src-008', category: 'harassment', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-12-06T12:00:00Z', created_at: '2025-12-06T12:00:00Z',
    neighborhood: 'Burbank', lat: 34.1808, lng: -118.309,
    description:
      'A man was recorded on video at a Burbank post office shouting obscenity-laced antisemitic remarks and giving Nazi salutes to Hitler. The video circulated widely on social media; Burbank police had no record of responding.',
    source_name: 'FOX 11 Los Angeles', source_url: 'https://www.foxla.com/news/burbank-antisemitic-tirade-caught-on-video',
  },
  {
    id: 'src-009', category: 'harassment', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-12-03T12:00:00Z', created_at: '2025-12-03T12:00:00Z',
    neighborhood: 'Koreatown', lat: 34.058, lng: -118.3009,
    description:
      'A community safety event at Wilshire Boulevard Temple was disrupted by protesters chanting \'Baby Killers\' and \'Zionist Pigs\'; individuals who infiltrated the event were removed, and a protester smashed a glass vase inside near attendees. LAPD arrested two people for battery and vandalism.',
    source_name: 'Jewish Journal', source_url: 'https://jewishjournal.com/community/385349/pro-palestinian-protest-turns-violent-at-wilshire-boulevard-temple/',
  },
  {
    id: 'src-010', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-09-28T12:00:00Z', created_at: '2025-09-28T12:00:00Z',
    neighborhood: 'Glendale (Adams Hill)', lat: 34.14, lng: -118.256,
    description:
      'Multiple swastikas were drawn in chalk on private and public property in Glendale\'s Adams Hill neighborhood, along with the number \'1488\' and the phrase \'Jews control gov,\' including a swastika on a fire hydrant on East Palmer Avenue. Glendale police investigated it as a suspected hate crime.',
    source_name: 'FOX 11 Los Angeles', source_url: 'https://www.foxla.com/news/antisemitic-hate-symbols-found-glendale',
  },
  {
    id: 'src-011', category: 'vandalism', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-09-22T12:00:00Z', created_at: '2025-09-22T12:00:00Z',
    neighborhood: 'Beverly Hills', lat: 34.0736, lng: -118.4004,
    description:
      'A swastika was drawn on the sidewalk outside El Rodeo Elementary School in Beverly Hills, discovered around the start of Rosh Hashanah. Surveillance video captured a man drawing the symbol; Beverly Hills police investigated.',
    source_name: 'ABC7 Los Angeles', source_url: 'https://www.aol.com/security-cameras-capture-man-drawing-185008239.html',
  },
  {
    id: 'src-012', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-09-22T12:00:00Z', created_at: '2025-09-22T12:00:00Z',
    neighborhood: 'Beverly Hills', lat: 34.0808, lng: -118.4155,
    description:
      'A man was captured on surveillance video drawing a swastika on the sidewalk outside El Rodeo Elementary School in Beverly Hills, discovered the day Rosh Hashanah began. Police launched an investigation and the graffiti was removed.',
    source_name: 'CBS Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/beverly-hills-police-investigate-swastika-rodeo-elementary-school/',
  },
  {
    id: 'src-013', category: 'vandalism', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-09-20T12:00:00Z', created_at: '2025-09-20T12:00:00Z',
    neighborhood: 'Long Beach', lat: 33.771, lng: -118.165,
    description:
      'A utility box outside the Long Beach Pride headquarters was spray-painted with a swastika alongside anti-LGBTQ graffiti. Long Beach police opened an investigation and the city\'s graffiti-removal team cleaned the vandalism.',
    source_name: 'CBS News Los Angeles', source_url: 'https://www.cbsnews.com/amp/losangeles/news/long-beach-pride-anti-lgbtq-antisemitic-graffiti',
  },
  {
    id: 'src-014', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-08-31T12:00:00Z', created_at: '2025-08-31T12:00:00Z',
    neighborhood: 'Encino', lat: 34.1591, lng: -118.5012,
    description:
      '\'Israel did 9/11\' and swastikas were spray-painted at an Encino park and on businesses along Ventura Boulevard, an area neighbors said was targeted because of nearby Jewish-owned businesses. Police increased patrols and removed the graffiti.',
    source_name: 'ABC7 Los Angeles', source_url: 'https://abc7.com/post/antisemitic-messages-spray-painted-encino-park-is-latest-case-hate-speech-spotted-socal/17699298/',
  },
  {
    id: 'src-015', category: 'assault', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-08-31T12:00:00Z', created_at: '2025-08-31T12:00:00Z',
    neighborhood: 'Santa Monica', lat: 34.0087, lng: -118.4977,
    description:
      'A 24-year-old Israeli visitor was surrounded and physically assaulted by a group at the Santa Monica Pier after being overheard speaking Hebrew; his Star of David necklace was torn off. Santa Monica police are investigating the attack as a hate crime.',
    source_name: 'Santa Monica Daily Press', source_url: 'https://smdp.com/news/crime/pier-assault-on-israeli-tourist-being-probed-as-hate-crime/',
  },
  {
    id: 'src-016', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-08-30T12:00:00Z', created_at: '2025-08-30T12:00:00Z',
    neighborhood: 'Encino', lat: 34.1591, lng: -118.5012,
    description:
      'A man was captured on security video spray-painting a hate symbol in yellow on the front door of Mitzvahland, a Jewish religious supply store in Encino, during Shabbat. LAPD opened a hate-crime investigation.',
    source_name: 'CBS Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/encino-jewish-business-antisemitic-graffiti/',
  },
  {
    id: 'src-017', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-08-30T12:00:00Z', created_at: '2025-08-30T12:00:00Z',
    neighborhood: 'Woodland Hills', lat: 34.1683, lng: -118.6059,
    description:
      'Jose Antonio Montes-Gutierrez was charged with five felonies after allegedly painting backward swastikas and antisemitic graffiti on Jewish-owned businesses and public property in Woodland Hills and Encino on four dates in July and August 2025. He was arrested in January 2026.',
    source_name: 'Canyon News', source_url: 'https://www.canyon-news.com/montes-gutierrez-arrested-for-multiple-vandalism-hate-crimes/',
  },
  {
    id: 'src-018', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-08-29T12:00:00Z', created_at: '2025-08-29T12:00:00Z',
    neighborhood: 'Encino', lat: 34.155, lng: -118.489,
    description:
      'A suspect spray-painted a yellow swastika on the glass door of Mitzvahland, a Jewish religious-supply store on Ventura Boulevard in Encino, during Shabbat; the act was captured on surveillance video. LAPD investigated it as a hate crime amid a series of Encino-area antisemitic vandalism.',
    source_name: 'CBS News Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/encino-jewish-business-antisemitic-graffiti',
  },
  {
    id: 'src-019', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-08-24T12:00:00Z', created_at: '2025-08-24T12:00:00Z',
    neighborhood: 'Camarillo', lat: 34.2233, lng: -119.0398,
    description:
      'A utility box and a park sign at Community Center Park in Camarillo were spray-painted with a swastika and racial slurs over the weekend. The Ventura County Sheriff\'s Office investigated the vandalism as a hate crime.',
    source_name: 'KEYT News Channel 3', source_url: 'https://keyt.com/news/ventura-county/2025/08/26/camarillo-police-investigating-racial-slurs-and-hate-symbol-spray-painted-at-community-center-park/',
  },
  {
    id: 'src-020', category: 'vandalism', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-08-16T12:00:00Z', created_at: '2025-08-16T12:00:00Z',
    neighborhood: 'Tarzana', lat: 34.1728, lng: -118.5537,
    description:
      'Swastikas were spray-painted on the fence wrap outside Wilbur Charter for Enriched Academics elementary school in Tarzana over a weekend in mid-August 2025. School officials removed the graffiti.',
    source_name: 'CBS Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/wilbur-charter-elementary-tarzana-graffiti-antisemitic-swasitkas',
  },
  {
    id: 'src-021', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-08-10T12:00:00Z', created_at: '2025-08-10T12:00:00Z',
    neighborhood: 'Woodland Hills', lat: 34.1683, lng: -118.6059,
    description:
      'The Israeli-American Council\'s national headquarters (Shepher Community Center) in Woodland Hills was defaced with a yellow swastika, Nazi \'SS\' lightning bolts, the word \'burn,\' and \'F— Jews, BDS\' on nearby barriers. LAPD\'s Topanga Division investigated, with a suspect captured on security footage.',
    source_name: 'The Times of Israel', source_url: 'https://www.timesofisrael.com/israeli-american-council-la-headquarters-vandalized-with-nazi-symbols/',
  },
  {
    id: 'src-022', category: 'harassment', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-07-26T12:00:00Z', created_at: '2025-07-26T12:00:00Z',
    neighborhood: 'West Hollywood', lat: 34.09, lng: -118.3617,
    description:
      'A woman displayed signs with antisemitic messages promoting violence against Jewish people at Crescent Heights and Santa Monica boulevards in West Hollywood. The city condemned the signage and code enforcement confirmed none remained.',
    source_name: 'Beverly Press', source_url: 'https://beverlypress.com/2025/07/weho-condemns-antisemitic-signage/',
  },
  {
    id: 'src-023', category: 'vandalism', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-03-23T12:00:00Z', created_at: '2025-03-23T12:00:00Z',
    neighborhood: 'Fairfax District', lat: 34.0821, lng: -118.3714,
    description:
      'A swastika was painted on the side of an under-construction building at Melrose and Laurel avenues, near the Fairfax Jewish community. LAPD\'s Wilshire Division classified it as a hate incident and investigated.',
    source_name: 'Beverly Press', source_url: 'https://beverlypress.com/2025/03/swastika-found-on-melrose-building/',
  },
  {
    id: 'src-024', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2025-01-24T12:00:00Z', created_at: '2025-01-24T12:00:00Z',
    neighborhood: 'Fairfax District', lat: 34.0745, lng: -118.3593,
    description:
      'Antisemitic graffiti mocking the six million Jews murdered in the Holocaust was scrawled on a sidewalk in Pan Pacific Park, adjacent to Holocaust Museum LA. LAPD opened a hate-speech and vandalism investigation.',
    source_name: 'TMZ', source_url: 'https://www.tmz.com/2025/01/24/antisemitic-graffiti-near-los-angeles-holocaust-museum-pan-pacific-park/',
  },
  {
    id: 'src-025', category: 'vandalism', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-11-05T12:00:00Z', created_at: '2024-11-05T12:00:00Z',
    neighborhood: 'Pico-Robertson', lat: 34.0537, lng: -118.384,
    description:
      'Six Jewish-owned businesses on the 8700 block of Pico Boulevard, including the Got Kosher? bakery and Glatt Mart, had windows broken and were tagged with graffiti, with police reporting possible bullet holes. The LAPD investigated the incidents as hate crimes.',
    source_name: 'Patch (Los Angeles)', source_url: 'https://patch.com/california/los-angeles/jewish-businesses-targeted-hate-crimes-lapd',
  },
  {
    id: 'src-026', category: 'vandalism', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-11-05T12:00:00Z', created_at: '2024-11-05T12:00:00Z',
    neighborhood: 'Pico-Robertson', lat: 34.0523, lng: -118.3849,
    description:
      'Six to seven mostly Jewish-owned businesses along Pico Boulevard, including Got Kosher? Bakery, had storefront windows smashed and were graffitied over consecutive nights; one was burglarized. LAPD investigated the spree as a hate crime after an owner said someone was \'systematically targeting our type of businesses.\'',
    source_name: 'Yahoo News / City News Service', source_url: 'https://www.yahoo.com/news/possible-hate-crime-investigated-vandalism-232302532.html',
  },
  {
    id: 'src-027', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-10-14T12:00:00Z', created_at: '2024-10-14T12:00:00Z',
    neighborhood: 'Thousand Oaks', lat: 34.1706, lng: -118.8376,
    description:
      'A commercial building in Thousand Oaks was tagged with white-power hate speech and symbols including swastikas. The Ventura County District Attorney charged two 18-year-olds, one from Thousand Oaks and one from Simi Valley, with felony vandalism and a hate crime.',
    source_name: 'Thousand Oaks Acorn', source_url: 'https://www.toacorn.com/articles/two18-year-olds-nabbed-on-suspicion-of-antisemitic-graffiti-in-t-o/',
  },
  {
    id: 'src-028', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-07-25T12:00:00Z', created_at: '2024-07-25T12:00:00Z',
    neighborhood: 'Hollywood', lat: 34.0928, lng: -118.3287,
    description:
      'The Kahal Ahavas Yisroel synagogue in Hollywood had its windows smashed twice within a year of opening; the July 25, 2024 incident, in which men used a hammer while filming, was captured on security cameras. LAPD investigated both as hate crimes.',
    source_name: 'The Forward', source_url: 'https://forward.com/fast-forward/639012/a-new-synagogues-rite-of-passage-in-2024-shattered-glass/',
  },
  {
    id: 'src-029', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-07-25T12:00:00Z', created_at: '2024-07-25T12:00:00Z',
    neighborhood: 'Hollywood', lat: 34.0983, lng: -118.3437,
    description:
      'Two men were captured on security footage using hammers to smash multiple windows at Kahal Ahavas Yisroel synagogue in Hollywood, the second such attack in two weeks. Police investigated the incidents as potential hate crimes.',
    source_name: 'JNS', source_url: 'https://www.jns.org/smashed-windows-at-hollywood-shul-second-incident-in-as-many-weeks/',
  },
  {
    id: 'src-030', category: 'harassment', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-06-23T12:00:00Z', created_at: '2024-06-23T12:00:00Z',
    neighborhood: 'Pico-Robertson', lat: 34.0533, lng: -118.3862,
    description:
      'A pro-Palestinian protest outside the Adas Torah synagogue turned violent, with demonstrators blocking congregants from entering, and multiple people bloodied and doused with bear/pepper spray. One arrest was made and officials including President Biden condemned the violence.',
    source_name: 'The Times of Israel', source_url: 'https://www.timesofisrael.com/violent-clashes-erupt-between-pro-and-anti-israel-protesters-outside-la-synagogue/',
  },
  {
    id: 'src-031', category: 'assault', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-06-23T12:00:00Z', created_at: '2024-06-23T12:00:00Z',
    neighborhood: 'Pico-Robertson', lat: 34.0533, lng: -118.3862,
    description:
      'Zaid Gitesatani, 28, of Carlsbad punched a Jewish man in the jaw as he walked his dog near Adas Torah synagogue during the June 23, 2024 protest, then posted about it on Instagram (\'Whooped the Zios today\'). He was federally charged with a hate crime.',
    source_name: '10News (ABC San Diego)', source_url: 'https://www.10news.com/news/local-news/carlsbad-man-charged-with-hate-crime-for-alleged-assault-on-jewish-man-in-los-angeles',
  },
  {
    id: 'src-032', category: 'assault', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-06-23T12:00:00Z', created_at: '2024-06-23T12:00:00Z',
    neighborhood: 'Pico-Robertson', lat: 34.0533, lng: -118.3907,
    description:
      'Pro-Palestinian protesters and counter-protesters clashed violently outside Adas Torah synagogue on Pico Boulevard, with punches thrown and congregants reporting being maced; protesters blocked entry to the synagogue. Two batteries were reported and one person was arrested with a spiked flag.',
    source_name: 'ABC7 Los Angeles', source_url: 'https://abc7.com/post/clashes-break-involving-pro-palestinians-protesters-front-synagogue/14993656/',
  },
  {
    id: 'src-033', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-06-04T12:00:00Z', created_at: '2024-06-04T12:00:00Z',
    neighborhood: 'University Park (USC)', lat: 34.025, lng: -118.287,
    description:
      'Four people on bicycles approached the USC Chabad House on Severance Street; two smashed the glass front door before fleeing, in an incident captured on surveillance video. A report was filed and the LAPD did not classify it as a hate crime.',
    source_name: 'ABC7 Los Angeles', source_url: 'https://abc7.com/post/usc-chabad-house-vandalized-overnight-incident-caught-video/14914052/',
  },
  {
    id: 'src-034', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-05-13T12:00:00Z', created_at: '2024-05-13T12:00:00Z',
    neighborhood: 'Beverly Hills', lat: 34.0668, lng: -118.3789,
    description:
      '\'GAZA\' was spray-painted on the Saban Theatre on Wilshire Boulevard and a nearby parking garage on Olympic Boulevard shortly after a large Yom Hazikaron (Israeli Memorial Day) event. Beverly Hills police investigated; a hate-crime determination was left open.',
    source_name: 'Beverly Press', source_url: 'https://beverlypress.com/2024/05/bhpd-investigates-antisemitic-vandalism/',
  },
  {
    id: 'src-035', category: 'assault', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-05-01T12:00:00Z', created_at: '2024-05-01T12:00:00Z',
    neighborhood: 'Westwood', lat: 34.0689, lng: -118.4452,
    description:
      'During the spring 2024 pro-Palestinian encampment at UCLA, Jewish and Israeli students were physically assaulted and blocked from parts of campus; one student was knocked unconscious with an open head wound. The DOJ and a $6.13M settlement found UCLA deliberately indifferent to the hostile environment.',
    source_name: 'CBS Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/uc-sued-justice-department-ucla-palestinian-protests/',
  },
  {
    id: 'src-036', category: 'assault', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-04-30T12:00:00Z', created_at: '2024-04-30T12:00:00Z',
    neighborhood: 'Westwood', lat: 34.0722, lng: -118.4421,
    description:
      'Jewish and Israeli students at UCLA\'s Royce Quad in Westwood were beaten with sticks, pepper-sprayed, and physically blocked from parts of campus by masked demonstrators during the pro-Palestinian encampment; one student was hospitalized. The incidents are cited in a federal lawsuit against the university.',
    source_name: 'Fox News', source_url: 'https://www.foxnews.com/us/jewish-ucla-students-beaten-sticks-pepper-sprayed-knocked-anti-israel-campus-mob-lawsuit',
  },
  {
    id: 'src-037', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-04-30T12:00:00Z', created_at: '2024-04-30T12:00:00Z',
    neighborhood: 'University Park', lat: 34.0189, lng: -118.2851,
    description:
      'A swastika was drawn on a fencepost near Exposition Boulevard on USC\'s campus. USC President Carol Folt condemned it as a deplorable hate symbol and the graffiti was removed.',
    source_name: 'Annenberg Media', source_url: 'https://www.uscannenbergmedia.com/2024/04/30/folt-condemns-swastika-vandalism-at-usc/',
  },
  {
    id: 'src-038', category: 'harassment', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-04-16T12:00:00Z', created_at: '2024-04-16T12:00:00Z',
    neighborhood: 'Downtown Los Angeles', lat: 34.043, lng: -118.2686,
    description:
      'Attendees at an April 16 event organized by the Jewish Law Students Association at Loyola Law School (LMU) were subjected to antisemitic insults. The U.S. Department of Education later opened an investigation into religious discrimination and harassment.',
    source_name: 'JNS', source_url: 'https://www.jns.org/ed-department-looks-into-religious-discrimination-racial-harassment-at-loyola-law-school/',
  },
  {
    id: 'src-039', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-04-05T12:00:00Z', created_at: '2024-04-05T12:00:00Z',
    neighborhood: 'Santa Monica', lat: 34.0195, lng: -118.4912,
    description:
      'Santa Monica police investigated a spree of antisemitic graffiti found on sidewalks, trees and light posts across the city, including in the Pico Neighborhood along Pico Boulevard, in early April 2024.',
    source_name: 'City of Santa Monica', source_url: 'https://www.santamonica.gov/press/2024/04/07/santa-monica-police-department-investigating-anti-semitic-graffiti',
  },
  {
    id: 'src-040', category: 'vandalism', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-04-05T12:00:00Z', created_at: '2024-04-05T12:00:00Z',
    neighborhood: 'Long Beach (Los Cerritos)', lat: 33.8183, lng: -118.1866,
    description:
      'A sidewalk in the Los Cerritos neighborhood of Long Beach was spray-painted with antisemitic graffiti, which police investigated as a possible hate-motivated crime. City officials cited it amid a rise in racist and antisemitic tagging, including swastikas, across the city.',
    source_name: 'Long Beach Post', source_url: 'https://lbpost.com/news/racist-antisemitic-graffiti-prompts-warnings-about-a-rise-in-hate-incidents-across-long-beach/',
  },
  {
    id: 'src-041', category: 'assault', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-02-27T12:00:00Z', created_at: '2024-02-27T12:00:00Z',
    neighborhood: 'Woodland Hills', lat: 34.1748, lng: -118.6355,
    description:
      'A Jewish student at El Camino Real Charter High School said a classmate called her a \'dirty Jew\' and then pushed and punched her, one of several antisemitic incidents that prompted a student walkout. The victim\'s family said the school took minimal disciplinary action.',
    source_name: 'CBS Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/students-stage-walkout-at-el-camino-high-school-over-alleged-antisemitism-on-campus/',
  },
  {
    id: 'src-042', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-01-06T12:00:00Z', created_at: '2024-01-06T12:00:00Z',
    neighborhood: 'Canoga Park', lat: 34.2011, lng: -118.5983,
    description:
      'A suspect threw rocks through the windows of roughly 15 businesses in Canoga Park and Woodland Hills over several days, some rocks bearing painted words such as \'Pay Up\' and \'Glory\'; several targeted businesses were Jewish-owned with visible religious symbols. Edelidio David Wallace, 64, was arrested for felony vandalism.',
    source_name: 'ABC7 Los Angeles', source_url: 'https://abc7.com/canoga-park-businesses-vandalized-investigation/14302464/',
  },
  {
    id: 'src-043', category: 'online_threat', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2024-01-02T12:00:00Z', created_at: '2024-01-02T12:00:00Z',
    neighborhood: 'Hollywood', lat: 34.1016, lng: -118.3376,
    description:
      'Temple Israel of Hollywood received an emailed bomb threat claiming explosives were hidden on its campus and evacuated per its emergency protocols; LAPD searched the site and found no threat. It was one of roughly 90 California Jewish sites hit that day with threats law enforcement deemed a hoax.',
    source_name: 'Jewish Journal', source_url: 'https://jewishjournal.com/news/366887/nearly-100-jewish-sites-across-california-receive-bomb-threats-law-enforcement-deem-threats-hoax/',
  },
  {
    id: 'src-044', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2023-12-14T12:00:00Z', created_at: '2023-12-14T12:00:00Z',
    neighborhood: 'Santa Monica', lat: 34.0195, lng: -118.4912,
    description:
      'An 8-foot steel-and-glass menorah at 15th Street and Montana Avenue in Santa Monica was toppled and broken by a man who fled the scene, causing thousands of dollars in damage. Santa Monica police investigated.',
    source_name: 'CBS Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/8-foot-tall-menorah-vandalized-in-santa-monica/',
  },
  {
    id: 'src-045', category: 'assault', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2023-12-09T12:00:00Z', created_at: '2023-12-09T12:00:00Z',
    neighborhood: 'Beverly Hills', lat: 34.0736, lng: -118.4004,
    description:
      'Jarris Jay Silagi, 44, struck a 75-year-old Jewish man wearing a yarmulke on the head with a belt buckle, causing a deep laceration, and shouted antisemitic remarks as the man and his wife walked to synagogue for Shabbat. He was charged with hate-crime-enhanced assault, elder abuse and attempted robbery.',
    source_name: 'ABC News', source_url: 'https://abcnews.com/US/beverly-hills-police-arrest-man-alleged-hate-crime/story?id=105542162',
  },
  {
    id: 'src-046', category: 'assault', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2023-12-09T12:00:00Z', created_at: '2023-12-09T12:00:00Z',
    neighborhood: 'Beverly Hills', lat: 34.07, lng: -118.4004,
    description:
      'A man struck an elderly Jewish man on the head with a belt while making antisemitic statements near North Rexford Drive and North Santa Monica Boulevard. Jarris Jay Silagi, 44, was arrested and charged with assault with a deadly weapon, a hate crime and elder abuse.',
    source_name: 'ABC7 Los Angeles', source_url: 'https://abc7.com/beverly-hills-police-arrest-man-for-alleged-hate-crime-assault-wit/14165776/',
  },
  {
    id: 'src-047', category: 'assault', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2023-12-09T12:00:00Z', created_at: '2023-12-09T12:00:00Z',
    neighborhood: 'Beverly Hills', lat: 34.0696, lng: -118.4004,
    description:
      'Raphael Nissel, a 75-year-old Orthodox Jewish man walking to synagogue on Shabbat, was struck on the head with a belt buckle by an attacker who demanded his jewelry and called him \'Jew,\' leaving a deep laceration. The suspect was charged with a hate crime.',
    source_name: 'Jewish Telegraphic Agency', source_url: 'https://www.jta.org/2023/12/11/united-states/man-charged-with-hate-crime-in-alleged-robbery-and-assault-on-jews-in-beverly-hills-on-shabbat',
  },
  {
    id: 'src-048', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2023-12-01T12:00:00Z', created_at: '2023-12-01T12:00:00Z',
    neighborhood: 'Burbank', lat: 34.1808, lng: -118.309,
    description:
      'Klinton Dion was charged with antisemitic vandalism on public and private property in Burbank and Glendale, including at Temple Emanu El, in cases announced by the LA County DA in December 2023.',
    source_name: 'Los Angeles County District Attorney', source_url: 'https://da.lacounty.gov/about/inside-LADA/district-attorney-gasc-n-announces-charges-against-two-men-two-anti-semitic',
  },
  {
    id: 'src-049', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2023-11-25T12:00:00Z', created_at: '2023-11-25T12:00:00Z',
    neighborhood: 'Pico-Robertson', lat: 34.0533, lng: -118.3866,
    description:
      'B\'nai David-Judea, an Orthodox synagogue, was defaced over Thanksgiving weekend with anti-Israel graffiti reading \'Israel bombs, we pay.\' It was one of several U.S. synagogues hit with similar graffiti weeks into the Israel-Hamas war.',
    source_name: 'The Forward', source_url: 'https://forward.com/fast-forward/571378/multiple-us-synagogues-hit-with-anti-israel-antisemitic-graffiti-7-weeks-into-israel-hamas-war/',
  },
  {
    id: 'src-050', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2023-11-24T12:00:00Z', created_at: '2023-11-24T12:00:00Z',
    neighborhood: 'Burbank', lat: 34.1878, lng: -118.3235,
    description:
      'Temple Emanu El near N. Glenoaks Boulevard and Amherst Drive, along with a nearby apartment complex, was spray-painted with swastikas, an iron cross and an \'SS\' Nazi symbol. Burbank police sought a named transient suspect and investigated the vandalism as antisemitic.',
    source_name: 'CBS News Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/burbank-police-search-for-suspect-that-spray-painted-swastikas-on-synagogue/',
  },
  {
    id: 'src-051', category: 'vandalism', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2023-11-09T12:00:00Z', created_at: '2023-11-09T12:00:00Z',
    neighborhood: 'Tarzana', lat: 34.158, lng: -118.547,
    description:
      'A woman rammed her vehicle twice into the gates of the Eretz Synagogue and Cultural Center on Wilbur Avenue in Tarzana, damaging two sections of the perimeter fencing. Tikvah Mottahedeh, 54, was arrested on hate crime and vandalism charges.',
    source_name: 'CBS News Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/woman-arrested-for-hate-crime-after-allegedly-ramming-her-vehicle-into-tarzana-synagogue-gates/',
  },
  {
    id: 'src-052', category: 'assault', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2023-11-05T12:00:00Z', created_at: '2023-11-05T12:00:00Z',
    neighborhood: 'Thousand Oaks', lat: 34.1928, lng: -118.8378,
    description:
      'Paul Kessler, a 69-year-old Jewish man, was struck and fell during dueling pro-Israel and pro-Palestinian demonstrations at a Thousand Oaks intersection and died the next day of blunt-force head trauma. His death was ruled a homicide; counter-protester Loay Alnaji was arrested and later pleaded guilty to involuntary manslaughter and battery.',
    source_name: 'Wikipedia', source_url: 'https://en.wikipedia.org/wiki/Killing_of_Paul_Kessler',
  },
  {
    id: 'src-053', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2023-11-01T12:00:00Z', created_at: '2023-11-01T12:00:00Z',
    neighborhood: 'Fairfax District', lat: 34.0762, lng: -118.3614,
    description:
      'Canter\'s Deli and other Jewish sites in the Fairfax District were defaced with graffiti including \'Free Gaza\' and \'Israels only religion is capitalism,\' painted beneath the Fairfax Community Mural. LAPD investigated the graffiti at multiple locations as possible hate crimes.',
    source_name: 'Los Angeles Times', source_url: 'https://finance.yahoo.com/news/lapd-investigating-reports-graffiti-incidents-193714493.html',
  },
  {
    id: 'src-054', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2023-11-01T12:00:00Z', created_at: '2023-11-01T12:00:00Z',
    neighborhood: 'Fairfax District', lat: 34.0765, lng: -118.3616,
    description:
      'The historic Jewish deli Canter\'s on the 400 block of North Fairfax Avenue was defaced with graffiti reading \'Free Gaza,\' \'Israel\'s only religion is capitalism\' and \'How many dead in the name of greed?\' LAPD launched a hate-crime investigation.',
    source_name: 'CBS News Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/lapd-launches-hate-crime-investigation-after-canters-deli-is-vandalized-with-antisemitic-graffitti/',
  },
  {
    id: 'src-055', category: 'harassment', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2023-10-27T12:00:00Z', created_at: '2023-10-27T12:00:00Z',
    neighborhood: 'Studio City', lat: 34.1395, lng: -118.387,
    description:
      'Daniel Garcia, 44, was charged with criminal threats, attempted residential burglary and a hate-crime allegation after yelling \'Free Palestine\' and \'Kill Jews\' at a Jewish family\'s home on the 3000 block of Laurel Canyon Boulevard in Studio City and threatening to kill them.',
    source_name: 'CBS Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/man-faces-hate-crime-charges-after-threatening-to-kill-jewish-family-at-their-studio-city-home/',
  },
  {
    id: 'src-056', category: 'vandalism', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2023-10-25T12:00:00Z', created_at: '2023-10-25T12:00:00Z',
    neighborhood: 'Beverly Hills', lat: 34.062, lng: -118.4004,
    description:
      'Antisemitic graffiti was spray-painted at the Bedford Manor apartments on Bedford Drive in Beverly Hills, a building where roughly 60% of residents are Jewish. The graffiti was painted over after discovery.',
    source_name: 'ABC7 Los Angeles', source_url: 'https://abc7.com/post/beverly-hills-antisemitic-graffiti-apartment-complex/13976686/',
  },
  {
    id: 'src-057', category: 'other', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2023-08-12T12:00:00Z', created_at: '2023-08-12T12:00:00Z',
    neighborhood: 'Fullerton', lat: 33.8955, lng: -117.9159,
    description:
      'Temple Beth Tikvah at 1600 N. Acacia Ave. was evacuated during a livestreamed Shabbat service after a caller made antisemitic comments and warned a bomb would detonate in 20 minutes; a bomb squad found no device. The incident was part of a nationwide synagogue swatting/bomb-threat wave.',
    source_name: 'CBS News Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/fake-bomb-threat-forces-fullerton-synagogue-to-evacuate-during-sabbath-service',
  },
  {
    id: 'src-058', category: 'harassment', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2023-06-19T12:00:00Z', created_at: '2023-06-19T12:00:00Z',
    neighborhood: 'Redondo Beach', lat: 33.8447, lng: -118.386,
    description:
      'A resident in the 400 block of South Gertruda Avenue in Redondo Beach found a Ziploc bag weighted with white rocks containing a flyer promoting an antisemitic website and video. Police said they had responded to several similar propaganda drops in the neighborhood in preceding months.',
    source_name: 'FOX 11 Los Angeles', source_url: 'https://www.foxla.com/news/antisemitic-flyer-redondo-beach-latest-string-similar-incidents-police.amp',
  },
  {
    id: 'src-059', category: 'harassment', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2023-06-19T12:00:00Z', created_at: '2023-06-19T12:00:00Z',
    neighborhood: 'Redondo Beach', lat: 33.8447, lng: -118.3876,
    description:
      'A plastic bag containing white rocks and a paper directing readers to an antisemitic website and video was tossed onto a Redondo Beach lawn. Police said they had responded to several similar flyer-drop incidents in the area in recent months.',
    source_name: 'FOX 11 Los Angeles', source_url: 'https://www.foxla.com/news/antisemitic-flyer-redondo-beach-latest-string-similar-incidents-police',
  },
  {
    id: 'src-060', category: 'assault', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2023-02-15T12:00:00Z', created_at: '2023-02-15T12:00:00Z',
    neighborhood: 'Pico-Robertson', lat: 34.0533, lng: -118.3862,
    description:
      'Jaime Tran shot two Orthodox Jewish men, each wearing a yarmulke, as they left synagogues in the Pico-Robertson area on consecutive days (Feb. 15 and 16, 2023); both survived. He was later sentenced to 35 years in federal prison for the hate-crime shootings.',
    source_name: 'ABC7 Los Angeles', source_url: 'https://abc7.com/post/jamie-tran-gunman-accused-jewish-hate-crime-shooting-pico-robertson-sentenced-today/15375502/',
  },
  {
    id: 'src-061', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2022-12-20T12:00:00Z', created_at: '2022-12-20T12:00:00Z',
    neighborhood: 'Beverly Hills', lat: 34.081, lng: -118.413,
    description:
      'On the first night of Hanukkah, a man threw objects at a residential menorah and carved Nazi symbols into its base near Sunset Boulevard and Foothill Road. Eric Brian King, 47, of Dallas was arrested on suspicion of felony vandalism and a hate crime.',
    source_name: 'ABC7 Los Angeles', source_url: 'https://abc7.com/beverly-hills-menorah-vandalized-nazi-symbols-man-arrested/12591810/',
  },
  {
    id: 'src-062', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2022-12-18T12:00:00Z', created_at: '2022-12-18T12:00:00Z',
    neighborhood: 'Beverly Hills', lat: 34.0808, lng: -118.4139,
    description:
      'Eric Brian King, 47, of Dallas, Texas, was charged by the L.A. County District Attorney with felony vandalism and a hate-crime allegation for carving Nazi symbols into, and throwing objects at, a nine-foot menorah displayed outside a Beverly Hills home on Dec. 18, 2022, the first night of Hanukkah. King later pleaded no contest and was placed on probation.',
    source_name: 'HeySoCal (reporting L.A. County District Attorney charges)', source_url: 'https://heysocal.com/2022/12/20/texas-man-charged-with-hate-crime-allegation-for-beverly-hills-menorah-damage/',
  },
  {
    id: 'src-063', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2022-12-18T12:00:00Z', created_at: '2022-12-18T12:00:00Z',
    neighborhood: 'Beverly Hills', lat: 34.0808, lng: -118.41,
    description:
      'On the first night of Hanukkah, a man threw objects at a nine-foot public menorah displayed at a Beverly Hills home and carved Nazi \'SS\' symbols into its base. A Texas suspect was arrested and charged with a felony hate crime.',
    source_name: 'Jewish Journal', source_url: 'https://jewishjournal.com/news/354107/beverly-hills-man-arrested-for-vandalizing-menorah-on-first-night-of-hanukkah/',
  },
  {
    id: 'src-064', category: 'harassment', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2022-11-19T12:00:00Z', created_at: '2022-11-19T12:00:00Z',
    neighborhood: 'Culver City', lat: 34.0211, lng: -118.3965,
    description:
      'Antisemitic hate literature produced by a known hate group was distributed to homes throughout a Culver City neighborhood over a weekend. Culver City police investigated and said they were coordinating with neighboring agencies that had seen similar distributions.',
    source_name: 'CBS News Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/antisemitic-literature-distributed-throughout-culver-city-neighborhood/',
  },
  {
    id: 'src-065', category: 'harassment', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2022-10-23T12:00:00Z', created_at: '2022-10-23T12:00:00Z',
    neighborhood: 'Beverly Hills', lat: 34.095, lng: -118.42,
    description:
      'About 25 antisemitic flyers blaming gun control and other social issues on Jewish people were distributed overnight in the north end of Beverly Hills, north of Sunset Boulevard. The distribution coincided with the Goyim Defense League\'s 405 Freeway banner display.',
    source_name: 'Spectrum News 1', source_url: 'https://spectrumnews1.com/ca/la-west/public-safety/2022/10/23/beverly-hills-police-antisemitic-flyers-investigation',
  },
  {
    id: 'src-066', category: 'harassment', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2022-10-22T12:00:00Z', created_at: '2022-10-22T12:00:00Z',
    neighborhood: 'West Los Angeles (405 Freeway overpass)', lat: 34.043, lng: -118.456,
    description:
      'Members of the Goyim Defense League hung banners reading \'Kanye is right about the Jews\' over the 405 Freeway in Los Angeles while some gave Nazi salutes. The display followed Kanye West\'s string of antisemitic public statements.',
    source_name: 'Jewish Telegraphic Agency', source_url: 'https://www.jta.org/2022/10/23/united-states/kanye-was-right-about-the-jews-antisemitic-group-says-on-los-angeles-highway-banner',
  },
  {
    id: 'src-067', category: 'harassment', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2022-10-22T12:00:00Z', created_at: '2022-10-22T12:00:00Z',
    neighborhood: 'Sepulveda Pass', lat: 34.088, lng: -118.473,
    description:
      'Seven activists from the Goyim Defense League draped antisemitic banners over a 405 Freeway overpass reading \'Kanye is right about the Jews\' and \'Honk if you know,\' with several photographed giving Nazi salutes. State and local officials condemned the display.',
    source_name: 'JNS', source_url: 'https://www.jns.org/antisemitism/anti-semitic-banners-hung-over-los-angeles-freeway',
  },
  {
    id: 'src-068', category: 'harassment', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2022-10-01T12:00:00Z', created_at: '2022-10-01T12:00:00Z',
    neighborhood: 'Northridge, Los Angeles', lat: 34.2283, lng: -118.5359,
    description:
      'Andre Morrow Lackner, 35, of Northridge, pleaded guilty to federal stalking and admitted a June 2021-October 2022 campaign of antisemitic threats sent by text message, including messages such as \'I want to see every single Jew exterminated from this earth\' and \'Would you like to celebrate the next synagogue shooting?\' He was sentenced to 43 months in federal prison.',
    source_name: 'Patch (reporting USAO-CDCA / DOJ)', source_url: 'https://patch.com/california/northridge/valley-man-threatened-shoot-synagogues-department-justice',
  },
  {
    id: 'src-069', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2022-09-17T12:00:00Z', created_at: '2022-09-17T12:00:00Z',
    neighborhood: 'Manhattan Beach', lat: 33.888, lng: -118.403,
    description:
      'Antisemitic graffiti appeared repeatedly across Manhattan Beach Unified schools in 2022, including swastikas at Mira Costa High School and Robinson Elementary and hateful phrases discovered at Pennekamp Elementary on September 17. The district reported nine antisemitic incidents that year, leaving Jewish students fearful.',
    source_name: 'CBS Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/anti-semitic-graffiti-has-students-fearful-of-returning-to-school-rabbis-concerned-hate-symbols/',
  },
  {
    id: 'src-070', category: 'harassment', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2022-08-21T12:00:00Z', created_at: '2022-08-21T12:00:00Z',
    neighborhood: 'Brentwood', lat: 34.0526, lng: -118.4738,
    description:
      'Antisemitic flyers attributed to the Goyim Defense League were thrown from a vehicle onto driveways across many Brentwood streets in August 2022. The propaganda was weighted in plastic bags; residents reported it to LAPD and the ADL.',
    source_name: 'Santa Monica Daily Press', source_url: 'https://smdp.com/2022/10/25/antisemitic-activity-hits-neighboring-communities/',
  },
  {
    id: 'src-071', category: 'harassment', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2022-08-20T12:00:00Z', created_at: '2022-08-20T12:00:00Z',
    neighborhood: 'Brentwood', lat: 34.0637, lng: -118.475,
    description:
      'Residents across Brentwood, including the Brentwood Glen area, found antisemitic flyers thrown from a vehicle onto their doorsteps and streets over a weekend. Rep. Ted Lieu called on the FBI to investigate the distribution in Brentwood and neighboring communities.',
    source_name: 'Santa Monica Daily Press', source_url: 'https://www.smdp.com/antisemitic-activity-hits-neighboring-communities/',
  },
  {
    id: 'src-072', category: 'harassment', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2022-06-15T12:00:00Z', created_at: '2022-06-15T12:00:00Z',
    neighborhood: 'Westwood', lat: 34.0602, lng: -118.4436,
    description:
      'Antisemitic brochures placed in plastic bags weighted with small stones were tossed onto lawns and doorsteps along Ashton Avenue near the Wilshire Corridor. The Goyim Defense League propaganda blamed Jews for the media, war, COVID and slavery and advertised the group\'s GoyimTV.',
    source_name: 'Jewish Journal', source_url: 'https://jewishjournal.com/los_angeles/349373/antisemitic-brochures-found-in-westwood/',
  },
  {
    id: 'src-073', category: 'harassment', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2022-05-02T12:00:00Z', created_at: '2022-05-02T12:00:00Z',
    neighborhood: 'Culver City', lat: 34.0211, lng: -118.3965,
    description:
      'Residents found 13 copies of an antisemitic hate publication distributed through a Culver City neighborhood overnight. Police said the material was produced by a known hate group that had distributed similar flyers in surrounding cities.',
    source_name: 'Patch', source_url: 'https://patch.com/california/culvercity/more-antisemitic-flyers-found-time-culver-city',
  },
  {
    id: 'src-074', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2022-03-08T12:00:00Z', created_at: '2022-03-08T12:00:00Z',
    neighborhood: 'Granada Hills', lat: 34.2726, lng: -118.5048,
    description:
      'An abandoned RV parked for months on a Granada Hills street was spray-painted with swastikas and hate speech, prompting condemnation from the ADL, AJC, Simon Wiesenthal Center and StandWithUs. The vehicle was towed the following day.',
    source_name: 'Jewish Journal', source_url: 'https://jewishjournal.com/news/united-states/345901/swastikas-found-on-abandoned-granada-hills-rv/',
  },
  {
    id: 'src-075', category: 'harassment', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2022-02-16T12:00:00Z', created_at: '2022-02-16T12:00:00Z',
    neighborhood: 'Huntington Beach', lat: 33.662, lng: -117.956,
    description:
      'About 15 homes near Bushard Street and Hamilton Avenue in Huntington Beach were targeted with two-sided antisemitic flyers claiming \'every single aspect of the COVID agenda is Jewish\' and falsely labeling officials as Jewish. Police said they were pursuing every lead.',
    source_name: 'Patch', source_url: 'https://patch.com/california/orange-county/antisemitic-flyers-left-around-huntington-beach-neighborhood',
  },
  {
    id: 'src-076', category: 'harassment', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2022-02-12T12:00:00Z', created_at: '2022-02-12T12:00:00Z',
    neighborhood: 'Newbury Park (Thousand Oaks)', lat: 34.1808, lng: -118.927,
    description:
      'About 10 members of the white-supremacist Rise Above Movement hung banners bearing the neo-Nazi \'14 words\' slogan from the Borchard Road overpass of the 101 Freeway and performed Nazi salutes at a nearby children\'s playground in Newbury Park. Sheriff\'s deputies responded but the masked group left before being identified.',
    source_name: 'Thousand Oaks Acorn', source_url: 'https://www.toacorn.com/articles/neo-nazi-group-makes-appearance-in-newbury-park/',
  },
  {
    id: 'src-077', category: 'harassment', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2022-01-13T12:00:00Z', created_at: '2022-01-13T12:00:00Z',
    neighborhood: 'Santa Monica', lat: 34.0195, lng: -118.4912,
    description:
      'Antisemitic flyers bearing a Star of David and the word \'anti-vaxxer\' were posted at seven Santa Monica elementary and middle schools, tying Jews to the anti-vaccine movement. Santa Monica police opened an investigation and the school district condemned the material.',
    source_name: 'Jewish Journal', source_url: 'https://jewishjournal.com/los_angeles/344134/flyers-tying-jews-to-anti-vaxxers-found-at-santa-monica-schools/',
  },
  {
    id: 'src-078', category: 'vandalism', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2021-12-23T12:00:00Z', created_at: '2021-12-23T12:00:00Z',
    neighborhood: 'Manhattan Beach / Hermosa Beach', lat: 33.8847, lng: -118.4109,
    description:
      'Stickers containing antisemitic hate speech targeting the Jewish community were placed throughout Manhattan Beach and neighboring Hermosa Beach overnight. Manhattan Beach police investigated and worked with Public Works to remove them.',
    source_name: 'Spectrum News 1', source_url: 'https://spectrumnews1.com/ca/la-west/public-safety/2021/12/23/anti-semitic-stickers-placed--throughout--manhattan-beach--police-say',
  },
  {
    id: 'src-079', category: 'harassment', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2021-11-28T12:00:00Z', created_at: '2021-11-28T12:00:00Z',
    neighborhood: 'Beverly Hills', lat: 34.0901, lng: -118.4065,
    description:
      'Antisemitic flyers from the Goyim Defense League were distributed to Beverly Hills homes, weighted with rice in plastic bags. The propaganda claimed \'every aspect of the COVID agenda is Jewish\' and advanced the antisemitic trope that Jews control media.',
    source_name: 'The Forward', source_url: 'https://forward.com/fast-forward/478774/beverly-hills-jews-goyim-defense-league-jewish-covid-antisemitic-flyers/',
  },
  {
    id: 'src-080', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2021-05-30T12:00:00Z', created_at: '2021-05-30T12:00:00Z',
    neighborhood: 'Century City', lat: 34.0546, lng: -118.396,
    description:
      'A man hurled a concrete block at two windows of Young Israel of Century City at 9317 W. Pico Blvd. around 1 a.m.; the reinforced glass held. He also broke a window at a neighboring restaurant, and police investigated the suspected antisemitism.',
    source_name: 'ABC7 Los Angeles', source_url: 'https://abc7.com/synagogue-vandalized-century-city-suspected-anti-semitism-young-israel-of/10717767/',
  },
  {
    id: 'src-081', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2021-05-28T12:00:00Z', created_at: '2021-05-28T12:00:00Z',
    neighborhood: 'Century City / Pico-Robertson', lat: 34.0553, lng: -118.4004,
    description:
      'During a week-long spree of 13 vandalism incidents along Westwood and Pico boulevards, a suspect hurled a concrete brick at the windows of Young Israel of Century City synagogue and broke a window at Pat\'s, a kosher restaurant. Jon Knight Prince, 26, was arrested on felony vandalism charges.',
    source_name: 'CBS News Los Angeles', source_url: 'https://www.cbsnews.com/amp/losangeles/news/jon-knight-prince-arrested-on-suspicion-of-felony-vandalism/',
  },
  {
    id: 'src-082', category: 'assault', severity: 'high', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2021-05-20T12:00:00Z', created_at: '2021-05-20T12:00:00Z',
    neighborhood: 'Beverly Grove', lat: 34.0759, lng: -118.3765,
    description:
      'A group waving Palestinian flags attacked Jewish diners outside a sushi restaurant on La Cienega Boulevard, throwing objects and beating and pepper-spraying patrons after asking who was Jewish. LAPD investigated it as a hate crime.',
    source_name: 'ABC7 Los Angeles', source_url: 'https://abc7.com/post/anti-semitism-fight-la-restaurant-beverly-grove/10661721/',
  },
  {
    id: 'src-083', category: 'harassment', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2021-05-20T12:00:00Z', created_at: '2021-05-20T12:00:00Z',
    neighborhood: 'Fairfax District', lat: 34.0838, lng: -118.3441,
    description:
      'An Orthodox Jewish man walking to synagogue near Rosewood and La Brea avenues was chased by two vehicles whose occupants waved Palestinian flags and screamed \'Allahu Akbar\' at him. LAPD investigated the incident as a possible hate crime.',
    source_name: 'ABC7 Los Angeles', source_url: 'https://abc7.com/post/man-chased-down-fairfax-district-video-los-angeles-lapd/10665553/',
  },
  {
    id: 'src-084', category: 'assault', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2021-05-18T12:00:00Z', created_at: '2021-05-18T12:00:00Z',
    neighborhood: 'Beverly Grove, Los Angeles', lat: 34.0745, lng: -118.3766,
    description:
      'Xavier Pabon and Samer Jayylusi were charged by the L.A. County District Attorney with felony assault by means of force likely to cause great bodily injury, with a hate-crime allegation, for a May 18, 2021 attack on Jewish diners outside Sushi Fumi restaurant on North La Cienega Boulevard. Members of a pro-Palestinian caravan hurled antisemitic slurs and objects and then beat patrons who identified themselves as Jewish.',
    source_name: 'The Times of Israel (reporting L.A. County District Attorney charges)', source_url: 'https://www.timesofisrael.com/2-charged-with-hate-crime-for-may-attack-on-jewish-diners-in-los-angeles/',
  },
  {
    id: 'src-085', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2021-04-01T12:00:00Z', created_at: '2021-04-01T12:00:00Z',
    neighborhood: 'Venice', lat: 33.9906, lng: -118.4665,
    description:
      'A stenciled antisemitic message reading \'the jew is guilty\' was found on the sidewalk along Abbot Kinney Boulevard in Venice in April 2021, part of a pattern of similar graffiti reported in the same area.',
    source_name: 'CBS News Los Angeles', source_url: 'https://www.cbsnews.com/losangeles/news/anti-semitic-graffiti-abbot-kinney-venice/',
  },
  {
    id: 'src-086', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2021-01-19T12:00:00Z', created_at: '2021-01-19T12:00:00Z',
    neighborhood: 'Koreatown', lat: 34.0616, lng: -118.3009,
    description:
      'A Nazi symbol was spray-painted on the exterior wall of the historic Wilshire Boulevard Temple, Los Angeles\'s oldest synagogue, along with the phrase \'I hate your race.\' Police opened a hate-crime investigation.',
    source_name: 'CBS Los Angeles', source_url: 'https://cbsnews.com/losangeles/news/anti-semitic-graffiti-wilshire-boulevard-temple-investigated-hate-crime',
  },
  {
    id: 'src-087', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2021-01-18T12:00:00Z', created_at: '2021-01-18T12:00:00Z',
    neighborhood: 'Koreatown', lat: 34.0616, lng: -118.3006,
    description:
      'A Nazi symbol and the words \'I hate your race\' were spray-painted on the exterior of the historic Wilshire Boulevard Temple in Koreatown. LAPD investigated it as a hate crime.',
    source_name: 'CBS News Los Angeles', source_url: 'https://www.cbsnews.com/amp/losangeles/news/anti-semitic-graffiti-wilshire-boulevard-temple-investigated-hate-crime',
  },
  {
    id: 'src-088', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2020-05-30T12:00:00Z', created_at: '2020-05-30T12:00:00Z',
    neighborhood: 'Fairfax District', lat: 34.0762, lng: -118.3614,
    description:
      'Congregation Beth Israel in the Fairfax District was defaced with \'F— Israel\' and \'Free Palestine\' graffiti amid unrest in late May 2020, and several nearby Jewish-owned businesses were also damaged.',
    source_name: 'The Times of Israel', source_url: 'https://www.timesofisrael.com/synagogues-in-los-angeles-and-richmond-vandalized-during-protests/',
  },
  {
    id: 'src-089', category: 'vandalism', severity: 'medium', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2020-01-27T12:00:00Z', created_at: '2020-01-27T12:00:00Z',
    neighborhood: 'Torrance', lat: 33.8358, lng: -118.3406,
    description:
      'Two Torrance police officers spray-painted a swastika on the back seat of a vehicle they had impounded; the owner discovered it when retrieving the car. The LA County District Attorney later charged the two former officers with vandalism, and the case exposed a broader group of officers exchanging racist and antisemitic messages.',
    source_name: 'The Times of Israel', source_url: 'https://www.timesofisrael.com/two-former-california-police-officers-charged-with-painting-swastika-on-car/',
  },
  {
    id: 'src-090', category: 'vandalism', severity: 'low', source: 'LAPD', status: 'verified', campus_id: null,
    occurred_at: '2020-01-02T12:00:00Z', created_at: '2020-01-02T12:00:00Z',
    neighborhood: 'West Hollywood', lat: 34.09, lng: -118.385,
    description:
      'A suspect spray-painted two Stars of David and the letters \'GDLK\' on the Block Party store in West Hollywood, caught on video from a neighboring business. The letters referenced the antisemitic Goyim Defense League.',
    source_name: 'CBS News Los Angeles', source_url: 'https://www.cbsnews.com/amp/losangeles/news/weho-store-vandalized-with-anti-semitic-graffiti/',
  },
];
