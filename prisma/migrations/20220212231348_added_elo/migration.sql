-- CreateTable
CREATE TABLE "Elo" (
    "userId" INTEGER NOT NULL,
    "gameModeId" INTEGER NOT NULL,

    CONSTRAINT "Elo_pkey" PRIMARY KEY ("userId","gameModeId")
);

-- AddForeignKey
ALTER TABLE "Elo" ADD CONSTRAINT "Elo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Elo" ADD CONSTRAINT "Elo_gameModeId_fkey" FOREIGN KEY ("gameModeId") REFERENCES "GameMode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
