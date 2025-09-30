import { User } from '../generated/prisma';

export type UserWithoutPassword = Omit<User, 'password'>;

export type Routes = {
  label: string
  path: string
}
