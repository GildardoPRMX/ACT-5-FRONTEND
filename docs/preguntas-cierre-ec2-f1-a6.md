# Preguntas de cierre - EC2 F1 A6

## 1. ¿Qué función cumple la interfaz Task?
Cumple la función de definir un contrato de tipado estricto que describe la forma y estructura que debe tener cualquier objeto de tarea dentro de la aplicación. Especifica el nombre de cada propiedad obligatoria (`id`, `title`, `status`, `createdAt`, `updatedAt`) y su tipo correspondiente, permitiendo a TypeScript detectar incongruencias, propiedades faltantes o tipos erróneos en tiempo de desarrollo. Además, garantiza compatibilidad con el modelo de datos que retornará el backend o API REST en fases posteriores.

## 2. ¿Qué diferencia existe entre Task y TaskStatus?
`Task` es una interfaz que modela la entidad completa de una tarea con todas sus propiedades (identificador, título, estado, fechas de creación y actualización). Por otro lado, `TaskStatus` es un tipo unión (`type TaskStatus = 'pending' | 'completed'`) que restringe el valor del campo `status` a un conjunto cerrado de opciones válidas, evitando estados inconsistentes o no controlados (como cadenas arbitrarias o valores mal escritos).

## 3. ¿Qué significa declarar un arreglo como Task[]?
Significa que la estructura de datos es una colección o lista homogénea donde cada uno de sus elementos debe cumplir estrictamente con la interfaz `Task`. Si un objeto dentro del arreglo carece de una propiedad requerida o tiene un tipo incompatible, el compilador de TypeScript generará un error estático en tiempo de desarrollo.

## 4. ¿Qué hace el método map?
Es una función de orden superior inmutable de los arreglos en JavaScript/TypeScript que itera sobre cada elemento de una colección y transforma cada uno de ellos aplicando una función de callback, devolviendo un nuevo arreglo con la misma longitud que el original y con los elementos transformados, sin modificar el arreglo fuente.

## 5. ¿Qué resultado produce map dentro de TaskList?
Produce un arreglo de elementos de React (instancias del componente `<TaskItem />`), donde cada objeto de tarea del arreglo `tasks` es transformado en su correspondiente representación visual, asociándole su identificador único como propiedad `key` y pasando el objeto completo mediante la prop `task`.

## 6. ¿Para qué utiliza React la propiedad key?
React utiliza la propiedad `key` como un identificador único y estable para cada elemento dentro de una lista dinámica. Le permite al algoritmo de reconciliación (Virtual DOM) determinar con precisión qué elementos han sido creados, modificados, reordenados o eliminados entre renderizados, optimizando las actualizaciones del DOM real sin tener que recrear toda la lista.

## 7. ¿Por qué se utiliza task.id y no el índice?
Porque `task.id` es un identificador único, persistente y ligado intrínsecamente a los datos de la tarea, sin importar su posición en la lista. Si se utilizara el índice del arreglo (`index`), cualquier cambio en la colección (como insertar, eliminar, filtrar o reordenar elementos) provocaría que los índices cambien de posición, haciendo que React confunda qué elemento visual corresponde a qué dato, lo cual causa fallos de renderizado y pérdida de estado en componentes con estado interno.

## 8. ¿Cómo se envía una tarea de TaskList a TaskItem?
Se envía a través de una propiedad (prop) llamada `task` en JSX (`<TaskItem key={task.id} task={task} />`). El objeto completo que representa la tarea se transfiere como valor de esa propiedad, la cual está tipada en `TaskItemProps` como `task: Task`, y dentro de `TaskItem` se desestructura para renderizar sus campos individuales (`title`, `status`, `updatedAt`).

## 9. ¿Cómo se comunican App, TaskSummary y TaskList?
Se comunican siguiendo el patrón de flujo de datos unidireccional (de padre a hijos) mediante props. El componente `App` actúa como coordinador principal y posee o importa la fuente de datos (`tasks`). Desde `App`, la colección de tareas se transfiere tanto a `TaskSummary` (`<TaskSummary tasks={tasks} />`) para el cálculo de estadísticas, como a `TaskList` (`<TaskList tasks={tasks} />`) para el renderizado de la lista, asegurando que ambos componentes hijos compartan la misma verdad de datos sin duplicar información.

## 10. ¿Qué es el renderizado condicional?
Es la capacidad de un componente de React de evaluar una expresión lógica o condición y decidir qué estructura visual o JSX renderizar en función de dicha evaluación. En esta actividad se aplica evaluando si `tasks.length === 0`: si no hay tareas, se muestra un estado informativo de colección vacía (`empty-state`); de lo contrario, se renderiza la lista con las tareas transformadas.

## 11. ¿Por qué el resumen se calcula a partir de la colección?
Porque las métricas del resumen (total de tareas, tareas pendientes y completadas) son datos derivados del estado o colección de tareas existente. Al calcularlos dinámicamente en tiempo de renderizado a partir del arreglo recibido (`tasks.length` y `tasks.filter(...)`), se evita la redundancia y el riesgo de desincronización que ocurriría si se mantuvieran contadores manuales separados que pudieran quedar desactualizados respecto a los datos reales.

## 12. ¿Qué dificultad encontraste durante la refactorización y cómo la resolviste?
Una dificultad importante consistió en asegurar la correcta propagación de tipos e interfaces entre los nuevos módulos (`src/models/task.interface.ts`) y los componentes modificados, garantizando además el formateo adecuado de fechas ISO mediante `Intl.DateTimeFormat` y manteniendo la compatibilidad con el componente `AppFooter` desarrollado en el desafío de la actividad previa. Se resolvió estructurando claramente las exportaciones e importaciones de tipo (`import type { Task }`), tipando rigurosamente cada interfaz de props y validando la compilación con `pnpm build` y `pnpm lint`.
