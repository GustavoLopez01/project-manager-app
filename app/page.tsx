import Login from "@/src/components/auth/Login";

export default async function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Login />
    </div>
  );
}
