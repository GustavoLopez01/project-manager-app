import { useRouter } from 'next/navigation';
import { deleteUser } from '@/actions/delete-user-action';
import DeleteModal from '../modal/DeleteModal';
import { errorToast, successToast } from '@/src/utils/toast';
import { User } from '@/src/generated/prisma';

type DeleteUserProps = {
  isOpen: boolean
  message: String
  userId: User['id']
  setIsOpen: () => void
}

export default function DeleteUser({
  isOpen,
  message,
  userId,
  setIsOpen
}: DeleteUserProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!userId) {
      errorToast('El id del usuario es requerido.');
      return;
    }

    await deleteUser(userId);
    successToast('Usuario eliminado correctamente.');
    setIsOpen();
    router.refresh();
  }
  
  return (
    <>
      <DeleteModal
        isOpen={isOpen}
        message={message}
        setIsOpen={setIsOpen}
        onAccept={handleDelete}
        onCancel={setIsOpen}
      />
    </>
  )
}
