import { prisma } from '@/src/utils/prisma/prisma';
import UserTasks from '@/src/components/task/UserTasks';
import Heading from '@/src/components/ui/Heading';
import { getSession } from '@/src/lib/session';
import { User } from '@/src/generated/prisma';

async function getTasks(userId: User['id']) {
  return prisma.task.findMany({
    where: {
      userId
    }
  });
}

export default async function TasksPage() {
  const userId = await getSession();
  const tasks = await getTasks(userId);
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
