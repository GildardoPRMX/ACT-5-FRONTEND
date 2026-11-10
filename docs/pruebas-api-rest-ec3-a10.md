# Pruebas de API REST - EC3 F2 A10

## Entorno

- Rama: `act-10`
- Dirección pública usada por el Frontend: `/api`
- Resultado de `pnpm lint`: aprobado.
- Resultado de `pnpm build`: aprobado.
- API local en `localhost:3000`: no estaba iniciada al registrar esta evidencia.

## Casos ejecutados

| Caso | Método y ruta | Esperado | Obtenido | Resultado |
|---|---|---:|---|---|
| Listar | GET /api/tasks | 200 | Pendiente: requiere iniciar el Backend | No ejecutado |
| Crear | POST /api/tasks | 201 | Pendiente: requiere iniciar el Backend | No ejecutado |
| Actualizar | PATCH /api/tasks/:id | 200 | Pendiente: requiere iniciar el Backend | No ejecutado |
| Eliminar | DELETE /api/tasks/:id | 204 | Pendiente: requiere iniciar el Backend | No ejecutado |
| Inexistente | GET /api/tasks/:id | 404 | Pendiente: requiere iniciar el Backend | No ejecutado |
| API detenida | GET /api/tasks | Error de red | El proxy de Vite respondió 502; la pantalla mostró el error y permitió reintentar | Aprobado para el estado de error |

## Evidencias

- Captura de la lista: pendiente con el Backend en ejecución.
- Captura de Network: pendiente con el Backend en ejecución.
- Captura del error y reintento: verificación visual completada en `http://127.0.0.1:5173/tasks`; consola sin errores.
- Observaciones: no se enviaron cambios a la API ni se modificaron datos remotos durante esta actividad.
