"use client"
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import updateTask from '@/actions/update-task-action';
import CustomDialog from '@/src/components/ui/Dialog';
import { updateTaskSchema } from '@/src/utils/schema/task.schema';
import { Project, Task } from '@/src/generated/prisma';
import { errorToast } from '@/src/utils/toast';

type EditTaskProps = {
  children: ReactNode
  isOpen: boolean
  taskId: Task['id']
  projectId: Project['id']
  setIsOpen: () => void
}

export default function EditTask({
  children,
  isOpen,
  taskId,
  projectId,
  setIsOpen,
}: EditTaskProps) {
  const router = useRouter();

  const handleEditTask = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
      status: formData.get('status'),
      priority: formData.get('priority'),
      id: taskId,
      projectId
    }

    const validate = updateTaskSchema.safeParse(data);

    if (!validate.success) {
      validate.error.issues.forEach(issue =>
        errorToast(issue.message)
      );
      return;
    }

    const response = await updateTask(data);
    if (response?.errors.length) {
      response.errors.forEach(error =>
        errorToast(error.message)
      )
      return;
    }

    setIsOpen();
    router.refresh();
  }

  return (
    <>
      <CustomDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <h1 className="text-center font-bold text-2xl">
          Actualizar tarea
        </h1>
        <form
          action={handleEditTask}
          autoComplete="off"
        >
          {children}
          <input
            type='submit'
            className='border-1 border-indigo-500 text-indigo-600 px-2 py-1 w-full rounded-md mt-5 cursor-pointer'
            value="Guardar cambios"
          />
        </form>
      </CustomDialog>
    </>
  )
}
