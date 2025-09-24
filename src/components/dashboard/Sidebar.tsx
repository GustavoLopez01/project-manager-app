"use client"
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useWindowResize } from '@/src/hooks/useWindowResize';
import Link from 'next/link';
import Heading from '../ui/Heading';
import store from '@/src/store/store';
import { logout } from '@/actions/auth';

type SidebarProps = {
  routes: {
    label: string
    path: string
  }[]
}

export default function Sidebar({
  routes
}: SidebarProps) {
  const [width] = useWindowResize();
  const pathname = usePathname();
  const showSidebar = store(state => state.showSidebar);
  const setShowSidebar = store(state => state.setShowSidebar);

  useEffect(() => {
    if (width <= 780) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  }, [width]);

  if (!showSidebar) return <></>;

  return (
    <aside className={`${width <= 780 ? 'absolute' : ''} w-64 md:w-72 h-screen bg-white shadow-xl z-10`}>
      <Heading>
        <span className="w-full text-center block -mt-10">Administrador de proyectos</span>
      </Heading>
      <nav className="py-6 flex flex-col">
        {routes.map(route => (
          <Link
            className={`${route.path === pathname ? 'bg-indigo-500 text-white font-barlow-bold' : 'font-barlow-regular'} px-10 py-4 text-xl`}
            key={route.path}
            href={route.path}
          >
            {route.label}
          </Link>
        ))}

        <form
          action={logout}
        >
          <input
            type="submit"
            className="px-10 py-4 text-xl font-barlow-regular cursor-pointer"
            value="Cerrar sesión"
          />
        </form>
      </nav>
    </aside>
  )
}
