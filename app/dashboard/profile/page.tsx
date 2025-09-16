import { prisma } from '@/src/utils/prisma/prisma';
import ProfileComponent from '@/src/components/profile/ProfileComponent';
import Heading from '@/src/components/ui/Heading';
import { getSession } from '@/src/lib/session';
import { User } from '@/src/generated/prisma';

async function getUser(userId: User['id']) {
  return prisma.user.findFirst({
    where: {
      id: userId
    }
  });
}

export default async function ProfilePage() {
  const userId = await getSession();
  const user = await getUser(userId);

  return (
    <>
      <Heading>
        Mi perfil
      </Heading>

      <section className={`${!user ? 'opacity-50' : ''} flex justify-center`}>
        <ProfileComponent user={user} />
      </section>
    </>
  )
}
