import { useCallback } from 'react';
import { Task } from '@/src/generated/prisma';
import { formatDate } from '@/src/utils/helpers';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { PRIORITY_LIST } from '@/src/utils/constants';

type TableListTaskProps = {
  tasks: Task[]
  setCurrentTask: (task: Task) => void
  setIsOpen: (isOpen: boolean) => void
  setIsOpenDelete: (isOpen: boolean) => void
}

export default function TableListTask({
  tasks,
  setCurrentTask,
  setIsOpen,
  setIsOpenDelete
}: TableListTaskProps) {

  const priorityLabel = useCallback((value: string) => {
    return PRIORITY_LIST.find(priority => priority.value === value)?.label;
  }, [tasks]);

  return (
    <>
      <table className="table-auto w-full border-collapse mt-10">
        <thead>
          <tr className="bg-gray-200 font-barlow-bold">
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Descripción</th>
            <th className="px-4 py-2 text-left">Prioridad</th>
            <th className="px-4 py-2 text-left">Fecha de creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr
              key={task.id}
              className="border-b border-gray-300 hover:bg-gray-50"
            >
              <td className="px-4 py-2">
                {task.name}
              </td>
              <td className="px-4 py-2">
                {task.description}
              </td>
              <td className="px-4 py-2">
                <span className="bg-red-600 block text-white min-w-15 text-center py-1 rounded-full">
                  {priorityLabel(task.priority)}
                </span>
              </td>
              <td className="px-4 py-2">
                {formatDate(String(task.createdAt))}
              </td>
              <td className="flex justify-center gap-2 py-2">
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    setCurrentTask(task);
                    setIsOpen(true);
                  }}
                >
                  <FaRegEdit className="size-6 text-sky-700" />
                </button>

                <button
                  className="cursor-pointer"
                  onClick={() => {
                    setCurrentTask(task);
                    setIsOpenDelete(true);
                  }}
                >
                  <FaTrashAlt className="size-5 text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}