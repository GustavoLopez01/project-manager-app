import { User } from "@/src/generated/prisma";
import { ROUTES } from "@/src/utils/constants";
import { prisma } from "@/src/utils/prisma/prisma";


export async function getRoutesByRol(userRol: User['rolId']) {
  try {
    const roles = await prisma.rol.findMany();
    const rol = roles.find(rol => rol.id === userRol);

    if (rol?.name === 'Administrador') {
      return ROUTES;
    }

    return ROUTES.filter(route =>
      !route.path.includes(ROUTES[0].path) &&
      !route.path.includes(ROUTES[2].path) &&
      !route.path.includes(ROUTES[4].path)
    )
  } catch (error) {
    console.error(`Ocurrió un error al obtener las rutas : ${error}`);
  }
}