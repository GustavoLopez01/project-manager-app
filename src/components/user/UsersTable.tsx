import { User } from "@/src/generated/prisma"
import { formatDate } from "@/src/utils/helpers"
import { FaLock, FaRegEdit, FaTrashAlt } from "react-icons/fa"

type UsersTableProps = {
  users: User[]
  onDelete: (user: User) => void
  onEdit: (user: User) => void
  onDesactivate: (user: User) => void
}

export default function UsersTable({
  users,
  onDelete,
  onEdit,
  onDesactivate
}: UsersTableProps) {
  return (
    <>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 font-barlow-bold">
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Usuario</th>
            <th className="px-4 py-2 text-left">Fecha de creación</th>
            <th className="px-4 py-2 text-left">Fecha de actualización</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
            >
              <td className="px-4 py-2 font-barlow-bold">
                {index + 1}
              </td>
              <td className="px-4 py-2">
                {user.name}
              </td>
              <td className="px-4 py-2">
                {user.name}
              </td>
              <td className="px-4 py-2">
                {formatDate(String(user.createdAt))}
              </td>
              <td className="px-4 py-2">
                {formatDate(String(user.updatedAt))}
              </td>
              <td className="flex justify-center gap-2 py-2">
                <button
                  className="cursor-pointer"
                  onClick={() => onEdit(user)}
                >
                  <FaRegEdit className="size-6 text-sky-700" />
                </button>

                <button
                  className="cursor-pointer"
                  onClick={() => onDelete(user)}
                >
                  <FaTrashAlt className="size-5 text-red-500" />
                </button>

                <button
                  className="cursor-pointer"
                  onClick={() => onDesactivate(user)}
                >
                  <FaLock className="size-5 text-amber-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
