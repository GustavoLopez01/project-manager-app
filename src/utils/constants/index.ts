export const ROUTES = [
  { label: 'Proyectos', path: '/dashboard/projects' },
  { label: 'Agregar proyecto', path: '/dashboard/add-project' },
  { label: 'Tareas', path: '/dashboard/tasks' },
  { label: 'Mi perfil', path: '/dashboard/profile' },
];

export const STATUS_LIST = [
  { label: 'En proceso', value: 'in_progress' },
  { label: 'Pendiente de revisar', value: 'code_review' },
  { label: 'Finalizada', value: 'finish' },
  { label: 'En espera interna', value: 'on_hold' },
];

export const PRIORITY_LIST = [
  { label: 'Critica', value: 'critic', index: 1 },
  { label: 'Alta', value: 'high', index: 2 },
  { label: 'Media', value: 'average', index: 3 },
  { label: 'Baja', value: 'low', index: 4 },
];

export const FILTERS = [
  { label: 'Prioridad', value: 'priority' },
  { label: 'Fecha de creación', value: 'createdAt' },
];