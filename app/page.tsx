import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center">
      <Link
        href={'/dashboard/projects'}
        className="bg-amber-600 w-50 text-center py-2 px-2 rounded-4xl text-white font-bold"
      >
        Ir a dashboard
      </Link>
    </div>
  );
}
