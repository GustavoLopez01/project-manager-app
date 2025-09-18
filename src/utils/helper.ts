"use server"
import { prisma } from "./prisma/prisma"

export async function getCategories() {
  return prisma.category.findMany();
}

export async function getRoles() {
  return prisma.rol.findMany();
}

export const getUserByEmail = async (email: string) => {
  return prisma.user.findFirst({
    where: {
      email
    }
  })
}