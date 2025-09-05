import DetailProject from "@/src/components/project/detail/DetailProject";
import Heading from "@/src/components/ui/Heading";
import { prisma } from "@/src/utils/prisma/prisma";

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
        Detalle de: {" "}
        <span className="text-indigo-700 uppercase font-black">
          {project?.name}
        </span>
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
