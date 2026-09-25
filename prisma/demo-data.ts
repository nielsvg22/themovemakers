// Demo-inhoud voor The Move Maker: sectoren, opdrachtgevers, vacatures en een paar kandidaten.
// Idempotent (upserts op slug/e-mail), dus veilig om vaker te draaien.
import type { PrismaClient } from '@prisma/client'

const img = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

const sectors = [
  { name: 'Bouw', slug: 'bouw', order: 1, image: img('1504307651254-35680f356dfd'), description: 'Van woningbouw tot utiliteitsbouw: vacatures voor vakmensen, uitvoerders, werkvoorbereiders en projectleiders.' },
  { name: 'Civiel', slug: 'civiel', order: 2, image: img('1508450859948-4e04fabaa4ea'), description: 'Wegen, bruggen, waterwerken en infra: werk aan de infrastructuur van Nederland.' },
  { name: 'Techniek', slug: 'techniek', order: 3, image: img('1581092160562-40aa08e78837'), description: 'Technische functies in productie, onderhoud en service.' },
  { name: 'Engineering', slug: 'engineering', order: 4, image: img('1581094794329-c8112a89af12'), description: 'Ontwerp, berekening en BIM voor bouw, infra en industrie.' },
  { name: 'Installatietechniek', slug: 'installatietechniek', order: 5, image: img('1504917595217-d4dc5ebe6122'), description: 'E- en W-installaties, van monteur tot projectleider.' },
  { name: 'Werkvoorbereiding', slug: 'werkvoorbereiding', order: 6, image: img('1541888946425-d81bb19240f5'), description: 'Planning, inkoop en voorbereiding van bouw- en infraprojecten.' },
  { name: 'Projectmanagement', slug: 'projectmanagement', order: 7, image: img('1497366811353-6870744d04b2'), description: 'Projectleiders en -managers die projecten van start tot oplevering leiden.' },
]

const companies = [
  { name: 'BAM', slug: 'bam', city: 'Bunnik', website: 'https://www.bam.com' },
  { name: 'Heijmans', slug: 'heijmans', city: 'Rosmalen', website: 'https://www.heijmans.nl' },
  { name: 'VolkerWessels', slug: 'volkerwessels', city: 'Amersfoort', website: 'https://www.volkerwessels.com' },
  { name: 'Strukton', slug: 'strukton', city: 'Utrecht', website: 'https://www.strukton.com' },
  { name: 'Boskalis', slug: 'boskalis', city: 'Papendrecht', website: 'https://boskalis.com' },
  { name: 'SPIE', slug: 'spie', city: 'Breda', website: 'https://www.spie-nl.com' },
  { name: 'Unica', slug: 'unica', city: 'Apeldoorn', website: 'https://www.unica.nl' },
  { name: 'TenneT', slug: 'tennet', city: 'Arnhem', website: 'https://www.tennet.eu' },
]

interface DemoVacancy {
  slug: string
  title: string
  company: string
  sector: string
  city: string
  salaryMin: number
  salaryMax: number
  hoursMin: number
  hoursMax: number
  image: string
  intro: string
  tasks: string[]
  profile: string[]
}

const vacancies: DemoVacancy[] = [
  {
    slug: 'uitvoerder-bouw-utrecht', title: 'Uitvoerder Bouw', company: 'bam', sector: 'bouw', city: 'Utrecht', salaryMin: 4000, salaryMax: 5500, hoursMin: 32, hoursMax: 40, image: img('1504307651254-35680f356dfd', 900),
    intro: 'Als Uitvoerder Bouw ben jij verantwoordelijk voor de dagelijkse aansturing op de bouwplaats. Je bewaakt planning, kwaliteit en veiligheid en bent het centrale aanspreekpunt voor vaklieden, onderaannemers en projectleiding.',
    tasks: ['Aansturen van teams en onderaannemers.', 'Bewaken van planning, veiligheid en kwaliteit.', 'Afstemmen met werkvoorbereiding en projectleiding.', 'Signaleren en oplossen van knelpunten.'],
    profile: ['Ervaring als uitvoerder binnen woning- of utiliteitsbouw.', 'Een praktische en communicatief sterke werkstijl.', 'Veiligheid en kwaliteit staan voor jou voorop.'],
  },
  {
    slug: 'werkvoorbereider-bouw-rotterdam', title: 'Werkvoorbereider Bouw', company: 'heijmans', sector: 'bouw', city: 'Rotterdam', salaryMin: 3500, salaryMax: 5000, hoursMin: 32, hoursMax: 40, image: img('1541888946425-d81bb19240f5', 900),
    intro: 'Als Werkvoorbereider zorg jij dat projecten goed voorbereid van start gaan. Je maakt planningen, vraagt offertes aan en stemt af met uitvoering en engineering.',
    tasks: ['Opstellen van werkplanningen en werkpakketten.', 'Inkopen van materialen en onderaanneming.', 'Bewaken van tekeningen, vergunningen en budget.'],
    profile: ['Mbo- of hbo-opleiding bouwkunde of vergelijkbaar.', 'Minimaal twee jaar ervaring in werkvoorbereiding.', 'Kennis van planningssoftware is een pré.'],
  },
  {
    slug: 'projectleider-bouw-eindhoven', title: 'Projectleider Bouw', company: 'volkerwessels', sector: 'bouw', city: 'Eindhoven', salaryMin: 5000, salaryMax: 7000, hoursMin: 32, hoursMax: 40, image: img('1513467655676-561b7d489a88', 900),
    intro: 'Als Projectleider Bouw ben je eindverantwoordelijk voor tijd, geld en kwaliteit van middelgrote bouwprojecten, van contract tot oplevering.',
    tasks: ['Leiden van het projectteam.', 'Contact met opdrachtgever en stakeholders.', 'Bewaken van budget, planning en risico’s.'],
    profile: ['Hbo werk- en denkniveau.', 'Ervaring als projectleider in de bouw.', 'Sterk in communicatie en onderhandelen.'],
  },
  {
    slug: 'timmerman-amsterdam', title: 'Timmerman', company: 'strukton', sector: 'bouw', city: 'Amsterdam', salaryMin: 2800, salaryMax: 3800, hoursMin: 32, hoursMax: 40, image: img('1503387762-592deb58ef4e', 900),
    intro: 'Als Timmerman werk je aan nieuwbouw- en renovatieprojecten in en rond Amsterdam, in een hecht team van vakmensen.',
    tasks: ['Maatvoering en bekisting.', 'Plaatsen van kozijnen en afbouwwerkzaamheden.', 'Samenwerken met andere disciplines op de bouwplaats.'],
    profile: ['Afgeronde opleiding timmeren of aantoonbare ervaring.', 'VCA-certificaat.', 'Zelfstandig en nauwkeurig.'],
  },
  {
    slug: 'projectcoordinator-civiel-gouda', title: 'Projectcoördinator Civiel', company: 'boskalis', sector: 'civiel', city: 'Gouda', salaryMin: 4200, salaryMax: 5700, hoursMin: 36, hoursMax: 40, image: img('1508450859948-4e04fabaa4ea', 900),
    intro: 'Als Projectcoördinator Civiel coördineer je infraprojecten zoals dijkversterkingen en wegenbouw, en ben je de spil tussen ontwerp en uitvoering.',
    tasks: ['Coördineren van planning en resources.', 'Bewaken van kwaliteit en veiligheid.', 'Rapporteren aan de projectmanager.'],
    profile: ['Mbo/hbo civiele techniek.', 'Ervaring in de infra.', 'Oplossingsgericht en proactief.'],
  },
  {
    slug: 'engineer-werktuigbouw-arnhem', title: 'Engineer Werktuigbouw', company: 'spie', sector: 'engineering', city: 'Arnhem', salaryMin: 3800, salaryMax: 5200, hoursMin: 32, hoursMax: 40, image: img('1581092160562-40aa08e78837', 900),
    intro: 'Als Engineer Werktuigbouw ontwerp en bereken je installaties en systemen voor utiliteits- en industrieprojecten.',
    tasks: ['Uitwerken van ontwerpen en berekeningen.', 'Opstellen van technische specificaties.', 'Ondersteunen van uitvoering en inbedrijfstelling.'],
    profile: ['Hbo werktuigbouwkunde.', 'Ervaring met 3D-tekenpakketten.', 'Analytisch sterk.'],
  },
  {
    slug: 'monteur-installatietechniek-apeldoorn', title: 'Monteur Installatietechniek', company: 'unica', sector: 'installatietechniek', city: 'Apeldoorn', salaryMin: 3000, salaryMax: 4100, hoursMin: 32, hoursMax: 40, image: img('1581094794329-c8112a89af12', 900),
    intro: 'Als Monteur Installatietechniek installeer en onderhoud je E- en W-installaties bij klanten in de regio Apeldoorn.',
    tasks: ['Installeren van elektrotechnische en werktuigbouwkundige installaties.', 'Storingen verhelpen en onderhoud uitvoeren.', 'Opleveren en documenteren van werk.'],
    profile: ['Mbo-opleiding installatietechniek.', 'Rijbewijs B.', 'Klantvriendelijk en zelfstandig.'],
  },
  {
    slug: 'technisch-projectmanager-arnhem', title: 'Technisch Projectmanager', company: 'tennet', sector: 'projectmanagement', city: 'Arnhem', salaryMin: 5400, salaryMax: 7200, hoursMin: 36, hoursMax: 40, image: img('1497366811353-6870744d04b2', 900),
    intro: 'Als Technisch Projectmanager realiseer je projecten in het hoogspanningsnet, samen met aannemers en interne specialisten.',
    tasks: ['Aansturen van projectteams en aannemers.', 'Bewaken van scope, planning en budget.', 'Afstemming met stakeholders en vergunningverleners.'],
    profile: ['Hbo/wo technische richting.', 'Minimaal vijf jaar projectervaring.', 'Ervaring in energie of infra is een pré.'],
  },
]

const candidates = [
  { email: 'sophie.devries@example.com', firstName: 'Sophie', lastName: 'de Vries', city: 'Utrecht', sector: 'Bouw', currentRole: 'Werkvoorbereider', yearsExperience: '3-5 jaar', source: 'cv_check', profileStatus: 'TE_BEOORDELEN' as const, motivation: 'Ik zoek een volgende stap richting uitvoering.' },
  { email: 'mark.jansen@example.com', firstName: 'Mark', lastName: 'Jansen', city: 'Eindhoven', sector: 'Projectmanagement', currentRole: 'Projectleider', yearsExperience: '5-10 jaar', source: 'kennismaking', profileStatus: 'TE_BEOORDELEN' as const, callPreference: 'Doordeweeks tussen 12:00 en 13:00', motivation: 'Graag even kort bellen over mogelijkheden in de regio.' },
  { email: 'lisa.molenaar@example.com', firstName: 'Lisa', lastName: 'Molenaar', city: 'Rotterdam', sector: 'Civiel', currentRole: 'Calculator', yearsExperience: '3-5 jaar', source: 'open_sollicitatie', profileStatus: 'INTERESSANT' as const, motivation: 'Op zoek naar een calculatiefunctie in de infra.' },
  { email: 'thomas.bakker@example.com', firstName: 'Thomas', lastName: 'Bakker', city: 'Arnhem', sector: 'Engineering', currentRole: 'Engineer', yearsExperience: '5-10 jaar', source: 'sollicitatie', profileStatus: 'KENNISMAKING_GEPLAND' as const, motivation: 'Interesse in de rol bij SPIE.' },
]

export async function seedDemo(prisma: PrismaClient) {
  const sectorIds: Record<string, string> = {}
  for (const s of sectors) {
    const row = await prisma.sector.upsert({ where: { slug: s.slug }, update: { image: s.image, order: s.order }, create: s })
    sectorIds[s.slug] = row.id
  }

  const companyIds: Record<string, string> = {}
  for (const c of companies) {
    const row = await prisma.company.upsert({ where: { slug: c.slug }, update: {}, create: c })
    companyIds[c.slug] = row.id
  }

  const now = new Date()
  const vacancyIds: Record<string, string> = {}
  for (const [i, v] of vacancies.entries()) {
    const row = await prisma.vacancy.upsert({
      where: { slug: v.slug },
      update: {},
      create: {
        slug: v.slug,
        title: v.title,
        companyId: companyIds[v.company],
        sectorId: sectorIds[v.sector],
        location: v.city,
        city: v.city,
        description: v.intro,
        responsibilities: v.tasks.join('\n'),
        requirements: v.profile.join('\n'),
        benefits: 'Een verantwoordelijke functie met veel vrijheid, goede arbeidsvoorwaarden en ruimte om jezelf verder te ontwikkelen.',
        salaryMin: v.salaryMin,
        salaryMax: v.salaryMax,
        hoursMin: v.hoursMin,
        hoursMax: v.hoursMax,
        image: v.image,
        status: 'ACTIEF',
        publishedAt: new Date(now.getTime() - i * 86400000),
        expiresAt: new Date(now.getTime() + 60 * 86400000),
      },
    })
    vacancyIds[v.slug] = row.id
  }

  for (const c of candidates) {
    const cand = await prisma.candidate.upsert({
      where: { email: c.email },
      update: {},
      create: { ...c, phone: '06 12345678', lastSubmittedAt: now },
    })
    if (c.source === 'sollicitatie') {
      const exists = await prisma.application.findFirst({ where: { candidateId: cand.id } })
      if (!exists) {
        await prisma.application.create({
          data: { candidateId: cand.id, vacancyId: vacancyIds['engineer-werktuigbouw-arnhem'], source: 'sollicitatie', status: 'GESPREK' },
        })
      }
    }
  }

  return { sectors: sectors.length, companies: companies.length, vacancies: vacancies.length, candidates: candidates.length }
}
