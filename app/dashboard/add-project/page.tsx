import AddNewProject from '@/src/components/project/AddNewProject';
import FormComponent from '@/src/components/project/FormComponent';
import Heading from '@/src/components/ui/Heading';

export default async function AddProjectPage() {
  return (
    <>
      <Heading>
        Nuevo proyecto
      </Heading>

      <AddNewProject>
        <FormComponent />
      </AddNewProject>
    </>
  )
}
