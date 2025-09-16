"use server"
import { prisma } from '@/src/utils/prisma/prisma';
import { validateSession } from '@/src/lib/session';
import { createProjectSchema } from '@/src/utils/schema/project.schema';

export async function createProject(formData: unknown) {
  try {
    await validateSession();
    const projectData = createProjectSchema.safeParse(formData);
    if (!projectData.success) {
      return {
        errors: projectData.error.issues
      }
    }

    return await prisma.project.create({
      data: projectData.data
    });
  } catch (error) {
    console.error(`Ocurrió un error al crear el proyecto - ${error}`);
  }
}