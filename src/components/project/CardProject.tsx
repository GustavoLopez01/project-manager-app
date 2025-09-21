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
      <p className="font-barlow-bold text-lg grid">
        Nombre
        <span className="font-barlow-regular text-slate-500">
          {project.name}
        </span>
      </p>

      <p className="font-barlow-bold text-lg grid">
        Descripción
        <span className="font-barlow-regular text-slate-500">
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
