# Preguntas de cierre - EC2 F1 A5

## 1. ¿Qué problema resuelve React al construir una interfaz?
React resuelve la complejidad y la propensión a errores de manipular manualmente el DOM del navegador mediante JavaScript imperativo. Permite construir interfaces de usuario de forma declarativa y modular basada en componentes, sincronizando de forma eficiente los cambios en los datos con la vista mediante su Virtual DOM.

## 2. ¿Qué es un componente?
Un componente es una función independiente y reutilizable que encapsula la lógica y la estructura visual de una parte de la interfaz de usuario, devolviendo elementos en sintaxis JSX o TSX.

## 3. ¿Por qué los componentes comienzan con mayúscula?
En React y JSX/TSX es una regla para que el compilador diferencie entre etiquetas HTML nativas (como `div`, `p`, `button`, que van en minúsculas) y componentes personalizados creados por el desarrollador (como `AppHeader`, `TaskItem`). Si comenzaran con minúscula, React intentaría interpretarlos como etiquetas HTML nativas.

## 4. ¿Qué diferencia existe entre HTML y TSX?
HTML es un lenguaje de marcado tradicional para páginas web estáticas, mientras que TSX es una extensión que permite escribir marcado similar a HTML dentro de TypeScript. TSX ofrece tipado estático, permite incrustar expresiones de JavaScript/TypeScript mediante llaves `{}` y requiere diferencias sintácticas como `className` en vez de `class`, `htmlFor` en vez de `for`, y cierre explícito o autocierre en todas las etiquetas.

## 5. ¿Para qué se utiliza className?
Se utiliza para asignar clases de CSS a los elementos en TSX/JSX en lugar del atributo HTML tradicional `class`. Esto se debe a que `class` es una palabra reservada en JavaScript y TypeScript para declarar clases de programación orientada a objetos.

## 6. ¿Qué son las propiedades o props?
Son los datos o parámetros de entrada que un componente padre transfiere a un componente hijo en React. Permiten configurar el comportamiento y el contenido que muestra cada componente, manteniendo un flujo de datos unidireccional (de padre a hijo).

## 7. ¿Cómo ayuda TypeScript a validar las propiedades?
TypeScript permite definir interfaces o contratos de tipos (como `TaskItemProps` o `TaskSummaryProps`) que especifican qué propiedades requiere un componente y qué tipo de valor debe recibir cada una. Si se omite una propiedad requerida o se envía un tipo incorrecto (por ejemplo una cadena en lugar de un número o un valor no contemplado en una unión), el compilador detecta el error en tiempo de desarrollo antes de ejecutar la aplicación.

## 8. ¿Cuál es la responsabilidad de App.tsx?
`App.tsx` es el componente raíz y coordinador principal de la estructura de la aplicación. Su responsabilidad es ensamblar y organizar la jerarquía de los componentes principales (AppHeader, TaskForm, TaskFilters, TaskSummary, TaskList, AppFooter), definir la distribución visual global en la página y transferir los datos iniciales a los componentes que los requieran.

## 9. ¿Por qué la interfaz se dividió en varios componentes?
Para aplicar los principios de modularidad y separación de responsabilidades. Dividir la interfaz en componentes especializados (encabezado, formulario, filtros, resumen, lista, tareas y pie de página) hace que el código sea más legible, mantenible, fácil de depurar y preparado para añadir estado y lógica en actividades posteriores sin sobrecargar un único archivo.

## 10. ¿Por qué los botones todavía están deshabilitados?
Porque en esta actividad el alcance está centrado exclusivamente en la inicialización del proyecto, la composición visual y el uso de propiedades tipadas. Los estados interactivos con `useState`, el manejo de eventos y las operaciones CRUD se integrarán en las siguientes actividades de la fase.

## 11. ¿Qué componente consideras más reutilizable y por qué?
`TaskItem`, porque está diseñado como un componente presentacional puro que recibe datos dinámicos (`title` y `status`) y los renderiza con formato y estilos adaptados a su estado. Puede utilizarse tantas veces como sea necesario para representar diferentes tareas dentro de cualquier lista, sin depender de datos fijos o estructuras rígidas.

## 12. ¿Qué dificultad encontraste y cómo la resolviste?
Al establecer el tipado estricto para el estado de la tarea en `TaskItem`, fue necesario garantizar que únicamente se pudieran ingresar los valores permitidos (`pending` y `completed`) tanto en la interfaz de props como en las clases dinámicas de CSS. Se resolvió creando un tipo unión explícito `type TaskStatus = 'pending' | 'completed'`, asegurando la coherencia entre el tipado de TypeScript y los estilos visuales definidos en CSS, verificándolo exitosamente con `pnpm build` y `pnpm lint`.
