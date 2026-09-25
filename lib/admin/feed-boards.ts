/** Registratie-informatie per feedboard: hoe je de jobfeed-URL eenmalig aanmeldt. */
export const feedBoards = [
  {
    key: 'WERKZOEKEN_NL',
    name: 'Werkzoeken.nl',
    how: 'Werkgeversaccount → Vacature plaatsen → "XML/JSON-feed of scraping van je site" → feed-URL invullen.',
    note: 'Vereist minimaal 25 actieve vacatures in de feed voordat hij wordt geaccepteerd.',
    href: 'https://www.werkzoeken.nl/xml-feed-format/',
  },
  { key: 'JOBBIRD', name: 'Jobbird', how: 'Werkgeversaccount aanmaken en de feed-URL aanleveren via "Vacatures plaatsen".', href: 'https://www.jobbird.com/nl/vacatures-plaatsen' },
  { key: 'JOBSONLINE', name: 'Jobsonline', how: 'Aanmeldformulier voor de XML-koppeling invullen met bedrijfsnaam, contactpersoon en de feed-URL.', href: 'https://www.jobsonline.nl/werkgever/xml-koppeling-vacatures/' },
  { key: 'NATIONALE_VACATUREBANK', name: 'Nationale Vacaturebank', how: 'Werkgeversaccount aanmaken en de feed-URL aanmelden bij de klantenservice.' },
  { key: 'TOPVACATUREBANK', name: 'TopVacaturebank', how: 'Feed-URL aanmelden via het werkgeversportaal of de klantenservice.' },
  { key: 'JOBER', name: 'Jober', how: 'Feed-URL aanmelden via het werkgeversportaal of de klantenservice.' },
  { key: 'TWENTY4WERK', name: '24werk', how: 'Feed-URL aanmelden via het werkgeversportaal of de klantenservice.' },
  { key: 'NUBANEN', name: 'NuBanen', how: 'Feed-URL aanmelden via het werkgeversportaal of de klantenservice.' },
  { key: 'JOOF', name: 'Joof', how: 'Feed-URL aanmelden via het werkgeversportaal of de klantenservice.' },
  { key: 'MONSTERBOARD', name: 'Monsterboard', how: 'Feed-URL aanmelden via het werkgeversportaal of de klantenservice.' },
  { key: 'JOOBLE', name: 'Jooble', how: 'Feed importeren via het Jooble werkgeversdashboard (XML-feed toevoegen).' },
] as const
