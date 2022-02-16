import { PrismaClient } from '@prisma/client';
import gameModes from './seed-gamemodes';
import titles from './seed-titles';
const prisma = new PrismaClient();

async function main() {
  // Seed database with titles
  titles.forEach(async (create) => {
    await prisma.title.upsert({
      where: { id: create.id },
      update: {},
      create,
    });
  });

  // Seed database with game modes
  gameModes.forEach(async (create) => {
    await prisma.gameMode.upsert({
      where: { id: create.id },
      update: {},
      create,
    });
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
