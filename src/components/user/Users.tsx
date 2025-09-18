"use client"
import { useState } from 'react';
import AddNewUser from './AddNewUser';
import EditUser from './EditUser';
import DeleteUser from './DeleteUser';
import UsersTable from './UsersTable';
import { User } from '@/src/generated/prisma';

type UsersProps = {
  users: User[]
}

export default function Users({
  users
}: UsersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>();

  const handleDelete = (user: User) => {
    setIsOpenDelete(true);
    setCurrentUser(user);
  }

  const handleEdit = (user: User) => {
    setIsOpen(true);
    setCurrentUser(user);
  }

  return (
    <>
      {isOpen && !currentUser && (
        <AddNewUser
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}

      {isOpen && currentUser && (
        <EditUser
          isOpen={isOpen}
          setIsOpen={() => {
            setIsOpen(false);
            setCurrentUser(null);
          }}
          user={currentUser}
        />
      )}

      {isOpenDelete && currentUser && (
        <DeleteUser
          isOpen={isOpenDelete}
          message={`al usuario ${currentUser.name}`}
          userId={currentUser.id}
          setIsOpen={() => {
            setIsOpenDelete(false);
            setCurrentUser(null);
          }}
        />
      )}

      <div className="h-full grid gap-5">
        {users.length ? (
          <UsersTable
            users={users}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onDesactivate={() => {}}
          />
        ) : (
          <p className="text-center py-10 text-xl">
            Aún no existen usuarios
          </p>
        )}

        <button
          onClick={() => setIsOpen(true)}
          className="border-1 font-barlow-bold transition border-indigo-500 text-indigo-600 hover:bg-indigo-600 hover:text-white px-2 py-1 w-56 rounded-full mt-5 cursor-pointer"

        >
          Agregar usuario
        </button>
      </div>
    </>
  )
}
