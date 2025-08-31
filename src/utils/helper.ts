"use server"
import { prisma } from "./prisma/prisma"

export async function getCategories() {
  return prisma.category.findMany();
}