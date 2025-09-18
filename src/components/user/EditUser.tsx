import { FormEvent } from 'react';
import CustomDialog from '../ui/Dialog';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/actions/update-user-action';
import UserFormComponent from './UserFormComponent';
import { createUserSchema } from '@/src/utils/schema/user.schema';
import { errorToast, successToast } from '@/src/utils/toast';
import { User } from '@/src/generated/prisma';

type EditUserProps = {
  user: User
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function EditUser({
  user,
  isOpen,
  setIsOpen,
}: EditUserProps) {
  const router = useRouter();

  const handleEditUser = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      rolId: Number(formData.get('rolId')),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
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

    setIsOpen(false);
    successToast('Usuario registrado con exito.');
    router.refresh();
  }

  return (
    <>
      <CustomDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <h1 className="text-center text-2xl">
          Editar usuario
        </h1>

        <form
          onSubmit={handleEditUser}
          autoComplete="off"
        >
          <UserFormComponent user={user} />
          <input
            type="submit"
            className='border-1 font-barlow-bold transition border-indigo-500 text-indigo-600 hover:bg-indigo-600 hover:text-white px-2 py-1 w-full rounded-full mt-5 cursor-pointer'
            value="Guardar"
          />
        </form>
      </CustomDialog>
    </>
  )
}
