/** Standaard e-mailtemplates; worden aangemaakt zolang er nog geen templates zijn. */
export const defaultTemplates = [
  {
    name: 'Uitnodiging korte kennismaking',
    subject: 'Even kennismaken, {{voornaam}}?',
    content:
      'Hoi {{voornaam}},\n\nBedankt voor je interesse. We hebben je profiel bekeken en willen graag even kort kennismaken.\n\nHeb je deze week tijd voor een telefoongesprek van ongeveer 15 minuten? Laat gerust weten welk moment je het beste uitkomt.\n\nGroet,\n{{recruiter}}\nThe Move Maker',
  },
  {
    name: 'Uitnodiging gesprek',
    subject: 'Uitnodiging voor een gesprek',
    content:
      'Hoi {{voornaam}},\n\nLeuk dat je verder wilt in de procedure. Graag nodigen we je uit voor een gesprek.\n\nDatum en tijd: \nLocatie: \n\nKun je laten weten of dit schikt?\n\nGroet,\n{{recruiter}}\nThe Move Maker',
  },
  {
    name: 'Kandidatenpool',
    subject: 'We houden je profiel graag aan',
    content:
      'Hoi {{voornaam}},\n\nBedankt voor het delen van je profiel. Op dit moment hebben we geen passende functie, maar we houden je gegevens graag aan. Zodra er iets past bij je ervaring, nemen we contact met je op.\n\nGroet,\n{{recruiter}}\nThe Move Maker',
  },
  {
    name: 'Afwijzing',
    subject: 'Terugkoppeling op je sollicitatie',
    content:
      'Hoi {{voornaam}},\n\nBedankt voor je interesse en de tijd die je hebt genomen. We hebben je profiel zorgvuldig bekeken, maar besloten dat er op dit moment geen goede match is.\n\nWe wensen je veel succes met je zoektocht.\n\nGroet,\n{{recruiter}}\nThe Move Maker',
  },
]
