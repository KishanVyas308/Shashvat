/*
  Warnings:

  - You are about to drop the column `userId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `Requirement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Requirement" DROP CONSTRAINT "Requirement_productId_fkey";

-- DropForeignKey
ALTER TABLE "Requirement" DROP CONSTRAINT "Requirement_userId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "userId",
ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Requirement";

-- CreateTable
CREATE TABLE "Requests" (
    "id" TEXT NOT NULL,
    "isViewed" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "whatsAppNo" TEXT,
    "companyName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isNewProductRequest" BOOLEAN NOT NULL DEFAULT false,
    "productId" TEXT,
    "productName" TEXT,

    CONSTRAINT "Requests_pkey" PRIMARY KEY ("id")
);
