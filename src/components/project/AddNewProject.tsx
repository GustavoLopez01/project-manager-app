"use client"

import { createProject } from "@/actions/create-project-action"

export default function AddNewProject({ children }: { children: React.ReactNode }) {

  const handleAddProject = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
      categoryId: formData.get('categoryId'),
    }

    const response = await createProject(data);
    console.log(response);
    

  }
  return (
    <div className="flex justify-center">
      <div className="w-full md:max-w-xl mt-5 bg-white p-10 rounded-md">
        <form
          action={handleAddProject}
          className="space-y-5"
          autoComplete="off"
        >
          {children}

          <input
            type="submit"
            className="bg-indigo-500 text-white font-bold w-full py-2 rounded-md hover:bg-indigo-600 transition-all cursor-pointer uppercase"
            value="Guardar"
          />
        </form>
      </div>
    </div>
  )
}
