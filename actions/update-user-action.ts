"use server"
import { getUserByEmail } from '@/src/utils/helper';
import { hashString } from '@/src/utils/helpers';
import { prisma } from '@/src/utils/prisma/prisma';
import { createUserSchema } from '@/src/utils/schema/user.schema';
import { User } from '@/src/generated/prisma';
import { validateSession } from '@/src/lib/session';

export async function updateUser(formData: unknown, id: User['id']) {
  try {
    await validateSession();
    const validate = createUserSchema.safeParse(formData);

    if (!validate.success) {
      return {
        errors: validate.error.issues
      }
    }

    const user = await getUserByEmail(validate.data.email);
    if (user && user.id !== id) {
      return {
        errors: [{ message: `El correo electrónico ${validate.data.email} ya existe.` }]
      }
    }

    const body = {
      ...validate.data,
      password: hashString(validate.data.password),
    }

    await prisma.user.update({
      where: {
        id
      },
      data: body
    });

    return {
      errors: []
    }
  } catch (error) {
    console.error(`Ocurrió un error al actualizar el usuario : ${error}`);
  }
}