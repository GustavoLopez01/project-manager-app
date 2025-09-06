import * as z from 'zod';

export const createTaskSchema = z.object({
  name: z.string()
    .min(3, 'El nombre es requerido.'),
  description: z.string()
    .min(3, 'La descripción es requerida.'),
  status: z.string()
    .min(3, 'El estatus es requerido.'),
  priority: z.string()
    .min(3, 'La prioridad es requerida.'),
  projectId: z.string()
    .trim()
    .transform((value) => parseInt(value))
    .refine((value) => value > 0, { message: 'El id del proyecto es obligatorio.' })
    .or(z.number().min(1, { message: 'El id del proyecto es obligatorio.' })),
  userId: z.string()
    .trim()
    .transform((value) => value ? parseInt(value) : null)
    .optional()
});

export const updateTaskSchema = z.object({
  id: z.string()
    .trim()
    .transform((value) => parseInt(value))
    .refine((value) => value > 0, { message: 'El id de la tarea es obligatorio.' })
    .or(z.number().min(1, { message: 'El id de la tarea es obligatorio.' })),
  name: z.string()
    .min(3, 'El nombre es requerido.'),
  description: z.string()
    .min(3, 'La descripción es requerida.'),
  status: z.string()
    .min(3, 'El estatus es requerido.'),
  priority: z.string()
    .min(3, 'La prioridad es requerido.'),
  projectId: z.string()
    .trim()
    .transform((value) => parseInt(value))
    .refine((value) => value > 0, { message: 'El id del proyecto es obligatorio.' })
    .or(z.number().min(1, { message: 'El id del proyecto es obligatorio.' })),
  userId: z.string()
    .trim()
    .transform((value) => value ? parseInt(value) : null)
    .optional()
});