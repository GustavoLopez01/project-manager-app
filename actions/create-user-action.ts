"use server"
import { prisma } from '@/src/utils/prisma/prisma';
import { getUserByEmail } from '@/src/utils/helper';
import { hashString } from '@/src/utils/helpers';
import { createUserSchema } from '@/src/utils/schema/user.schema';

export async function createUser(formData: unknown) {
  try {
    const validate = createUserSchema.safeParse(formData);

    if (!validate.success) {
      return {
        errors: validate.error.issues
      }
    }

    const user = await getUserByEmail(validate.data.email);

    if (user) {
      return {
        errors: [{ message: `El correo electrónico ${validate.data.email} ya existe.` }]
      }
    }

    const body = {
      ...validate.data,
      password: hashString(validate.data.password),
    }

    await prisma.user.create({
      data: body
    });

    return {
      errors: []
    }
  } catch (error) {
    console.error(`Ocurrió un error al crear el usuario : ${error}`);
  }
}