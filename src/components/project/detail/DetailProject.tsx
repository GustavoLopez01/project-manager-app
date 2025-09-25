"use client"
import { useEffect, useMemo, useState } from 'react';
import AddNewTask from '@/src/components/task/AddNewTask';
import TaskFormComponent from '@/src/components/task/TaskFormComponent';
import EditTask from '@/src/components/task/EditTask';
import TableListTask from '../../task/TableListTask';
import DeleteTask from '../../task/DeleteTask';
import Pagination from '../../pagination/Pagination';
import ItemsPerPage from '../../pagination/ItemsPerPage';
import { formatDate, orderTasksByFilter } from '@/src/utils/helpers';
import { Task, User } from '@/src/generated/prisma';
import { ProjectWithTasks } from '@/app/dashboard/detail/[id]/page';
import {
  DEFAULT_NUMBER_PAGE,
  FILTERS,
  FILTERS_ITEMS_PER_PAGE,
} from '@/src/utils/constants';

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
    return tasks?.sort((a, b) => orderTasksByFilter(filter, a, b));
  }, [project?.tasks, filter]);

  const [currentPage, setCurrentPage] = useState(DEFAULT_NUMBER_PAGE);
  const [itemsPage, setItemsPage] = useState(FILTERS_ITEMS_PER_PAGE[0].value);

  const items = useMemo(() => {
    const finalItems: number[] = [];
    const totalItems = Math.ceil(currentTasks.length / itemsPage);
    for (let index = 0; index < totalItems; index++) {
      finalItems.push(index + 1);
    }
    return finalItems;
  }, [currentTasks, itemsPage]);

  const tasksByPage = useMemo(() => {
    const end = currentPage * itemsPage;
    const start = end - itemsPage;
    return currentTasks.slice(start, end);
  }, [currentTasks, currentPage, itemsPage]);

  useEffect(() => {
    if (items.length === DEFAULT_NUMBER_PAGE)
      setCurrentPage(DEFAULT_NUMBER_PAGE);
  }, [items]);

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
          message={`la tarea ${currentTask.name}`}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <h1 className="font-bold text-xl">
              Tareas
            </h1>

            <div className="flex flex-wrap md:justify-end gap-5 items-center">
              <div className="flex">
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
              <ItemsPerPage
                setItems={setItemsPage}
              />
            </div>
          </div>


          {project?.tasks?.length! > 0 ? (
            <>
              <div className="mt-5 overflow-x-auto">
                <TableListTask
                  tasks={tasksByPage!}
                  setCurrentTask={setCurrentTask}
                  setIsOpen={setIsOpen}
                  setIsOpenDelete={setIsOpenDelete}
                />
              </div>
              <div className="mt-5">
                <Pagination
                  items={items}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </>
          ) : (
            <p className="text-center py-10 text-xl">
              Aún no existen tareas en el proyecto
            </p>
          )}
        </div>
      </div>

      <button
        className="w-56 border-1 font-barlow-bold transition border-indigo-500 text-indigo-600 hover:bg-indigo-600 hover:text-white px-2 py-1 rounded-full mt-5 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        Agregar tarea
      </button>
    </>
  )
}
