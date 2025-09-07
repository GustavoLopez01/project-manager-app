"use client"
import { Project } from '@/src/generated/prisma';
import { useRouter } from 'next/navigation';

type CardProjectProps = {
  project: Project
}

export default function CardProject({ project }: CardProjectProps) {
  const router = useRouter();
  return (
    <div className="p-5 rounded-md bg-white">
      <h1 className="font-black text-lg">
        Nombre : {project.name}
      </h1>

      <p className="flex flex-col font-bold">
        Descripción:
        <span className="font-normal">
          {project.description}
        </span>
      </p>

      <div className="flex justify-center mt-3">
        <button
          className="bg-indigo-500 rounded-md font-bold w-full text-white text-center px-5 py-2 cursor-pointer hover:bg-indigo-600 transition-all"
          onClick={() => router.push(`/dashboard/detail/${project.id}`)}
        >
          Ver detalles
        </button>
      </div>
    </div>
  )
}
