# Portafolio de Juan Prevals

Documento de contenido basado en los repositorios consultados el 21 de octubre de 2026. La página ya está implementada en HTML, CSS y JavaScript con la dirección editorial en blanco y negro elegida por Juan.

## Enfoque profesional

Presentar un perfil de desarrollo web en formación, con interés en backend, modelado de datos e interacciones en tiempo real. Mostrar aplicaciones concretas y el aprendizaje detrás de ellas.

Texto propuesto para la presentación:

> Soy Juan Prevals, desarrollador web en formación con interés en backend y bases de datos. Construyo proyectos con Python, Flask y JavaScript para convertir reglas de negocio en aplicaciones útiles. Me interesa seguir creciendo en arquitectura, modelado de datos y funciones en tiempo real.

El enfoque coincide con el [README del perfil](https://github.com/JuanPrevals/juanprevals). La versión publicada en el HTML desarrolla esta presentación en tono de aprendizaje.

## Proyectos destacados

### NexoTP

Plataforma para conectar egresados técnico-profesionales con empresas, prácticas, mentorías y seguimiento institucional.

- Tecnologías documentadas actualmente: React 19, Vite, Bootstrap, FastAPI, Flask y SQLAlchemy; despliegue con Docker y Nginx.
- El README describe una migración incremental: FastAPI recibe las solicitudes y conserva reglas existentes de Flask mediante un adaptador WSGI.
- Presentar el problema, un flujo de uso y una decisión técnica. Confirmar el aporte individual antes de atribuir funcionalidades.
- [Repositorio y arquitectura actual](https://github.com/JuanPrevals/NexoTP).

### BookHub

Aplicación para publicar, descubrir y guardar libros, con cuentas de usuario, búsqueda, filtros y favoritos.

- Tecnologías: Python, Flask, MySQL, PyMySQL, Jinja2 y Bootstrap.
- Su README documenta CRUD, sesiones, autorización por propietario y una relación muchos a muchos para favoritos.
- Es un caso concreto para explicar backend y modelado relacional dentro del repositorio de formación.
- [Código y documentación](https://github.com/JuanPrevals/Skillnest_fullStack_Python/tree/main/python/examen/bookhub).

### HeadSafe

Sitio bilingüe para un prototipo académico de detección de impactos y alertas de emergencia.

- Tecnologías: HTML, CSS y JavaScript; su documentación incluye GSAP, Swiper y GLightbox.
- Permite mostrar navegación móvil, cambio de idioma y presentación de información técnica.
- Es un trabajo grupal. El README identifica a Juan Alberto Prevals García como integrante; falta confirmar su contribución específica.
- [Repositorio](https://github.com/JuanPrevals/headsafe) · [Sitio publicado según el README](https://juanprevals.github.io/headsafe/).

## Trabajos complementarios

- [Chile Cars](https://github.com/JuanPrevals/Chile_Cars): interfaz con HTML, CSS, JavaScript y Bootstrap. El documento HTML identifica dos autores y el repositorio contiene una captura en `resources/resultado.png`.
- [Evaluación Motor Lógico](https://github.com/JuanPrevals/Evaluacion_Motor_Logico): ejercicios de JavaScript sobre porcentajes, gestión de prioridades y recorrido de arreglos.
- [Formación FullStack Python](https://github.com/JuanPrevals/Skillnest_fullStack_Python): colección de prácticas de Python, Flask y MySQL, útil para mostrar la evolución del aprendizaje.

## Habilidades

Agrupar por uso, sin porcentajes de dominio inventados:

- Web: HTML, CSS, JavaScript y Bootstrap.
- Backend y datos: Python, Flask, SQL y MySQL.
- Herramientas: Git y GitHub.
- Otras tecnologías documentadas en NexoTP: React, FastAPI, SQLAlchemy y Docker. Confirmar cuáles puede explicar y demostrar personalmente antes de presentarlas como habilidades propias.

## Estructura propuesta

1. Presentación: nombre, enfoque profesional y acceso a proyectos.
2. Proyectos destacados: problema, tecnologías, captura real, aporte personal y enlaces.
3. Sobre mí y habilidades: trayectoria de aprendizaje e intereses.
4. Laboratorio: ejercicios y trabajos complementarios.
5. Video: presentación o demostración de un proyecto.
6. Contacto: GitHub, LinkedIn y correo profesional.

Propuesta técnica para la pauta: HTML, CSS y JavaScript sin proceso de compilación, con rutas relativas compatibles con GitHub Pages. Interacciones posibles: filtros de proyectos, menú móvil y ampliación de capturas con teclado y cierre mediante Escape.

## Video propuesto

Grabar una demostración breve de BookHub: iniciar sesión, buscar un libro, guardarlo como favorito y mostrar su detalle. Explicar cómo se relacionan usuarios, libros y favoritos. Alternativamente, presentar un flujo de NexoTP.

Se incorporó una grabación real del sitio público de HeadSafe de aproximadamente 29 segundos, sin audio, con controles, subtítulos descriptivos y descripción textual.

## Estado de la entrega

- Implementado el diseño editorial aprobado: blanco y negro, títulos grandes y proyectos protagonistas.
- Incorporados los datos entregados por Juan: nombre Juan Prevals, correo juanprevals@gmail.com y LinkedIn juan-prevals-1b77833b9.
- HeadSafe se presenta como proyecto grupal, sin atribuir todas las funcionalidades a Juan.
- Incorporados captura real, esquemas propios y video de HeadSafe.
- Verificados navegación, filtros, diálogos, video y comportamiento responsive con Chromium.
- Preparado el workflow de GitHub Pages. Queda pendiente la publicación: la carpeta no tiene un remoto Git configurado.

La pauta indica **30 de octubre de 2026** como fecha de entrega, pero termina mencionando el 23 de septiembre. Se toma el encabezado como referencia provisional y conviene confirmar la inconsistencia con el curso.

## Alcance de la revisión

Se consultaron el README del perfil, los README de NexoTP, HeadSafe, BookHub, Chile Cars y Evaluación Motor Lógico; también la estructura de los repositorios y el HTML de Chile Cars. Esta revisión sirve para seleccionar contenido: no equivale a ejecutar ni auditar las aplicaciones. Las funciones descritas proceden de su documentación.
