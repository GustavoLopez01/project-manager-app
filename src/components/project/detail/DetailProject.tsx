"use client"
import { useState } from 'react';
import AddNewTask from '@/src/components/task/AddNewTask';
import TaskFormComponent from '@/src/components/task/TaskFormComponent';
import EditTask from '@/src/components/task/EditTask';
import { ProjectWithTasks } from '@/app/dashboard/detail/[id]/page';
import { Task, User } from '@/src/generated/prisma';
import DeleteTask from '../../task/DeleteTask';
import { formatDate } from '@/src/utils/helpers';
import TableListTask from '../../task/TableListTask';

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
          <TaskFormComponent users={users} />
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
          <TaskFormComponent task={currentTask} users={users} />
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

      <div className="grid items-center h-full font-barlow-regular">
        <div className="grid grid-cols-2 h-40">
          <div>
            <h1 className="font-barlow-bold text-xl">Detalles</h1>

            <p>
              Descripcíon: {" "}
              <span>
                {project?.description}
              </span>
            </p>

            <p>
              Fecha de creación: {" "}
              <span>
                {formatDate(String(project?.createdAt))}
              </span>
            </p>

            <p>
              Total de tareas: {" "}
              <span>
                {project?.tasks.length}
              </span>
            </p>
          </div>

          <div>
            <h1 className="font-barlow-bold text-xl">Usuarios participantes</h1>
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

          <TableListTask
            tasks={project?.tasks!}
            setCurrentTask={setCurrentTask}
            setIsOpen={setIsOpen}
            setIsOpenDelete={setIsOpenDelete}
          />
        </div>
      </div>

      <button
        className="border-1 font-barlow-bold transition border-indigo-500 text-indigo-600 hover:bg-indigo-600 hover:text-white px-2 py-1 w-56 rounded-full mt-5 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        Agregar tarea
      </button>
    </>
  )
}
