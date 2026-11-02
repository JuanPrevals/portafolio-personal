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
    const previousPositions = new Map(projects.filter(project => !project.hidden).map(project => [project, project.getBoundingClientRect()]));
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
    if (!motionIsReduced()) {
      projects.filter(project => !project.hidden).forEach((project, index) => {
        project.classList.remove("is-pending");
        const previous = previousPositions.get(project);
        const next = project.getBoundingClientRect();
        playMotion(project, previous ? [
          { transform: `translate(${previous.left - next.left}px, ${previous.top - next.top}px)`, opacity: .5 },
          { transform: "translate(0, 0)", opacity: 1 }
        ] : [
          { transform: "translateY(36px) scale(.96)", opacity: 0 },
          { transform: "translateY(0) scale(1)", opacity: 1 }
        ], { duration: 650, delay: index * 70, fill: "backwards" });
      });
    }
    document.querySelector("#filter-status").textContent =
      `${count} ${count === 1 ? "proyecto" : "proyectos"}`;
  });
});

const projectDetails = {
  nexotp: {
    name: "NexoTP",
    problem: "Reunir oportunidades, mentorías y seguimiento para egresados, empresas e instituciones sin fragmentar sus flujos.",
    decision: "Conservar las reglas de Flask durante una migración incremental, con FastAPI como entrada y React en el frontend.",
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
    problem: "Permitir que cada persona publique libros y organice sus favoritos, respetando quién puede modificar cada publicación.",
    decision: "Separar modelos, controladores y vistas; representar los favoritos como una relación muchos a muchos.",
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
    problem: "Presentar un prototipo académico de detección de impactos a personas que necesitan entender su propósito y funcionamiento.",
    decision: "Organizar una presentación bilingüe y adaptable con interacciones que respetan la preferencia de movimiento reducido.",
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
    const caseStudy = document.createElement("dl");
    caseStudy.className = "dialog-case";
    for (const [label, value] of [["El problema", project.problem], ["La decisión", project.decision]]) {
      const term = document.createElement("dt");
      term.textContent = label;
      const description = document.createElement("dd");
      description.textContent = value;
      caseStudy.append(term, description);
    }
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
    container.append(title, intro, caseStudy, heading, list, note, link);
    dialog.showModal();
    if (!motionIsReduced()) {
      [...container.children].forEach((element, index) => playMotion(element, [
        { opacity: 0, transform: "translateY(20px)" },
        { opacity: 1, transform: "translateY(0)" }
      ], { duration: 500, delay: 100 + index * 55, fill: "backwards" }));
    }
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

// Reveal once, keep every section readable without JavaScript or observers.
const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
const motionToggle = document.querySelector(".motion-toggle");
let motionPaused = false;
function motionIsReduced() {
  return motionPaused || motionPreference.matches;
}
const runningAnimations = new Set();
function playMotion(element, keyframes, options = {}) {
  if (motionIsReduced() || !element.animate) return;
  const animation = element.animate(keyframes, {
    duration: 900, easing: "cubic-bezier(.16,1,.3,1)", ...options
  });
  runningAnimations.add(animation);
  const forget = () => runningAnimations.delete(animation);
  animation.addEventListener("finish", forget, { once: true });
  animation.addEventListener("cancel", forget, { once: true });
  return animation;
}
function playIntroduction() {
  document.querySelectorAll(".title-line > span").forEach((line, index) => {
    playMotion(line, [
      { transform: "translateY(115%) rotate(4deg)", opacity: 0 },
      { transform: "translateY(0) rotate(0deg)", opacity: 1 }
    ], { duration: 1200, delay: 140 + index * 150, fill: "backwards" });
  });
  document.querySelectorAll(".hero-greeting, .project-orbit, .hero-aside > p, .hero-actions, .system-footer, .hero-bottom").forEach((element, index) => {
    playMotion(element, [{ opacity: 0, transform: "translateY(22px)" }, { opacity: 1, transform: "translateY(0)" }], {
      duration: 850, delay: 200 + index * 100, fill: "backwards"
    });
  });
  playMotion(document.querySelector(".orbit-rings"), [
    { transform: "rotate(-100deg) scale(.6)", opacity: 0 },
    { transform: "rotate(0deg) scale(1)", opacity: 1 }
  ], { duration: 1600, delay: 350, fill: "backwards" });
  document.querySelectorAll(".orbit-node").forEach((node, index) => {
    playMotion(node, [
      { opacity: 0, transform: "translateY(35px) scale(.85)" },
      { opacity: 1, transform: "translateY(0) scale(1)" }
    ], { duration: 1100, delay: 500 + index * 180, fill: "backwards" });
  });
}
playIntroduction();
const revealElements = [...document.querySelectorAll(".section-heading, .project, .about-grid, .knowledge-card, .learning-strip, .lab-row, .workflow-list li, .video-shell, .contact-heading, .contact-panel, .contact-channel")];
document.querySelectorAll(".knowledge-card, .workflow-list li").forEach((element, index) => {
  element.style.setProperty("--reveal-delay", `${(index % 4) * 90}ms`);
});
if ("IntersectionObserver" in window && !motionPreference.matches) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (isIntersecting) {
        target.classList.remove("is-pending");
        target.classList.add("is-revealed");
        const children = target.matches(".project")
          ? target.querySelectorAll(".project-info > *")
           : target.matches(".about-grid") ? target.querySelectorAll("h2, .about-copy > *")
           : target.matches(".section-heading") ? target.querySelectorAll("h2, .section-intro") : [];
        children.forEach((element, index) => playMotion(element, [
          { opacity: 0, transform: "translateY(32px)" },
          { opacity: 1, transform: "translateY(0)" }
        ], { duration: 800, delay: 100 + index * 80, fill: "backwards" }));
        revealObserver.unobserve(target);
      }
    });
  }, { threshold: 0.08 });
  revealElements.forEach((element) => {
    element.classList.add("reveal", "is-pending");
    revealObserver.observe(element);
  });
  motionPreference.addEventListener("change", ({ matches }) => {
    if (matches) {
      revealObserver.disconnect();
      revealElements.forEach((element) => element.classList.remove("is-pending"));
    }
  });
  // Browser search and keyboard focus must reveal off-screen content immediately.
  document.addEventListener("focusin", (event) => {
    event.target.closest(".is-pending")?.classList.remove("is-pending");
  });
  window.addEventListener("beforeprint", () => revealElements.forEach((element) => element.classList.remove("is-pending")));
}

// Pointer motion uses one frame per event batch and never changes document layout.
const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
const pointerSurfaces = [...document.querySelectorAll(".project-visual, .primary-button, .nav-contact, .copy-button")];
pointerSurfaces.forEach((visual) => {
  let pointerFrame;
  let pointerPosition;
  const reset = () => {
    cancelAnimationFrame(pointerFrame);
    visual.style.removeProperty("--tilt-x");
    visual.style.removeProperty("--tilt-y");
    visual.style.removeProperty("--shine-x");
    visual.style.removeProperty("--shine-y");
    visual.style.removeProperty("--magnet-x");
    visual.style.removeProperty("--magnet-y");
  };
  visual.addEventListener("pointermove", (event) => {
    if (motionIsReduced() || !finePointer.matches) return;
    pointerPosition = { x: event.clientX, y: event.clientY };
    cancelAnimationFrame(pointerFrame);
    pointerFrame = requestAnimationFrame(() => {
      if (motionIsReduced()) return reset();
      const rect = visual.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (pointerPosition.x - rect.left) / rect.width));
      const y = Math.min(1, Math.max(0, (pointerPosition.y - rect.top) / rect.height));
      if (visual.matches(".project-visual")) {
        visual.style.setProperty("--tilt-x", `${(0.5 - y) * 10}deg`);
        visual.style.setProperty("--tilt-y", `${(x - 0.5) * 12}deg`);
        visual.style.setProperty("--shine-x", `${x * 100}%`);
        visual.style.setProperty("--shine-y", `${y * 100}%`);
      } else {
        visual.style.setProperty("--magnet-x", `${(x - .5) * 12}px`);
        visual.style.setProperty("--magnet-y", `${(y - .5) * 10}px`);
      }
    });
  });
  visual.addEventListener("pointerleave", reset);
  visual.addEventListener("blur", reset);
  motionPreference.addEventListener("change", reset);
  motionToggle.addEventListener("click", reset);
});
const hero = document.querySelector(".hero");
const heroLayout = document.querySelector(".hero-layout");
const heroSystem = document.querySelector(".hero-system");
let heroPointerFrame;
function resetHeroPointer() {
  cancelAnimationFrame(heroPointerFrame);
  for (const property of ["--orbit-x", "--orbit-y"]) heroSystem.style.removeProperty(property);
  for (const property of ["--aura-x", "--aura-y"]) hero.style.removeProperty(property);
}
hero.addEventListener("pointermove", (event) => {
  if (motionIsReduced() || !finePointer.matches) return;
  cancelAnimationFrame(heroPointerFrame);
  heroPointerFrame = requestAnimationFrame(() => {
    if (motionIsReduced()) return resetHeroPointer();
    const rect = hero.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    heroSystem.style.setProperty("--orbit-x", `${(.5 - y) * 12}deg`);
    heroSystem.style.setProperty("--orbit-y", `${(x - .5) * 16}deg`);
    hero.style.setProperty("--aura-x", `${x * 100}%`);
    hero.style.setProperty("--aura-y", `${y * 100}%`);
  });
});
hero.addEventListener("pointerleave", resetHeroPointer);
function syncMotionState() {
  document.documentElement.classList.toggle("motion-paused", motionPaused);
  if (motionIsReduced()) {
    runningAnimations.forEach(animation => animation.cancel());
    document.querySelectorAll(".is-pending").forEach(element => element.classList.remove("is-pending"));
    resetHeroPointer();
  }
  scheduleReadingUpdate();
}
motionToggle.addEventListener("click", () => {
  motionPaused = !motionPaused;
  motionToggle.setAttribute("aria-pressed", String(motionPaused));
  motionToggle.firstChild.textContent = motionPaused ? "Reanudar movimiento " : "Pausar movimiento ";
  motionToggle.querySelector("span").textContent = motionPaused ? "▷" : "Ⅱ";
  syncMotionState();
});
motionPreference.addEventListener("change", syncMotionState);
window.addEventListener("beforeprint", () => runningAnimations.forEach(animation => animation.cancel()));

const sectionLinks = [...navigation.querySelectorAll('a[href^="#"]')];
const navSections = sectionLinks.map((link) => ({ link, section: document.querySelector(link.hash) }));
const scrollScenes = [...document.querySelectorAll(".section-heading h2, .about h2, .video-shell")];
const readingProgress = document.createElement("div");
readingProgress.className = "reading-progress";
readingProgress.setAttribute("aria-hidden", "true");
document.querySelector(".header").append(readingProgress);
let scrollScheduled = false;
function updateReadingPosition() {
  scrollScheduled = false;
  const passed = navSections.filter(({ section }) => section.getBoundingClientRect().top <= 170);
  const current = passed.sort((a, b) => b.section.offsetTop - a.section.offsetTop)[0]?.link;
  sectionLinks.forEach((link) => {
    if (link === current) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  const scrollable = document.documentElement.scrollHeight - innerHeight;
  readingProgress.style.transform = `scaleX(${scrollable > 0 ? Math.min(1, Math.max(0, scrollY / scrollable)) : 0})`;
  if (!motionIsReduced()) {
    const heroRect = hero.getBoundingClientRect();
    if (heroRect.bottom >= 0) {
      heroLayout.style.setProperty("--hero-shift", `${Math.min(70, Math.max(0, -heroRect.top * .16))}px`);
      heroSystem.style.setProperty("--orbit-lift", `${-Math.min(65, Math.max(0, -heroRect.top * .13))}px`);
    }
    scrollScenes.forEach((scene) => {
      const bounds = scene.getBoundingClientRect();
      if (bounds.bottom < -80 || bounds.top > innerHeight + 80) return;
      const progress = Math.min(1, Math.max(0, (innerHeight - bounds.top) / (innerHeight + bounds.height)));
      scene.style.setProperty("--scene-shift", `${(0.5 - progress) * 44}px`);
      scene.style.setProperty("--scene-scale", String(.94 + .06 * Math.min(1, progress * 2)));
    });
    const workflow = document.querySelector(".workflow-list");
    const rect = workflow.getBoundingClientRect();
    workflow.style.setProperty("--process-progress", String(Math.min(1, Math.max(0, (innerHeight * .85 - rect.top) / (innerHeight * .65)))));
  }
}
function scheduleReadingUpdate() {
  if (!scrollScheduled) {
    scrollScheduled = true;
    requestAnimationFrame(updateReadingPosition);
  }
}
window.addEventListener("scroll", scheduleReadingUpdate, { passive: true });
window.addEventListener("resize", scheduleReadingUpdate);
window.addEventListener("load", scheduleReadingUpdate);
updateReadingPosition();

// Ease anchor navigation without taking control of wheel or touch scrolling.
let navigationFrame;
let navigationTarget;
function cancelNavigationScroll() {
  cancelAnimationFrame(navigationFrame);
  navigationTarget = undefined;
}
document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
  const target = document.getElementById(link.hash.slice(1));
  if (!target) return;
  event.preventDefault();
  cancelNavigationScroll();
  const start = scrollY;
  const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const end = Math.max(0, Math.min(document.documentElement.scrollHeight - innerHeight, start + target.getBoundingClientRect().top - offset));
  const distance = end - start;
  const duration = motionIsReduced() || link.classList.contains("skip-link") ? 0 : Math.min(1400, Math.max(650, Math.abs(distance) * .14));
  if (location.hash !== link.hash) history.pushState(null, "", link.hash);
  const started = performance.now();
  navigationTarget = target;
  function step(now) {
    const progress = duration === 0 || motionIsReduced() ? 1 : Math.min(1, (now - started) / duration);
    const eased = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
    window.scrollTo({ top: start + distance * eased, behavior: "instant" });
    if (progress < 1) {
      navigationFrame = requestAnimationFrame(step);
    } else {
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      navigationTarget = undefined;
    }
  }
  navigationFrame = requestAnimationFrame(step);
});
for (const event of ["wheel", "touchstart", "pointerdown"]) {
  window.addEventListener(event, cancelNavigationScroll, { passive: true });
}
document.addEventListener("keydown", (event) => {
  if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " ", "Tab", "Escape"].includes(event.key)) cancelNavigationScroll();
});
window.addEventListener("popstate", cancelNavigationScroll);
motionPreference.addEventListener("change", () => {
  if (motionIsReduced() && navigationTarget) {
    navigationTarget.scrollIntoView({ behavior: "instant", block: "start" });
    cancelNavigationScroll();
  }
});
