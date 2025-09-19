"use server"
import { User } from '@/src/generated/prisma';
import { validateSession } from '@/src/lib/session';
import { prisma } from '@/src/utils/prisma/prisma';

export async function deleteUser(id: User['id']) {
  try {
    await validateSession();
    await prisma.user.delete({
      where: {
        id
      }
    });
  } catch (error) {
    console.error(`Ocurrió un error al eliminar al usuario : ${error}`);
  }
}