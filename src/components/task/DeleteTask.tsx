import { useRouter } from 'next/navigation';
import { deleteTask } from '@/actions/delete-task-action';
import DeleteModal from '@/src/components/modal/DeleteModal';
import { Task } from '@/src/generated/prisma';
import { errorToast, successToast } from '@/src/utils/toast';

type DeleteTaskProps = {
  isOpen: boolean
  message: String
  taskId: Task['id']
  setIsOpen: () => void
}

export default function DeleteTask({
  isOpen,
  message,
  taskId,
  setIsOpen
}: DeleteTaskProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!taskId) {
      errorToast('El id de la tarea es requerido.');
      return;
    }

    await deleteTask(taskId);
    successToast('Tarea eliminada correctamente.');
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
