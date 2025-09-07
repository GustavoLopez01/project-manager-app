import * as z from 'zod';

export const createProjectSchema = z.object({
  name: z.string()
    .min(3, 'El nombre es requerido.'),
  description: z.string()
    .min(3, 'La descripción es requerida.'),
  categoryId: z.string()
    .trim()
    .transform((value) => parseInt(value))
    .refine((value) => value > 0, { message: 'La categoría es obligatoria.' })
    .or(z.number().min(1, { message: 'La categoría es obligatoria.' })),
});