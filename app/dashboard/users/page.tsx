import { prisma } from '@/src/utils/prisma/prisma';
import Users from '@/src/components/user/Users';
import Heading from '@/src/components/ui/Heading';

async function getUsers() {
  return prisma.user.findMany({
    omit: {
      password: true
    }
  });
}

export type UsersWithoutPassword = Awaited<ReturnType<typeof getUsers>>;

export default async function UsersPage() {
  const users = await getUsers();
  return (
    <>
      <Heading>
        Administrar usuarios
      </Heading>

      <section className="w-full min-h-72 bg-white rounded-md shadow mt-3 px-6 py-4">
        <Users
          users={users}
        />
      </section>
    </>
  )
}
