-- DropIndex
DROP INDEX "MatchParticipant_userId_matchId_key";

-- AlterTable
ALTER TABLE "MatchParticipant" ADD CONSTRAINT "MatchParticipant_pkey" PRIMARY KEY ("userId", "matchId");
