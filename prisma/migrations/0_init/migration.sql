-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'RECRUITER');

-- CreateEnum
CREATE TYPE "VacancyStatus" AS ENUM ('CONCEPT', 'ACTIEF', 'GEPAUZEERD', 'INGEVULD', 'VERLOPEN');

-- CreateEnum
CREATE TYPE "ContractType" AS ENUM ('VAST', 'TIJDELIJK', 'DETACHERING', 'FREELANCE', 'STAGE');

-- CreateEnum
CREATE TYPE "WorkMode" AS ENUM ('OP_LOCATIE', 'HYBRIDE', 'VOLLEDIG_REMOTE');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('NIEUW', 'SCREENING', 'CONTACT', 'GESPREK', 'VOORGESTELD', 'GESPREK_OPDRACHTGEVER', 'AANBOD', 'GEPLAATST', 'AFGEWEZEN');

-- CreateEnum
CREATE TYPE "PublicationStatus" AS ENUM ('CONCEPT', 'IN_WACHTRIJ', 'LIVE', 'ELIGIBLE', 'FOUT', 'VERLOPEN', 'INGETROKKEN', 'GETEST', 'NIET_GEKOPPELD');

-- CreateEnum
CREATE TYPE "PublicationMode" AS ENUM ('TEST', 'PRODUCTIE');

-- CreateEnum
CREATE TYPE "JobBoardChannel" AS ENUM ('EIGEN_WEBSITE', 'GOOGLE_FOR_JOBS', 'LINKEDIN', 'INDEED', 'NATIONALE_VACATUREBANK', 'JOBBIRD', 'JOOBLE', 'MONSTERBOARD', 'WERKZOEKEN_NL', 'TOPVACATUREBANK', 'JOBER', 'JOBSONLINE', 'TWENTY4WERK', 'NUBANEN');

-- CreateEnum
CREATE TYPE "LeadType" AS ENUM ('RECRUITMENT_SCAN', 'CONTACT', 'VACATURE_INTAKE');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('HOOG', 'NORMAAL', 'LAAG');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('OPEN', 'IN_VOORTGANG', 'VOLTOOID', 'GECANCELD');

-- CreateEnum
CREATE TYPE "AppointmentType" AS ENUM ('KANDIDATEN_GESPREK', 'KLANT_GESPREK', 'FOLLOW_UP', 'REMINDER');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'RECRUITER',
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recruiters" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "phone" TEXT,
    "linkedin" TEXT,
    "sector" TEXT,
    "bio" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recruiters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sectors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "icon" TEXT,
    "color" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sectors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "website" TEXT,
    "logo" TEXT,
    "description" TEXT,
    "address" TEXT,
    "city" TEXT,
    "postalCode" TEXT,
    "country" TEXT DEFAULT 'Nederland',
    "industry" TEXT,
    "size" TEXT,
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_contacts" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "role" TEXT,
    "linkedin" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vacancies" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "sectorId" TEXT NOT NULL,
    "recruiterId" TEXT,
    "location" TEXT NOT NULL,
    "city" TEXT,
    "province" TEXT,
    "postalCode" TEXT,
    "country" TEXT NOT NULL DEFAULT 'Nederland',
    "description" TEXT NOT NULL,
    "responsibilities" TEXT,
    "requirements" TEXT,
    "benefits" TEXT,
    "companyInfo" TEXT,
    "applicationProcess" TEXT,
    "hoursMin" INTEGER,
    "hoursMax" INTEGER,
    "contractType" "ContractType" NOT NULL DEFAULT 'VAST',
    "workMode" "WorkMode" NOT NULL DEFAULT 'OP_LOCATIE',
    "salaryMin" INTEGER,
    "salaryMax" INTEGER,
    "salaryPeriod" TEXT DEFAULT 'maand',
    "salaryNote" TEXT,
    "status" "VacancyStatus" NOT NULL DEFAULT 'CONCEPT',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "canonicalUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vacancies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidates" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "city" TEXT,
    "province" TEXT,
    "postalCode" TEXT,
    "linkedin" TEXT,
    "desiredRole" TEXT,
    "sector" TEXT,
    "region" TEXT,
    "salaryMin" INTEGER,
    "salaryMax" INTEGER,
    "availability" TEXT,
    "skills" TEXT[],
    "experience" TEXT,
    "education" TEXT,
    "cvUrl" TEXT,
    "cvFileName" TEXT,
    "motivation" TEXT,
    "internalNotes" TEXT,
    "source" TEXT,
    "sourceDetail" TEXT,
    "gdprConsent" BOOLEAN NOT NULL DEFAULT false,
    "gdprConsentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL,
    "vacancyId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "recruiterId" TEXT,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'NIEUW',
    "source" TEXT,
    "publicationId" TEXT,
    "coverLetter" TEXT,
    "cvUrl" TEXT,
    "cvFileName" TEXT,
    "availability" TEXT,
    "salaryExpectation" TEXT,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "screeningAt" TIMESTAMP(3),
    "interviewAt" TIMESTAMP(3),
    "proposedAt" TIMESTAMP(3),
    "offeredAt" TIMESTAMP(3),
    "placedAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "rejectedReason" TEXT,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vacancy_publications" (
    "id" TEXT NOT NULL,
    "vacancyId" TEXT NOT NULL,
    "channel" "JobBoardChannel" NOT NULL,
    "mode" "PublicationMode" NOT NULL DEFAULT 'TEST',
    "status" "PublicationStatus" NOT NULL DEFAULT 'CONCEPT',
    "externalJobId" TEXT,
    "sourceCode" TEXT,
    "publishedAt" TIMESTAMP(3),
    "scheduledAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "lastSyncedAt" TIMESTAMP(3),
    "errorMessage" TEXT,
    "rawRequest" JSONB,
    "rawResponse" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vacancy_publications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_alerts" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sectorId" TEXT,
    "region" TEXT,
    "frequency" TEXT NOT NULL DEFAULT 'daily',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "confirmToken" TEXT,
    "unsubToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "candidateId" TEXT,

    CONSTRAINT "job_alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "type" "LeadType" NOT NULL,
    "companyName" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "role" TEXT,
    "location" TEXT,
    "vacancyTitle" TEXT,
    "vacancyOpenSince" TEXT,
    "challenge" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "assignedToId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "case_studies" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "candidatesCount" INTEGER,
    "daysToInterview" INTEGER,
    "placed" BOOLEAN NOT NULL DEFAULT false,
    "testimonial" TEXT,
    "testimonialAuthor" TEXT,
    "testimonialRole" TEXT,
    "image" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "case_studies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonials" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "author" TEXT NOT NULL,
    "role" TEXT,
    "content" TEXT NOT NULL,
    "rating" INTEGER,
    "image" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_contents" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT,
    "content" JSONB NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "metadata" JSONB,
    "userId" TEXT,
    "candidateId" TEXT,
    "companyId" TEXT,
    "vacancyId" TEXT,
    "applicationId" TEXT,
    "leadId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notes" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "candidateId" TEXT,
    "companyId" TEXT,
    "vacancyId" TEXT,
    "applicationId" TEXT,
    "leadId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" INTEGER,
    "mimeType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "priority" "TaskPriority" NOT NULL DEFAULT 'NORMAAL',
    "status" "TaskStatus" NOT NULL DEFAULT 'OPEN',
    "ownerId" TEXT NOT NULL,
    "candidateId" TEXT,
    "vacancyId" TEXT,
    "companyId" TEXT,
    "applicationId" TEXT,
    "dueDate" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "AppointmentType" NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "videoUrl" TEXT,
    "ownerId" TEXT NOT NULL,
    "candidateId" TEXT,
    "companyId" TEXT,
    "applicationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "subject" TEXT,
    "content" TEXT NOT NULL,
    "variables" JSONB,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_board_configs" (
    "id" TEXT NOT NULL,
    "channel" "JobBoardChannel" NOT NULL,
    "name" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "testMode" BOOLEAN NOT NULL DEFAULT true,
    "apiKey" TEXT,
    "apiSecret" TEXT,
    "apiUrl" TEXT,
    "config" JSONB,
    "lastTestAt" TIMESTAMP(3),
    "lastSyncAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_board_configs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "recruiters_userId_key" ON "recruiters"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "sectors_name_key" ON "sectors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sectors_slug_key" ON "sectors"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "companies_slug_key" ON "companies"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "vacancies_slug_key" ON "vacancies"("slug");

-- CreateIndex
CREATE INDEX "vacancies_status_idx" ON "vacancies"("status");

-- CreateIndex
CREATE INDEX "vacancies_sectorId_idx" ON "vacancies"("sectorId");

-- CreateIndex
CREATE INDEX "vacancies_companyId_idx" ON "vacancies"("companyId");

-- CreateIndex
CREATE INDEX "vacancies_recruiterId_idx" ON "vacancies"("recruiterId");

-- CreateIndex
CREATE INDEX "vacancies_publishedAt_idx" ON "vacancies"("publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "candidates_email_key" ON "candidates"("email");

-- CreateIndex
CREATE INDEX "candidates_email_idx" ON "candidates"("email");

-- CreateIndex
CREATE INDEX "candidates_sector_idx" ON "candidates"("sector");

-- CreateIndex
CREATE INDEX "candidates_region_idx" ON "candidates"("region");

-- CreateIndex
CREATE INDEX "applications_vacancyId_idx" ON "applications"("vacancyId");

-- CreateIndex
CREATE INDEX "applications_candidateId_idx" ON "applications"("candidateId");

-- CreateIndex
CREATE INDEX "applications_status_idx" ON "applications"("status");

-- CreateIndex
CREATE INDEX "applications_source_idx" ON "applications"("source");

-- CreateIndex
CREATE INDEX "applications_appliedAt_idx" ON "applications"("appliedAt");

-- CreateIndex
CREATE INDEX "vacancy_publications_vacancyId_idx" ON "vacancy_publications"("vacancyId");

-- CreateIndex
CREATE INDEX "vacancy_publications_channel_idx" ON "vacancy_publications"("channel");

-- CreateIndex
CREATE INDEX "vacancy_publications_status_idx" ON "vacancy_publications"("status");

-- CreateIndex
CREATE INDEX "vacancy_publications_externalJobId_idx" ON "vacancy_publications"("externalJobId");

-- CreateIndex
CREATE UNIQUE INDEX "job_alerts_confirmToken_key" ON "job_alerts"("confirmToken");

-- CreateIndex
CREATE UNIQUE INDEX "job_alerts_unsubToken_key" ON "job_alerts"("unsubToken");

-- CreateIndex
CREATE INDEX "job_alerts_email_idx" ON "job_alerts"("email");

-- CreateIndex
CREATE INDEX "job_alerts_sectorId_idx" ON "job_alerts"("sectorId");

-- CreateIndex
CREATE INDEX "leads_email_idx" ON "leads"("email");

-- CreateIndex
CREATE INDEX "leads_status_idx" ON "leads"("status");

-- CreateIndex
CREATE UNIQUE INDEX "case_studies_slug_key" ON "case_studies"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "site_contents_key_key" ON "site_contents"("key");

-- CreateIndex
CREATE INDEX "activities_candidateId_idx" ON "activities"("candidateId");

-- CreateIndex
CREATE INDEX "activities_companyId_idx" ON "activities"("companyId");

-- CreateIndex
CREATE INDEX "activities_vacancyId_idx" ON "activities"("vacancyId");

-- CreateIndex
CREATE INDEX "activities_applicationId_idx" ON "activities"("applicationId");

-- CreateIndex
CREATE INDEX "activities_createdAt_idx" ON "activities"("createdAt");

-- CreateIndex
CREATE INDEX "notes_candidateId_idx" ON "notes"("candidateId");

-- CreateIndex
CREATE INDEX "notes_companyId_idx" ON "notes"("companyId");

-- CreateIndex
CREATE INDEX "notes_vacancyId_idx" ON "notes"("vacancyId");

-- CreateIndex
CREATE INDEX "notes_applicationId_idx" ON "notes"("applicationId");

-- CreateIndex
CREATE INDEX "tasks_ownerId_idx" ON "tasks"("ownerId");

-- CreateIndex
CREATE INDEX "tasks_candidateId_idx" ON "tasks"("candidateId");

-- CreateIndex
CREATE INDEX "tasks_vacancyId_idx" ON "tasks"("vacancyId");

-- CreateIndex
CREATE INDEX "tasks_companyId_idx" ON "tasks"("companyId");

-- CreateIndex
CREATE INDEX "tasks_status_idx" ON "tasks"("status");

-- CreateIndex
CREATE INDEX "tasks_dueDate_idx" ON "tasks"("dueDate");

-- CreateIndex
CREATE INDEX "appointments_ownerId_idx" ON "appointments"("ownerId");

-- CreateIndex
CREATE INDEX "appointments_candidateId_idx" ON "appointments"("candidateId");

-- CreateIndex
CREATE INDEX "appointments_companyId_idx" ON "appointments"("companyId");

-- CreateIndex
CREATE INDEX "appointments_startTime_idx" ON "appointments"("startTime");

-- CreateIndex
CREATE UNIQUE INDEX "job_board_configs_channel_key" ON "job_board_configs"("channel");

-- AddForeignKey
ALTER TABLE "recruiters" ADD CONSTRAINT "recruiters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_contacts" ADD CONSTRAINT "company_contacts_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vacancies" ADD CONSTRAINT "vacancies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vacancies" ADD CONSTRAINT "vacancies_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "sectors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vacancies" ADD CONSTRAINT "vacancies_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "recruiters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "vacancies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "vacancy_publications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vacancy_publications" ADD CONSTRAINT "vacancy_publications_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "vacancies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_alerts" ADD CONSTRAINT "job_alerts_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "sectors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_alerts" ADD CONSTRAINT "job_alerts_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "vacancies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "vacancies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "vacancies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

