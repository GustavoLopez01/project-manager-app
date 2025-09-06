import { Task, User } from '@/src/generated/prisma';
import { PRIORITY_LIST, STATUS_LIST } from '@/src/utils/constants';

type TaskFormComponentProps = {
  task?: Task
  users: User[]
}

export default function TaskFormComponent({
  task,
  users
}: TaskFormComponentProps) {  
  return (
    <>
      <div className="space-y-2 grid gap-3 font-barlow-regular">
        <div className="grid">
          <label
            className="font-bold"
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            type="text"
            name="name"
            className="text-sm border-1 border-gray-400 outline-0 p-2 rounded-md"
            placeholder="Nombre de la tarea"
            defaultValue={task?.name}
          />
        </div>

        <div className="grid">
          <label
            className="font-bold"
            htmlFor="description"
          >
            Descripción
          </label>
          <textarea
            name="description"
            className="text-sm border-1 border-gray-400 outline-0 p-2 rounded-md resize-none h-20"
            placeholder="Descripción de la tarea"
            defaultValue={task?.description}
          />
        </div>

        <div className="grid">
          <label
            className="font-bold"
            htmlFor="status"
          >
            Estatus
          </label>
          <select
            name="status"
            className="text-sm border-1 border-gray-400 outline-0 p-2 rounded-md"
            defaultValue={task?.status}
          >
            <option value=''> -- Selecciona una opción -- </option>
            {STATUS_LIST.map(status => (
              <option
                key={status.value}
                value={status.value}
              >
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid">
          <label
            className="font-bold"
            htmlFor="priority"
          >
            Prioridad
          </label>
          <select
            name="priority"
            className="text-sm border-1 border-gray-400 outline-0 p-2 rounded-md"
            defaultValue={task?.priority}
          >
            <option value=''> -- Selecciona una opción -- </option>
            {PRIORITY_LIST.map(priority => (
              <option
                key={priority.value}
                value={priority.value}
              >
                {priority.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid">
          <label
            className="font-bold"
            htmlFor="priority"
          >
            Usuario responsable
          </label>
          <select
            name="userId"
            className="text-sm border-1 border-gray-400 outline-0 p-2 rounded-md"
            defaultValue={task?.userId || ''}
          >
            <option value=''> -- Selecciona una opción -- </option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name} {user.lastName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}
