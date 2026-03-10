-- CreateEnum
CREATE TYPE "OfferStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'CLOSED');

-- CreateEnum
CREATE TYPE "OfferApplicationStatus" AS ENUM ('SUBMITTED', 'REJECTED', 'ACCEPTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'STUDENT', 'COMPANY');

-- CreateEnum
CREATE TYPE "Industry" AS ENUM ('AEROSPACE', 'AGRICULTURE', 'AUTOMOTIVE', 'BANKING_INSURANCE', 'CONSTRUCTION', 'EDUCATION', 'ENERGY', 'HEALTHCARE', 'HOSPITALITY', 'IT_SERVICES', 'LUXURY', 'MANUFACTURING', 'MEDIA_ENTERTAINMENT', 'RETAIL', 'PUBLIC_SECTOR', 'TRANSPORT_LOGISTICS');

-- CreateEnum
CREATE TYPE "FieldOfStudy" AS ENUM ('ADMINISTRATION', 'ARTS_DESIGN', 'BUSINESS_MANAGEMENT', 'COMMUNICATION', 'COMPUTER_SCIENCE', 'DATA_ANALYTICS', 'ENGINEERING', 'FINANCE_ACCOUNTING', 'HUMAN_RESOURCES', 'LAW', 'MARKETING', 'SALES');

-- CreateEnum
CREATE TYPE "StudyLevel" AS ENUM ('BAC_PLUS_2', 'BAC_PLUS_3', 'BAC_PLUS_4', 'BAC_PLUS_5', 'BAC_PLUS_6', 'DOCTORATE');

-- CreateEnum
CREATE TYPE "ContractType" AS ENUM ('INTERNSHIP', 'APPRENTICESHIP');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "externalUserId" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_profiles" (
    "userId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "biography" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "city" TEXT,
    "country" TEXT DEFAULT 'France',
    "contactPhone" TEXT,
    "contactEmail" TEXT,
    "schoolName" TEXT,
    "degreeName" TEXT,
    "fieldOfStudy" "FieldOfStudy",
    "startYear" INTEGER,
    "graduationYear" INTEGER,
    "currentLevel" "StudyLevel",
    "targetLevel" "StudyLevel",
    "skills" TEXT[],
    "languages" TEXT[],
    "cvUrl" TEXT,
    "portfolio_url" TEXT,
    "linkedin_url" TEXT,
    "github_url" TEXT,
    "openTo" "ContractType"[],
    "preferredLocations" TEXT[],
    "availableOn" TIMESTAMP(3),
    "isVisible" BOOLEAN NOT NULL DEFAULT false,
    "showLastName" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "student_profiles_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "StudentSavedOffer" (
    "studentId" INTEGER NOT NULL,
    "offerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentSavedOffer_pkey" PRIMARY KEY ("studentId","offerId")
);

-- CreateTable
CREATE TABLE "company_profiles" (
    "userId" INTEGER NOT NULL,
    "legalName" TEXT NOT NULL,
    "industry" "Industry",
    "description" TEXT,
    "siret" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "contactPhoneNumber" TEXT,
    "contactEmail" TEXT,

    CONSTRAINT "company_profiles_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "offers" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "salary" INTEGER,
    "status" "OfferStatus" NOT NULL DEFAULT 'DRAFT',
    "fieldOfStudy" "FieldOfStudy" NOT NULL,
    "companyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offer_applications" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "cvUrl" TEXT NOT NULL,
    "status" "OfferApplicationStatus" NOT NULL DEFAULT 'SUBMITTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "studentId" INTEGER NOT NULL,
    "offerId" INTEGER NOT NULL,

    CONSTRAINT "offer_applications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_externalUserId_key" ON "users"("externalUserId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "student_profiles_userId_key" ON "student_profiles"("userId");

-- CreateIndex
CREATE INDEX "StudentSavedOffer_offerId_idx" ON "StudentSavedOffer"("offerId");

-- CreateIndex
CREATE UNIQUE INDEX "company_profiles_userId_key" ON "company_profiles"("userId");

-- AddForeignKey
ALTER TABLE "student_profiles" ADD CONSTRAINT "student_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSavedOffer" ADD CONSTRAINT "StudentSavedOffer_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student_profiles"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSavedOffer" ADD CONSTRAINT "StudentSavedOffer_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "offers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_profiles" ADD CONSTRAINT "company_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company_profiles"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offer_applications" ADD CONSTRAINT "offer_applications_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student_profiles"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offer_applications" ADD CONSTRAINT "offer_applications_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "offers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
