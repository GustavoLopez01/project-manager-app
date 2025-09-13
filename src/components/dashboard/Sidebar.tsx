"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Heading from '../ui/Heading';
import { ROUTES } from '@/src/utils/constants';

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="md:w-72 h-screen bg-white shadow-xl z-10">
      <Heading>
        <span className="w-full text-center block mt-5">Administrador de proyectos</span>
      </Heading>
      <nav className="py-6 flex flex-col">
        {ROUTES.map(route => (
          <Link
            className={`${route.path === pathname ? 'bg-indigo-500 text-white font-barlow-bold' : 'font-barlow-regular'} px-10 py-4 text-xl`}
            key={route.path}
            href={route.path}
          >
            {route.label}
          </Link>
        ))}

        <Link
          className="px-10 py-4 text-xl font-barlow-regular"
          href="/"
        >
          Cerrar sesión
        </Link>
      </nav>
    </aside>
  )
}
