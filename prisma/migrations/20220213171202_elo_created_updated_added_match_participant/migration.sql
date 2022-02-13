/*
  Warnings:

  - Added the required column `updatedAt` to the `MatchParticipant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MatchParticipant" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "eloChange" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
