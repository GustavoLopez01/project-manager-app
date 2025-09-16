import * as z from 'zod';

export const authSchema = z.object({
  username: z.string()
    .min(3, 'El usuario es requerido.'),
  password: z.string()
    .min(3, 'La contraseña es requerida.')
}); 