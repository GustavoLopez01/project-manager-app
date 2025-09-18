import Heading from '@/src/components/ui/Heading';
import UserFormComponent from '@/src/components/user/UserFormComponent';
import Users from '@/src/components/user/Users';
import { prisma } from '@/src/utils/prisma/prisma';

async function getUsers() {
  return prisma.user.findMany();
}

export default async function UsersPage() {
  const users = await getUsers();
  return (
    <>
      <Heading>
        Administrar usuarios
      </Heading>

      <section className="w-full min-h-72 bg-white rounded-md shadow px-6 py-4">
        <Users
          users={users}
        />
      </section>
    </>
  )
}
