"use client"
import Link from 'next/link';
import { ROUTES } from '@/src/utils/constants';
import Heading from '../ui/Heading';

export default function Sidebar() {
  return (
    <aside className="md:w-72 h-screen bg-white shadow-xl">
      <Heading>
        <span className="w-full text-center block mt-5">Administrador de proyectos</span>
      </Heading>
      <nav className="py-6 flex flex-col">
        {ROUTES.map(route => (
          <Link
            className="px-10 py-4 font-barlow-regular text-xl"
            key={route.path}
            href={route.path}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
