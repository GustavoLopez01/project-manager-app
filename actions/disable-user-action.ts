"use server"
import { UserWithoutPassword } from '@/src/types';
import { prisma } from '@/src/utils/prisma/prisma';

export async function disableUser(user: UserWithoutPassword) {
  try {
    await prisma.user.update({
      data: {
        isLocked: !user.isLocked
      },
      where: {
        id: user.id
      }
    });
  } catch (error) {
    console.error(`Ocurrió un error al desactivar al usaurio : ${error}`);
  }
}