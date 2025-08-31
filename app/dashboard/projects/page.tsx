import CardProject from '@/src/components/project/CardProject';
import Heading from '@/src/components/ui/Heading';

export default function ProjectsPage() {
  return (
    <>
      <Heading>
        Proyectos
      </Heading>
      
      <div className="grid grid-cols-1 md:grid-cols-4 mt-5">
        <CardProject />
      </div>
    </>
  )
}
