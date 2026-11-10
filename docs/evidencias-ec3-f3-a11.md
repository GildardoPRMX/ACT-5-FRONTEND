# Evidencias EC3 F3 A11

## Entorno

- Rama: `act-11`
- React: `19.2.8`
- React Router: `7.18.4`
- URL local del Frontend: `http://127.0.0.1:5173`
- URL local del Backend: `http://localhost:3000` (no estaba iniciado)

## Casos

| Caso | HTTP | Resultado | Evidencia |
|---|---:|---|---|
| Registro válido | 201 | No ejecutado: API fuera de servicio | Implementación lista para `/auth/register` |
| Correo duplicado | 409 | No ejecutado: API fuera de servicio | Error normalizado por cliente HTTP |
| Login inválido | 401 | No ejecutado: API fuera de servicio | Login público no provoca cierre de sesión global |
| Login válido | 200 | No ejecutado: API fuera de servicio | Token y usuario manejados según contrato |
| `/auth/me` | 200 | No ejecutado: la versión de Backend disponible no define esta ruta | Restauración lista con `Authorization: Bearer` |
| `/tasks` sin token | 401 | No ejecutado a nivel HTTP: Backend no protege esta ruta | La vista directa `/tasks?q=objetivo` redirigió a `/login` |
| CRUD con user | 2xx | No ejecutado: API fuera de servicio | Servicios pasan el token explícitamente |
| DELETE con user | 403 | No ejecutado: API fuera de servicio | El botón se oculta a `user`; el cliente no cierra sesión ante 403 |
| DELETE con admin | 204 | No ejecutado: API fuera de servicio | El flujo administra la respuesta 204 |
| Token alterado | 401 | No ejecutado: API fuera de servicio | Handler 401 limpia el token local |

La revisión del Backend hermano en el workspace encontró que su archivo `src/routes/auth.routes.ts` solo declara registro y login; no declara `/me`, y `src/routes/task.routes.ts` no contiene middleware de autenticación o rol. Además, el servidor no estaba activo. Por eso no se crearon cuentas, no se iniciaron sesiones y no se enviaron escrituras a la API.

## Rutas y sesión

- Redirección a login: recorrido visual aprobado; `/tasks?q=objetivo` llegó a `/login`.
- Recuperación de la ruta intentada: almacena `pathname` y `search` en el estado del router.
- Restauración después de recargar: implementada con `sessionStorage` y `/auth/me`; falta backend compatible para validarla.
- Cierre y botón Atrás: elimina la sesión local y protege de nuevo las rutas al volver.
- `/profile` sin sesión: redirigió a `/login`.
- Registro: el formulario rechazó una contraseña corta localmente y no envió la solicitud.

## Calidad

- `pnpm lint`: aprobado.
- `pnpm build`: aprobado.
- Consola del navegador: sin errores durante la navegación y validación local.

## Protección de datos

El único valor persistido por la sesión es el access token en `sessionStorage`. No se guardan credenciales de cuentas ni tokens reales en este documento. No se inició sesión ni se envió el formulario de registro. `.env.local` sigue ignorado por Git y contiene únicamente `VITE_API_URL=/api`.
