/*
  Warnings:

  - You are about to drop the column `contactPhoneNumber` on the `company_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `company_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `offers` table. All the data in the column will be lost.
  - You are about to drop the column `salary` on the `offers` table. All the data in the column will be lost.
  - You are about to drop the column `github_url` on the `student_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin_url` on the `student_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `portfolio_url` on the `student_profiles` table. All the data in the column will be lost.
  - Added the required column `duration_max` to the `offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration_max_unit` to the `offers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CompanySize" AS ENUM ('TPE', 'PME', 'ETI', 'GE');

-- CreateEnum
CREATE TYPE "DurationUnit" AS ENUM ('DAYS', 'MONTHS', 'YEARS');

-- CreateEnum
CREATE TYPE "RemoteType" AS ENUM ('ON_SITE', 'HYBRID', 'FULL_REMOTE');

-- AlterTable
ALTER TABLE "company_profiles" DROP COLUMN "contactPhoneNumber",
DROP COLUMN "isVerified",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "benefits" TEXT[],
ADD COLUMN     "city" TEXT,
ADD COLUMN     "contactPhone" TEXT,
ADD COLUMN     "country" TEXT DEFAULT 'France',
ADD COLUMN     "coverUrl" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "employeeCount" INTEGER,
ADD COLUMN     "foundedIn" TIMESTAMP(3),
ADD COLUMN     "linkedinUrl" TEXT,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "primaryColor" TEXT DEFAULT '#EE7527',
ADD COLUMN     "size" "CompanySize",
ADD COLUMN     "slogan" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "values" TEXT[],
ADD COLUMN     "websiteUrl" TEXT;

-- AlterTable
ALTER TABLE "offers" DROP COLUMN "location",
DROP COLUMN "salary",
ADD COLUMN     "applicationDeadline" TIMESTAMP(3),
ADD COLUMN     "appliesMinimumWage" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "contractType" "ContractType"[],
ADD COLUMN     "country" TEXT DEFAULT 'France',
ADD COLUMN     "duration_max" INTEGER NOT NULL,
ADD COLUMN     "duration_max_unit" "DurationUnit" NOT NULL,
ADD COLUMN     "duration_min" INTEGER,
ADD COLUMN     "duration_min_unit" "DurationUnit",
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "remoteType" "RemoteType",
ADD COLUMN     "salaryMax" INTEGER,
ADD COLUMN     "salaryMin" INTEGER,
ADD COLUMN     "shortDescription" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "fieldOfStudy" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "student_profiles" DROP COLUMN "github_url",
DROP COLUMN "linkedin_url",
DROP COLUMN "portfolio_url",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "githubUrl" TEXT,
ADD COLUMN     "linkedinUrl" TEXT,
ADD COLUMN     "portfolioUrl" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3);
