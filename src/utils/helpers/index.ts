import bcrypt from 'bcryptjs';
import { Task } from '@/src/generated/prisma';
import { PRIORITY_LIST } from '@/src/utils/constants/index';

export const formatDate = (date: string) => {
  return new Date(date).toLocaleString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

export const orderTasksByFilter = (
  filter: string,
  firstTask: Task,
  nextTask: Task,
) => {
  let firstValue: number | Date;
  let secondValue: number | Date;

  switch (filter) {
    case 'priority':
      firstValue = PRIORITY_LIST.find(priority =>
        priority.value === firstTask.priority)?.index!
      secondValue = PRIORITY_LIST.find(priority =>
        priority.value === nextTask.priority)?.index!
      break;
    case 'createdAt':
      firstValue = new Date(firstTask.createdAt);
      secondValue = new Date(firstTask.createdAt);
    default:
      firstValue = 0;
      secondValue = 0;
      break;
  }

  if (firstValue < secondValue) return -1;
  if (firstValue > secondValue) return 1;
  return 0;
}

export const hashString = (str: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(str, salt);
  return hash;
}

export const decryptHash = (str: string) => {
  // const salt = bcrypt.
  // const hash = bcrypt.hashSync(str, salt);
  // return hash;
}