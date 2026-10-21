# Preguntas de cierre EC2 F3 A8

## 1 ¿Por qué las reglas de validación se colocaron en una utilidad?

Para tener una sola regla reutilizable al registrar y editar. Así ambos formularios aceptan los mismos títulos y cualquier ajuste se hace en un solo archivo.

## 2 ¿Qué significa el retorno `string | null` de `validateTaskTitle`?

Una cadena contiene el mensaje del primer problema encontrado. `null` significa que el título cumple las reglas y puede guardarse.

## 3 ¿Qué función cumplen `aria-invalid`, `aria-describedby` y `role="alert"`?

`aria-invalid` comunica que el campo tiene un error. `aria-describedby` relaciona el campo con su ayuda y su mensaje. `role="alert"` anuncia el mensaje cuando aparece.

## 4 ¿Por qué `query`, `filter` y `sortBy` son estados controlados?

Se guardan en `App` para que los valores de los controles y la vista estén sincronizados. Cada cambio actualiza los resultados sin modificar la colección principal.

## 5 ¿Por qué `visibleTasks` no debe almacenarse como estado independiente?

Porque se calcula con `tasks`, `query`, `filter` y `sortBy`. Mantener otra copia del resultado podría dejarla desactualizada después de una operación CRUD o un cambio de criterio.

## 6 ¿Cómo se normaliza una búsqueda?

Se eliminan los espacios externos con `trim()` y se convierte tanto la consulta como cada título a minúsculas con `toLocaleLowerCase('es-MX')` antes de comparar.

## 7 ¿Por qué se crea una copia antes de utilizar `sort`?

`sort` ordena el arreglo en el que se ejecuta. Se ordena una copia de los resultados filtrados para conservar intacto el arreglo de `tasks`.

## 8 ¿Qué responsabilidad tiene `task-query.service.ts`?

Aplica la búsqueda, el filtro y el orden a una colección recibida y devuelve un nuevo arreglo. No conoce los componentes ni cambia el estado de React.

## 9 ¿Por qué el resultado de `JSON.parse` se trata como `unknown`?

El texto guardado puede haber sido editado, estar incompleto o contener otra estructura. `unknown` obliga a verificar su forma antes de usarlo como una lista de tareas.

## 10 ¿Qué comprueba la función `isTask`?

Comprueba que cada valor sea un objeto con identificador y título de tipo texto, un estado permitido y fechas de creación y actualización válidas.

## 11 ¿Qué ventaja ofrece la inicialización diferida de `useState`?

La función inicializadora carga `localStorage` al crear el estado, en lugar de volver a leerlo en cada renderizado.

## 12 ¿Por qué `localStorage` se sincroniza mediante `useEffect`?

Es un sistema externo a React. El efecto guarda la colección después de cada cambio en `tasks` y no se ejecuta por cambios de búsqueda, filtro, orden o página.

## 13 ¿Por qué `TaskSummary` recibe `tasks` y `TaskList` recibe `visibleTasks`?

El resumen representa el total completo, aunque haya una consulta activa. La lista representa solo los resultados filtrados y la página actual.

## 14 ¿Qué información se pierde y cuál permanece al recargar?

La colección de tareas permanece en `localStorage`, incluidos títulos, estados y fechas. La búsqueda, el filtro, el orden seleccionado y la página actual vuelven a sus valores iniciales.

## 15 ¿Qué dificultad encontraste y cómo la resolviste?

La dificultad fue coordinar la consulta y la paginación sin crear otra colección guardada. La resolví calculando los resultados desde `tasks` durante el renderizado, ordenando una copia y manteniendo en estado solo los criterios y la página actual. La persistencia guarda únicamente `tasks`.
