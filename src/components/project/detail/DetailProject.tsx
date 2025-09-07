"use client"
import { useMemo, useState } from 'react';
import AddNewTask from '@/src/components/task/AddNewTask';
import TaskFormComponent from '@/src/components/task/TaskFormComponent';
import EditTask from '@/src/components/task/EditTask';
import TableListTask from '../../task/TableListTask';
import DeleteTask from '../../task/DeleteTask';
import { formatDate } from '@/src/utils/helpers';
import { ProjectWithTasks } from '@/app/dashboard/detail/[id]/page';
import { Task, User } from '@/src/generated/prisma';
import { FILTERS, PRIORITY_LIST } from '@/src/utils/constants';

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
  const [filter, setFilter] = useState('');

  const currentTasks = useMemo(() => {
    const tasks = [...project?.tasks ?? []];
    if (!filter) return tasks;
    return tasks?.sort((a, b) => {
      let p1: number | Date = 0;
      let p2: number | Date = 0;

      if (filter === 'priority') {
        p1 = PRIORITY_LIST.find(priority => priority.value === a.priority)?.index!
        p2 = PRIORITY_LIST.find(priority => priority.value === b.priority)?.index!
      } else {
        p1 = new Date(a.createdAt);
        p2 = new Date(a.createdAt);
      }

      if (p1 < p2) return -1
      if (p1 > p2) return 1
      return 0;
    });
  }, [project?.tasks, filter]);

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
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value=''>
                  -- Selecciona una opción --
                </option>
                {FILTERS.map(filter => (
                  <option
                    key={filter.value}
                    value={filter.value}
                  >
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>
          </div>


          {project?.tasks?.length! > 0 ? (
            <TableListTask
              tasks={currentTasks!}
              setCurrentTask={setCurrentTask}
              setIsOpen={setIsOpen}
              setIsOpenDelete={setIsOpenDelete}
            />
          ) : (
            <p className="text-center py-10 text-xl">
              Aún no existen tareas en el proyecto
            </p>
          )}
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
