-- DropForeignKey
ALTER TABLE "vacancies" DROP CONSTRAINT "vacancies_companyId_fkey";

-- AlterTable
ALTER TABLE "vacancies" ALTER COLUMN "companyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "vacancies" ADD CONSTRAINT "vacancies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
