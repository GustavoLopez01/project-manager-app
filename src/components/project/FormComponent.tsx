import { getCategories } from '@/src/utils/helper';

type FormComponentProps = {
}

export default async function FormComponent({ }: FormComponentProps) {
  const categories = await getCategories();
  return (
    <>
      <div className="space-y-5 grid gap-3 font-barlow-regular">
        <div className="grid">
          <label
            htmlFor="name"
          >
            Nombre del proyecto
          </label>
          <input
            type="text"
            name="name"
            className="text-sm border-1 border-gray-400 outline-0 p-2 rounded-md"
            placeholder="Nombre del proyecto"
          />
        </div>

        <div className="grid">
          <label
            htmlFor="categoryId"
          >
            Tipo de proyecto
          </label>
          <select
            name="categoryId"
            className="text-sm border-1 border-gray-400 outline-0 p-2 rounded-md"
          >
            <option> -- Selecciona una opción -- </option>
            {categories.map(category => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid">
          <label
            htmlFor="description"
          >
            Descripción
          </label>
          <textarea
            name="description"
            className="text-sm border-1 border-gray-400 outline-0 p-2 rounded-md resize-none h-20"
            placeholder="Descripción del proyecto"
          />
        </div>
      </div>
    </>
  )
}
