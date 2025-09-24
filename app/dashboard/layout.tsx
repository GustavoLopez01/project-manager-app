import Navbar from '@/src/components/dashboard/Navbar';
import Sidebar from '@/src/components/dashboard/Sidebar';
import { getSession } from '@/src/lib/session';
import { getRoutesByRol } from '@/src/utils/helpers';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rolId = await getSession(true);
  const routes = await getRoutesByRol(rolId);
  return (
    <>
      <Navbar />
      <div className="flex relative">
        <Sidebar routes={routes} />
        <main className="w-full md:flex-1 md:h-screen p-5 py-5 overflow-y-auto">
          {children}
        </main>
      </div>
    </>
  );
}
