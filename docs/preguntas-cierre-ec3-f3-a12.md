# Preguntas de cierre EC3 F3 A12

## 1. ¿Qué diferencia existe entre prueba automatizada, humo y aceptación?

La prueba automatizada verifica código y comportamientos aislados de forma repetible. La prueba de humo confirma que los servicios publicados responden en rutas clave. La aceptación recorre los casos reales de uso con cuentas y permisos.

## 2. ¿Por qué Fetch simulado no demuestra que Atlas funciona?

Un mock sustituye al servidor y a la base de datos; solo demuestra que el cliente interpreta las respuestas preparadas. La disponibilidad de Atlas exige una llamada real al Backend conectado.

## 3. ¿Qué comprueba una guarda y qué seguridad continúa en el Backend?

Una guarda decide qué vista representa el navegador según el estado de sesión. El Backend debe validar firmas de token, vigencia, rol y permiso en cada endpoint.

## 4. ¿Por qué `VITE_API_URL` es pública y `JWT_SECRET` no?

Vite incorpora `VITE_API_URL` al bundle que descarga el navegador. `JWT_SECRET` firma credenciales y solo debe permanecer en el entorno privado del Backend.

## 5. ¿Por qué cambiar `VITE_API_URL` exige otro build?

La variable se lee al compilar y queda escrita en los archivos JavaScript estáticos. El sitio ya construido no vuelve a consultar la configuración de Render en tiempo de ejecución.

## 6. ¿Qué función cumple la reescritura hacia `index.html`?

Permite que el servidor estático entregue la aplicación para una ruta profunda como `/tasks/id`. Después React Router decide qué contenido mostrar.

## 7. ¿Qué diferencia existe entre build, deploy y release?

Build genera los archivos estáticos. Deploy publica esos archivos en un servicio. Release identifica una versión ya verificada y desplegada, por ejemplo con la etiqueta `v1.0.0`.

## 8. ¿Por qué `CORS_ORIGIN` debe ser exacto?

El servidor debe permitir solo el origen Frontend previsto. Una coincidencia exacta evita abrir acceso a cualquier sitio y no incluye la ruta `/api`.

## 9. ¿Qué diferencia existe entre 401 y 403?

401 indica que no hay una identidad válida para la solicitud. 403 indica que la identidad sí fue reconocida, pero carece del permiso de la operación.

## 10. ¿Por qué ocultar Eliminar no sustituye la autorización?

El control visual puede modificarse o evitarse. El Backend tiene que comprobar el rol admin y rechazar la solicitud DELETE de user con 403.

## 11. ¿Cómo demuestras que `v1.0.0` corresponde al deploy?

Primero registro el commit que Render desplegó y verifico que la aceptación pasa. Después creo la etiqueta anotada `v1.0.0` en ese mismo commit, la publico y comparo el hash de la etiqueta con el commit mostrado por Render. Este repositorio aún no tiene URL desplegada, así que esa etiqueta está pendiente.

## 12. ¿Qué mejorarías para un sistema sensible?

Usaría cookies `HttpOnly`, `Secure` y `SameSite` o un BFF para reducir exposición XSS; agregaría refresh seguro con rotación, protección CSRF cuando corresponda, autenticación multifactor, auditoría, límites de acceso y tareas asociadas a su propietario. Eso exige diseño y cambios coordinados en el Backend.
