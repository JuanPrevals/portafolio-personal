# Juan Prevals · Portafolio

Portafolio personal en español, construido con **HTML, CSS y JavaScript**, sin frameworks ni dependencias de ejecución. Dirección editorial en blanco y negro, con proyectos reales del perfil [JuanPrevals](https://github.com/JuanPrevals).

## Verlo en tu computador

Desde esta carpeta:

```sh
npm start
```

Abre **http://127.0.0.1:8000/**. No necesitas ejecutar `npm install`: el servidor utiliza únicamente módulos de Node.js. También puedes usar `python -m http.server 8000`.

## Contenido e interacciones

- Presentación profesional, intereses y tecnologías.
- NexoTP, BookHub y HeadSafe como proyectos destacados.
- Laboratorio con Chile Cars, Motor Lógico y prácticas de Python.
- Filtros de proyectos con estado accesible y contador de resultados.
- Detalles en un diálogo nativo: cierre con Escape, foco contenido y devolución al botón de origen.
- Menú móvil con estado expandido y cierre al navegar.
- LinkedIn, GitHub, correo y botón para copiar el correo con alternativa si el navegador no permite el portapapeles.
- Video local de un recorrido real por HeadSafe, sin audio, con subtítulos y descripción textual.
- Transiciones discretas, respeto por movimiento reducido y navegación por teclado.
- Contenido, navegación y enlaces a repositorios disponibles sin JavaScript.

## Publicar en GitHub Pages

El repositorio local todavía no tiene un remoto configurado. El sitio está preparado para su publicación, pero **no se ha publicado**.

1. Crea un repositorio exclusivo llamado `portafolio-personal` en tu cuenta de GitHub. Para evitar conflictos con esta carpeta, créalo vacío.
2. Vincula el remoto y sube los archivos:

   ```sh
   git remote add origin https://github.com/JuanPrevals/portafolio-personal.git
   git add .
   git commit -m "Crear portafolio personal de Juan Prevals"
   git push -u origin main
   ```

3. En GitHub, abre **Settings → Pages → Build and deployment → Source** y selecciona **GitHub Actions**.
4. Ejecuta el workflow **Publicar portafolio en GitHub Pages** desde Actions, o realiza un nuevo push a `main`.
5. Comprueba la URL que devuelve el workflow. Si conservas ese nombre de repositorio, la dirección esperada es `https://juanprevals.github.io/portafolio-personal/`.

El workflow publica únicamente `index.html`, `styles.css`, `script.js`, `.nojekyll` y `assets/`. Los archivos de documentación, servidor y revisión no se incluyen en el sitio. Se siguió la [documentación oficial de workflows de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Archivos

```text
index.html                        Contenido y estructura semántica
styles.css                        Diseño editorial y adaptación responsive
script.js                         Menú, filtros, diálogos y portapapeles
assets/favicon.svg                Monograma JP
assets/images/                    Esquemas SVG y captura de HeadSafe
assets/video/headsafe-demo.webm    Grabación del sitio HeadSafe
assets/video/headsafe-es.vtt       Subtítulos descriptivos
scripts/serve.mjs                 Servidor local con soporte de rangos de video
.github/workflows/pages.yml       Publicación en GitHub Pages
PROPUESTA.md                      Fuentes y decisiones de contenido
```

## Procedencia del contenido

- [Perfil profesional](https://github.com/JuanPrevals/juanprevals).
- [Arquitectura de NexoTP](https://github.com/JuanPrevals/NexoTP). El gráfico representa React → FastAPI → reglas Flask/SQLAlchemy; no es una captura de la aplicación.
- [BookHub](https://github.com/JuanPrevals/Skillnest_fullStack_Python/tree/main/python/examen/bookhub). El gráfico es un esquema simplificado de usuarios, libros y favoritos.
- [HeadSafe](https://github.com/JuanPrevals/headsafe). Se reconoce como trabajo en equipo, con Juan como integrante. La captura y el video se registraron desde su [sitio publicado](https://juanprevals.github.io/headsafe/).
- Nombre, correo y LinkedIn fueron proporcionados por Juan para este portafolio.

Las funciones de los proyectos se describen a partir de su documentación pública. No se atribuyen todas las funcionalidades grupales a una sola persona.

## Verificación realizada

Se comprobó en Chromium con Playwright:

- Pantallas de 320, 375, 768, 1024 y 1440 px, además de orientación horizontal de 812 × 375.
- Ausencia de desbordamiento horizontal.
- Menú móvil, filtros, contador y apertura/cierre de los tres proyectos.
- Escape y devolución del foco al cerrar los diálogos.
- Copia del correo al portapapeles.
- Carga de imágenes, anclas internas y ausencia de errores JavaScript o respuestas HTTP fallidas de recursos locales.
- Reproducción y búsqueda temporal del video de aproximadamente 29 segundos.
- Acceso al contenido y a la navegación sin JavaScript, y vista con movimiento reducido.
- Revisión automática con axe-core: sin infracciones detectadas en las reglas evaluadas de WCAG A/AA, en móvil, escritorio y el diálogo de NexoTP. Esta comprobación automática no sustituye una auditoría manual completa.

No se ha verificado en dispositivos físicos ni en Safari. La publicación pública sigue pendiente de configurar el remoto y activar Pages.

## Editar

Modifica los textos en `index.html`; las descripciones ampliadas se encuentran en `projectDetails` de `script.js`. Los estilos usan variables al inicio de `styles.css` y fuentes del sistema, sin conexiones a servicios de fuentes externos.

Para reemplazar el video, actualiza el archivo de `assets/video/`, sus subtítulos y la descripción textual. Conserva `controls`, `playsinline` y la ausencia de reproducción automática.

La pauta adjunta indica el **30 de octubre de 2026** como entrega, aunque contiene una mención posterior al 23 de septiembre. Conviene confirmar esa discrepancia con el curso.
