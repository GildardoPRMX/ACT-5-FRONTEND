# Preguntas de cierre EC3 F3 A11

## 1. ¿Qué diferencia existe entre autenticación y autorización?

La autenticación establece qué identidad presenta una solicitud. La autorización decide qué operaciones puede realizar esa identidad según sus permisos o rol.

## 2. ¿Qué información guarda `sessionStorage` y qué información no debe guardar?

Guarda únicamente el access token requerido para validar la sesión de la pestaña. No guarda contraseña, password hash, refresh token ni el objeto de usuario; la identidad se vuelve a consultar al Backend.

## 3. ¿Por qué se consulta `/api/auth/me` al recargar?

El token puede haber expirado o el rol del usuario puede haber cambiado. `/me` valida el token en el servidor y devuelve la identidad vigente antes de habilitar las rutas protegidas.

## 4. ¿Por qué el Frontend no debe confiar en decodificar un JWT sin verificarlo?

Decodificar solo lee los datos codificados y no comprueba la firma ni la vigencia. El Backend verifica el token y es la fuente autoritativa para identidad y permisos.

## 5. ¿Qué responsabilidad tiene `AuthProvider`?

Administra el estado de sesión en React, registra e inicia sesión, restaura identidad, realiza cierre local y limpia la sesión cuando una solicitud autenticada devuelve 401.

## 6. ¿Qué beneficio ofrece `useAuth`?

Permite que páginas, navegación y guardas consuman la misma sesión sin pasar usuario y token por muchas propiedades. También detecta si se usa fuera del proveedor.

## 7. ¿Qué representa el estado `checking`?

Indica que existe un token guardado y el proveedor está esperando la validación de `/me`. Las guardas esperan en lugar de mostrar brevemente contenido protegido.

## 8. ¿Qué diferencia existe entre 401 y 403?

401 significa que la solicitud no tiene una identidad aceptable. 403 significa que la identidad es válida pero no tiene permiso para esa operación. El cliente cierra la sesión ante un 401 autenticado, no ante un 403.

## 9. ¿Por qué `ProtectedRoute` no sustituye la seguridad del Backend?

La guarda solo controla qué vistas muestra el navegador. Una persona puede modificar el código cliente o construir una solicitud HTTP directa, así que la API debe validar el token y el rol en cada operación.

## 10. ¿Por qué ocultar Eliminar a `user` no constituye autorización?

El botón solo mejora la interfaz. El permiso efectivo debe comprobarse en el Backend y la solicitud DELETE debe recibir 403 si la cuenta no tiene rol `admin`.

## 11. ¿Por qué un cambio de rol exige iniciar sesión de nuevo?

El token existente puede conservar afirmaciones de rol anteriores. Un nuevo login obtiene un token firmado con el rol vigente que `/me` confirma.

## 12. ¿Qué ocurre realmente al seleccionar Cerrar sesión?

El Frontend elimina el access token de `sessionStorage` y limpia usuario y token de su estado React. No revoca el JWT en el servidor; deja de enviarlo desde esa pestaña.

## 13. ¿Qué riesgo conserva `sessionStorage` ante XSS?

Un script malicioso que se ejecute en el mismo origen puede leer el token. Guardarlo solo durante la pestaña y no conservar contraseñas reduce el alcance, pero no elimina ese riesgo.

## 14. ¿Por qué las tareas todavía no pertenecen a un usuario específico?

El contrato actual de Task no contiene `userId`; las cuentas autenticadas consultan la misma colección. Atribuir tareas requiere un cambio coordinado del modelo, consultas y permisos del Backend.

## 15. ¿Qué dificultad encontraste al integrar la sesión y cómo la resolviste?

La sesión afecta en conjunto al router, al cliente HTTP y a todas las llamadas CRUD. La resolví manteniendo un único proveedor, entregando el token explícitamente a los servicios y dejando que la capa HTTP distinga un 401 autenticado de un 403. La comprobación extremo a extremo queda pendiente porque el Backend disponible todavía no implementa `/auth/me` ni protege las rutas de tareas.
