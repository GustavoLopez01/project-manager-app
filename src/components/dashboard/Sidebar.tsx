"use client"
import Link from 'next/link';
import { ROUTES } from '@/src/utils/constants';

export default function Sidebar() {
  return (
    <aside className="md:w-72 h-screen bg-white shadow-xl">
      <nav className="py-6 flex flex-col">
        {ROUTES.map(route => (
          <Link
            className="px-10 py-4 text-black font-bold text-xl"
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
