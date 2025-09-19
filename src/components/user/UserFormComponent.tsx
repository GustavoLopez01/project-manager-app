"use client"
import { useEffect, useState } from 'react';
import { getRoles } from '@/src/utils/helper';
import { Rol } from '@/src/generated/prisma';
import { UserWithoutPassword } from '@/src/types';

type UserFormComponentProps = {
  user?: UserWithoutPassword
}

export default function UserFormComponent({
  user
}: UserFormComponentProps) {
  const [roles, setRoles] = useState<Rol[]>([])

  const handleGetRoles = async () => {
    const response = await getRoles();
    if (Array.isArray(response)) {
      setRoles(response)
    }
  }

  useEffect(() => {
    handleGetRoles();
  }, []);

  return (
    <>
      <div
        className="space-y-4 font-barlow-light"
      >
        <div className="grid">
          <label htmlFor="name">
            Nombre (s)
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={user?.name}
            placeholder="Ingresa el nombre"
            className="text-sm border-1 border-gray-400 outline-0 p-2 rounded-md"
          />
        </div>

        <div className="grid">
          <label htmlFor="lastName">
            Apellidos (s)
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Ingresa el apellido"
            defaultValue={user?.lastName}
            className="text-sm border-1 border-gray-400 outline-0 p-2 rounded-md"
          />
        </div>

        <div className="grid">
          <label htmlFor="email">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={user?.email}
            placeholder="Ingresa tu correo electrónico"
            className="text-sm border-1 border-gray-400 outline-0 p-2 rounded-md"
          />
        </div>

        <div className="grid">
          <label htmlFor="rolId">
            Agrega un rol
          </label>
          <select
            id="rolId"
            name="rolId"
            value={user?.rolId}
            onChange={() => { }}
            className="text-sm border-1 border-gray-400 outline-0 p-2 rounded-md"
          >
            <option value=''>
              -- Selecciona una opción --
            </option>

            {roles.map(rol => (
              <option
                key={rol.id}
                value={rol.id}
              >
                {rol.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid">
          <label htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Ingresa la contraseña"
            className="text-sm border-1 border-gray-400 outline-0 p-2 rounded-md"
          />
        </div>

        <div className="grid">
          <label htmlFor="confirmPassword">
            Confirma la contraseña
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Repite la contraseña"
            className="text-sm border-1 border-gray-400 outline-0 p-2 rounded-md"
          />
        </div>
      </div>
    </>
  )
}
