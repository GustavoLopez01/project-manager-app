import { prisma } from '@/src/utils/prisma/prisma';
import UserTasks from '@/src/components/task/UserTasks';
import Heading from '@/src/components/ui/Heading';
import { getSession } from '@/src/lib/session';
import { User } from '@/src/generated/prisma';
import { ROLE_ADMIN } from '@/src/utils/constants';

async function getTasks(userId: User['id'], isAdmin: boolean) {
  if (isAdmin) {
    return prisma.task.findMany();
  }
  return prisma.task.findMany({
    where: {
      userId
    }
  });
}

export default async function TasksPage() {
  const { userId, roleId } = await getSession();
  const isAdmin = roleId === ROLE_ADMIN;
  const tasks = await getTasks(userId, isAdmin);
  return (
    <>
      <Heading>
        Mis tareas
      </Heading>

      <section className="w-full min-h-72 bg-white rounded-md shadow mt-3 px-6 py-4">
        <UserTasks
          tasks={tasks}
        />
      </section>
    </>
  )
}
