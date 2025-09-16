"use server"
import { prisma } from '@/src/utils/prisma/prisma';
import { validateSession } from '@/src/lib/session';
import { updateTaskSchema } from '@/src/utils/schema/task.schema';

export default async function updateTask(data: unknown) {
  try {
    await validateSession();
    const validate = updateTaskSchema.safeParse(data);
    if (!validate.success) {
      return {
        errors: validate.error.issues
      }
    }

    await prisma.task.update({
      data: validate.data,
      where: {
        id: validate.data.id
      }
    });

    return {
      errors: []
    }
  } catch (error) {
    console.error(`Ocurrió un error al actualizar la tarea : ${error}`);

  }
}