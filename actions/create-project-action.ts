"use server"

import { prisma } from "@/src/utils/prisma/prisma";

export async function createProject(formData: unknown) {
  try {
    return prisma.project.create({
      data: {
        description: "desc",
        name: "prueba 1",
        categoryId: 1
      }
    })
  } catch (error) {
    console.error(`Ocurrió un error al crear el proyecto - ${error}`);
  }
}