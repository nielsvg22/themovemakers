import type { ApplicationStatus, ProfileStatus, VacancyStatus } from '@prisma/client'

export const profileStatusLabel: Record<ProfileStatus, string> = {
  NIEUW_PROFIEL: 'Nieuw profiel',
  TE_BEOORDELEN: 'Te beoordelen',
  INTERESSANT: 'Interessant',
  KENNISMAKING_GEPLAND: 'Kennismaking gepland',
  NIET_PASSEND: 'Niet passend',
  KANDIDATENPOOL: 'Kandidatenpool',
  DOOR_NAAR_PROCEDURE: 'Door naar procedure',
}

export const profileStatusBadge: Record<ProfileStatus, string> = {
  NIEUW_PROFIEL: 'b-blue',
  TE_BEOORDELEN: 'b-yellow',
  INTERESSANT: 'b-purple',
  KENNISMAKING_GEPLAND: 'b-blue',
  NIET_PASSEND: 'b-gray',
  KANDIDATENPOOL: 'b-green',
  DOOR_NAAR_PROCEDURE: 'b-green',
}

export const profileStatuses = Object.keys(profileStatusLabel) as ProfileStatus[]

export const sourceLabel: Record<string, string> = {
  cv_check: 'CV-check',
  kennismaking: 'Kennismaking',
  open_sollicitatie: 'Open sollicitatie',
  sollicitatie: 'Sollicitatie',
}

export const vacancyStatusLabel: Record<VacancyStatus, string> = {
  CONCEPT: 'Concept',
  ACTIEF: 'Actief',
  GEPAUZEERD: 'Gepauzeerd',
  INGEVULD: 'Ingevuld',
  VERLOPEN: 'Verlopen',
}

export const vacancyStatusBadge: Record<VacancyStatus, string> = {
  CONCEPT: 'b-gray',
  ACTIEF: 'b-green',
  GEPAUZEERD: 'b-yellow',
  INGEVULD: 'b-blue',
  VERLOPEN: 'b-red',
}

/** De vijf kolommen uit het ATS-design; tussenstatussen vallen in de dichtstbijzijnde kolom. */
export const pipelineColumns: { title: string; status: ApplicationStatus; includes: ApplicationStatus[] }[] = [
  { title: 'Nieuw', status: 'NIEUW', includes: ['NIEUW'] },
  { title: 'Screening', status: 'SCREENING', includes: ['SCREENING', 'CONTACT'] },
  { title: 'Gesprek', status: 'GESPREK', includes: ['GESPREK', 'GESPREK_OPDRACHTGEVER'] },
  { title: 'Voorgesteld', status: 'VOORGESTELD', includes: ['VOORGESTELD', 'AANBOD'] },
  { title: 'Plaatsing', status: 'GEPLAATST', includes: ['GEPLAATST'] },
]

export const applicationStatusLabel: Record<ApplicationStatus, string> = {
  NIEUW: 'Nieuw',
  SCREENING: 'Screening',
  CONTACT: 'Contact',
  GESPREK: 'Gesprek',
  VOORGESTELD: 'Voorgesteld',
  GESPREK_OPDRACHTGEVER: 'Gesprek opdrachtgever',
  AANBOD: 'Aanbod',
  GEPLAATST: 'Geplaatst',
  AFGEWEZEN: 'Afgewezen',
}

export const dateLabel = (d: Date | null | undefined) =>
  d ? d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', timeZone: 'Europe/Amsterdam' }) : '—'

export const dateTimeLabel = (d: Date) =>
  d.toLocaleString('nl-NL', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Amsterdam' })
