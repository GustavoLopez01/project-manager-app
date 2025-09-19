import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createUser } from '@/actions/create-user-action';
import CustomDialog from '../ui/Dialog';
import UserFormComponent from './UserFormComponent';
import { errorToast, successToast } from '@/src/utils/toast';
import { createUserSchema } from '@/src/utils/schema/user.schema';

type AddNewUserProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function AddNewUser({
  isOpen,
  setIsOpen,
}: AddNewUserProps) {
  const router = useRouter();

  const handleAddUser = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      rolId: Number(formData.get('rolId')),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      isLocked: false
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
    const response = await createUser(body);

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
          Nuevo usuario
        </h1>

        <form
          onSubmit={handleAddUser}
          autoComplete="off"
        >
          <UserFormComponent />
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
