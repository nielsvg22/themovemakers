/** Registratie-informatie per feedboard: hoe je de jobfeed-URL eenmalig aanmeldt. */
export const feedBoards = [
  {
    key: 'JOBSONLINE',
    name: 'Jobsonline',
    how: 'Gratis werkgeversaccount aanmaken → in je account de XML-koppeling openen → onze feed-URL invullen. Zelf te regelen, geen wachten op een los aanmeldformulier.',
    note: 'Aanbevolen om als eerste mee te testen: gratis en zelf-service.',
    recommended: true,
    href: 'https://www.jobsonline.nl/werkgever/xml-koppeling-vacatures/',
  },
  {
    key: 'WERKZOEKEN_NL',
    name: 'Werkzoeken.nl',
    how: 'Werkgeversaccount → Vacature plaatsen → "XML/JSON-feed of scraping van je site" → feed-URL invullen.',
    note: 'Gratis, maar vereist minimaal 25 actieve vacatures in de feed voordat hij wordt geaccepteerd.',
    href: 'https://www.werkzoeken.nl/xml-feed-format/',
  },
  { key: 'JOOF', name: 'Joof', how: 'Werkgeversaccount aanmaken en de feed-URL via het contactformulier aanleveren.', note: 'Gratis, wel handmatige goedkeuring (enkele werkdagen).', href: 'https://www.joof.nl/werkgevers/vacatures-plaatsen/' },
  { key: 'TWENTY4WERK', name: '24werk', how: 'Feed-URL aanmelden via het werkgeversportaal of de klantenservice.', note: 'Gratis vacaturebank.' },
  { key: 'JOBER', name: 'Jober', how: 'Feed-URL aanmelden via het werkgeversportaal of de klantenservice.', note: 'Gratis te plaatsen.' },
  { key: 'JOBBIRD', name: 'Jobbird', how: 'Werkgeversaccount aanmaken en de feed-URL aanleveren via "Vacatures plaatsen".', note: 'Status onduidelijk; mogelijk niet meer zelfstandig actief.', href: 'https://www.jobbird.com/nl/vacatures-plaatsen' },
  { key: 'TOPVACATUREBANK', name: 'TopVacaturebank', how: 'Feed-URL aanmelden via het werkgeversportaal of de klantenservice.', note: 'Eerste vacature kost €1,-.' },
  { key: 'NATIONALE_VACATUREBANK', name: 'Nationale Vacaturebank', how: 'Werkgeversaccount aanmaken en de feed-URL aanmelden bij de klantenservice.' },
  { key: 'NUBANEN', name: 'NuBanen', how: 'Feed-URL aanmelden via het werkgeversportaal of de klantenservice.' },
  { key: 'MONSTERBOARD', name: 'Monsterboard', how: 'Feed-URL aanmelden via het werkgeversportaal of de klantenservice.' },
  { key: 'JOOBLE', name: 'Jooble', how: 'Feed importeren via het Jooble werkgeversdashboard (XML-feed toevoegen).' },
] as const
