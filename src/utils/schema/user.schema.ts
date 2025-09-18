import * as z from 'zod';

export const createUserSchema = z.object({
  name: z.string()
    .min(3, 'El nombre (s) es requerido.'),
  lastName: z.string()
    .min(3, 'El apellido (s) es requerido.'),
  password: z.string()
    .min(3, 'La contraseña es requerida.'),
  email: z.string()
    .min(3, 'El usuario es requerido.'),
  isLocked: z.boolean()
    .nonoptional('El campo isLocked es requerido.'),
  rolId: z.number()
    .nonoptional('El rol es requerida.')
})