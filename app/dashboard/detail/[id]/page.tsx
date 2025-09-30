import DetailProject from "@/src/components/project/detail/DetailProject";
import Heading from "@/src/components/ui/Heading";
import Link from "next/link";
import { prisma } from "@/src/utils/prisma/prisma";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { ROUTES } from "@/src/utils/constants";

async function getProject(id: number) {
  return prisma.project.findUnique({
    where: {
      id
    },
    include: {
      tasks: true
    }
  })
}

async function getUsers() {
  return prisma.user.findMany();
}

export type ProjectWithTasks = Awaited<ReturnType<typeof getProject>>;

export default async function DetailPage({ params }
  : { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(Number(id));
  const users = await getUsers();
  return (
    <>
      <Heading>
        <div className="flex flex-wrap justify-between items-center">
          <div className="font-barlow-bold">
            Detalles del proyecto - {" "}
            <span className="text-indigo-700 uppercase font-black">
              {project?.name}
            </span>

          </div>

          <Link
            href={ROUTES[0].path}
            className="bg-transparent cursor-pointer font-barlow-regular text-[16px] rounded-full px-3 flex gap-1 items-center"
          >
            <MdOutlineKeyboardBackspace />
            Regresar a proyectos
          </Link>
        </div>
      </Heading>

      <section className="w-full min-h-72 bg-white rounded-md shadow mt-5 p-3">
        <DetailProject
          project={project!}
          users={users}
        />
      </section>
    </>
  )
}
