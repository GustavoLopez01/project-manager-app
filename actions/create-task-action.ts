"use server"
import { prisma } from "@/src/utils/prisma/prisma";
import { createTaskSchema } from "@/src/utils/schema/task.schema";

export default async function createTask(data: unknown) {
  try {
    const validate = createTaskSchema.safeParse(data);
    if (!validate.success) {
      return {
        errors: validate.error.issues
      }
    }

    await prisma.task.create({
      data: validate.data
    });

    return {
      errors: []
    }
  } catch (error) {
    console.error(`Ocurrió un error al crear la tarea - ${error}`);
  }
}