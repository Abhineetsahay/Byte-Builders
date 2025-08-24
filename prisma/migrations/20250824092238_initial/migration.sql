-- CreateEnum
CREATE TYPE "public"."food_donation_status" AS ENUM ('PENDING', 'ACCEPTED');

-- CreateEnum
CREATE TYPE "public"."issue_status" AS ENUM ('PENDING', 'ACCEPTED', 'RESOLVED');

-- CreateEnum
CREATE TYPE "public"."issue_category" AS ENUM ('waste', 'water', 'health', 'roads', 'electicity', 'environment', 'safety');

-- CreateEnum
CREATE TYPE "public"."issue_urgency_level" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateTable
CREATE TABLE "public"."organizations" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."food_dontaions" (
    "donationId" SERIAL NOT NULL,
    "foodType" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "pickupAddress" TEXT NOT NULL,
    "photoURL" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "donorUserId" TEXT NOT NULL,
    "status" "public"."food_donation_status" NOT NULL,
    "acceptorOrgId" TEXT,

    CONSTRAINT "food_dontaions_pkey" PRIMARY KEY ("donationId")
);

-- CreateTable
CREATE TABLE "public"."issues" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photoURL" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "public"."issue_status" NOT NULL,
    "category" "public"."issue_category" NOT NULL,
    "urgencyLevel" "public"."issue_urgency_level" NOT NULL,
    "userId" TEXT NOT NULL,
    "acceptorOrgId" TEXT,

    CONSTRAINT "issues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."issue_likes" (
    "usedId" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,

    CONSTRAINT "issue_likes_pkey" PRIMARY KEY ("usedId","issueId")
);

-- AddForeignKey
ALTER TABLE "public"."food_dontaions" ADD CONSTRAINT "food_dontaions_donorUserId_fkey" FOREIGN KEY ("donorUserId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."food_dontaions" ADD CONSTRAINT "food_dontaions_acceptorOrgId_fkey" FOREIGN KEY ("acceptorOrgId") REFERENCES "public"."organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."issues" ADD CONSTRAINT "issues_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."issues" ADD CONSTRAINT "issues_acceptorOrgId_fkey" FOREIGN KEY ("acceptorOrgId") REFERENCES "public"."organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."issue_likes" ADD CONSTRAINT "issue_likes_usedId_fkey" FOREIGN KEY ("usedId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."issue_likes" ADD CONSTRAINT "issue_likes_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "public"."issues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
