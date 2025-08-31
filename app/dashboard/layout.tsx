import Sidebar from '@/src/components/dashboard/Sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="md:flex">
        <Sidebar />
        <main className="md:flex-1 md:h-screen p-5">
          {children}
        </main>
      </div>
    </>
  );
}
