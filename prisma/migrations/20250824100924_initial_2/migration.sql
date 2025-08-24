/*
  Warnings:

  - The primary key for the `food_dontaions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `donationId` on the `food_dontaions` table. All the data in the column will be lost.
  - You are about to drop the column `expiryDate` on the `food_dontaions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."food_dontaions" DROP CONSTRAINT "food_dontaions_pkey",
DROP COLUMN "donationId",
DROP COLUMN "expiryDate",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "food_dontaions_pkey" PRIMARY KEY ("id");
