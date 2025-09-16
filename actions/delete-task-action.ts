"use server"
import { prisma } from '@/src/utils/prisma/prisma';
import { validateSession } from '@/src/lib/session';
import { Task } from '@/src/generated/prisma';

export async function deleteTask(id: Task['id']) {
  try {
    await validateSession();
    return await prisma.task.delete({
      where: {
        id
      }
    })
  } catch (error) {
    console.error(`Ocurrió un error al eliminar la tarea : ${error}`);
  }
}