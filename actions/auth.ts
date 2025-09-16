"use server"
import { createSession } from '@/src/lib/session'
import { prisma } from '@/src/utils/prisma/prisma'
import { authSchema } from '@/src/utils/schema/auth.schema'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signup(formData: FormData) {
  const data = {
    username: formData.get('username'),
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
      lastName: validate.data.username,
      password: validate.data.password
    }
  });

  if (!user?.id) {
    return {
      errors: [
        {
          message: `No existe usuario ${validate.data.username}, verifica la información.`
        }
      ]
    }
  }

  await createSession(user.id)
  redirect('/dashboard/projects')
}


export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/')
}