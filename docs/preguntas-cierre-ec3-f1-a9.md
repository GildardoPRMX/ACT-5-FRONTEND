# Preguntas de cierre - EC3 F1 A9

## 1. ¿Qué es una aplicación de página única?

Es una aplicación que carga su documento principal una vez y cambia las vistas desde JavaScript. React Router actualiza la ruta y presenta otra página sin recargar todo el documento.

## 2. ¿Qué responsabilidad tiene `BrowserRouter`?

Proporciona a la aplicación el contexto de navegación y conecta las rutas con el historial del navegador. Se coloca una sola vez alrededor de `App`.

## 3. ¿Cuál es la diferencia entre `Routes` y `Route`?

`Routes` selecciona la definición que coincide con la URL. Cada `Route` declara una ruta y el elemento que se representa cuando coincide.

## 4. ¿Qué es una ruta índice?

Es la página predeterminada de una ruta padre. En esta aplicación, la ruta índice muestra `HomePage` en `/`.

## 5. ¿Qué beneficio ofrece un layout?

Permite compartir encabezado, navegación y pie entre las páginas, de modo que esa estructura no se repite en cada vista.

## 6. ¿Qué función cumple `Outlet`?

Marca en el layout el espacio donde React Router muestra la ruta hija seleccionada.

## 7. ¿Qué diferencia existe entre `Link` y `NavLink`?

Ambos navegan dentro de la SPA. `NavLink` también informa si su destino está activo, por eso se utiliza en el menú.

## 8. ¿Por qué no se utilizan enlaces `<a>` para navegar internamente?

Un enlace tradicional solicita de nuevo el documento. `Link` y `NavLink` cambian de ruta dentro de la aplicación y conservan el estado que sigue montado.

## 9. ¿Qué representa `:taskId`?

Es un segmento variable de la ruta que contiene el identificador de una tarea, por ejemplo `/tasks/task-001`.

## 10. ¿Cómo se recupera un parámetro dinámico?

`useParams` devuelve el valor asociado con el nombre declarado en la ruta, en este caso `taskId`.

## 11. ¿Cuándo debe utilizarse `useNavigate`?

Cuando la navegación es resultado de una operación en código, como regresar a `/tasks` después de eliminar una tarea desde su detalle.

## 12. ¿Qué función cumple la ruta `*`?

Captura direcciones que no coincidieron con las demás rutas y permite mostrar la página 404.

## 13. ¿Por qué el estado continúa administrado por `App`?

La colección debe seguir teniendo una sola fuente de verdad, compartida entre inicio, lista y detalle. `App` conserva las tareas y coordina sus cambios.

## 14. ¿Por qué `localStorage` permanece en esta actividad?

Esta actividad reorganiza la interfaz y la navegación. La integración HTTP sustituye el almacenamiento local en la actividad 10.

## 15. ¿Qué dificultad encontraste y cómo la resolviste?

La dificultad fue combinar el detalle dinámico con el CRUD existente sin duplicar la colección. Mantuve los datos y operaciones en `App`, pasé lo necesario a cada página y usé el resultado booleano de la eliminación para navegar solo cuando se confirma.
