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
- Registro, inicio y cierre de sesión con restauración mediante `/auth/me`.
- Rutas protegidas y envío del token Bearer solo a servicios autenticados.
- Eliminación disponible en la interfaz para el rol `admin`; el permiso se valida en la API.
- Perfil autenticado con datos del contexto de sesión.
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

- `/`: inicio público o autenticado.
- `/login` y `/register`: acceso público para visitantes.
- `/tasks` y `/tasks/:taskId`: rutas protegidas.
- `/profile`: perfil protegido.
- `*`: página para direcciones inexistentes.

La búsqueda se conserva en el parámetro `q` de la URL. El cliente HTTP centraliza el manejo de JSON, errores HTTP y respuestas `204`.

## Sesión

El cliente guarda solo el access token en `sessionStorage` con la clave `task-manager.access-token`. Al recargar, valida la sesión con `/auth/me`; no guarda contraseñas ni el objeto de usuario en Web Storage. El token Bearer permanece accesible para JavaScript, así que esta persistencia didáctica no protege contra XSS. La API sigue siendo la autoridad de autenticación y permisos.

Las tareas siguen siendo una colección compartida, no se atribuyen a una cuenta particular. Solo `admin` ve la opción Eliminar; el Backend debe seguir rechazando con 403 cualquier solicitud de borrado no autorizada.

## Estructura principal

- `src/components`: componentes de interfaz.
- `src/config`: configuración pública del cliente.
- `src/context` y `src/providers`: estado de sesión compartido.
- `src/hooks`: sincronización de consultas remotas y cancelación.
- `src/models`: modelos y contratos HTTP.
- `src/routes`: guardas de navegación.
- `src/services`: cliente HTTP y operaciones de tareas.
- `src/utils`: reglas reutilizables de validación.
- `src/styles`: estilos globales y adaptables.
- `docs`: preguntas de cierre y documentación.
