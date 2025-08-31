import { PrismaClient } from '../src/generated/prisma';
import { CATEGORIES } from './data';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.category.createMany({
      data: CATEGORIES
    })
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  }).catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
  });