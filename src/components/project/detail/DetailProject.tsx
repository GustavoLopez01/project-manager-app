"use client"
import { useState } from 'react';
import AddNewTask from '@/src/components/task/AddNewTask';
import TaskFormComponent from '@/src/components/task/TaskFormComponent';
import EditTask from '@/src/components/task/EditTask';
import DeleteModal from '@/src/components/modal/DeleteModal';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { ProjectWithTasks } from '@/app/dashboard/detail/[id]/page';
import { Task, User } from '@/src/generated/prisma';
import DeleteTask from '../../task/DeleteTask';

type DetailProjectProps = {
  project: ProjectWithTasks
  users: User[]
}

export default function DetailProject({
  project,
  users
}: DetailProjectProps) {
  const [currentTask, setCurrentTask] = useState<Task | null>();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  return (
    <>
      {isOpen && !currentTask && (
        <AddNewTask
          projectId={project?.id!}
          isOpen={isOpen}
          setIsOpen={() => {
            setCurrentTask(null);
            setIsOpen(false);
          }}
        >
          <TaskFormComponent />
        </AddNewTask>
      )}

      {isOpen && currentTask && (
        <EditTask
          projectId={project?.id!}
          taskId={currentTask.id}
          isOpen={isOpen}
          setIsOpen={() => {
            setCurrentTask(null);
            setIsOpen(false);
          }}
        >
          <TaskFormComponent task={currentTask} />
        </EditTask>
      )}

      {isOpenDelete && currentTask && (
        <DeleteTask
          message={`la tarea ${currentTask.name}?`}
          taskId={currentTask.id}
          isOpen={isOpenDelete}
          setIsOpen={() => {
            setCurrentTask(null);
            setIsOpenDelete(false);
          }}
        />
      )}

      <div className="grid items-center h-full">
        <div className="grid grid-cols-2 h-40">
          <div>
            <h1 className="font-bold text-xl">Detalles</h1>
          </div>

          <div>
            <h1 className="font-bold text-xl">Usuarios participantes</h1>
            <div className="flex gap-1">
              {users.map((user) => (
                <button
                  key={user.id}
                  className="bg-amber-500 font-black text-white rounded-full h-10 w-10"
                >
                  {user.name?.[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid">
          <div className="grid grid-cols-2">
            <h1 className="font-bold text-xl">
              Tareas
            </h1>

            <div className="flex gap-3 items-center">
              <label className="min-w-24">
                Ordenar por
              </label>
              <select
                className="w-full text-sm border-1 border-gray-400 outline-0 py-1 px-2 rounded-md"
              >
                <option>
                  prioridad
                </option>
              </select>
            </div>
          </div>

          <table className="table-auto w-full border-collapse mt-10">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {project?.tasks.map(task => (
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
                      <FaTrashAlt className="size-5 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        className="border-1 border-indigo-400 mt-10 max-w-52 rounded-full text-indigo-500 font-bold px-6 py-1 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        + Agregar tarea
      </button>
    </>
  )
}
