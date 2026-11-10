# Administrador de tareas Frontend

Aplicación desarrollada con React, TypeScript, Vite y PNPM.

## Funciones actuales

- Navegación SPA con React Router 7.18.4.
- Página de inicio, administración, detalle dinámico y ruta 404.
- CRUD remoto con Fetch API y el servicio REST del Backend EC3.
- Validación reutilizable al registrar y editar títulos.
- Mensajes de validación accesibles.
- Búsqueda, filtro, orden y paginación procesados por la API.
- Carga, lista vacía, error de red y reintento accesibles.
- Solicitudes obsoletas canceladas con `AbortController`.
- Detalle remoto consultado por identificador.
- Eliminación confirmada antes de llamar al Backend.
- Interfaz adaptable a pantallas estrechas.

## Ejecución

```bash
pnpm install
Copy-Item .env.example .env.local
pnpm dev
```

El archivo `.env.local` debe contener `VITE_API_URL=/api`. El proxy de Vite envía `/api/*` a `http://localhost:3000/api/*`; inicia el Backend en el puerto 3000 para usar las operaciones remotas. No pongas secretos del Backend en el Frontend.

## Validación técnica

```bash
pnpm lint
pnpm build
```

## Rutas

- `/`: inicio y resumen de tareas.
- `/tasks`: administración de la colección.
- `/tasks/:taskId`: detalle de una tarea.
- `*`: página para direcciones inexistentes.

La búsqueda se conserva en el parámetro `q` de la URL. El cliente HTTP centraliza el manejo de JSON, errores HTTP y respuestas `204`.

## Alcance

Esta versión obtiene y persiste las tareas en la API REST. La autenticación y las rutas protegidas corresponden a la actividad 11.

## Estructura principal

- `src/components`: componentes de interfaz.
- `src/config`: configuración pública del cliente.
- `src/hooks`: sincronización de consultas remotas y cancelación.
- `src/models`: modelos y contratos HTTP.
- `src/services`: cliente HTTP y operaciones de tareas.
- `src/utils`: reglas reutilizables de validación.
- `src/styles`: estilos globales y adaptables.
- `docs`: preguntas de cierre y documentación.
