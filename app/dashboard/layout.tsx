import { getRoutesByRol } from '@/actions/get-routes-by-rol';
import Navbar from '@/src/components/dashboard/Navbar';
import Sidebar from '@/src/components/dashboard/Sidebar';
import { getRolAndUserId } from '@/src/lib/session';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { rolId } = await getRolAndUserId();
  const routes = await getRoutesByRol(rolId)
  return (
    <>
      <Navbar />
      <div className="md:flex">
        <Sidebar routes={routes!} />
        <main className="md:flex-1 md:h-screen p-5 py-18 overflow-y-auto">
          {children}
        </main>
      </div>
    </>
  );
}
