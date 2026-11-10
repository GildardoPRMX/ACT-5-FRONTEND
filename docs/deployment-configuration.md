# Configuración de despliegue EC3 F3 A12

## Frontend

- Repositorio: https://github.com/GildardoPRMX/ACT-5-FRONTEND
- Rama de esta entrega: `act-12`
- Servicio Render: `task-manager-frontend` (definido en `render.yaml`)
- URL pública: pendiente de crear el servicio.
- Build: `corepack enable && pnpm install --frozen-lockfile && pnpm verify`
- Publicación: `dist`
- `VITE_API_URL`: pendiente de la URL HTTPS del Backend terminada en `/api`.
- Rewrite SPA: `/*` hacia `/index.html`.

## Backend relacionado

- Repositorio: Backend EC3 en el workspace; URL pública pendiente.
- `CORS_ORIGIN`: debe coincidir exactamente con el origen HTTPS final del Frontend, sin `/api` ni diagonal final.
- Salud: `/health`.
- Salud de Atlas: `/health/database`.
- Documentación: `/api-docs`.

La preparación no se ha desplegado. El Backend accesible en el workspace no incluye actualmente `GET /api/auth/me` ni middleware de autenticación/roles en las rutas de tareas, y no hay URLs de producción configuradas. Se requieren el Backend A12 y las URLs definitivas antes de completar smoke, aceptación y liberación. No se guardan valores de `MONGODB_URI`, `JWT_SECRET`, cuentas ni tokens en este repositorio.
