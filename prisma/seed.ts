import 'dotenv/config'
import { PrismaClient, UserRole, VacancyStatus, ContractType, WorkMode, ApplicationStatus, JobBoardChannel } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) })

async function main() {
  console.log('🌱 Seeding database...')

  const passwordHash = await hash('admin123', 12)

  const adminUser = await prisma.user.upsert({
    where: { email: 'niels@themovemaker.nl' },
    update: {},
    create: {
      email: 'niels@themovemaker.nl',
      name: 'Niels van Gortel',
      passwordHash,
      role: UserRole.ADMIN,
    },
  })

  const recruiterUser = await prisma.user.upsert({
    where: { email: 'mark@themovemaker.nl' },
    update: {},
    create: {
      email: 'mark@themovemaker.nl',
      name: 'Mark de Jong',
      passwordHash,
      role: UserRole.RECRUITER,
    },
  })

  const recruiterUser2 = await prisma.user.upsert({
    where: { email: 'lisa@themovemaker.nl' },
    update: {},
    create: {
      email: 'lisa@themovemaker.nl',
      name: 'Lisa Bakker',
      passwordHash,
      role: UserRole.RECRUITER,
    },
  })

  await prisma.recruiter.upsert({
    where: { userId: adminUser.id },
    update: {},
    create: {
      userId: adminUser.id,
      title: 'Founder & Recruiter',
      phone: '055-000-0000',
      sector: 'Algemeen',
    },
  })

  await prisma.recruiter.upsert({
    where: { userId: recruiterUser.id },
    update: {},
    create: {
      userId: recruiterUser.id,
      title: 'Recruitmentspecialist Bouw & Civiel',
      phone: '055-000-0001',
      sector: 'Bouw & Civiel',
    },
  })

  await prisma.recruiter.upsert({
    where: { userId: recruiterUser2.id },
    update: {},
    create: {
      userId: recruiterUser2.id,
      title: 'Recruitmentspecialist Techniek',
      phone: '055-000-0002',
      sector: 'Techniek',
    },
  })

  const sectors = await Promise.all([
    prisma.sector.upsert({
      where: { slug: 'bouw' },
      update: {},
      create: { name: 'Bouw', slug: 'bouw', description: 'Woningbouw, utiliteitsbouw, renovatie en nieuwbouw.', icon: '🏗️', color: '#d6ff55', order: 1 },
    }),
    prisma.sector.upsert({
      where: { slug: 'civiel' },
      update: {},
      create: { name: 'Civiel', slug: 'civiel', description: 'Infrastructuur, waterbouw, weg- en hydraulic engineering.', icon: '🌉', color: '#2e6af3', order: 2 },
    }),
    prisma.sector.upsert({
      where: { slug: 'techniek' },
      update: {},
      create: { name: 'Techniek', slug: 'techniek', description: 'Werktuigbouw, elektrotechniek, mechatronica en industriële automatisering.', icon: '⚙️', color: '#f59e0b', order: 3 },
    }),
    prisma.sector.upsert({
      where: { slug: 'engineering' },
      update: {},
      create: { name: 'Engineering', slug: 'engineering', description: 'Constructie, installatietechniek, berekeningen en ontwerp.', icon: '📐', color: '#7a5cff', order: 4 },
    }),
    prisma.sector.upsert({
      where: { slug: 'installatietechniek' },
      update: {},
      create: { name: 'Installatietechniek', slug: 'installatietechniek', description: 'CV, sanitaire, klimaatbeheersing en brandbeveiliging.', icon: '🔧', color: '#16a56a', order: 5 },
    }),
    prisma.sector.upsert({
      where: { slug: 'werkvoorbereiding' },
      update: {},
      create: { name: 'Werkvoorbereiding', slug: 'werkvoorbereiding', description: 'Calculatie, planning, inkoop en technische voorbereiding.', icon: '📋', color: '#e45b5b', order: 6 },
    }),
    prisma.sector.upsert({
      where: { slug: 'projectmanagement' },
      update: {},
      create: { name: 'Projectmanagement', slug: 'projectmanagement', description: 'Projectleiding, kostenbeheersing en stakeholdermanagement.', icon: '📊', color: '#0ea5e9', order: 7 },
    }),
  ])

  const sectorMap = Object.fromEntries(sectors.map(s => [s.slug, s.id]))

  const companies = await Promise.all([
    prisma.company.upsert({
      where: { slug: 'bam' },
      update: {},
      create: { name: 'BAM', slug: 'bam', website: 'https://bam.nl', city: 'Utrecht', industry: 'Bouw & Infra', size: '1000+', ownerId: adminUser.id },
    }),
    prisma.company.upsert({
      where: { slug: 'heijmans' },
      update: {},
      create: { name: 'Heijmans', slug: 'heijmans', website: 'https://heijmans.nl', city: 'Rotterdam', industry: 'Bouw & Infra', size: '1000+', ownerId: adminUser.id },
    }),
    prisma.company.upsert({
      where: { slug: 'volkerwessels' },
      update: {},
      create: { name: 'VolkerWessels', slug: 'volkerwessels', website: 'https://volkerwessels.com', city: 'Amsterdam', industry: 'Bouw & Infra', size: '1000+', ownerId: adminUser.id },
    }),
    prisma.company.upsert({
      where: { slug: 'spie' },
      update: {},
      create: { name: 'SPIE', slug: 'spie', website: 'https://spie.com', city: 'Arnhem', industry: 'Technische diensten', size: '1000+', ownerId: adminUser.id },
    }),
    prisma.company.upsert({
      where: { slug: 'strukton' },
      update: {},
      create: { name: 'Strukton', slug: 'strukton', website: 'https://strukton.com', city: 'Utrecht', industry: 'Bouw & Infra', size: '500-1000', ownerId: adminUser.id },
    }),
    prisma.company.upsert({
      where: { slug: 'boskalis' },
      update: {},
      create: { name: 'Boskalis', slug: 'boskalis', website: 'https://boskalis.com', city: 'Papendrecht', industry: 'Waterbouw', size: '1000+', ownerId: adminUser.id },
    }),
    prisma.company.upsert({
      where: { slug: 'unica' },
      update: {},
      create: { name: 'Unica Installatiegroep', slug: 'unica', website: 'https://unica.nl', city: 'Duiven', industry: 'Installatietechniek', size: '500-1000', ownerId: adminUser.id },
    }),
    prisma.company.upsert({
      where: { slug: 'tennet' },
      update: {},
      create: { name: 'TenneT', slug: 'tennet', website: 'https://tennet.eu', city: 'Arnhem', industry: 'Energie & Netwerken', size: '1000+', ownerId: adminUser.id },
    }),
  ])

  const companyMap = Object.fromEntries(companies.map(c => [c.slug, c.id]))

  const recruiters = await prisma.recruiter.findMany()

  const now = new Date()
  const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

  const vacancies = await Promise.all([
    prisma.vacancy.upsert({
      where: { slug: 'uitvoerder-bouw-utrecht' },
      update: {},
      create: {
        title: 'Uitvoerder Bouw',
        slug: 'uitvoerder-bouw-utrecht',
        companyId: companyMap.bam,
        sectorId: sectorMap.bouw,
        recruiterId: recruiters.find(r => r.title?.includes('Bouw'))?.id,
        location: 'Utrecht, Nederland',
        city: 'Utrecht',
        description: 'Als Uitvoerder Bouw ben jij verantwoordelijk voor de dagelijkse aansturing op de bouwplaats. Je bewaakt planning, kwaliteit en veiligheid en bent het centrale aanspreekpunt voor vaklieden, onderaannemers en projectleiding.',
        responsibilities: 'Aansturen van teams en onderaannemers.\nBewaken van planning, veiligheid en kwaliteit.\nAfstemmen met werkvoorbereiding en projectleiding.\nSignaleren en oplossen van knelpunten.',
        requirements: 'Ervaring als uitvoerder binnen woning- of utiliteitsbouw.\nEen praktische en communicatief sterke werkstijl.\nVeiligheid en kwaliteit staan voor jou voorop.',
        benefits: 'Een verantwoordelijke functie met veel vrijheid, goede arbeidsvoorwaarden en ruimte om jezelf verder te ontwikkelen.',
        companyInfo: 'BAM is een toonaangevend bouw- en infrabedrijf dat projecten realiseert die maatschappelijke waarde creëren. Van woningen en utiliteitsgebouwen tot wegen, bruggen en tunnels.',
        applicationProcess: 'Na je sollicitatie nemen we contact met je op voor een kennismakingsgesprek. Daarna volgt een gesprek met de opdrachtgever en bij wederzijdse interesse maken we een voorstel.',
        hoursMin: 32,
        hoursMax: 40,
        contractType: ContractType.VAST,
        workMode: WorkMode.HYBRIDE,
        salaryMin: 4000,
        salaryMax: 5500,
        salaryPeriod: 'maand',
        status: VacancyStatus.ACTIEF,
        publishedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
        expiresAt: nextMonth,
        metaTitle: 'Uitvoerder Bouw | Vacature bij BAM Utrecht',
        metaDescription: 'Solliciteer als Uitvoerder Bouw bij BAM in Utrecht. Goede salaris, 32-40 uur, vast contract.',
      },
    }),
    prisma.vacancy.upsert({
      where: { slug: 'werkvoorbereider-civiel-rotterdam' },
      update: {},
      create: {
        title: 'Werkvoorbereider Civiel',
        slug: 'werkvoorbereider-civiel-rotterdam',
        companyId: companyMap.heijmans,
        sectorId: sectorMap.civiel,
        recruiterId: recruiters.find(r => r.title?.includes('Bouw'))?.id,
        location: 'Rotterdam, Nederland',
        city: 'Rotterdam',
        description: 'Als Werkvoorbereider Civiel zorg je voor de technische en commerciële voorbereiding van infraprojecten. Je maakt calculaties, werkt plannen uit en coördineert de inkoop van materialen en onderaannemers.',
        responsibilities: 'Technische en commercieel voorbereiden van projecten.\nMaken van calculaties en offertes.\nInkoop van materialen en onderaannemers.\nOpstellen van uitvoeringsplannen en planningen.',
        requirements: 'HBO werk- en denkniveau (Bouwkunde/Civiele techniek).\nErvaring in infra of GWW.\nGoede kennis van rekenprogramma\'s (bijv. ProRail, InfraMate).',
        benefits: 'Uitdagende projecten in een dynamische omgeving met ruimte voor persoonlijke groei.',
        companyInfo: 'Heijmans is een gelijknamig vastgoed- en bouwbedrijf dat zich richt op het creëren van leefomgevingen.',
        applicationProcess: 'Kennismakingsgesprek → Technisch gesprek → Voorstel',
        hoursMin: 32,
        hoursMax: 40,
        contractType: ContractType.VAST,
        workMode: WorkMode.OP_LOCATIE,
        salaryMin: 3500,
        salaryMax: 5000,
        salaryPeriod: 'maand',
        status: VacancyStatus.ACTIEF,
        publishedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
        expiresAt: nextMonth,
      },
    }),
    prisma.vacancy.upsert({
      where: { slug: 'projectleider-techniek-eindhoven' },
      update: {},
      create: {
        title: 'Projectleider Techniek',
        slug: 'projectleider-techniek-eindhoven',
        companyId: companyMap.spie,
        sectorId: sectorMap.techniek,
        recruiterId: recruiters.find(r => r.title?.includes('Techniek'))?.id,
        location: 'Eindhoven, Nederland',
        city: 'Eindhoven',
        description: 'Als Projectleider Techniek leid je multidisciplinaire teams in technische installatieprojecten. Je bent verantwoordelijk voor planning, budget, kwaliteit en veiligheid van de projecten.',
        responsibilities: 'Projectleiding van technische installatieprojecten.\nSturing van projectteams en onderaannemers.\nBudget- en planningstoezicht.\nKlantencontact en rapportage.',
        requirements: 'HBO/WO werk- en denkniveau (Werktuigbouw/Elektrotechniek).\nMinimaal 5 jaar ervaring in projectleiding.\nCertificering Prince2 of IPMA is een pré.',
        benefits: 'Mogelijkheid tot verdere specialisatie en managementontwikkeling.',
        companyInfo: 'SPIE Nederland biedt multi-technische diensten in de energetische transitie en digitale transformatie.',
        applicationProcess: 'Sollicitatie → Kennismaking → Casus → Voorstel',
        hoursMin: 36,
        hoursMax: 40,
        contractType: ContractType.VAST,
        workMode: WorkMode.HYBRIDE,
        salaryMin: 5000,
        salaryMax: 7000,
        salaryPeriod: 'maand',
        status: VacancyStatus.GEPAUZEERD,
        publishedAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
        expiresAt: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.vacancy.upsert({
      where: { slug: 'calculator-bouw-amsterdam' },
      update: {},
      create: {
        title: 'Calculator Bouw',
        slug: 'calculator-bouw-amsterdam',
        companyId: companyMap.volkerwessels,
        sectorId: sectorMap.bouw,
        location: 'Amsterdam, Nederland',
        city: 'Amsterdam',
        description: 'Als Calculator Bouw bepaal je de kosten van bouwprojecten op basis van tekeningen en specificaties. Je maakt detailcalculaties en werkt samen met werkvoorbereiders en projectleiders.',
        responsibilities: 'Maken van detailcalculaties voor woning- en utiliteitsbouw.\nAnalyseren van tekeningen en specificaties.\nOndersteunen van tenders en offertes.\nAdviseren over kostenoptimalisatie.',
        requirements: 'HBO Bouwkunde of vergelijkbaar.\nErvaring met calculatieprogramma\'s (bijv. BICS, Bluebeam).\nSterk analytisch vermogen en oog voor detail.',
        benefits: 'Goede secundaire voorwaarden en trainingsbudget.',
        companyInfo: 'VolkerWessels is een van de grootste bouw- en infrastructuurconcernen van Nederland.',
        applicationProcess: 'Kennismakingsgesprek → Rekenopdracht → Voorstel',
        hoursMin: 32,
        hoursMax: 40,
        contractType: ContractType.VAST,
        workMode: WorkMode.HYBRIDE,
        salaryMin: 4000,
        salaryMax: 5500,
        salaryPeriod: 'maand',
        status: VacancyStatus.CONCEPT,
        expiresAt: nextMonth,
      },
    }),
    prisma.vacancy.upsert({
      where: { slug: 'bim-modelleur-rosmalen' },
      update: {},
      create: {
        title: 'BIM Modelleur',
        slug: 'bim-modelleur-rosmalen',
        companyId: companyMap.heijmans,
        sectorId: sectorMap.techniek,
        location: 'Rosmalen, Nederland',
        city: 'Rosmalen',
        description: 'Als BIM Modelleur ontwikkel en beheer je 3D-modellen voor bouw- en infraprojecten. Je werkt samen met projectteams, ingenieurs en uitvoerders.',
        responsibilities: 'Opstellen en beheren van BIM-modellen (Revit, Navisworks).\nClash detection en coördinatie.\nOndersteunen van LEAN-werkprocessen.\nOpstellen van BIM-uitvoeringsplannen.',
        requirements: 'HBO Bouwkunde/Architectuur of MBO met ervaring.\nErvaring met Revit en Navisworks.\nKennis van BIM-standaarden (NEN 2580, ISO 19650).',
        benefits: 'Modern werkplek met nieuwste software en hardware.',
        companyInfo: 'Heijmans realiseert projecten die bijdragen aan een duurzame leefomgeving.',
        applicationProcess: 'Sollicitatie → Praktische test → Gesprek',
        hoursMin: 32,
        hoursMax: 40,
        contractType: ContractType.VAST,
        workMode: WorkMode.OP_LOCATIE,
        salaryMin: 3500,
        salaryMax: 4800,
        salaryPeriod: 'maand',
        status: VacancyStatus.ACTIEF,
        publishedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        expiresAt: nextMonth,
      },
    }),
    prisma.vacancy.upsert({
      where: { slug: 'site-manager-amsterdam' },
      update: {},
      create: {
        title: 'Site Manager',
        slug: 'site-manager-amsterdam',
        companyId: companyMap.volkerwessels,
        sectorId: sectorMap.projectmanagement,
        location: 'Amsterdam, Nederland',
        city: 'Amsterdam',
        description: 'Als Site Manager ben je verantwoordelijk voor de operatiële uitvoering van grote bouwprojecten. Je coördineert meerdere uitvoerders en bewakt planning, kwaliteit en budget.',
        responsibilities: 'Operationeel beheer van bouwlocaties.\nSturing van uitvoerders en projectleiders.\nBewaking van planning, budget en kwaliteit.\nVeiligheidsmanagement op de locatie.',
        requirements: 'HBO Bouwkunde.\nMinimaal 7 jaar ervaring in uitvoerende bouw.\nErvaring met grote utiliteitsprojecten.',
        benefits: 'Leidende rol in prestigieuze projecten met uitstekende voorwaarden.',
        companyInfo: 'VolkerWessels bouwt de toekomst met innovatieve en duurzame oplossingen.',
        applicationProcess: 'Intake → Assessment → Klantgesprek',
        hoursMin: 36,
        hoursMax: 40,
        contractType: ContractType.VAST,
        workMode: WorkMode.OP_LOCATIE,
        salaryMin: 5000,
        salaryMax: 6500,
        salaryPeriod: 'maand',
        status: VacancyStatus.INGEVULD,
        publishedAt: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000),
        expiresAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
      },
    }),
  ])

  const candidates = await Promise.all([
    prisma.candidate.upsert({
      where: { email: 'sophie.devries@email.nl' },
      update: {},
      create: {
        firstName: 'Sophie',
        lastName: 'de Vries',
        email: 'sophie.devries@email.nl',
        phone: '06-12345678',
        city: 'Utrecht',
        linkedin: 'https://linkedin.com/in/sophiedevries',
        desiredRole: 'Werkvoorbereider',
        sector: 'Bouw',
        region: 'Utrecht',
        salaryMin: 4000,
        salaryMax: 5000,
        availability: 'Direct',
        skills: ['Bouwkunde', 'Projectmanagement', 'VCA', 'AutoCAD'],
        experience: '5 jaar ervaring in utiliteitsbouw',
        education: 'HBO Bouwkunde',
        cvUrl: '/uploads/cv-sophie-devries.pdf',
        source: 'LinkedIn',
        gdprConsent: true,
        gdprConsentAt: new Date(),
      },
    }),
    prisma.candidate.upsert({
      where: { email: 'mark.jansen@email.nl' },
      update: {},
      create: {
        firstName: 'Mark',
        lastName: 'Jansen',
        email: 'mark.jansen@email.nl',
        phone: '06-87654321',
        city: 'Eindhoven',
        linkedin: 'https://linkedin.com/in/markjansen',
        desiredRole: 'Projectleider',
        sector: 'Techniek',
        region: 'Eindhoven',
        salaryMin: 5000,
        salaryMax: 6500,
        availability: '1 maand',
        skills: ['Werktuigbouw', 'Projectleiding', 'Prince2', 'SolidWorks'],
        experience: '8 jaar in techniek projecten',
        education: 'WO Werktuigbouwkunde',
        cvUrl: '/uploads/cv-mark-jansen.pdf',
        source: 'Indeed',
        gdprConsent: true,
        gdprConsentAt: new Date(),
      },
    }),
    prisma.candidate.upsert({
      where: { email: 'lisa.molenaar@email.nl' },
      update: {},
      create: {
        firstName: 'Lisa',
        lastName: 'Molenaar',
        email: 'lisa.molenaar@email.nl',
        phone: '06-11223344',
        city: 'Rotterdam',
        linkedin: 'https://linkedin.com/in/lisamolenaar',
        desiredRole: 'Calculator',
        sector: 'Civiel',
        region: 'Rotterdam',
        salaryMin: 4500,
        salaryMax: 5500,
        availability: '2 weken',
        skills: ['Civiele techniek', 'Infra', 'AutoCAD', 'Bluebeam', 'REVIT'],
        experience: '4 jaar calculator civiele projecten',
        education: 'HBO Civiele Techniek',
        cvUrl: '/uploads/cv-lisa-molenaar.pdf',
        source: 'Website',
        gdprConsent: true,
        gdprConsentAt: new Date(),
      },
    }),
  ])

  const vacancy1 = vacancies[0]
  const vacancy2 = vacancies[1]
  const candidate1 = candidates[0]
  const candidate2 = candidates[1]

  await prisma.application.upsert({
    where: { id: 'app-1' },
    update: {},
    create: {
      id: 'app-1',
      vacancyId: vacancy1.id,
      candidateId: candidate1.id,
      status: ApplicationStatus.NIEUW,
      source: 'LinkedIn',
      coverLetter: 'Ik ben erg geïnteresseerd in deze vacature omdat...',
      availability: 'Direct',
      salaryExpectation: '€ 4.500 per maand',
      appliedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
    },
  })

  await prisma.application.upsert({
    where: { id: 'app-2' },
    update: {},
    create: {
      id: 'app-2',
      vacancyId: vacancy2.id,
      candidateId: candidate2.id,
      status: ApplicationStatus.SCREENING,
      source: 'Indeed',
      coverLetter: 'Met mijn ervaring in civiele techniek...',
      availability: '1 maand',
      salaryExpectation: '€ 5.000 per maand',
      appliedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
    },
  })

  await prisma.jobBoardConfig.upsert({
    where: { channel: JobBoardChannel.EIGEN_WEBSITE },
    update: {},
    create: { channel: JobBoardChannel.EIGEN_WEBSITE, name: 'Eigen website', enabled: true, testMode: false },
  })

  await prisma.jobBoardConfig.upsert({
    where: { channel: JobBoardChannel.GOOGLE_FOR_JOBS },
    update: {},
    create: { channel: JobBoardChannel.GOOGLE_FOR_JOBS, name: 'Google for Jobs', enabled: true, testMode: false },
  })

  await prisma.jobBoardConfig.upsert({
    where: { channel: JobBoardChannel.LINKEDIN },
    update: {},
    create: { channel: JobBoardChannel.LINKEDIN, name: 'LinkedIn', enabled: true, testMode: true },
  })

  await prisma.jobBoardConfig.upsert({
    where: { channel: JobBoardChannel.INDEED },
    update: {},
    create: { channel: JobBoardChannel.INDEED, name: 'Indeed', enabled: true, testMode: true },
  })

  await prisma.jobBoardConfig.upsert({
    where: { channel: JobBoardChannel.NATIONALE_VACATUREBANK },
    update: {},
    create: { channel: JobBoardChannel.NATIONALE_VACATUREBANK, name: 'Nationale Vacaturebank', enabled: false, testMode: true },
  })

  await prisma.jobBoardConfig.upsert({
    where: { channel: JobBoardChannel.JOBBIRD },
    update: {},
    create: { channel: JobBoardChannel.JOBBIRD, name: 'Jobbird', enabled: false, testMode: true },
  })

  await prisma.siteContent.upsert({
    where: { key: 'homepage_hero' },
    update: {},
    create: {
      key: 'homepage_hero',
      type: 'hero',
      title: 'Homepage Hero',
      content: {
        headline: 'De schakel tussen talent en vooruitgang',
        subheadline: 'Wij verbinden vakspecialisten en bedrijven in de bouw, civiel, techniek en meer.',
        ctaPrimary: 'Ik zoek een baan',
        ctaSecondary: 'Ik zoek personeel',
        backgroundImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=85',
      },
      published: true,
    },
  })

  await prisma.siteContent.upsert({
    where: { key: 'footer' },
    update: {},
    create: {
      key: 'footer',
      type: 'footer',
      title: 'Footer',
      content: {
        address: 'Apeldoorn',
        phone: '055 - 000 00 00',
        email: 'info@themovemaker.nl',
        linkedin: 'https://linkedin.com/company/themovemaker',
      },
      published: true,
    },
  })

  await prisma.template.upsert({
    where: { id: 'tmpl-1' },
    update: {},
    create: {
      id: 'tmpl-1',
      name: 'Bevestiging sollicitatie',
      type: 'email',
      subject: 'Bevestiging ontvangst sollicitatie - {{vacature}}',
      content: `Beste {{voornaam}},

Bedankt voor je sollicitatie op {{vacature}} bij {{bedrijf}}.

We hebben je sollicitatie goed ontvangen. Onze recruiter {{recruiter}} neemt zo snel mogelijk contact met je op voor een kennismakingsgesprek.

Met vriendelijke groet,
The Move Maker team`,
      variables: ['voornaam', 'vacature', 'bedrijf', 'recruiter'],
      isDefault: true,
    },
  })

  await prisma.template.upsert({
    where: { id: 'tmpl-2' },
    update: {},
    create: {
      id: 'tmpl-2',
      name: 'Uitnodiging gesprek',
      type: 'email',
      subject: 'Uitnodiging kennismakingsgesprek - {{vacature}}',
      content: `Beste {{voornaam}},

Graag nodigen we je uit voor een kennismakingsgesprek voor de vacature {{vacature}}.

Datum: {{datum}}
Tijd: {{tijd}}
Locatie: {{locatie}} / Online: {{meetingLink}}

Als de datum niet uitkomt, laat het ons dan weten dan zoeken we een alternatief.

Tot dan!
{{recruiter}}`,
      variables: ['voornaam', 'vacature', 'datum', 'tijd', 'locatie', 'meetingLink', 'recruiter'],
      isDefault: true,
    },
  })

  await prisma.template.upsert({
    where: { id: 'tmpl-3' },
    update: {},
    create: {
      id: 'tmpl-3',
      name: 'Afwijzing',
      type: 'email',
      subject: 'Uw sollicitatie bij {{bedrijf}}',
      content: `Beste {{voornaam}},

Bedankt voor je interesse in de vacature {{vacature}} bij {{bedrijf}}.

Na zorgvuldig overwegen hebben we besloten om niet door te gaan met je sollicitatie. Dit heeft niets met je kwaliteiten te maken, maar de match was op dit moment niet optimaal.

We bewaren je gegevens graag voor toekomstige vacatures die beter passen.

Met vriendelijke groet,
{{recruiter}}`,
      variables: ['voornaam', 'vacature', 'bedrijf', 'recruiter'],
      isDefault: true,
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log('')
  console.log('📧 Admin login: niels@themovemaker.nl / admin123')
  console.log('📧 Recruiter login: mark@themovemaker.nl / admin123')
  console.log('📧 Recruiter login: lisa@themovemaker.nl / admin123')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })