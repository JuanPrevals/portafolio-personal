document.documentElement.classList.add("js");

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
  menuButton.querySelector("span").textContent = "+";
}
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(isOpen));
  navigation.classList.toggle("is-open", isOpen);
  menuButton.querySelector("span").textContent = isOpen ? "−" : "+";
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  ) {
    closeMenu();
    menuButton.focus();
  }
});
matchMedia("(min-width: 641px)").addEventListener("change", closeMenu);

const projects = [...document.querySelectorAll(".project")];
document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document
      .querySelectorAll("[data-filter]")
      .forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
    let count = 0;
    projects.forEach((project) => {
      project.hidden = filter !== "all" && project.dataset.category !== filter;
      if (!project.hidden) count++;
    });
    document.querySelector("#filter-status").textContent =
      `${count} ${count === 1 ? "proyecto" : "proyectos"}`;
  });
});

const projectDetails = {
  nexotp: {
    name: "NexoTP",
    intro:
      "Una plataforma para vincular egresados técnico-profesionales con empresas, prácticas, mentorías y seguimiento institucional.",
    heading: "Un sistema con distintas perspectivas",
    items: [
      "Flujos para egresados, empresas e instituciones dentro de una misma plataforma.",
      "Frontend en React y entrada de backend en FastAPI.",
      "Migración incremental que conserva reglas de Flask mediante un adaptador WSGI.",
      "Modelado de datos con SQLAlchemy y una estructura de despliegue con Docker y Nginx.",
    ],
    learning:
      "Un proyecto para explorar cómo organizar reglas de negocio, datos y distintos tipos de usuario. El esquema de la tarjeta representa la arquitectura documentada; no es una captura de la aplicación.",
    url: "https://github.com/JuanPrevals/NexoTP",
  },
  bookhub: {
    name: "BookHub",
    intro:
      "Una aplicación MVC para publicar, descubrir y guardar libros, desarrollada como parte de mi formación FullStack Python.",
    heading: "De los datos a una experiencia completa",
    items: [
      "Registro, inicio de sesión y validaciones en el servidor.",
      "Creación, lectura, edición y eliminación de libros con autorización por propietario.",
      "Búsqueda por título o autor y filtros por género.",
      "Favoritos modelados como una relación muchos a muchos entre usuarios y libros.",
    ],
    learning:
      "Python, Flask, MySQL, PyMySQL y Jinja2 conectan las reglas del backend con las vistas. El esquema visual muestra las relaciones de datos del proyecto.",
    url: "https://github.com/JuanPrevals/Skillnest_fullStack_Python/tree/main/python/examen/bookhub",
  },
  headsafe: {
    name: "HeadSafe",
    intro:
      "Proyecto académico en equipo: un sitio bilingüe que presenta un prototipo de detección de impactos y alertas de emergencia. Formo parte del equipo como integrante.",
    heading: "Hacer comprensible una idea técnica",
    items: [
      "Contenido en español e inglés y navegación adaptada a móvil.",
      "Interacciones con JavaScript: menú, acordeón y ampliación del plano.",
      "Animaciones con GSAP y adaptación a la preferencia de movimiento reducido.",
      "Presentación del prototipo, sus audiencias y su funcionamiento.",
    ],
    learning:
      "HTML, CSS y JavaScript dan forma a la presentación del proyecto grupal. La imagen y el video del portafolio muestran el sitio publicado. HeadSafe se presenta como prototipo académico.",
    url: "https://github.com/JuanPrevals/headsafe",
  },
};
const dialog = document.querySelector("#project-dialog");
let dialogTrigger;
document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projectDetails[button.dataset.project];
    if (!project) return;
    dialogTrigger = button;
    const container = document.querySelector("#dialog-content");
    container.replaceChildren();
    const title = document.createElement("h2");
    title.id = "dialog-title";
    title.textContent = project.name;
    const intro = document.createElement("p");
    intro.textContent = project.intro;
    const heading = document.createElement("h3");
    heading.textContent = project.heading;
    const list = document.createElement("ul");
    project.items.forEach((text) => {
      const item = document.createElement("li");
      item.textContent = text;
      list.append(item);
    });
    const note = document.createElement("p");
    note.className = "dialog-note";
    note.textContent = project.learning;
    const link = document.createElement("a");
    link.className = "text-link";
    link.href = project.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Ver código y documentación ↗";
    link.setAttribute(
      "aria-label",
      `Ver código y documentación de ${project.name}, abre en otra pestaña`,
    );
    container.append(title, intro, heading, list, note, link);
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add("dialog-open");
  });
});
document
  .querySelector(".dialog-close")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  )
    dialog.close();
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  dialogTrigger?.focus();
});

document.querySelector("#copy-email").addEventListener("click", async () => {
  const status = document.querySelector("#copy-status");
  try {
    if (!navigator.clipboard?.writeText)
      throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText("juanprevals@gmail.com");
    status.textContent = "Correo copiado.";
  } catch {
    status.textContent =
      "Puedes copiar el correo directamente o pulsarlo para escribir un mensaje.";
  }
});
document.querySelector("#year").textContent = new Date().getFullYear();
