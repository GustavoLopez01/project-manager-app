"use server"
import { createSession } from '@/src/lib/session'
import { getRoutesByRol, isEqualToHash } from '@/src/utils/helpers'
import { prisma } from '@/src/utils/prisma/prisma'
import { authSchema } from '@/src/utils/schema/auth.schema'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signup(formData: FormData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const validate = authSchema.safeParse(data);

  if (!validate.success) {
    return {
      errors: validate.error.issues
    }
  }

  const user = await prisma.user.findFirst({
    where: {
      email: validate.data.email,
    }
  });

  if (!user?.id) {
    return {
      errors: [
        {
          message: `No existe usuario ${validate.data.email}, verifica la información.`
        }
      ]
    }
  }

  if (user.isLocked) {
    return {
      errors: [
        {
          message: `El usuario ${validate.data.email}, se encuentra desactivado.`
        }
      ]
    }
  }

  const isValid = await isEqualToHash(validate.data.password, user?.password!);

  if (!isValid) {
    return {
      errors: [
        {
          message: `La contraseña es incorrecta.`
        }
      ]
    }
  }

  await createSession(user.id, user.rolId)
  const firstRoute = await getRoutesByRol(user.rolId);
  redirect(firstRoute[0].path)
}


export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/')
}