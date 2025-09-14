import Navbar from '@/src/components/dashboard/Navbar';
import Sidebar from '@/src/components/dashboard/Sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="md:flex">
        <Sidebar />
        <main className="md:flex-1 md:h-screen p-5 py-16 overflow-y-auto">
          {children}
        </main>
      </div>
    </>
  );
}
