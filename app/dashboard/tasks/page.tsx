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

      <section className={`${!tasks.length ? 'flex justify-center' : ''} w-full items-center min-h-72 bg-white rounded-md shadow mt-3 px-6 py-4`}>
        {tasks.length ? (
          <UserTasks
            tasks={tasks}
          />
        ) : (
          <p className='font-barlow-bold text-xl text-slate-600'>
            Aún no tienes tareas asignadas
          </p>
        )}
      </section>
    </>
  )
}
