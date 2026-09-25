-- CreateEnum
CREATE TYPE "ProfileStatus" AS ENUM ('NIEUW_PROFIEL', 'TE_BEOORDELEN', 'INTERESSANT', 'KENNISMAKING_GEPLAND', 'NIET_PASSEND', 'KANDIDATENPOOL', 'DOOR_NAAR_PROCEDURE');

-- AlterTable
ALTER TABLE "candidates" ADD COLUMN     "callPreference" TEXT,
ADD COLUMN     "currentRole" TEXT,
ADD COLUMN     "lastSubmittedAt" TIMESTAMP(3),
ADD COLUMN     "profileStatus" "ProfileStatus" NOT NULL DEFAULT 'TE_BEOORDELEN',
ADD COLUMN     "yearsExperience" TEXT;

-- AlterTable
ALTER TABLE "vacancies" ADD COLUMN     "image" TEXT;

-- CreateTable
CREATE TABLE "cv_files" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "data" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cv_files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "cv_files_candidateId_idx" ON "cv_files"("candidateId");

-- CreateIndex
CREATE INDEX "candidates_profileStatus_idx" ON "candidates"("profileStatus");

-- AddForeignKey
ALTER TABLE "cv_files" ADD CONSTRAINT "cv_files_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
