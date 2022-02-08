/*
  Warnings:

  - You are about to drop the column `gameId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_gameId_fkey";

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "gameId";

-- DropTable
DROP TABLE "Game";
