# Evidencias EC3 F3 A12

## Identificación

- Repositorio: `GildardoPRMX/ACT-5-FRONTEND`
- Rama: `act-12`
- Commit: preparación A12 publicada en la rama; no es un commit liberado.
- Etiqueta: no creada; requiere un deploy aprobado.
- URL Frontend: pendiente de crear el servicio Render.
- URL Backend: pendiente; backend A12 compatible no disponible.
- Fecha: 2026-11-10.

## Calidad

- Instalación: `pnpm install --frozen-lockfile` aprobada.
- `pnpm verify`: aprobado.
- Pruebas: 9 de 9 aprobadas (2 sesión, 4 guardas y 3 cliente HTTP).
- Build: aprobado mediante `pnpm verify`.
- Preview: aprobado en `http://127.0.0.1:4173`; la ruta profunda `/tasks` presentó login y `/register` cargó el formulario.
- `pnpm test:watch`: 9 pruebas aprobadas; modo watch cerrado con `q`.

## Producción

- `health`: no comprobado; falta la URL HTTPS del Backend.
- `health/database`: no comprobado; falta la URL HTTPS del Backend.
- Ruta profunda Render: no comprobada; el sitio todavía no está creado. El fallback local de Vite Preview sí resolvió `/tasks`.
- Prueba de humo: no ejecutada; faltan `FRONTEND_URL` y `BACKEND_URL` HTTPS.

## Aceptación

| Caso | Resultado | Evidencia |
|---|---|---|
| Registro y login | No ejecutado | API disponible en el workspace no tiene `/auth/me`; no hay servicio en ejecución |
| Restauración | No ejecutado | Requiere `GET /api/auth/me` |
| CRUD user | No ejecutado | Requiere Backend A12 y base de datos |
| 403 user | No ejecutado | Las rutas de tareas del Backend disponible no aplican roles |
| 204 admin | No ejecutado | Requiere Backend A12 y una cuenta admin de prueba |
| Filtros y página | No ejecutado contra API | Depende de servicio Backend disponible |
| Logout | La ruta y UI local están implementadas; API acceptance pendiente | Cierre elimina la sesión local |

La consola de Preview no mostró errores durante estas comprobaciones de rutas.

## Seguridad

- No se guardaron ni usaron contraseñas reales o tokens.
- No se incluyeron `MONGODB_URI` o `JWT_SECRET`.
- `.env.local` está ignorado por Git y conserva únicamente `VITE_API_URL=/api`.
- Las URLs de producción están pendientes, no se sustituyeron por direcciones inventadas.
