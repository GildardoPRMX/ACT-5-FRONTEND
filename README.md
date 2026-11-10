# Administrador de tareas Frontend

Aplicación desarrollada con React, TypeScript, Vite y PNPM.

## Funciones actuales

- Navegación SPA con React Router 7.18.4.
- Página de inicio, administración, detalle dinámico y ruta 404.
- Operaciones CRUD de tareas.
- Validación reutilizable al registrar y editar títulos.
- Mensajes de validación accesibles.
- Búsqueda normalizada por título.
- Filtros por estado.
- Orden por actualización, creación o título.
- Resumen general calculado a partir de todas las tareas.
- Paginación local de cinco resultados por página.
- Persistencia mediante `localStorage`.
- Recuperación segura ante datos locales inválidos.
- Limpieza masiva de tareas completadas con confirmación.
- Interfaz adaptable a pantallas estrechas.

## Ejecución

```bash
pnpm install
pnpm dev
```

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

La búsqueda se conserva en el parámetro `q` de la URL.

## Alcance

Esta versión guarda las tareas en el almacenamiento local del navegador. La conexión con la API REST se realizará en la actividad 10.

## Estructura principal

- `src/components`: componentes de interfaz.
- `src/data`: tareas iniciales de respaldo.
- `src/models`: modelos y tipos de consulta.
- `src/services`: búsqueda, filtros, ordenamiento y persistencia local.
- `src/utils`: reglas reutilizables de validación.
- `src/styles`: estilos globales y adaptables.
- `docs`: preguntas de cierre y documentación.
