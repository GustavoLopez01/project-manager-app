
import { prisma } from '@/src/utils/prisma/prisma';
import UserTasks from '@/src/components/task/UserTasks';
import Heading from '@/src/components/ui/Heading';

async function getTasks() {
  return prisma.task.findMany();
}

export default async function TasksPage() {
  const tasks = await getTasks();
  return (
    <>
      <Heading>
        Mis tareas
      </Heading>

      <section className="w-full min-h-72 bg-white rounded-md shadow px-6 py-4">
        <UserTasks
          tasks={tasks}
        />
      </section>
    </>
  )
}
