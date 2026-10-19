# Preguntas de cierre - EC2 F2 A7

## 1. ¿Qué diferencia existe entre una variable local y el estado de React?
Una variable local ordinaria (`let`, `const`) pierde su valor cada vez que la función del componente se vuelve a ejecutar y su modificación no le informa a React que la interfaz debe actualizarse. En cambio, el estado de React (`useState`) persiste a través de los ciclos de renderizado del componente y, al invocar su función actualizadora, React programa un nuevo renderizado para reflejar los cambios visualmente en el DOM.

## 2. ¿Qué valores devuelve useState?
Devuelve una tupla (un arreglo con exactamente dos elementos):
- El valor actual del estado en el renderizado en curso.
- Una función actualizadora (setter) que permite solicitar a React el cambio de dicho estado y desencadenar un nuevo renderizado.

## 3. ¿Por qué useState se declara en el nivel superior del componente?
Porque React depende del orden en el que se llaman los Hooks durante cada renderizado para asociar correctamente cada estado a su celda interna en el Virtual DOM (las Reglas de Hooks). Si se declarara dentro de condicionales (`if`), bucles (`for`) o funciones anidadas, el orden de las llamadas podría cambiar entre renderizados sucesivos, provocando fallos en la correspondencia del estado y errores en la aplicación.

## 4. ¿Qué significa que un campo sea controlado?
Significa que el valor del elemento del formulario HTML (como un `<input>`) está subordinado y controlado directamente por el estado de React mediante su propiedad `value`, y cualquier cambio o tipeo del usuario es capturado por el evento `onChange`, el cual actualiza dicho estado. De esta forma, React es siempre la única fuente de verdad sobre lo que contiene el campo en cada instante.

## 5. ¿Por qué handleSubmit utiliza preventDefault?
Porque en HTML tradicional, el evento de envío de un formulario (`submit`) provoca que el navegador recargue toda la página o intente enviar una petición HTTP GET/POST nativa. Llamar a `event.preventDefault()` detiene este comportamiento por defecto, permitiendo a React gestionar la lógica del formulario en memoria dentro de una Single Page Application (SPA) sin perder el estado actual.

## 6. ¿Cómo comunica TaskForm una nueva tarea a App?
Se comunica utilizando el patrón de "elevación de estado" (lifting state up) mediante una función pasada como propiedad (`props`). `App` le transfiere a `TaskForm` la propiedad `onAddTask={handleAddTask}`. Cuando el usuario envía el formulario con un título válido, `TaskForm` ejecuta dicha función pasando el nuevo título (`onAddTask(normalizedTitle)`), notificando así al componente padre para que éste actualice la colección general.

## 7. ¿Por qué App funciona como fuente de verdad?
Porque `App` es el componente antecesor común más cercano a todos los componentes que necesitan leer o modificar la colección de tareas (`TaskForm`, `TaskSummary`, `TaskActions`, `TaskList`). Al centralizar la lista `tasks` en el estado de `App`, se garantiza que todos los componentes hijos consuman y reflejen la misma información coherente y sincronizada, evitando duplicar datos en múltiples estados locales.

## 8. ¿Cómo se implementa Create sin utilizar push?
Se implementa utilizando inmutabilidad con el operador de propagación (spread operator `...`). En lugar de mutar el arreglo existente con `tasks.push(newTask)`, se crea un arreglo completamente nuevo donde se coloca la nueva tarea al inicio y se propagan los elementos previos: `setTasks((currentTasks) => [newTask, ...currentTasks])`.

## 9. ¿Cómo permite map actualizar una sola tarea?
El método `.map()` recorre cada tarea de la colección y evalúa si su identificador coincide con el que se desea modificar (`task.id === id`). Si coincide, retorna un nuevo objeto con las propiedades actualizadas mediante spread (`{ ...task, ...cambios }`); si no coincide, retorna la tarea original sin tocarla. Esto produce un nuevo arreglo donde únicamente el elemento seleccionado ha cambiado, preservando la inmutabilidad.

## 10. ¿Cómo utiliza filter la operación Delete?
El método `.filter()` evalúa un predicado sobre cada elemento y retorna un arreglo nuevo que contiene únicamente los elementos que cumplan dicha condición. Para eliminar una tarea con un `id` específico, se conserva toda tarea cuyo identificador sea diferente al que se desea borrar: `tasks.filter((task) => task.id !== id)`.

## 11. ¿Por qué se emplea una función actualizadora en setTasks?
Porque cuando el nuevo estado depende del estado anterior, pasar una función de retorno (`setTasks((currentTasks) => ...)`) asegura que React provea siempre la versión más reciente y confiable del estado (`currentTasks`), incluso si se producen múltiples actualizaciones en lote (batching) o llamadas asíncronas consecutivas.

## 12. ¿Qué información conserva TaskItem como estado local?
Conserva únicamente el estado temporal e interactivo exclusivo de su propia representación en pantalla:
- `isEditing`: booleano que determina si se muestra la vista normal de la tarea o el formulario en línea de edición.
- `draftTitle`: cadena de texto que almacena el borrador del nuevo título mientras el usuario lo está editando, permitiendo guardar o cancelar sin afectar la tarea original antes de confirmar.

## 13. ¿Por qué los cambios desaparecen al recargar la página?
Porque en esta fase el estado de la aplicación reside exclusivamente en la memoria volátil de JavaScript (gestionada por el hook `useState` de React en la sesión actual del navegador). Al recargar la página, el entorno de ejecución se reinicia por completo y el componente `App` vuelve a inicializarse con la lista fija importada de `tasks.ts`. La persistencia (en `localStorage` o base de datos/API REST) corresponde a fases posteriores.

## 14. ¿Qué dificultad encontraste y cómo la resolviste?
Una dificultad clave consistió en coordinar el flujo bidireccional entre la captura de eventos locales (como la edición en línea en `TaskItem` o la validación del título en `TaskForm`) y la actualización inmutable en el componente padre `App`. Se resolvió definiendo interfaces de props estrictamente tipadas con TypeScript para cada callback (`onToggleStatus`, `onEditTask`, `onDeleteTask`, `onAddTask`), manteniendo el estado de borrador aislado dentro del hijo para posibilitar la cancelación, y aplicando métodos funcionales inmutables (`map`, `filter`, spread) en los manejadores de `App`.
