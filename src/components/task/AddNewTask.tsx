"use client"
import { FormEvent, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import CustomDialog from '../ui/Dialog';
import createTask from '@/actions/create-task-action';
import { createTaskSchema } from '@/src/utils/schema/task.schema';
import { errorToast, successToast } from '@/src/utils/toast';
import { Project } from '@/src/generated/prisma';

type AddNewTaskProps = {
  children: ReactNode
  projectId: Project['id']
  isOpen: boolean
  setIsOpen: () => void
}

export default function AddNewTask({
  children,
  projectId,
  isOpen,
  setIsOpen
}: AddNewTaskProps) {
  const router = useRouter();

  const handleAddTask = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
      status: formData.get('status'),
      priority: formData.get('priority'),
      userId: formData.get('userId') || null,
      projectId
    }
    
    const validate = createTaskSchema.safeParse(data);    
    if (!validate.success) {
      validate.error.issues.forEach(issue =>
        errorToast(issue.message)
      );
      return;
    }

    const response = await createTask(data);
    if (response?.errors.length) {
      response.errors.forEach(error =>
        errorToast(error.message)
      )
      return;
    }

    setIsOpen();
    successToast('Tarea registrada con exito.');
    router.refresh();
  }

  return (
    <>
      <CustomDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <h1 className="text-center text-2xl">
          Nueva tarea
        </h1>
        <form
          onSubmit={handleAddTask}
          autoComplete="off"
        >
          {children}
          <input
            type='submit'
            className='border-1 font-barlow-bold transition border-indigo-500 text-indigo-600 hover:bg-indigo-600 hover:text-white px-2 py-1 w-full rounded-full mt-5 cursor-pointer'
            value="Guardar"
          />
        </form>
      </CustomDialog>
    </>
  )
}
