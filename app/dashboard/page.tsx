import { ROUTES } from '@/src/utils/constants';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="h-full flex justify-center items-center">
      <Link
        href={ROUTES[0].path}
        className="bg-indigo-500 text-white font-barlow-bold rounded-full hover:bg-indigo-600 px-7 py-2"
      >
        Ir a proyectos
      </Link>
    </div>
  )
}
