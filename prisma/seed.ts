import { PrismaClient } from '@prisma/client';
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
