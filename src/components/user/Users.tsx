"use client"
import { useState } from 'react';
import { redirect } from 'next/navigation';
import { disableUser } from '@/actions/disable-user-action';
import AddNewUser from './AddNewUser';
import EditUser from './EditUser';
import DeleteUser from './DeleteUser';
import UsersTable from './UsersTable';
import DisableModal from '../modal/DisableModal';
import { errorToast, successToast } from '@/src/utils/toast';
import { UsersWithoutPassword } from '@/app/dashboard/users/page';
import { UserWithoutPassword } from '@/src/types';

type UsersProps = {
  users: UsersWithoutPassword
}

export default function Users({
  users
}: UsersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenDisable, setIsOpenDisable] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserWithoutPassword | null>();

  const handleDisableUser = async (user: UserWithoutPassword) => {
    if (!user) {
      errorToast('El usuario es requerido.');
      return;
    }

    await disableUser(user);
    setCurrentUser(null);
    setIsOpenDisable(false);
    successToast(`Usuario ${user.isLocked ? 'desbloqueado' : 'bloqueado'} correctamente.`)
    redirect('/dashboard/users');
  }

  const handleDelete = (user: UserWithoutPassword) => {
    setIsOpenDelete(true);
    setCurrentUser(user);
  }

  const handleEdit = (user: UserWithoutPassword) => {
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

      {isOpenDisable && currentUser && (
        <DisableModal
          isOpen={isOpenDisable}
          setIsOpen={() => {
            setIsOpenDisable(false);
            setCurrentUser(null);
          }}
          message={currentUser.email}
          onAccept={() => handleDisableUser(currentUser)}
          onCancel={() => {
            setIsOpenDisable(false);
            setCurrentUser(null);
          }}
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
            onDisabled={async (user) => {
              if (user.isLocked) {
                await handleDisableUser(user);
              } else {
                setCurrentUser(user);
                setIsOpenDisable(true);
              }
            }}
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
