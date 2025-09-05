import { PrismaClient } from '../src/generated/prisma';
import { CATEGORIES, ROLES, USERS } from './data';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.category.createMany({
      data: CATEGORIES
    });
    await prisma.rol.createMany({
      data: ROLES
    });
    await prisma.user.createMany({
      data: USERS
    });
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