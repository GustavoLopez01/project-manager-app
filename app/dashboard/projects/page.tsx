import { prisma } from '@/src/utils/prisma/prisma';
import CardProject from '@/src/components/project/CardProject';
import Heading from '@/src/components/ui/Heading';

async function getProjects() {
  return prisma.project.findMany();
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <>
      <Heading>
        Proyectos
      </Heading>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {projects.map(project => (
          <CardProject
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </>
  )
}
