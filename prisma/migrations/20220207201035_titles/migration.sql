-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY');

-- CreateTable
CREATE TABLE "Title" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "rarity" "Rarity" NOT NULL DEFAULT E'COMMON',

    CONSTRAINT "Title_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TitlesOnUsers" (
    "userId" INTEGER NOT NULL,
    "titleId" INTEGER NOT NULL,

    CONSTRAINT "TitlesOnUsers_pkey" PRIMARY KEY ("userId","titleId")
);

-- AddForeignKey
ALTER TABLE "TitlesOnUsers" ADD CONSTRAINT "TitlesOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitlesOnUsers" ADD CONSTRAINT "TitlesOnUsers_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "Title"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
