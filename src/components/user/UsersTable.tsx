import { UsersWithoutPassword } from '@/app/dashboard/users/page';
import { UserWithoutPassword } from '@/src/types';
import { formatDate } from '@/src/utils/helpers';
import { FaLock, FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { FaLockOpen } from 'react-icons/fa6';

type UsersTableProps = {
  users: UsersWithoutPassword
  onDelete: (user: UserWithoutPassword) => void
  onEdit: (user: UserWithoutPassword) => void
  onDisabled: (user: UserWithoutPassword) => void
}

export default function UsersTable({
  users,
  onDelete,
  onEdit,
  onDisabled
}: UsersTableProps) {
  return (
    <>
      <table className="table-auto w-full border-collapse font-barlow-regular">
        <thead>
          <tr className="bg-gray-200 font-barlow-bold text-left">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Usuario</th>
            <th className="px-4 py-2">Fecha de creación</th>
            <th className="px-4 py-2">Fecha de actualización</th>
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
                {user.email}
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
                  onClick={() => onDisabled(user)}
                >
                  {user.isLocked ? (
                    <FaLock className="size-5 text-amber-500" />
                  ) : (
                    <FaLockOpen className="size-5 text-amber-500" />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
