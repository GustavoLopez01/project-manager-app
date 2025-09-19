"use client"
import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/actions/update-user-action';
import UserFormComponent from '../user/UserFormComponent';
import { errorToast, successToast } from '@/src/utils/toast';
import { createUserSchema } from '@/src/utils/schema/user.schema';
import { UserWithoutPassword } from '@/src/types';

type ProfileComponentProps = {
  user: UserWithoutPassword
}

export default function ProfileComponent({
  user
}: ProfileComponentProps) {
  const router = useRouter();

  const handleUpadateUser = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      rolId: Number(formData.get('rolId')),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      isLocked: user.isLocked
    }

    if (data.password !== data.confirmPassword) {
      errorToast('Las contraseñas no conciden.')
      return;
    }

    const validate = createUserSchema.safeParse(data);

    if (!validate.success) {
      validate.error.issues.forEach(issue =>
        errorToast(issue.message)
      )
      return;
    }

    const { confirmPassword, ...body } = data;
    const response = await updateUser(body, user.id);

    if (response?.errors?.length) {
      response.errors.forEach(error =>
        errorToast(error.message)
      )
      return;
    }

    successToast('Usuario registrado con exito.');
    router.refresh();
  }

  return (
    <>
      <div
        className="w-full md:max-w-md min-h-72 bg-white rounded-md shadow mt-5 p-5"
      >
        <form
          onSubmit={handleUpadateUser}
          autoComplete="off"
        >
          <UserFormComponent user={user} />

          <div className="flex justify-center">
            <input
              type="submit"
              value="Guardar cambios"
              className="px-6 py-2 w-full font-barlow-bold text-white cursor-pointer rounded-md transition hover:bg-indigo-600 bg-indigo-500 mt-6 disabled:cursor-not-allowed"
            />
          </div>
        </form>
      </div>
    </>
  )
}
