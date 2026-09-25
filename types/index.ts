import { VacancyStatus, ContractType, WorkMode, ApplicationStatus, PublicationStatus, PublicationMode, JobBoardChannel, LeadType, TaskPriority, TaskStatus, AppointmentType, UserRole } from '@prisma/client'

export type {
  VacancyStatus,
  ContractType,
  WorkMode,
  ApplicationStatus,
  PublicationStatus,
  PublicationMode,
  JobBoardChannel,
  LeadType,
  TaskPriority,
  TaskStatus,
  AppointmentType,
  UserRole,
}

export interface VacancyWithRelations {
  id: string
  title: string
  slug: string
  company: {
    id: string
    name: string
    logo: string | null
  }
  sector: {
    id: string
    name: string
    slug: string
  }
  recruiter?: {
    id: string
    user: {
      name: string | null
      image: string | null
    }
    title: string | null
  } | null
  location: string
  city: string | null
  hoursMin: number | null
  hoursMax: number | null
  contractType: ContractType
  workMode: WorkMode
  salaryMin: number | null
  salaryMax: number | null
  salaryPeriod: string | null
  status: VacancyStatus
  publishedAt: Date | null
  expiresAt: Date | null
  description: string
  responsibilities: string | null
  requirements: string | null
  benefits: string | null
  companyInfo: string | null
  applicationProcess: string | null
  metaTitle: string | null
  metaDescription: string | null
  _count: {
    applications: number
    publications: number
  }
}

export interface CandidateWithRelations {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string | null
  city: string | null
  linkedin: string | null
  desiredRole: string | null
  sector: string | null
  region: string | null
  salaryMin: number | null
  salaryMax: number | null
  availability: string | null
  skills: string[]
  experience: string | null
  education: string | null
  cvUrl: string | null
  source: string | null
  _count: {
    applications: number
  }
}

export interface ApplicationWithRelations {
  id: string
  vacancy: {
    id: string
    title: string
    slug: string
    company: {
      name: string
    }
  }
  candidate: {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string | null
    linkedin: string | null
    cvUrl: string | null
  }
  recruiter?: {
    name: string | null
  } | null
  status: ApplicationStatus
  source: string | null
  publication?: {
    id: string
    channel: JobBoardChannel
    externalJobId: string | null
  } | null
  appliedAt: Date
  updatedAt: Date
}

export interface JobBoardValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
  requiredFields: string[]
}

export interface JobBoardDryRunResult {
  valid: boolean
  payload: Record<string, unknown>
  errors: string[]
  warnings: string[]
  estimatedCost?: number
}

export interface JobBoardPublicationResult {
  success: boolean
  externalJobId?: string
  sourceCode?: string
  url?: string
  errors: string[]
  rawResponse?: Record<string, unknown>
}

export interface JobBoardPublicationStatus {
  status: PublicationStatus
  externalJobId?: string
  url?: string
  lastSyncedAt?: Date
  errorMessage?: string
}

export interface JobBoardConnector {
  key: JobBoardChannel
  name: string
  logo: string
  description: string
  validate(vacancy: VacancyWithRelations): Promise<JobBoardValidationResult>
  dryRun(vacancy: VacancyWithRelations): Promise<JobBoardDryRunResult>
  publish(vacancy: VacancyWithRelations, publication: VacancyPublication): Promise<JobBoardPublicationResult>
  update(vacancy: VacancyWithRelations, publication: VacancyPublication): Promise<JobBoardPublicationResult>
  close(publication: VacancyPublication): Promise<void>
  status(publication: VacancyPublication): Promise<JobBoardPublicationStatus>
}

export interface SectorConfig {
  id: string
  name: string
  slug: string
  description: string
  image: string
  icon: string
  color: string
  popularRoles: string[]
  regions: string[]
  recruiter?: {
    name: string
    title: string
    image: string
    phone: string
    email: string
  }
}

export interface DashboardStats {
  activeVacancies: number
  newApplications: number
  candidatesInProcess: number
  placements: number
  openTasks: number
  applicationsTrend: number
  candidatesTrend: number
  placementsTrend: number
}

export interface ChartDataPoint {
  label: string
  value: number
}

export interface SourceStats {
  source: string
  views: number
  clicks: number
  applications: number
  interviews: number
  placements: number
  conversionRate: number
}