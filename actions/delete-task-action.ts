"use server"
import { Task } from '@/src/generated/prisma';
import { prisma } from '@/src/utils/prisma/prisma';

export async function deleteTask(id: Task['id']) {
  try {
    return await prisma.task.delete({
      where: {
        id
      }
    })
  } catch (error) {
    console.error(`Ocurrió un error al eliminar la tarea : ${error}`);
  }
}