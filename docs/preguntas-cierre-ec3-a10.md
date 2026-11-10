# Preguntas de cierre - EC3 F2 A10

## 1. ¿Qué diferencia existe entre una falla de red y una respuesta HTTP 404?

Una falla de red impide recibir una respuesta, por ejemplo porque el servidor no está disponible. Un 404 sí es una respuesta HTTP válida: el servidor respondió que el recurso solicitado no existe.

## 2. ¿Por qué debe comprobarse `response.ok` después de `fetch`?

`fetch` solo rechaza automáticamente ante algunos errores de transporte. Para estados como 404 o 500 entrega una respuesta normal, así que el cliente debe revisar `response.ok` y convertir el error HTTP en un error controlado.

## 3. ¿Qué responsabilidad tiene `http.service.ts`?

Centraliza las solicitudes `fetch`, los encabezados JSON, el tratamiento de respuestas 204, la validación de `response.ok` y la normalización de errores de API y de red.

## 4. ¿Qué responsabilidad tiene `task.api.service.ts`?

Define las operaciones propias de tareas y sus rutas: consultar, buscar, crear, actualizar y eliminar. Los componentes no construyen URLs ni serializan sus cuerpos.

## 5. ¿Por qué `VITE_API_URL` no debe contener credenciales?

Las variables `VITE_*` se incorporan al código que recibe el navegador. Una contraseña, token privado o URI de base de datos quedaría visible para cualquier usuario del sitio.

## 6. ¿Qué problema resuelve el proxy de Vite durante el desarrollo?

Permite que el navegador solicite `/api` al servidor de desarrollo y Vite reenvíe la llamada al Backend local, evitando que el Frontend tenga que conectarse directamente a otro origen.

## 7. ¿Por qué el proxy no sustituye la configuración de producción?

El proxy solo forma parte del servidor de desarrollo de Vite. En producción la aplicación necesita una URL pública de API y una configuración de despliegue que enrute las solicitudes.

## 8. ¿Qué función cumple `AbortController`?

Cancela una consulta que ya quedó obsoleta, por ejemplo al cambiar rápidamente la búsqueda o la página, para que su respuesta tardía no reemplace los resultados actuales.

## 9. ¿Por qué la ruta de detalle consulta la tarea por id?

El detalle puede abrirse o recargarse directamente, sin haber visitado la lista ni tener esa tarea cargada en memoria. Consultar por identificador permite obtener la tarea vigente del servidor.

## 10. ¿Por qué el formulario se limpia únicamente después de un POST satisfactorio?

Si el servidor rechaza la creación o no hay conexión, el título sigue escrito para que la persona pueda corregirlo o volver a intentar sin perder su trabajo.

## 11. ¿Qué ventaja ofrece separar la consulta remota de los componentes visuales?

El hook y los servicios se ocupan del ciclo de solicitudes y los componentes se concentran en presentar los datos y acciones. Esto evita repetir reglas HTTP en cada vista y facilita cambiar o revisar la integración.

## 12. ¿Qué cambio fue más difícil y cómo comprobaste que funcionaba?

El cambio más delicado fue pasar la búsqueda, el filtro y la paginación local a parámetros remotos sin perder el detalle directo ni la navegación. Revisé los contratos de consulta y ejecuté `pnpm lint` y `pnpm build`; los casos que requieren el Backend se registraron como pendientes porque el servidor API no estaba activo.
