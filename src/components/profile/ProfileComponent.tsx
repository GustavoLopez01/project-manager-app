import { prisma } from '@/src/utils/prisma/prisma';

async function getRoles() {
  return prisma.rol.findMany();
}

export default async function ProfileComponent() {
  const roles = await getRoles();
  return (
    <>
      <div
        className="w-full md:max-w-md min-h-72 bg-white rounded-md shadow mt-5 p-5"
      >
        <form
          autoComplete="off"
        >
          <div
            className="grid grid-cols-1 gap-5"
          >
            <div className="grid">
              <label
                htmlFor="name"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="text-sm border-1 border-gray-400 outline-0 p-2 rounded-md"
                placeholder="Nombre"
              />
            </div>

            <div className="grid">
              <label
                htmlFor="lastName"
              >
                Apellido
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="text-sm border-1 border-gray-400 outline-0 p-2 rounded-md"
                placeholder="Apellido"
              />
            </div>

            <div className="grid">
              <label
                htmlFor="age"
              >
                Edad
              </label>
              <input
                type="text"
                id="age"
                name="age"
                className="text-sm border-1 border-gray-400 outline-0 p-2 rounded-md"
                placeholder="Edad"
              />
            </div>

            <div className="grid opacity-50">
              <label
                htmlFor="rol"
              >
                Mi rol
              </label>
              <select
                id="rol"
                name="rol"
                className="text-sm border-1 border-gray-400 outline-0 p-2 rounded-md"
                disabled
              >
                <option> -- Selecciona una opción -- </option>
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
          </div>

          <div className="flex justify-center">
            <input
              type="submit"
              value="Guardar cambios"
              className="px-6 py-2 md:max-w-xs font-barlow-bold text-white cursor-pointer rounded-full transition hover:bg-indigo-600 bg-indigo-500 mt-10 disabled:cursor-not-allowed disabled:bg-slate-300"
              disabled
            />
          </div>
        </form>
      </div>
    </>
  )
}
