# The Move Maker — Full-Stack Recruitment Platform

Een complete full-stack recruitment applicatie voor **The Move Maker**, gespecialiseerd in bouw, civiel, techniek en engineering.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router, React 19, TypeScript)
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js (Credentials provider)
- **Styling**: Tailwind CSS v4 (custom design system)
- **Testing**: Jest + React Testing Library
- **Forms**: React Hook Form + Zod
- **Drag & Drop**: @dnd-kit (kanban)

## 📦 Projectstructuur

```
app/
├── (public)/          # Publieke website routes
│   ├── page.tsx       # Homepage
│   ├── vacatures/     # Vacature overzicht, detail, sector pagina's
│   ├── voor-kandidaten/
│   ├── voor-werkgevers/
│   ├── recruitment-marketing/
│   ├── open-sollicitatie/
│   ├── over-ons/
│   ├── contact/
│   └── gratis-recruitmentscan/
├── admin/             # Admin / ATS routes
│   ├── page.tsx       # Dashboard
│   ├── vacatures/     # CRUD, editor, preview, publicatie hub
│   ├── sollicitaties/ # Kanban board
│   ├── kandidaten/    # Lijst, detail, talentpool
│   ├── bedrijven/     # CRM
│   ├── talentpool/    # Zoeken/filteren
│   ├── publicaties/   # Jobboard koppelingen
│   ├── agenda/        # Afspraken
│   ├── taken/         # Task management
│   ├── templates/     # E-mail templates
│   ├── rapportages/   # Analytics
│   ├── website/       # CMS
│   └── instellingen/  # Organisatie, users, integraties
├── api/               # API routes
│   ├── auth/          # NextAuth
│   ├── applications/  # Solliciteren endpoint
│   ├── vacancies/     # Publiceren/sluiten
│   └── jobfeeds/      # XML/JSON feeds (Joof, Google for Jobs)
├── components/
│   ├── ui/            # Herbruikbare UI componenten
│   ├── public/        # Publieke layout componenten
│   └── admin/         # Admin layout componenten
├── lib/
│   ├── db/            # Prisma client
│   ├── jobboards/     # Connector architectuur
│   ├── services/      # Business logic
│   ├── auth/          # Auth config
│   └── utils.ts       # Helper functies
├── prisma/
│   ├── schema.prisma  # Database schema
│   └── seed.ts        # Seed script
└── types/             # TypeScript types
```

## 🎯 Kernfunctionaliteiten

### Publieke Website
- Homepage met hero, sector cards, dual CTA, cases
- Vacature zoekmachine met filters (sector, locatie, salaris, uren, contract, werkvorm)
- Sector landing pages (SEO-geoptimaliseerd)
- Vacature detail met tabs, sticky solliciteer CTA, Google for Jobs structured data
- Solliciteren flow (4 stappen) + open sollicitatie
- Vacature alerts (email + sector + regio)
- Werkgevers pagina's (diensten, recruitment marketing, cases)
- Gratis recruitmentscan lead formulier

### Admin / ATS
- Dashboard met KPI's, grafieken, recent activiteit
- Vacature beheer (lijst, editor met preview, status: Concept/Actief/Gepauzeerd/Ingevuld/Verlopen)
- Publicatie hub met test/production mode per kanaal
- Kanban board voor sollicitaties (drag & drop)
- Kandidaat beheer + talentpool zoeken
- Bedrijven CRM
- Agenda, taken, templates, rapportages
- Website CMS

### Jobboard Architectuur
- Interface-based connectors (`JobBoardConnector`)
- Test mode standaard (geen live publicaties)
- Dry-run validatie + payload generatie
- Ondersteunde kanalen: Eigen website, Google for Jobs, LinkedIn, Indeed, Nationale Vacaturebank, Jobbird, Monsterboard, Werkzoeken.nl, Jooble
- XML/JSON feed endpoints

### Database (Prisma)
- Users, Recruiters, Sectors, Companies, Vacancies
- Candidates, Applications, VacancyPublications
- JobAlerts, Leads, CaseStudies, Testimonials
- Activities, Notes, Documents, Tasks, Appointments
- Templates, SiteContent, JobBoardConfigs

## 🛠 Installatie

### Vereisten
- Node.js 20+
- PostgreSQL 15+
- pnpm (aanbevolen) of npm

### Stappen

```bash
# 1. Repository clonen
git clone <repo-url>
cd the-movemakers

# 2. Dependencies installeren
npm install

# 3. Environment variabelen instellen
cp .env.example .env
# Bewerk .env met je DATABASE_URL en NEXTAUTH_SECRET

# 4. Database setup
npm run db:generate
npm run db:push
npm run db:seed

# 5. Development server starten
npm run dev
```

De app draait nu op `http://localhost:3000`

### Admin inloggen (development)
- **URL**: `http://localhost:3000/login` (alle `/admin`-pagina's sturen hierheen door zolang je niet bent ingelogd)
- **Email**: `niels@themovemaker.nl`
- **Wachtwoord**: `admin123`

Andere test accounts:
- `mark@themovemaker.nl` (Recruiter Bouw & Civiel)
- `lisa@themovemaker.nl` (Recruiter Techniek)

## 🧪 Testen

```bash
# Alle tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### Test coverage
- Utility functies (salary formatting, slugs, status colors)
- Jobboard connectors (validatie, dry-run, test mode)
- Publication service (publiceren, sluiten, validatie)

## 🔧 Scripts

| Commando | Beschrijving |
|----------|--------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run test` | Jest tests |
| `npm run db:studio` | Prisma Studio (DB GUI) |
| `npm run db:seed` | Database seeden |

## 🌐 Jobboard Integraties

### Geteste kanalen (Test mode)
| Kanaal | Status | Opmerking |
|--------|--------|-----------|
| Eigen website | ✅ Live | Direct publiceren |
| Google for Jobs | ✅ Active | Via structured data |
| LinkedIn | 🧪 Test | API credentials nodig voor productie |
| Indeed | 🧪 Test | API credentials nodig voor productie |

### Nog te koppelen
- Nationale Vacaturebank
- Jobbird
- Monsterboard
- Werkzoeken.nl
- Jooble

**Belangrijk**: Alle connectors draaien standaard in **TEST MODE**. Productie mode moet expliciet per kanaal ingeschakeld worden in de admin.

## 📝 Environment Variabelen

Zie `.env.example` voor alle beschikbare variabelen.

Vereist:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Minimaal 32 karakters
- `NEXT_PUBLIC_APP_URL` - Base URL voor canonical links

Optioneel (voor productie jobboard integraties):
- `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`
- `INDEED_API_KEY`, `INDEED_PUBLISHER_ID`

## 🎨 Design System

Kleuren (uit de design referenties):
- **Navy**: `#071b2a` (primaire donkere kleur)
- **Lime**: `#d6ff55` (accent/brand kleur)
- **Ink**: `#10212b` (tekst)
- **Muted**: `#6f7f89` (secundaire tekst)
- **Line**: `#e5eaed` (borders)
- **Soft**: `#f5f7f8` (achtergronden)

De designs staan in de repo als bron van waarheid:
- `The-Move-Maker-feedback-design.html` → publieke website, CSS in `styles/site.css` (gescoped onder `.tmm-site`)
- `The-Move-Maker-admin-ATS-design.html` → admin/ATS, CSS in `styles/ats.css` (gescoped onder `.tmm-ats`)

Pas bij designwijzigingen eerst deze CSS aan; de componenten gebruiken de klassenamen uit de designs.
Tailwind (v4, zonder preflight) is alleen nog nodig voor de losse componenten in `components/ui/`.

## 🗄 Prisma 7

- De database-URL staat in `prisma.config.ts` (leest `DATABASE_URL`), niet meer in `schema.prisma`.
- De client verbindt via `@prisma/adapter-pg` (zie `lib/db/prisma.ts`).
- Seeden gaat via `tsx`: `npm run db:seed`.

## 📄 Licentie

Propriëtair - The Move Maker