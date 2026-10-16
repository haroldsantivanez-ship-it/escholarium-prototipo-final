"use strict";

const roles = {
  student: {
    label: "Estudiante",
    short: "Portal del estudiante",
    icon: "icon-book",
    description: "Proyectos, fuentes, citas, bitácora y guía de Eli.",
    email: "estudiante@demo.edu.pe",
    password: "Demo2026!",
    name: "María González",
    initials: "MG",
    tag: "Aprendizaje",
    loginKicker: "Acceso del estudiante",
    loginTitle: "Continúa tu investigación",
    loginDescription: "Revisa tus proyectos, registra evidencias y trabaja con la orientación de Eli."
  },
  teacher: {
    label: "Docente / tutor",
    short: "Portal de supervisión",
    icon: "icon-users",
    description: "Seguimiento, alertas y bitácoras de los proyectos asignados.",
    email: "docente@demo.edu.pe",
    password: "Demo2026!",
    name: "Prof. Carlos Mendoza",
    initials: "CM",
    tag: "Supervisión",
    loginKicker: "Acceso docente y tutor",
    loginTitle: "Ingresa al espacio de supervisión",
    loginDescription: "Revisa avances, alertas y evidencias de los proyectos asignados."
  },
  admin: {
    label: "Administrador institucional",
    short: "Gestión institucional",
    icon: "icon-settings",
    description: "Usuarios, secciones, permisos y configuración del colegio.",
    email: "administrador@demo.edu.pe",
    password: "Demo2026!",
    name: "Andrea Salazar",
    initials: "AS",
    tag: "Portal web",
    loginKicker: "Acceso administrativo",
    loginTitle: "Gestiona tu institución",
    loginDescription: "Administra cuentas, secciones y permisos sin acceder al contenido académico que no corresponda."
  },
  family: {
    label: "Familia autorizada",
    short: "Acompañamiento familiar",
    icon: "icon-family",
    description: "Avances autorizados e información escolar de contexto.",
    email: "familia@demo.edu.pe",
    password: "Demo2026!",
    name: "Familia González",
    initials: "FG",
    tag: "Experiencia móvil",
    mobile: true,
    loginKicker: "Acceso familiar",
    loginTitle: "Acompaña con información clara",
    loginDescription: "Consulta únicamente los avances y datos demostrativos autorizados por la institución."
  }
};

const navigation = {
  student: [
    ["home", "Inicio", "icon-home"],
    ["projects", "Mis proyectos", "icon-book"],
    ["eli", "Investigar con Eli", "icon-ai"],
    ["sources", "Fuentes", "icon-search"],
    ["journal", "Bitácora", "icon-timeline"]
  ],
  teacher: [
    ["home", "Inicio", "icon-home"],
    ["projects", "Proyectos", "icon-book"],
    ["students", "Estudiantes", "icon-users"],
    ["alerts", "Alertas", "icon-alert"],
    ["reports", "Reportes", "icon-chart"]
  ],
  admin: [
    ["home", "Inicio", "icon-home"],
    ["users", "Usuarios y roles", "icon-users"],
    ["sections", "Secciones", "icon-book"],
    ["institutions", "Mi institución", "icon-building"],
    ["audit", "Auditoría", "icon-timeline"]
  ],
  family: [
    ["home", "Inicio", "icon-home"],
    ["project", "Proyecto", "icon-book"],
    ["reports", "Reportes", "icon-chart"],
    ["school", "Información escolar", "icon-building"],
    ["notifications", "Notificaciones", "icon-bell"]
  ]
};

const viewMetadata = {
  student: {
    home: ["Resumen académico", "Inicio"], projects: ["Trabajo investigativo", "Mis proyectos"],
    eli: ["Tutoría socrática", "Investigar con Eli"], sources: ["Evidencias del proyecto", "Fuentes"], journal: ["Trazabilidad", "Bitácora"]
  },
  teacher: {
    home: ["Supervisión", "Inicio"], projects: ["Seguimiento académico", "Proyectos"],
    students: ["Sección asignada", "Estudiantes"], alerts: ["Revisión humana", "Alertas"], reports: ["Resultados", "Reportes"]
  },
  admin: {
    home: ["Gestión institucional", "Inicio"], users: ["Cuentas y permisos", "Usuarios y roles"],
    sections: ["Organización académica", "Secciones"], institutions: ["Configuración", "Mi institución"], audit: ["Trazabilidad técnica", "Auditoría"]
  },
  family: {
    home: ["Resumen autorizado", "Inicio"], project: ["Acompañamiento", "Proyecto de investigación"],
    reports: ["Información revisada", "Reportes"], school: ["Datos demostrativos", "Información escolar"], notifications: ["Comunicaciones", "Notificaciones"]
  }
};

const defaultSources = [
  {
    id: 1,
    title: "Guidance for generative AI in education and research",
    author: "UNESCO · Miao y Holmes (2023)",
    url: "https://unesdoc.unesco.org/",
    reason: "Aporta criterios de agencia humana, privacidad y uso pedagógico responsable de la IA.",
    status: "Evaluada"
  },
  {
    id: 2,
    title: "Generative AI without guardrails can harm learning",
    author: "Bastani et al. (2025)",
    url: "https://doi.org/10.1073/pnas.2422633122",
    reason: "Permite sustentar por qué Eli debe orientar mediante pistas y evitar respuestas completas.",
    status: "Evaluada"
  },
  {
    id: 3,
    title: "Media and information literacy in secondary students",
    author: "Turpo-Gebera et al. (2023)",
    url: "https://doi.org/10.3926/jotse.1746",
    reason: "Relaciona la alfabetización mediática percibida con factores personales e institucionales.",
    status: "Por revisar"
  }
];

const initialJournal = [
  { date: "24 set · 18:35", title: "Se ajustó la pregunta de investigación", text: "Se incorporaron población, contexto y periodo para hacerla verificable." },
  { date: "23 set · 16:10", title: "Fuente evaluada", text: "Se revisaron autoría, fecha, procedencia, respaldo y pertinencia del artículo de Bastani et al." },
  { date: "22 set · 11:40", title: "Proyecto creado", text: "Se inició la ruta de investigación y se registró el propósito del trabajo." }
];

const studentCases = {
  MG: {
    name: "María González",
    project: "Uso responsable de la inteligencia artificial",
    question: "¿Cómo influye el uso guiado de IA en la evaluación de fuentes de estudiantes de 5.º de secundaria durante ocho semanas?",
    stage: "Evaluación de fuentes",
    progress: 62,
    sources: 3,
    journal: 3,
    lastActivity: "Hoy · 18:35",
    status: "Revisión docente",
    statusClass: "tag--warning",
    finding: "La fuente 3 no presenta un autor claramente identificable. Eli recomienda verificar la institución responsable antes de utilizarla."
  },
  DR: {
    name: "Diego Ramos",
    project: "Consumo de agua en el hogar",
    question: "¿Qué hábitos influyen en el consumo de agua de las familias de Santa Anita?",
    stage: "Formulación de la pregunta",
    progress: 38,
    sources: 2,
    journal: 2,
    lastActivity: "Ayer · 17:10",
    status: "En orientación",
    statusClass: "tag--gold",
    finding: "La población está definida, pero todavía falta precisar el periodo que abarcará la investigación."
  },
  LT: {
    name: "Lucía Torres",
    project: "Redes sociales y sueño",
    question: "¿Cómo se relaciona el uso nocturno de redes sociales con las horas de sueño en estudiantes de secundaria?",
    stage: "Síntesis",
    progress: 71,
    sources: 5,
    journal: 4,
    lastActivity: "Hoy · 16:20",
    status: "En análisis",
    statusClass: "tag--success",
    finding: "Una paráfrasis necesita mayor elaboración propia y una referencia más precisa antes de incorporarse a la síntesis."
  },
  AP: {
    name: "Andrea Pérez",
    project: "Áreas verdes del distrito",
    question: "¿Qué cambios perciben los vecinos en las áreas verdes cercanas a la institución?",
    stage: "Evaluación de fuentes",
    progress: 54,
    sources: 3,
    journal: 2,
    lastActivity: "Hace 2 días",
    status: "Avance regular",
    statusClass: "tag--success",
    finding: "No presenta alertas prioritarias. Corresponde continuar con la comparación de sus fuentes."
  }
};

const screens = [...document.querySelectorAll(".screen")];
const roleGrid = document.getElementById("role-grid");
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");
const portalScreen = document.getElementById("portal-screen");
const portalNav = document.getElementById("portal-nav");
const portalContent = document.getElementById("portal-content");
const sourceDialog = document.getElementById("source-dialog");
const sourceForm = document.getElementById("source-form");
const studentDialog = document.getElementById("student-dialog");
const studentDialogContent = document.getElementById("student-dialog-content");

const state = {
  selectedRole: "student",
  currentRole: null,
  currentView: null,
  scrollPositions: {},
  sources: cloneData(defaultSources),
  journal: cloneData(initialJournal),
  chat: [
    { from: "eli", text: "Hola, María. Revisemos tu investigación paso a paso. Cuéntame qué tema tienes o en qué parte necesitas orientación." }
  ],
  chatBusy: false,
  chatFlow: {
    stage: "start",
    focus: "",
    population: "",
    conditions: "",
    proposedQuestion: ""
  }
};

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function icon(name) {
  return `<svg class="icon" aria-hidden="true"><use href="#${name}"></use></svg>`;
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>'"]/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[character]);
}

function safeExternalURL(value = "") {
  try {
    const url = new URL(String(value));
    return ["http:", "https:"].includes(url.protocol) ? url.href : "#";
  } catch {
    return "#";
  }
}

function setScreen(id) {
  screens.forEach(screen => {
    const isActive = screen.id === id;
    screen.hidden = !isActive;
    screen.classList.toggle("screen--active", isActive);
  });
  document.body.classList.toggle("portal-mode", id === "portal-screen");
}

function renderRoleCards() {
  roleGrid.innerHTML = Object.entries(roles).map(([key, role], index) => `
    <button class="role-card role-card--${key}${role.mobile ? " role-card--mobile" : ""}" type="button" data-role="${key}">
      <span class="role-card__number">0${index + 1}</span>
      ${role.tag ? `<span class="role-card__tag">${role.tag}</span>` : ""}
      <span class="role-card__icon">${icon(role.icon)}</span>
      <h2>${role.label}</h2>
      <p>${role.description}</p>
      <span class="role-card__link">Continuar ${icon("icon-arrow")}</span>
    </button>
  `).join("");
}

function showAccess() {
  setScreen("access-screen");
}

function goHome() {
  setScreen("landing-screen");
}

function chooseRole(roleKey) {
  const role = roles[roleKey];
  if (!role) return;
  state.selectedRole = roleKey;
  document.getElementById("login-kicker").textContent = role.loginKicker;
  document.getElementById("login-title").textContent = role.loginTitle;
  document.getElementById("login-description").textContent = role.loginDescription;
  document.getElementById("email").value = role.email;
  document.getElementById("password").value = role.password;
  document.getElementById("institution").value = "santa-maria";
  loginError.hidden = true;
  setScreen("login-screen");
  requestAnimationFrame(() => document.getElementById("email").focus({ preventScroll: true }));
}

function showLoginError(message) {
  loginError.textContent = message;
  loginError.hidden = false;
  loginError.animate([
    { transform: "translateX(-5px)" }, { transform: "translateX(5px)" }, { transform: "translateX(0)" }
  ], { duration: 220 });
}

function enterPortal(roleKey, view = "home") {
  const role = roles[roleKey];
  if (!role) return;
  state.currentRole = roleKey;
  state.currentView = null;
  portalScreen.classList.remove("role-student", "role-teacher", "role-admin", "role-family");
  portalScreen.classList.add(`role-${roleKey}`);
  document.getElementById("sidebar-role").textContent = role.short;
  document.getElementById("user-name").textContent = role.name;
  document.getElementById("user-role-label").textContent = role.label;
  document.getElementById("user-initials").textContent = role.initials;
  renderNavigation();
  setScreen("portal-screen");
  selectView(view, false);
}

function renderNavigation() {
  portalNav.innerHTML = navigation[state.currentRole].map(([view, label, iconName]) => `
    <button class="nav-button" type="button" data-view="${view}" aria-current="false">${icon(iconName)}<span>${label}</span></button>
  `).join("");
}

function selectView(view, remember = true) {
  if (!state.currentRole || !viewMetadata[state.currentRole][view]) return;
  if (remember && state.currentView) {
    state.scrollPositions[`${state.currentRole}:${state.currentView}`] = portalContent.scrollTop;
  }
  state.currentView = view;
  const [kicker, title] = viewMetadata[state.currentRole][view];
  document.getElementById("view-kicker").textContent = kicker;
  document.getElementById("view-title").textContent = title;
  portalNav.querySelectorAll(".nav-button").forEach(button => {
    button.setAttribute("aria-current", button.dataset.view === view ? "page" : "false");
  });
  portalContent.innerHTML = renderView(state.currentRole, view);
  const saved = state.scrollPositions[`${state.currentRole}:${view}`] || 0;
  requestAnimationFrame(() => { portalContent.scrollTop = saved; });
  closeMenu();
}

function renderView(role, view) {
  const renderer = renderers[role]?.[view];
  return renderer ? renderer() : `<div class="empty-state"><h3>Vista no disponible</h3></div>`;
}

const renderers = {
  student: {
    home: () => `
      <section class="view">
        <div class="view-intro"><div><h2>Buenas tardes, María</h2><p>Tu pregunta ya está delimitada. Hoy puedes validar la tercera fuente y registrar la decisión en tu bitácora.</p></div><button class="button button--primary" type="button" data-view="eli">Continuar con Eli ${icon("icon-arrow")}</button></div>
        <div class="cards-grid">
          <article class="card card--span-3"><div class="card__header"><div><h3>Progreso</h3><p>Proyecto activo</p></div><span class="card__icon">${icon("icon-chart")}</span></div><div class="metric"><strong>62%</strong><span class="trend">+12 % esta semana</span></div></article>
          <article class="card card--span-3"><div class="card__header"><div><h3>Fuentes</h3><p>Registradas</p></div><span class="card__icon">${icon("icon-search")}</span></div><div class="metric"><strong>${state.sources.length}</strong><span>2 evaluadas</span></div></article>
          <article class="card card--span-3"><div class="card__header"><div><h3>Bitácora</h3><p>Decisiones</p></div><span class="card__icon">${icon("icon-timeline")}</span></div><div class="metric"><strong>${state.journal.length}</strong><span>entradas</span></div></article>
          <article class="card card--span-3"><div class="card__header"><div><h3>Próximo hito</h3><p>Entrega parcial</p></div><span class="card__icon">${icon("icon-bell")}</span></div><div class="metric"><strong style="font-size:1.6rem">30 set</strong><span>5 días</span></div></article>
          <article class="card card--span-8 project-card">
            <div class="card__header"><div><span class="tag tag--gold">En investigación</span></div><button class="button button--small button--secondary" type="button" data-view="projects">Ver proyecto</button></div>
            <h3 class="project-title">Uso responsable de la inteligencia artificial en estudiantes de secundaria</h3>
            <div class="project-meta"><span>Curso: Comunicación</span><span>Docente: Prof. Carlos Mendoza</span><span>Actualizado hoy</span></div>
            <div class="progress" aria-label="62 por ciento completado"><span style="width:62%"></span></div><div class="progress-meta"><span>Evaluación de fuentes en desarrollo</span><strong>62 %</strong></div>
          </article>
          <article class="card card--span-4">
            <div class="card__header"><div><h3>Ruta sugerida</h3><p>Para la próxima sesión</p></div></div>
            <div class="list">
              <div class="list-item"><div class="list-item__leading"><span class="list-item__number">1</span><div><strong>Verificar fuente 3</strong><span>Identificar responsable</span></div></div><span class="tag tag--gold">En curso</span></div>
              <div class="list-item"><div class="list-item__leading"><span class="list-item__number">2</span><div><strong>Comparar respaldo</strong><span>Contrastar otra publicación</span></div></div><span class="tag">Siguiente</span></div>
              <div class="list-item"><div class="list-item__leading"><span class="list-item__number">3</span><div><strong>Registrar decisión</strong><span>Actualizar bitácora</span></div></div><span class="tag tag--success">Lista</span></div>
            </div>
          </article>
          <article class="card card--span-12 process-flow-card">
            <div class="card__header"><div><h3>Flujo principal conectado</h3><p>El mismo avance pasa del estudiante a la revisión docente y queda trazado.</p></div><span class="tag">Caso: María González</span></div>
            <div class="process-flow" aria-label="Flujo del acompañamiento de investigación">
              <div class="process-flow__step is-done"><span>${icon("icon-book")}</span><div><strong>Estudiante</strong><small>Registra pregunta y fuentes</small></div></div>
              <i>${icon("icon-arrow")}</i>
              <div class="process-flow__step is-done"><span>${icon("icon-ai")}</span><div><strong>Eli orienta</strong><small>Señala criterios e indicios</small></div></div>
              <i>${icon("icon-arrow")}</i>
              <div class="process-flow__step is-current"><span>${icon("icon-users")}</span><div><strong>Docente revisa</strong><small>Valida la alerta de la fuente 3</small></div></div>
              <i>${icon("icon-arrow")}</i>
              <div class="process-flow__step"><span>${icon("icon-timeline")}</span><div><strong>Bitácora</strong><small>Conserva la decisión final</small></div></div>
            </div>
          </article>
        </div>
      </section>`,

    projects: () => `
      <section class="view">
        <div class="view-intro"><div><h2>Mis proyectos</h2><p>Organiza tus trabajos por etapas y conserva las evidencias de cada decisión.</p></div><button class="button button--primary" type="button" data-action="new-project">Nuevo proyecto</button></div>
        <div class="cards-grid">
          <article class="card card--span-8 project-card"><div class="card__header"><span class="tag tag--gold">Activo</span><span class="tag">62 % completado</span></div><h3 class="project-title">Uso responsable de la inteligencia artificial en estudiantes de secundaria</h3><p style="color:var(--ink-600)">Pregunta actual: ¿Cómo influye el uso guiado de IA en la evaluación de fuentes de estudiantes de 5.º de secundaria durante ocho semanas?</p><div class="progress"><span style="width:62%"></span></div><div class="progress-meta"><span>4 de 8 etapas iniciadas</span><span>Último cambio: hoy</span></div><div style="margin-top:20px"><button class="button button--small button--primary" type="button" data-view="eli">Continuar investigación</button></div></article>
          <aside class="card card--span-4"><div class="card__header"><div><h3>Etapas del proyecto</h3><p>La bitácora se actualiza con cada avance</p></div></div>${renderStages()}</aside>
          <article class="card card--span-6"><div class="card__header"><div><h3>Proyecto anterior</h3><p>Ciencias Naturales · 2025</p></div><span class="tag tag--success">Finalizado</span></div><h3 style="font-size:1rem">Calidad del aire alrededor de la institución</h3><p style="color:var(--ink-600);font-size:.86rem">Documento final, cuatro fuentes y bitácora disponibles.</p></article>
          <article class="card card--span-6"><div class="card__header"><div><h3>Borrador</h3><p>Historia · Sin fecha</p></div><span class="tag">8 %</span></div><h3 style="font-size:1rem">Cambios urbanos en Santa Anita</h3><p style="color:var(--ink-600);font-size:.86rem">Aún falta formular una pregunta investigable.</p></article>
        </div>
      </section>`,

    eli: () => `
      <section class="view">
        <div class="view-intro"><div><h2>Investigar con Eli</h2><p>Eli formula preguntas, solicita evidencias y propone criterios. Las decisiones finales siempre son tuyas.</p></div><span class="tag tag--success">Tutoría activa</span></div>
        <div class="research-layout">
          <article class="card chat-card">
            <header class="chat-header"><div class="eli-avatar-3d"><div class="eli-3d eli-3d--compact" data-eli-3d data-eli-mode="compact" role="img" aria-label="Eli, asistente de Escholarium"><canvas class="eli-3d__canvas" aria-hidden="true"></canvas><div class="eli-3d__loader" role="status"><span></span><strong>Eli</strong></div></div></div><div><h3>Eli</h3><p>Guía académica · Respuestas sencillas y formales</p></div></header>
            <div id="chat-messages" class="chat-messages" aria-live="polite">${renderChat()}</div>
            <form id="chat-form" class="chat-composer"><div class="chat-composer__row"><textarea id="chat-input" aria-label="Mensaje para Eli" rows="1" placeholder="Escribe tu duda o explica tu decisión..."></textarea><button class="button button--primary" type="submit"><span>Enviar</span>${icon("icon-arrow")}</button></div><p class="chat-disclaimer">Interacción simulada: la conversación no se guarda. Eli no redacta trabajos completos ni certifica que una fuente sea verdadera.</p></form>
          </article>
          <aside class="research-sidebar">
            <article class="card"><div class="card__header"><div><h3>Etapas del proyecto</h3><p>Progreso actual</p></div></div>${renderStages()}</article>
            <article class="card"><div class="card__header"><div><h3>Pregunta actual</h3><p>Versión de trabajo</p></div></div><p style="color:var(--ink-600);font-size:.86rem">¿Cómo influye el uso guiado de IA en la evaluación de fuentes de estudiantes de 5.º de secundaria durante ocho semanas?</p><button class="button button--small button--secondary" type="button" data-prompt="Ayúdame a delimitar mejor mi pregunta">Revisar con Eli</button></article>
          </aside>
        </div>
      </section>`,

    sources: () => `
      <section class="view">
        <div class="view-intro"><div><h2>Fuentes del proyecto</h2><p>Registra evidencias y evalúalas con criterios observables antes de utilizarlas.</p></div><button class="button button--primary" type="button" data-action="open-source-dialog">Registrar fuente</button></div>
        <div class="toolbar"><label class="search-control">${icon("icon-search")}<input id="source-search" type="search" placeholder="Buscar por título o autor" aria-label="Buscar fuentes"></label><span class="tag">${state.sources.length} fuentes registradas</span></div>
        <div id="sources-grid" class="sources-grid">${renderSources(state.sources)}</div>
      </section>`,

    journal: () => `
      <section class="view">
        <div class="view-intro"><div><h2>Bitácora del proceso</h2><p>Este registro permite explicar cómo evolucionó el proyecto y qué decisiones tomaste.</p></div><button class="button button--secondary" type="button" data-action="export-journal">Exportar resumen</button></div>
        <div class="cards-grid">
          <article class="card card--span-8"><div class="card__header"><div><h3>Actividad reciente</h3><p>${state.journal.length} decisiones registradas</p></div></div><div class="timeline">${state.journal.map(item => `<div class="timeline-item"><time>${escapeHTML(item.date)}</time><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.text)}</p></div>`).join("")}</div></article>
          <aside class="card card--span-4"><div class="card__header"><div><h3>Qué registra la bitácora</h3><p>Trazabilidad académica</p></div></div><div class="list"><div class="list-item"><div><strong>Cambios de la pregunta</strong><span>Motivo y versión</span></div></div><div class="list-item"><div><strong>Fuentes consultadas</strong><span>Criterios y decisiones</span></div></div><div class="list-item"><div><strong>Interacciones con Eli</strong><span>Orientación recibida</span></div></div><div class="list-item"><div><strong>Revisión docente</strong><span>Observaciones y acuerdos</span></div></div></div></aside>
        </div>
      </section>`
  },

  teacher: {
    home: () => `
      <section class="view"><div class="view-intro"><div><h2>Supervisión de proyectos</h2><p>Revisa avances y prioriza los casos que requieren acompañamiento humano.</p></div><button class="button button--primary" type="button" data-view="alerts">Revisar alertas</button></div>
      <div class="cards-grid">
        <article class="card card--span-3"><div class="card__header"><div><h3>Proyectos activos</h3><p>5.º de secundaria</p></div><span class="card__icon">${icon("icon-book")}</span></div><div class="metric"><strong>24</strong><span>estudiantes</span></div></article>
        <article class="card card--span-3"><div class="card__header"><div><h3>Avance medio</h3><p>Sección A</p></div><span class="card__icon">${icon("icon-chart")}</span></div><div class="metric"><strong>58%</strong><span class="trend">+7 %</span></div></article>
        <article class="card card--span-3"><div class="card__header"><div><h3>Alertas abiertas</h3><p>Revisión requerida</p></div><span class="card__icon">${icon("icon-alert")}</span></div><div class="metric"><strong>3</strong><span>priorizadas</span></div></article>
        <article class="card card--span-3"><div class="card__header"><div><h3>Sin actividad</h3><p>Últimos 7 días</p></div><span class="card__icon">${icon("icon-users")}</span></div><div class="metric"><strong>2</strong><span>estudiantes</span></div></article>
        <article class="card card--span-8"><div class="card__header"><div><h3>Proyectos que requieren atención</h3><p>Priorización orientativa; la decisión corresponde al docente</p></div><button class="button button--small button--secondary" type="button" data-view="projects">Ver todos</button></div>${renderTeacherProjectList()}</article>
        <article class="card card--span-4"><div class="card__header"><div><h3>Actividad de la semana</h3><p>Sección A</p></div></div><div class="list"><div class="list-item"><div><strong>18 fuentes evaluadas</strong><span>6 requieren comentario</span></div></div><div class="list-item"><div><strong>31 entradas de bitácora</strong><span>Mayor actividad: miércoles</span></div></div><div class="list-item"><div><strong>9 preguntas ajustadas</strong><span>4 listas para validación</span></div></div></div></article>
      </div></section>`,
    projects: () => `
      <section class="view"><div class="view-intro"><div><h2>Proyectos asignados</h2><p>Consulta el estado, las fuentes y la última actividad de cada estudiante.</p></div><span class="tag">24 proyectos</span></div>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>Estudiante</th><th>Proyecto</th><th>Etapa</th><th>Avance</th><th>Última actividad</th><th>Acción</th></tr></thead><tbody>${teacherRows()}</tbody></table></div></section>`,
    students: () => `
      <section class="view"><div class="view-intro"><div><h2>Estudiantes de 5.º A</h2><p>La información mostrada es demostrativa y corresponde únicamente a esta institución.</p></div><button class="button button--secondary" type="button" data-action="teacher-note">Registrar orientación</button></div>
      <div class="cards-grid"><article class="card card--span-12"><div class="toolbar"><label class="search-control">${icon("icon-search")}<input type="search" placeholder="Buscar estudiante" aria-label="Buscar estudiante"></label><span class="tag tag--success">24 activos</span></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Estudiante</th><th>Pregunta</th><th>Fuentes</th><th>Bitácora</th><th>Estado</th></tr></thead><tbody>${teacherRows(true)}</tbody></table></div></article></div></section>`,
    alerts: () => `
      <section class="view"><div class="view-intro"><div><h2>Alertas para revisión</h2><p>Eli señala indicios. Tú revisas la evidencia y decides si corresponde intervenir.</p></div><span class="tag tag--warning" data-alert-count>3 por revisar</span></div>
      <div class="alert-list" id="alert-list">
        ${alertCard("A-104", "Fuente sin autor identificable", "María González · La fuente 3 no presenta un responsable verificable.", "Revisar fuente", "MG")}
        ${alertCard("A-103", "Pregunta todavía muy amplia", "Diego Ramos · La población y el periodo aún no están delimitados.", "Abrir bitácora", "DR")}
        ${alertCard("A-099", "Similitud que requiere contexto", "Lucía Torres · Se encontró una paráfrasis superficial frente a una fuente registrada. No constituye una acusación de plagio.", "Comparar textos", "LT")}
      </div></section>`,
    reports: () => `
      <section class="view"><div class="view-intro"><div><h2>Reportes de seguimiento</h2><p>Los indicadores describen el proceso; no atribuyen por sí solos una mejora a Escholarium.</p></div><button class="button button--primary" type="button" data-action="export-report">Generar reporte</button></div>
      <div class="cards-grid">
        <article class="card card--span-4 report-card"><div class="card__header"><div><h3>Calidad de las preguntas</h3><p>Distribución demostrativa por nivel</p></div></div><div class="metric"><strong>16</strong><span>de 24 en logrado o avanzado</span></div><div class="level-bar" aria-label="4 inicial, 4 en proceso, 10 logrado y 6 avanzado"><span class="level-bar__initial" style="width:17%"></span><span class="level-bar__process" style="width:16%"></span><span class="level-bar__achieved" style="width:42%"></span><span class="level-bar__advanced" style="width:25%"></span></div><div class="chart-legend"><span><i class="legend-initial"></i>Inicial 4</span><span><i class="legend-process"></i>Proceso 4</span><span><i class="legend-achieved"></i>Logrado 10</span><span><i class="legend-advanced"></i>Avanzado 6</span></div></article>
        <article class="card card--span-4 report-card"><div class="card__header"><div><h3>Fuentes evaluadas</h3><p>Criterios completos</p></div><span class="tag tag--gold">69 %</span></div><div class="donut-stat" style="--value:69"><span><strong>42</strong><small>de 61</small></span></div><p class="report-note">Autoría, actualidad, procedencia, respaldo y pertinencia registrados.</p></article>
        <article class="card card--span-4 report-card"><div class="card__header"><div><h3>Actividad en bitácora</h3><p>Entradas registradas por día</p></div><span class="tag tag--success">21 activos</span></div><div class="weekly-bars" aria-label="Actividad semanal demostrativa"><div><span style="height:38%"></span><small>L</small></div><div><span style="height:56%"></span><small>M</small></div><div><span style="height:92%"></span><small>X</small></div><div><span style="height:67%"></span><small>J</small></div><div><span style="height:48%"></span><small>V</small></div></div><p class="report-note">Mayor actividad registrada el miércoles.</p></article>
        <article class="card card--span-12"><div class="empty-state"><span class="card__icon">${icon("icon-chart")}</span><h3>Comparación pretest-postest programada</h3><p>Se mostrará solo después de aplicar tareas equivalentes sin asistencia de Eli y contar con autorización para registrar los resultados del piloto.</p><span class="tag">Aún sin evidencia del piloto</span></div></article>
      </div></section>`
  },

  admin: {
    home: () => `
      <section class="view"><div class="view-intro"><div><h2>Gestión del entorno institucional</h2><p>Configura usuarios y permisos sin intervenir en la autoría ni en las decisiones académicas.</p></div><span class="tag tag--success">Entorno de prueba aislado</span></div>
      <div class="cards-grid">
        <article class="card card--span-3"><div class="card__header"><div><h3>Usuarios activos</h3><p>Santa María de Jesús</p></div><span class="card__icon">${icon("icon-users")}</span></div><div class="metric"><strong>58</strong><span>cuentas demostrativas</span></div></article>
        <article class="card card--span-3"><div class="card__header"><div><h3>Secciones</h3><p>Periodo 2026</p></div><span class="card__icon">${icon("icon-book")}</span></div><div class="metric"><strong>3</strong><span>configuradas</span></div></article>
        <article class="card card--span-3"><div class="card__header"><div><h3>Roles</h3><p>Permisos diferenciados</p></div><span class="card__icon">${icon("icon-lock")}</span></div><div class="metric"><strong>4</strong><span>perfiles del sistema</span></div></article>
        <article class="card card--span-3"><div class="card__header"><div><h3>Incidencias</h3><p>Últimos 7 días</p></div><span class="card__icon">${icon("icon-alert")}</span></div><div class="metric"><strong>0</strong><span>accesos cruzados</span></div></article>
        <article class="card card--span-8"><div class="card__header"><div><h3>Configuración prioritaria</h3><p>Acciones requeridas antes de un piloto con datos reales</p></div></div><div class="list"><div class="list-item"><div><strong>Designar responsable institucional</strong><span>Autorización y tratamiento de información</span></div><span class="tag tag--warning">Por confirmar</span></div><div class="list-item"><div><strong>Confirmar sección participante</strong><span>Docente, curso y estudiantes</span></div><span class="tag tag--gold">Programada</span></div><div class="list-item"><div><strong>Revisar matriz de permisos</strong><span>Acceso mínimo por perfil</span></div><span class="tag tag--success">Revisada</span></div></div></article>
        <article class="card card--span-4"><div class="card__header"><div><h3>Límite administrativo</h3><p>Separación de responsabilidades</p></div></div><div class="admin-boundary">${icon("icon-lock")}<p>El administrador gestiona accesos. No cambia trabajos ni resuelve alertas pedagógicas.</p></div></article>
      </div></section>`,
    users: () => `
      <section class="view"><div class="view-intro"><div><h2>Usuarios y roles</h2><p>Cuentas demostrativas organizadas por perfil, sección e institución.</p></div><button class="button button--primary" type="button" data-action="new-user">Nuevo usuario</button></div>
      <div class="toolbar"><label class="search-control">${icon("icon-search")}<input type="search" placeholder="Buscar por nombre o correo" aria-label="Buscar usuarios"></label><span class="tag">58 usuarios</span></div>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>Usuario</th><th>Perfil</th><th>Sección</th><th>Estado</th><th>Acción</th></tr></thead><tbody><tr><td><strong>María González</strong><br><small>estudiante@demo.edu.pe</small></td><td>Estudiante</td><td>5.º A</td><td><span class="tag tag--success">Activo</span></td><td><button class="button button--small button--secondary" type="button" data-action="edit-user">Editar permisos</button></td></tr><tr><td><strong>Carlos Mendoza</strong><br><small>docente@demo.edu.pe</small></td><td>Docente / tutor</td><td>5.º A</td><td><span class="tag tag--success">Activo</span></td><td><button class="button button--small button--secondary" type="button" data-action="edit-user">Editar permisos</button></td></tr><tr><td><strong>Familia González</strong><br><small>familia@demo.edu.pe</small></td><td>Familia autorizada</td><td>5.º A</td><td><span class="tag tag--gold">Limitado</span></td><td><button class="button button--small button--secondary" type="button" data-action="edit-user">Ver autorización</button></td></tr></tbody></table></div></section>`,
    sections: () => `
      <section class="view"><div class="view-intro"><div><h2>Secciones y asignaciones</h2><p>Relaciona estudiantes, docentes y proyectos dentro de la institución seleccionada.</p></div><button class="button button--primary" type="button" data-action="new-section">Crear sección</button></div><div class="cards-grid"><article class="card card--span-6 section-card"><span class="tag tag--success">Piloto propuesto</span><h3>5.º A de secundaria</h3><p>24 estudiantes · 1 docente responsable · Comunicación</p><div class="progress"><span style="width:76%"></span></div><div class="progress-meta"><span>Configuración del entorno</span><strong>76 %</strong></div><button class="button button--small button--secondary" type="button" data-action="configure-section">Configurar</button></article><article class="card card--span-6 section-card"><span class="tag">Demostrativa</span><h3>5.º B de secundaria</h3><p>Sin participantes reales · Entorno para pruebas de permisos</p><div class="progress"><span style="width:35%"></span></div><div class="progress-meta"><span>Configuración del entorno</span><strong>35 %</strong></div><button class="button button--small button--secondary" type="button" data-action="configure-section">Configurar</button></article></div></section>`,
    institutions: () => `
      <section class="view"><div class="view-intro"><div><h2>Mi institución</h2><p>Datos y configuración de tu colegio. Tu alcance termina en tu institución: la gestión de otras instituciones corresponde a la administración de la plataforma.</p></div><span class="tag tag--success">Entorno aislado</span></div>
      <div class="cards-grid">
        <article class="card card--span-8"><div class="card__header"><div><h3>Colegio Santa María de Jesús</h3><p>Institución educativa privada</p></div><span class="tag tag--gold">Piloto propuesto</span></div>
          <dl class="info-list">
            <div><dt>Ubicación</dt><dd>Santa Anita, Lima, Perú</dd></div>
            <div><dt>Nivel</dt><dd>Educación secundaria</dd></div>
            <div><dt>Periodo académico</dt><dd>2026-II · del 3 de agosto al 18 de diciembre</dd></div>
            <div><dt>Sección del piloto</dt><dd>5.º A · Comunicación · 8 semanas</dd></div>
            <div><dt>Responsable institucional</dt><dd>Por designar</dd></div>
            <div><dt>Estado del piloto</dt><dd>Sujeto a autorización institucional</dd></div>
          </dl></article>
        <aside class="card card--span-4"><div class="card__header"><div><h3>Comunidad</h3><p>Cuentas demostrativas</p></div></div>
          <div class="list">
            <div class="list-item"><div><strong>24 estudiantes</strong><span>5.º A</span></div></div>
            <div class="list-item"><div><strong>3 docentes o tutores</strong><span>Asignados por sección</span></div></div>
            <div class="list-item"><div><strong>30 familias autorizadas</strong><span>Vinculadas a un estudiante</span></div></div>
            <div class="list-item"><div><strong>1 administrador</strong><span>Andrea Salazar</span></div></div>
          </div></aside>
        <article class="card card--span-6"><div class="card__header"><div><h3>Configuración académica</h3><p>Se aplica a todos los proyectos</p></div></div>
          <ul class="perm-list">
            <li class="is-ok">${icon("icon-check")}<span>Proyecto en 8 etapas con revisión docente</span></li>
            <li class="is-ok">${icon("icon-check")}<span>Evaluación de fuentes con 7 criterios</span></li>
            <li class="is-ok">${icon("icon-check")}<span>Referencias en formato APA 7</span></li>
            <li class="is-ok">${icon("icon-check")}<span>Eli en modo guiado: orienta sin redactar trabajos</span></li>
            <li class="is-ok">${icon("icon-check")}<span>Familias: solo resúmenes que publica el docente</span></li>
          </ul></article>
        <article class="card card--span-6"><div class="card__header"><div><h3>Protección de datos</h3><p>Cómo se resguarda la información</p></div></div>
          <div class="admin-boundary">${icon("icon-lock")}<p>Los datos de este colegio están separados de cualquier otra institución: un usuario externo no puede verlos, modificarlos ni listarlos. Se tratan conforme a la Ley N.° 29733 y solo se recopila la información necesaria.</p></div></article>
      </div></section>`,
    audit: () => `
      <section class="view"><div class="view-intro"><div><h2>Auditoría de accesos</h2><p>Registro demostrativo de acciones administrativas y eventos de seguridad.</p></div><button class="button button--secondary" type="button" data-action="export-audit">Exportar registro</button></div><div class="cards-grid"><article class="card card--span-8"><div class="timeline"><div class="timeline-item"><time>Hoy · 17:42</time><h3>Permisos de familia revisados</h3><p>Se confirmó acceso únicamente a resúmenes autorizados del estudiante vinculado.</p></div><div class="timeline-item"><time>Hoy · 15:10</time><h3>Prueba de aislamiento completada</h3><p>La cuenta SMJ-01 no pudo consultar recursos pertenecientes a LAB-02.</p></div><div class="timeline-item"><time>Ayer · 12:05</time><h3>Sección 5.º A actualizada</h3><p>Se asignó al docente responsable del entorno demostrativo.</p></div></div></article><aside class="card card--span-4"><div class="card__header"><div><h3>Estado del entorno</h3><p>Última comprobación</p></div></div><div class="audit-score"><strong>100 %</strong><span>casos críticos sin acceso cruzado</span></div></aside></div></section>`
  },

  family: {
    home: () => `
      <section class="view family-view"><div class="view-intro"><div><h2>Acompañamiento familiar</h2><p>Vista móvil simulada con información breve y previamente autorizada.</p></div><span class="tag tag--gold">Datos demostrativos</span></div><div class="family-layout"><div class="family-phone"><div class="family-phone__bar"><span>9:41</span><span>Escholarium</span><span>●●●</span></div><div class="family-phone__content"><div class="family-greeting"><div><small>Buenas tardes</small><h3>Familia González</h3></div><span>FG</span></div><article class="family-project-card"><span class="tag tag--success">Avance autorizado</span><h3>Uso responsable de la inteligencia artificial</h3><p>María se encuentra evaluando sus fuentes y ajustando su pregunta de investigación.</p><div class="progress"><span style="width:62%"></span></div><div class="progress-meta"><span>Fase 3 de 5</span><strong>62 %</strong></div></article><div class="family-quick-grid"><button type="button" data-view="project">${icon("icon-book")}<span>Proyecto</span></button><button type="button" data-view="reports">${icon("icon-chart")}<span>Reporte</span></button><button type="button" data-view="school">${icon("icon-building")}<span>Colegio</span></button><button type="button" data-view="notifications">${icon("icon-bell")}<span>Avisos</span></button></div><div class="family-message"><span>${icon("icon-users")}</span><div><strong>Mensaje del docente</strong><p>Esta semana se revisará la calidad de las fuentes registradas.</p></div></div></div></div><aside class="family-explainer"><span class="eyebrow">Alcance de este perfil</span><h3>Informar sin intervenir en la autoría.</h3><p>La familia puede comprender el avance y consultar información de contexto. No puede editar el proyecto, conversar en nombre del estudiante ni resolver alertas.</p><div class="permission-list"><span>${icon("icon-check")} Resúmenes autorizados</span><span>${icon("icon-check")} Lenguaje claro</span><span>${icon("icon-lock")} Sin acceso al trabajo completo</span></div></aside></div></section>`,
    project: () => `
      <section class="view"><div class="view-intro"><div><h2>Proyecto de investigación</h2><p>Resumen autorizado del proceso; no muestra conversaciones privadas ni borradores completos.</p></div><span class="tag tag--success">Actualizado hoy</span></div><div class="cards-grid"><article class="card card--span-8 project-card"><span class="tag tag--gold">En investigación</span><h3 class="project-title">Uso responsable de la inteligencia artificial en estudiantes de secundaria</h3><p style="color:var(--ink-600)">La pregunta fue delimitada y actualmente se están contrastando tres fuentes.</p><div class="progress"><span style="width:62%"></span></div><div class="progress-meta"><span>Fase 3 de 5 · Fuentes</span><strong>62 %</strong></div></article><aside class="card card--span-4"><div class="card__header"><div><h3>Próximo hito</h3><p>Información autorizada</p></div></div><div class="metric"><strong style="font-size:1.8rem">30 set</strong><span>Revisión de fuentes</span></div></aside><article class="card card--span-12"><div class="family-stage-track"><div class="is-done"><span>1</span><strong>Tema</strong></div><i></i><div class="is-done"><span>2</span><strong>Pregunta</strong></div><i></i><div class="is-current"><span>3</span><strong>Fuentes</strong></div><i></i><div><span>4</span><strong>Síntesis</strong></div><i></i><div><span>5</span><strong>Cierre</strong></div></div></article></div></section>`,
    reports: () => `
      <section class="view"><div class="view-intro"><div><h2>Reportes autorizados</h2><p>Comunicaciones revisadas por el docente antes de compartirse con la familia.</p></div><span class="tag">1 reporte disponible</span></div><div class="cards-grid"><article class="card card--span-8"><div class="card__header"><div><h3>Reporte de avance · Semana 3</h3><p>Autorizado por el docente responsable</p></div><span class="tag tag--success">Revisado</span></div><div class="report-summary"><p><strong>Fortaleza:</strong> la pregunta presenta población, contexto y periodo.</p><p><strong>Por mejorar:</strong> justificar por qué cada fuente resulta pertinente.</p><p><strong>Siguiente paso:</strong> comparar los argumentos de dos publicaciones.</p></div></article><aside class="card card--span-4"><div class="card__header"><div><h3>Privacidad</h3><p>Información limitada</p></div></div><div class="admin-boundary">${icon("icon-lock")}<p>La bitácora completa y las conversaciones con Eli no se comparten en esta vista.</p></div></aside></div></section>`,
    school: () => `
      <section class="view"><div class="view-intro"><div><h2>Información escolar</h2><p>Datos ficticios incluidos únicamente para validar la comprensión de las consultas.</p></div><span class="tag tag--warning">Sin conexión al colegio</span></div><div class="cards-grid"><article class="card card--span-4 school-context-card"><span>${icon("icon-chart")}</span><h3>Notas</h3><strong>16.8</strong><p>Promedio demostrativo del periodo.</p><button class="button button--small button--secondary" type="button" data-action="view-school-detail" data-detail="grades">Ver detalle</button></article><article class="card card--span-4 school-context-card"><span>${icon("icon-users")}</span><h3>Asistencia</h3><strong>94 %</strong><p>Registro ficticio de asistencia.</p><button class="button button--small button--secondary" type="button" data-action="view-school-detail" data-detail="attendance">Ver detalle</button></article><article class="card card--span-4 school-context-card"><span>${icon("icon-building")}</span><h3>Estado de pagos</h3><strong>Al día</strong><p>Consulta demostrativa; no permite transacciones.</p><button class="button button--small button--secondary" type="button" data-action="view-school-detail" data-detail="payments">Ver detalle</button></article></div></section>`,
    notifications: () => `
      <section class="view"><div class="view-intro"><div><h2>Notificaciones</h2><p>Avisos institucionales y académicos autorizados.</p></div><button class="button button--secondary" type="button" data-action="notification-settings">Preferencias</button></div><div class="alert-list"><article class="alert-card"><span class="alert-card__icon">${icon("icon-book")}</span><div><h3>Nuevo reporte de avance</h3><p>El docente autorizó el reporte correspondiente a la semana 3.</p><small>Hoy · 16:20</small></div></article><article class="alert-card"><span class="alert-card__icon">${icon("icon-bell")}</span><div><h3>Próxima revisión</h3><p>La revisión de fuentes está programada para el 30 de septiembre.</p><small>Ayer · 10:05</small></div></article></div></section>`
  }
};

function renderStages() {
  return `<div class="stage-list"><div class="stage stage--done"><span>${icon("icon-check")}</span><div><strong>Tema y delimitación</strong><small>Completado</small></div><span class="tag tag--success">Listo</span></div><div class="stage stage--done"><span>${icon("icon-check")}</span><div><strong>Problema y pregunta</strong><small>Pregunta delimitada</small></div><span class="tag tag--success">Listo</span></div><div class="stage stage--done"><span>${icon("icon-check")}</span><div><strong>Búsqueda y registro de fuentes</strong><small>3 fuentes registradas</small></div><span class="tag tag--success">Listo</span></div><div class="stage stage--current"><span>4</span><div><strong>Evaluación de fuentes</strong><small>2 evaluadas · 1 por revisar</small></div><span class="tag tag--gold">Actual</span></div><div class="stage"><span>5</span><div><strong>Notas y evidencias</strong><small>Siguiente etapa</small></div><span class="tag">Después</span></div><div class="stage"><span>6</span><div><strong>Síntesis</strong><small>Después</small></div><span class="tag">Después</span></div><div class="stage"><span>7</span><div><strong>Citación y referencias</strong><small>Después</small></div><span class="tag">Después</span></div><div class="stage"><span>8</span><div><strong>Revisión y entrega</strong><small>Etapa final</small></div><span class="tag">Después</span></div></div>`;
}

function renderChat() {
  const messages = state.chat.map((message, index) => `
    <div class="message message--${message.from === "user" ? "user" : "eli"}">
      <span class="message__avatar">${message.from === "eli" ? '<span class="eli-badge" aria-hidden="true">Eli</span>' : roles.student.initials}</span>
      <div><div class="message__bubble">${escapeHTML(message.text)}</div>${message.from === "eli" && index === state.chat.length - 1 && !state.chatBusy ? renderChatPrompts() : ""}</div>
    </div>`).join("");
  const typing = state.chatBusy ? `
    <div class="message message--eli message--typing" role="status" aria-label="Eli está escribiendo">
      <span class="message__avatar"><span class="eli-badge" aria-hidden="true">Eli</span></span>
      <div class="message__bubble"><span></span><span></span><span></span></div>
    </div>` : "";
  return messages + typing;
}

function renderChatPrompts() {
  const promptsByStage = {
    start: ["Ayúdame a comenzar mi investigación", "Quiero evaluar una fuente", "Necesito revisar una cita APA"],
    defineAspect: ["Quiero evaluar cómo revisan la confiabilidad de las fuentes", "Quiero estudiar cómo formulan sus preguntas"],
    definePopulation: ["Trabajaré con estudiantes de quinto de secundaria"],
    defineConditions: ["Utilizarán una IA orientadora durante ocho semanas"],
    reviewQuestion: ["Sí, representa lo que quiero investigar", "Quiero ajustar la pregunta"],
    chooseNext: ["Encontré una fuente, pero no sé si es confiable", "Quiero registrar el avance en mi bitácora"],
    sourceAuthor: ["La fuente pertenece a una universidad, pero no indica un autor personal"],
    sourceEvidence: ["Es de 2024, está en el dominio oficial y presenta referencias"],
    sourceCompare: ["La compararé con otra publicación académica"],
    apaMetadata: ["Tengo autor, año, título y enlace"],
    adjustQuestion: ["Quiero precisar mejor el resultado que voy a evaluar"]
  };
  const prompts = promptsByStage[state.chatFlow.stage] || ["¿Cuál debería ser mi siguiente paso?"];
  return `<div class="quick-prompts">${prompts.map(prompt => `<button class="prompt-chip" type="button" data-prompt="${escapeHTML(prompt)}">${escapeHTML(prompt)}</button>`).join("")}</div>`;
}

function renderSources(sources) {
  if (!sources.length) return `<div class="empty-state" style="grid-column:1/-1"><span class="card__icon">${icon("icon-search")}</span><h3>No se encontraron fuentes</h3><p>Prueba con otro término o registra una nueva evidencia.</p></div>`;
  return sources.map(source => `
    <article class="card source-card" data-source-text="${escapeHTML(`${source.title} ${source.author}`.toLowerCase())}">
      <div class="source-card__top"><div><h3>${escapeHTML(source.title)}</h3><div class="source-author">${escapeHTML(source.author)}</div></div><span class="tag ${source.status === "Evaluada" ? "tag--success" : "tag--warning"}">${escapeHTML(source.status)}</span></div>
      <p>${escapeHTML(source.reason)}</p>
      <div class="criteria"><span class="criterion"><strong>✓</strong>Autoría</span><span class="criterion"><strong>✓</strong>Actualidad</span><span class="criterion"><strong>✓</strong>Procedencia</span><span class="criterion"><strong>✓</strong>Evidencia</span><span class="criterion"><strong>✓</strong>Propósito</span><span class="criterion"><strong>✓</strong>Pertinencia</span><span class="criterion"><strong>–</strong>Contraste</span></div>
      <a class="button button--small button--secondary" href="${escapeHTML(safeExternalURL(source.url))}" target="_blank" rel="noopener noreferrer">Abrir referencia ${icon("icon-arrow")}</a>
    </article>`).join("");
}

function renderTeacherProjectList() {
  const attention = [
    ["MG", "Fuente 3 sin autor identificable", "Prioridad", "tag--danger"],
    ["DR", "Pregunta todavía sin periodo", "Orientar", "tag--warning"],
    ["LT", "Paráfrasis que requiere contexto", "Analizar", "tag--gold"]
  ];
  return `<div class="list">${attention.map(([code, detail, label, tagClass]) => {
    const student = studentCases[code];
    return `<div class="list-item"><div class="student-cell"><span>${code}</span><div><strong>${escapeHTML(student.name)}</strong><small>${escapeHTML(detail)}</small></div></div><div class="list-item__action"><span class="tag ${tagClass}">${label}</span><button class="button button--small button--secondary" type="button" data-action="open-student" data-student="${code}">Abrir</button></div></div>`;
  }).join("")}</div>`;
}

function teacherRows(compact = false) {
  return Object.entries(studentCases).map(([code, student]) => compact
    ? `<tr><td><div class="student-cell"><span>${code}</span><div><strong>${escapeHTML(student.name)}</strong><small>5.º A</small></div></div></td><td class="question-cell">${escapeHTML(student.question)}</td><td>${student.sources}</td><td>${student.journal}</td><td><button class="tag ${student.statusClass} tag--button" type="button" data-action="open-student" data-student="${code}">${escapeHTML(student.status)}</button></td></tr>`
    : `<tr><td><div class="student-cell"><span>${code}</span><div><strong>${escapeHTML(student.name)}</strong><small>5.º A</small></div></div></td><td>${escapeHTML(student.project)}</td><td>${escapeHTML(student.stage)}</td><td>${student.progress} %</td><td>${escapeHTML(student.lastActivity)}</td><td><button class="button button--small button--secondary" type="button" data-action="open-student" data-student="${code}">Abrir</button></td></tr>`
  ).join("");
}

function alertCard(id, title, text, action, studentCode) {
  return `<article class="alert-card" data-alert-id="${escapeHTML(id)}" data-student="${escapeHTML(studentCode)}"><span class="alert-card__icon">${icon("icon-alert")}</span><div><h3>${escapeHTML(title)}</h3><p>${escapeHTML(text)}</p></div><div class="alert-card__actions"><button class="button button--small button--secondary" type="button" data-action="review-alert" data-student="${escapeHTML(studentCode)}">${escapeHTML(action)}</button><button class="button button--small button--ghost" type="button" data-action="resolve-alert">Resolver</button></div></article>`;
}

function openStudentDialog(code = "MG") {
  const student = studentCases[code] || studentCases.MG;
  const initials = Object.entries(studentCases).find(([, value]) => value === student)?.[0] || "MG";
  studentDialogContent.innerHTML = `
    <div class="case-header">
      <div class="student-cell student-cell--large"><span>${escapeHTML(initials)}</span><div><small>Expediente demostrativo · 5.º A</small><h2>${escapeHTML(student.name)}</h2></div></div>
      <button class="icon-button" type="button" data-action="close-student-dialog" aria-label="Cerrar expediente">${icon("icon-close")}</button>
    </div>
    <div class="case-tags"><span class="tag tag--gold">${escapeHTML(student.stage)}</span><span class="tag ${student.statusClass}">${escapeHTML(student.status)}</span></div>
    <section class="case-question"><span>Proyecto</span><h3>${escapeHTML(student.project)}</h3><p><strong>Pregunta:</strong> ${escapeHTML(student.question)}</p></section>
    <div class="case-stat-grid">
      <div class="case-stat"><span>Avance</span><strong>${student.progress} %</strong></div>
      <div class="case-stat"><span>Fuentes</span><strong>${student.sources}</strong></div>
      <div class="case-stat"><span>Bitácora</span><strong>${student.journal}</strong></div>
      <div class="case-stat"><span>Actividad</span><strong>${escapeHTML(student.lastActivity)}</strong></div>
    </div>
    <div class="progress" aria-label="${student.progress} por ciento completado"><span style="width:${student.progress}%"></span></div>
    <div class="case-finding">${icon("icon-alert")}<div><strong>Indicio para revisión humana</strong><p>${escapeHTML(student.finding)}</p></div></div>
    <div class="case-flow" aria-label="Conexión del caso entre los perfiles">
      <div class="case-flow__step is-done"><span>${icon("icon-book")}</span><strong>Estudiante</strong><small>Registra evidencia</small></div>
      <i>${icon("icon-arrow")}</i>
      <div class="case-flow__step is-done"><span>${icon("icon-ai")}</span><strong>Eli</strong><small>Genera orientación</small></div>
      <i>${icon("icon-arrow")}</i>
      <div class="case-flow__step is-current"><span>${icon("icon-users")}</span><strong>Docente</strong><small>Revisa y decide</small></div>
      <i>${icon("icon-arrow")}</i>
      <div class="case-flow__step"><span>${icon("icon-timeline")}</span><strong>Bitácora</strong><small>Registra la decisión</small></div>
    </div>
    <div class="modal__actions"><button class="button button--ghost" type="button" data-action="close-student-dialog">Cerrar</button><button class="button button--primary" type="button" data-action="go-student-alert">Ver alertas relacionadas</button></div>`;
  if (!studentDialog.open) studentDialog.showModal();
}

function closeStudentDialog() {
  if (studentDialog?.open) studentDialog.close();
}

function includesAny(text, terms) {
  return terms.some(term => text.includes(term));
}

function resetChatFlow() {
  state.chatFlow = { stage: "start", focus: "", population: "", conditions: "", proposedQuestion: "" };
}

function buildEliResponse(message) {
  const lower = message.toLowerCase();
  const flow = state.chatFlow;

  if (includesAny(lower, ["hazme el trabajo", "haz el trabajo", "escribe todo", "trabajo completo", "redáctalo completo", "redactalo completo"])) {
    return "No puedo elaborar el trabajo completo para que lo presentes como propio. Sí puedo acompañarte por etapas: planteamos la pregunta, revisamos tus fuentes y luego analizamos tu borrador. ¿En cuál de esas partes necesitas avanzar?";
  }

  if (includesAny(lower, ["reiniciar", "empezar de nuevo", "otra investigación"])) {
    resetChatFlow();
    state.chatFlow.stage = "defineAspect";
    return "De acuerdo, comencemos de nuevo. Cuéntame cuál es el tema y qué aspecto específico deseas investigar.";
  }

  if (flow.stage === "defineAspect") {
    flow.focus = message;
    flow.stage = "definePopulation";
    return "Entiendo la idea. Ahora necesitamos precisar a quiénes estudiarás y qué capacidad observarás. ¿Con qué grado trabajarás y qué quieres evaluar exactamente en esos estudiantes?";
  }

  if (flow.stage === "definePopulation") {
    flow.population = message;
    flow.stage = "defineConditions";
    return "Bien, ya definiste la población y el aspecto que observarás. Falta precisar las condiciones: ¿los estudiantes usarán la inteligencia artificial libremente o con orientación, y durante cuánto tiempo se realizará la actividad?";
  }

  if (flow.stage === "defineConditions") {
    flow.conditions = message;
    flow.proposedQuestion = "¿Cómo influye el uso guiado de inteligencia artificial en la evaluación de fuentes de los estudiantes de quinto de secundaria durante ocho semanas?";
    flow.stage = "reviewQuestion";
    return `Perfecto. Ya tenemos el enfoque, la población, el tipo de acompañamiento y el periodo. Con esos elementos, una versión provisional sería:\n\n“${flow.proposedQuestion}”\n\n¿Esta pregunta representa lo que deseas investigar o quieres ajustar alguna parte?`;
  }

  if (flow.stage === "reviewQuestion") {
    if (includesAny(lower, ["ajust", "cambiar", "modificar", "no representa", "no está", "no esta"])) {
      flow.stage = "adjustQuestion";
      return "Claro. Indícame qué deseas modificar: la población, el resultado que evaluarás, el tipo de uso de IA o el periodo. Primero cambiaremos solo un elemento para mantener la pregunta clara.";
    }
    flow.stage = "chooseNext";
    return "Muy bien. La pregunta queda como versión de trabajo, pero debe ser validada por tu docente. El siguiente paso es revisar las fuentes que utilizarás. ¿Ya encontraste alguna o deseas que repasemos los criterios para evaluarla?";
  }

  if (flow.stage === "adjustQuestion") {
    flow.stage = "reviewQuestion";
    return "Ese cambio puede incorporarse. Redacta nuevamente la pregunta incluyendo ese elemento y revisa si conserva población, resultado y periodo. Envíame tu nueva versión y comprobaré contigo si está delimitada.";
  }

  if (flow.stage === "sourceAuthor") {
    flow.stage = "sourceEvidence";
    if (includesAny(lower, ["universidad", "ministerio", "unesco", "institución", "institucion", "organización", "organizacion"])) {
      return "La institución puede funcionar como autor corporativo si la publicación pertenece realmente a su sitio oficial. Ahora revisa tres datos: fecha de publicación, dominio de la página y evidencias o referencias utilizadas. ¿Qué encontraste?";
    }
    if (includesAny(lower, ["no aparece", "no tiene", "sin autor", "desconozco"])) {
      return "Si no puedes identificar a una persona ni a una institución responsable, la fuente necesita una revisión especial y quizá no sea adecuada. Antes de descartarla, comprueba el dominio, la fecha y si cita evidencias verificables. ¿Qué datos aparecen?";
    }
    return "Bien, ya identificaste al responsable. Ahora verifica la fecha, el sitio donde fue publicada y las evidencias que presenta. Esos datos permiten valorar su respaldo. ¿Qué encontraste?";
  }

  if (flow.stage === "sourceEvidence") {
    flow.stage = "sourceCompare";
    return "Esos son indicios favorables, pero todavía no prueban por sí solos que la información sea correcta. Revisa si las referencias respaldan sus afirmaciones principales y compárala con otra publicación independiente. ¿Qué fuente podrías usar para contrastarla?";
  }

  if (flow.stage === "sourceCompare") {
    flow.stage = "chooseNext";
    return "Correcto. Cuando termines la comparación, registra en tu bitácora qué fuente revisaste, qué criterios aplicaste y por qué decidiste utilizarla o descartarla. Así el docente podrá revisar tu razonamiento, no solamente el resultado final.";
  }

  if (flow.stage === "apaMetadata") {
    flow.stage = "chooseNext";
    return "Perfecto. Escribe los datos exactos en este orden: autor o institución, fecha, título y enlace. No inventes información que no aparezca en la publicación. Con esos datos podremos organizar una referencia provisional en APA 7 para que después la verifique tu docente.";
  }

  if (flow.stage === "chooseNext") {
    if (includesAny(lower, ["fuente", "confiable", "publicación", "publicacion", "página", "pagina", "artículo", "articulo"])) {
      flow.stage = "sourceAuthor";
      return "Revisémosla paso a paso. Primero identifica quién asume la responsabilidad de la publicación. ¿Aparece un autor personal, una universidad, una institución u otra entidad?";
    }
    if (includesAny(lower, ["bitácora", "bitacora", "registrar", "avance"])) {
      return "Para registrar este avance, anota la fecha, la decisión tomada, la evidencia que revisaste y el motivo de tu decisión. Puedes comenzar así: “Hoy ajusté mi pregunta porque…”. Escríbelo con tus propias palabras y luego lo revisamos.";
    }
    if (includesAny(lower, ["apa", "cita", "referencia"])) {
      flow.stage = "apaMetadata";
      return "Para revisar la referencia necesito cuatro datos: autor o institución, año, título de la publicación y enlace. Dime cuáles tienes y cuáles faltan.";
    }
    return "Podemos continuar con una de estas acciones: evaluar una fuente, revisar una cita o registrar la decisión en la bitácora. ¿Cuál necesitas realizar ahora?";
  }

  if (includesAny(lower, ["fuente", "confiable", "publicación", "publicacion", "artículo", "articulo"])) {
    flow.stage = "sourceAuthor";
    return "Para evaluar la fuente revisaremos autoría, fecha, procedencia, respaldo y pertinencia. Empecemos por la autoría: ¿quién aparece como responsable de la publicación?";
  }

  if (includesAny(lower, ["apa", "cita", "referencia"])) {
    flow.stage = "apaMetadata";
    return "Para revisar la referencia necesito cuatro datos: autor o institución, año, título y enlace. Dime cuáles aparecen en la fuente y cuáles faltan.";
  }

  if (includesAny(lower, ["bitácora", "bitacora"])) {
    flow.stage = "chooseNext";
    return "La bitácora debe explicar qué decisión tomaste y por qué. Indica la fecha, el cambio realizado, la evidencia revisada y el siguiente paso. Cuéntame qué hiciste hoy y te ayudaré a organizarlo.";
  }

  if (includesAny(lower, ["investigación", "investigacion", "comenzar", "pregunta", "delimitar", "tema"])) {
    flow.stage = "defineAspect";
    return "Comencemos por convertir el tema en una pregunta investigable. ¿Qué aspecto específico deseas estudiar: aprendizaje, elaboración de tareas, formulación de preguntas, evaluación de fuentes u otro?";
  }

  return "Puedo orientarte con la pregunta de investigación, la evaluación de fuentes, las citas APA o la bitácora. Dime en qué parte estás trabajando para continuar desde allí.";
}

function refreshChat() {
  const messages = document.getElementById("chat-messages");
  if (messages) {
    messages.innerHTML = renderChat();
    messages.scrollTop = messages.scrollHeight;
  }
  const input = document.getElementById("chat-input");
  const submit = document.querySelector("#chat-form button[type='submit']");
  if (input) input.disabled = state.chatBusy;
  if (submit) submit.disabled = state.chatBusy;
}

async function sendChat(message) {
  const clean = message.trim();
  if (!clean || state.chatBusy) return;
  state.chat.push({ from: "user", text: clean });
  const response = buildEliResponse(clean);
  state.chatBusy = true;
  refreshChat();
  await new Promise(resolve => window.setTimeout(resolve, 650));
  state.chat.push({ from: "eli", text: response });
  state.chatBusy = false;
  refreshChat();
  document.getElementById("chat-input")?.focus({ preventScroll: true });
}

function showToast(title, message, type = "success") {
  const region = document.getElementById("toast-region");
  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `${icon(type === "error" ? "icon-alert" : "icon-check")}<div><strong>${escapeHTML(title)}</strong><span>${escapeHTML(message)}</span></div><button type="button" aria-label="Cerrar notificación">${icon("icon-close")}</button>`;
  toast.querySelector("button").addEventListener("click", () => toast.remove());
  region.appendChild(toast);
  window.setTimeout(() => toast.remove(), 4800);
}

function openMenu() {
  portalScreen.classList.add("menu-open");
  document.getElementById("menu-toggle").setAttribute("aria-expanded", "true");
}

function closeMenu() {
  portalScreen.classList.remove("menu-open");
  document.getElementById("menu-toggle").setAttribute("aria-expanded", "false");
}

function logout() {
  state.currentRole = null;
  state.currentView = null;
  closeMenu();
  showAccess();
  showToast("Sesión cerrada", "Volviste a la selección de perfiles.");
}

loginForm.addEventListener("submit", event => {
  event.preventDefault();
  const institution = document.getElementById("institution").value;
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const role = roles[state.selectedRole];
  if (institution !== "santa-maria") {
    showLoginError("Acceso no permitido. Esta institución todavía no está habilitada para el piloto.");
    return;
  }
  if (email !== role.email || password !== role.password) {
    showLoginError("Acceso denegado. El correo o la contraseña no corresponden al perfil seleccionado.");
    return;
  }
  loginError.hidden = true;
  enterPortal(state.selectedRole);
  showToast("Acceso correcto", `Ingresaste como ${role.label}.`);
});

document.getElementById("toggle-password").addEventListener("click", () => {
  const password = document.getElementById("password");
  password.type = password.type === "password" ? "text" : "password";
});

document.getElementById("menu-toggle").addEventListener("click", () => {
  portalScreen.classList.contains("menu-open") ? closeMenu() : openMenu();
});

document.addEventListener("click", event => {
  const roleButton = event.target.closest("[data-role]");
  if (roleButton) { chooseRole(roleButton.dataset.role); return; }
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) { selectView(viewButton.dataset.view); return; }
  const promptButton = event.target.closest("[data-prompt]");
  if (promptButton) { sendChat(promptButton.dataset.prompt); return; }
  const actionElement = event.target.closest("[data-action]");
  if (!actionElement) return;
  const action = actionElement.dataset.action;
  const actions = {
    "go-home": goHome,
    "show-access": showAccess,
    "open-student-demo": () => enterPortal("student"),
    "logout": logout,
    "close-menu": closeMenu,
    "open-source-dialog": () => sourceDialog.showModal(),
    "close-source-dialog": () => sourceDialog.close(),
    "new-project": newProjectDialog,
    "teacher-note": teacherNoteDialog,
    "open-student": () => openStudentDialog(actionElement.dataset.student || "MG"),
    "review-alert": () => openStudentDialog(actionElement.dataset.student || actionElement.closest(".alert-card")?.dataset.student || "MG"),
    "close-student-dialog": closeStudentDialog,
    "go-student-alert": () => { closeStudentDialog(); selectView("alerts"); },
    "export-report": exportReportDialog,
    "export-journal": exportJournalDialog,
    "new-user": newUserDialog,
    "edit-user": () => editUserDialog(actionElement),
    "new-section": newSectionDialog,
    "configure-section": () => configureSectionDialog(actionElement),
    "export-audit": exportAuditDialog,
    "view-school-detail": () => schoolDetailDialog(actionElement.dataset.detail),
    "notification-settings": notificationSettingsDialog,
    "close-info": closeInfo,
    "print-info": () => window.print()
  };
  if (action === "resolve-alert") {
    const alert = actionElement.closest(".alert-card");
    alert?.remove();
    const count = document.querySelectorAll("#alert-list .alert-card").length;
    const countTag = document.querySelector("[data-alert-count]");
    if (countTag) {
      countTag.textContent = count ? `${count} por revisar` : "Sin alertas abiertas";
      countTag.classList.toggle("tag--warning", count > 0);
      countTag.classList.toggle("tag--success", count === 0);
    }
    const list = document.getElementById("alert-list");
    if (list && count === 0) {
      list.innerHTML = `<div class="empty-state"><span class="card__icon">${icon("icon-check")}</span><h3>No quedan alertas abiertas</h3><p>Las resoluciones son visuales y se restablecen al volver a esta vista.</p></div>`;
    }
    showToast("Acción simulada", "El cambio es visual y se restablece al volver a esta vista.");
    return;
  }
  actions[action]?.();
});

document.addEventListener("submit", event => {
  if (event.target.id !== "chat-form") return;
  event.preventDefault();
  const input = document.getElementById("chat-input");
  sendChat(input.value);
  input.value = "";
  input.focus({ preventScroll: true });
});

document.addEventListener("input", event => {
  if (event.target.id !== "source-search") return;
  const query = event.target.value.trim().toLowerCase();
  const filtered = state.sources.filter(source => `${source.title} ${source.author}`.toLowerCase().includes(query));
  document.getElementById("sources-grid").innerHTML = renderSources(filtered);
});

sourceForm.addEventListener("submit", event => {
  event.preventDefault();
  sourceForm.reset();
  sourceDialog.close();
  showToast("Recorrido completado", "La acción fue simulada; no se guardó ninguna información.");
});

sourceDialog.addEventListener("click", event => {
  if (event.target === sourceDialog) sourceDialog.close();
});

studentDialog.addEventListener("click", event => {
  if (event.target === studentDialog) closeStudentDialog();
});

window.addEventListener("keydown", event => {
  if (event.key === "Escape") closeMenu();
});

/* ---------------------------------------------------------------------------
 * Ventanas del prototipo: formularios, detalles y documentos imprimibles.
 * Todo es demostrativo: los cambios se ven en pantalla pero no se guardan.
 * ------------------------------------------------------------------------- */

const infoDialog = document.getElementById("info-dialog");
const infoDialogContent = document.getElementById("info-dialog-content");
const TODAY = new Intl.DateTimeFormat("es-PE", { day: "numeric", month: "long", year: "numeric" }).format(new Date());

function openInfo({ kicker, title, body, footer }) {
  infoDialogContent.innerHTML = `
    <div class="case-header">
      <div><span class="eyebrow">${kicker}</span><h2 id="info-dialog-title" class="info-title">${title}</h2></div>
      <button class="icon-button no-print" type="button" data-action="close-info" aria-label="Cerrar">${icon("icon-close")}</button>
    </div>
    ${body}
    <div class="modal__actions no-print">${footer ?? `<button class="button button--primary" type="button" data-action="close-info">Cerrar</button>`}</div>`;
  if (!infoDialog.open) infoDialog.showModal();
  infoDialogContent.scrollTop = 0;
}

function closeInfo() {
  if (infoDialog.open) infoDialog.close();
}

const documentFooter = `<button class="button button--ghost" type="button" data-action="close-info">Cerrar</button>
  <button class="button button--primary" type="button" data-action="print-info">${icon("icon-arrow")} Imprimir o guardar como PDF</button>`;

const formFooter = label => `<button class="button button--ghost" type="button" data-action="close-info">Cancelar</button>
  <button class="button button--primary" type="submit" form="info-form">${label}</button>`;

const demoNote = text => `<p class="prototype-note">${text}</p>`;

function docHead(title, subtitle) {
  return `<div class="doc-head"><div class="doc-brand"><span class="brand__mark">${icon("icon-cap")}</span><div><strong>Escholarium</strong><small>Colegio Santa María de Jesús · Documento demostrativo</small></div></div>
    <div><h3>${title}</h3><p>${subtitle} · Generado el ${TODAY}</p></div></div>`;
}

/* ---------------------------------------------------------------- Estudiante */

function newProjectDialog() {
  openInfo({
    kicker: "Nuevo proyecto",
    title: "Inicia una investigación",
    body: `<form id="info-form" data-form="new-project" class="info-form">
      <label class="field"><span>Consigna del docente</span><select name="template" required>
        <option>Proyecto breve de investigación escolar · Comunicación 5.º A</option>
        <option>Investigación de ciencias · Ciencia y Tecnología 5.º A</option></select></label>
      <p class="info-hint">La consigna pide una pregunta investigable, al menos tres fuentes evaluadas, una síntesis propia y referencias en APA 7.</p>
      <label class="field"><span>Título provisional</span><input name="title" required maxlength="160" placeholder="Ej. Hábitos de lectura en estudiantes de secundaria"></label>
      <label class="field"><span>Tema o idea inicial (opcional)</span><textarea name="idea" rows="3" placeholder="¿Qué te gustaría investigar y por qué?"></textarea></label>
      ${demoNote("Al crear el proyecto se abre la etapa 1 (Tema y delimitación). En el prototipo, el proyecto aparece en la lista pero no se guarda.")}
    </form>`,
    footer: formFooter("Crear proyecto")
  });
}

function exportJournalDialog() {
  const entries = state.journal.map(item => `<div class="timeline-item"><time>${escapeHTML(item.date)}</time><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.text)}</p></div>`).join("");
  openInfo({
    kicker: "Exportar resumen",
    title: "Resumen de la bitácora",
    body: `<article class="doc-sheet">
      ${docHead("Resumen de la bitácora del proyecto", "María González · 5.º A · Comunicación")}
      <div class="doc-section"><span>Proyecto</span><strong>Uso responsable de la inteligencia artificial en estudiantes de secundaria</strong>
        <p><b>Pregunta actual:</b> ¿Cómo influye el uso guiado de IA en la evaluación de fuentes de estudiantes de 5.º de secundaria durante ocho semanas?</p></div>
      <div class="case-stat-grid">
        <div class="case-stat"><span>Etapa actual</span><strong>4 de 8</strong></div>
        <div class="case-stat"><span>Fuentes</span><strong>${state.sources.length}</strong></div>
        <div class="case-stat"><span>Decisiones</span><strong>${state.journal.length}</strong></div>
        <div class="case-stat"><span>Docente</span><strong>C. Mendoza</strong></div>
      </div>
      <div class="doc-section"><span>Decisiones registradas</span><div class="timeline">${entries}</div></div>
      <div class="doc-section"><span>Siguiente paso</span><p>Contrastar la fuente 3 con otra publicación independiente y registrar la decisión antes de enviar la etapa a revisión.</p></div>
    </article>
    ${demoNote("Documento demostrativo generado a partir de la bitácora del prototipo.")}`,
    footer: documentFooter
  });
}

/* ---------------------------------------------------------------- Docente */

function teacherNoteDialog() {
  const options = Object.entries(studentCases).map(([code, s]) => `<option value="${code}">${escapeHTML(s.name)} · ${escapeHTML(s.stage)}</option>`).join("");
  openInfo({
    kicker: "Orientación docente",
    title: "Registrar orientación",
    body: `<form id="info-form" data-form="teacher-note" class="info-form">
      <label class="field"><span>Estudiante</span><select name="student" required>${options}</select></label>
      <label class="field"><span>Tipo de orientación</span><select name="kind">
        <option>Sugerencia de mejora</option><option>Reconocimiento de avance</option><option>Recordatorio de entrega</option></select></label>
      <label class="field"><span>Mensaje para el estudiante</span><textarea name="message" rows="4" required placeholder="Sé concreto: qué está bien, qué falta y cuál es el siguiente paso."></textarea></label>
      <label class="check-inline"><input type="checkbox" name="family"> Compartir esta orientación con la familia</label>
      ${demoNote("La orientación quedaría registrada en la bitácora del estudiante con tu nombre y la fecha.")}
    </form>`,
    footer: formFooter("Registrar orientación")
  });
}

function exportReportDialog() {
  const rows = Object.entries(studentCases).map(([code, s]) => `<tr><td><div class="student-cell"><span>${code}</span><div><strong>${escapeHTML(s.name)}</strong></div></div></td>
    <td>${escapeHTML(s.stage)}</td><td>${s.progress} %</td><td>${s.sources}</td><td>${s.journal}</td><td><span class="tag ${s.statusClass}">${escapeHTML(s.status)}</span></td></tr>`).join("");
  openInfo({
    kicker: "Reporte de seguimiento",
    title: "Reporte de la sección 5.º A",
    body: `<article class="doc-sheet">
      ${docHead("Reporte de seguimiento de proyectos", "Sección 5.º A · Comunicación · Prof. Carlos Mendoza")}
      <div class="case-stat-grid">
        <div class="case-stat"><span>Proyectos activos</span><strong>24</strong></div>
        <div class="case-stat"><span>Avance medio</span><strong>58 %</strong></div>
        <div class="case-stat"><span>Fuentes evaluadas</span><strong>42 de 61</strong></div>
        <div class="case-stat"><span>Alertas abiertas</span><strong>3</strong></div>
      </div>
      <div class="doc-section"><span>Detalle por estudiante (muestra)</span>
        <div class="table-wrap"><table class="data-table"><thead><tr><th>Estudiante</th><th>Etapa</th><th>Avance</th><th>Fuentes</th><th>Bitácora</th><th>Estado</th></tr></thead><tbody>${rows}</tbody></table></div></div>
      <div class="doc-section"><span>Observaciones</span><p>La mayoría de proyectos se encuentra en la evaluación de fuentes. Se recomienda reforzar el contraste entre publicaciones y la identificación de autoría.</p></div>
      <p class="doc-footnote">Los indicadores describen el proceso de la sección. No atribuyen por sí solos una mejora del aprendizaje a Escholarium.</p>
    </article>`,
    footer: documentFooter
  });
}

/* ---------------------------------------------------------------- Administrador */

const PERMISSIONS = {
  "Estudiante": [["Crear y editar sus propios proyectos", true], ["Registrar y evaluar fuentes", true], ["Conversar con Eli", true], ["Ver proyectos de otros estudiantes", false], ["Aprobar etapas", false]],
  "Docente / tutor": [["Ver proyectos de sus secciones", true], ["Revisar etapas y dar retroalimentación", true], ["Resolver alertas", true], ["Editar el trabajo del estudiante", false], ["Ver otras instituciones", false]],
  "Familia autorizada": [["Ver el resumen autorizado de su hijo(a)", true], ["Ver reportes que comparta el docente", true], ["Ver la conversación con Eli", false], ["Editar el proyecto", false]],
  "Administrador institucional": [["Gestionar usuarios y roles", true], ["Configurar secciones", true], ["Ver auditoría", true], ["Leer el contenido de los proyectos", false]]
};

function newUserDialog() {
  openInfo({
    kicker: "Usuarios y roles",
    title: "Nuevo usuario",
    body: `<form id="info-form" data-form="new-user" class="info-form form-grid">
      <label class="field"><span>Nombres y apellidos</span><input name="name" required maxlength="80" placeholder="Ej. Lucía Torres Ramos"></label>
      <label class="field"><span>Correo institucional</span><input name="email" type="email" required placeholder="nombre@demo.edu.pe"></label>
      <label class="field"><span>Perfil</span><select name="role">${Object.keys(PERMISSIONS).map(r => `<option>${r}</option>`).join("")}</select></label>
      <label class="field"><span>Sección</span><select name="section"><option>5.º A</option><option>5.º B</option><option>No aplica</option></select></label>
      <label class="field field--full"><span>Estudiante vinculado (solo para familias)</span><select name="linked"><option>No aplica</option>${Object.values(studentCases).map(s => `<option>${escapeHTML(s.name)}</option>`).join("")}</select></label>
      <div class="field--full">${demoNote("Se enviaría una invitación al correo con una contraseña temporal que se cambia en el primer ingreso. El alta queda registrada en la auditoría.")}</div>
    </form>`,
    footer: formFooter("Crear usuario")
  });
}

function editUserDialog(button) {
  const row = button.closest("tr");
  const name = row?.querySelector("strong")?.textContent ?? "Usuario";
  const email = row?.querySelector("small")?.textContent ?? "";
  const role = row?.children[1]?.textContent.trim() ?? "Estudiante";
  const perms = (PERMISSIONS[role] ?? PERMISSIONS["Estudiante"]).map(([text, ok]) =>
    `<li class="${ok ? "is-ok" : "is-denied"}">${icon(ok ? "icon-check" : "icon-lock")}<span>${text}</span></li>`).join("");
  openInfo({
    kicker: "Permisos del usuario",
    title: escapeHTML(name),
    body: `<form id="info-form" data-form="edit-user" class="info-form" data-row-email="${escapeHTML(email)}">
      <div class="case-tags"><span class="tag">${escapeHTML(email)}</span><span class="tag tag--gold">${escapeHTML(role)}</span></div>
      <div class="doc-section"><span>Qué puede hacer este perfil</span><ul class="perm-list">${perms}</ul></div>
      <label class="field"><span>Estado de la cuenta</span><select name="status"><option>Activo</option><option>Suspendido</option><option>Desactivado</option></select></label>
      ${demoNote("Los permisos dependen del perfil: no se asignan uno por uno. Desactivar una cuenta no borra su historial, y todo cambio queda en la auditoría.")}
    </form>`,
    footer: formFooter("Guardar cambios")
  });
}

function newSectionDialog() {
  openInfo({
    kicker: "Secciones",
    title: "Crear sección",
    body: `<form id="info-form" data-form="new-section" class="info-form form-grid">
      <label class="field"><span>Grado</span><select name="grade"><option>5.º de secundaria</option><option>4.º de secundaria</option><option>3.º de secundaria</option></select></label>
      <label class="field"><span>Sección</span><input name="name" required maxlength="4" placeholder="Ej. C"></label>
      <label class="field"><span>Curso o área</span><input name="course" required placeholder="Ej. Comunicación"></label>
      <label class="field"><span>Docente responsable</span><select name="teacher"><option>Prof. Carlos Mendoza</option><option>Por asignar</option></select></label>
      <label class="field field--full"><span>Periodo académico</span><select name="period"><option>2026-II</option><option>2027-I</option></select></label>
      <div class="field--full">${demoNote("Después de crearla podrás matricular estudiantes y vincular a sus familias desde «Configurar».")}</div>
    </form>`,
    footer: formFooter("Crear sección")
  });
}

function configureSectionDialog(button) {
  const title = button.closest(".section-card")?.querySelector("h3")?.textContent ?? "Sección";
  const students = Object.values(studentCases).map(s => `<li>${icon("icon-users")}<span>${escapeHTML(s.name)}</span><small>${escapeHTML(s.stage)}</small></li>`).join("");
  openInfo({
    kicker: "Configurar sección",
    title: escapeHTML(title),
    body: `<form id="info-form" data-form="configure-section" class="info-form">
      <div class="config-grid">
        <div class="doc-section"><span>Docente responsable</span><p><b>Prof. Carlos Mendoza</b> · Comunicación · titular</p></div>
        <div class="doc-section"><span>Periodo</span><p>2026-II · del 3 de agosto al 18 de diciembre</p></div>
      </div>
      <div class="doc-section"><span>Estudiantes matriculados (muestra)</span><ul class="people-list">${students}</ul><p class="info-hint">y 20 estudiantes más.</p></div>
      <div class="doc-section"><span>Configuración del proyecto</span>
        <label class="check-inline"><input type="checkbox" checked> Proyecto en 8 etapas con revisión docente en cada una</label>
        <label class="check-inline"><input type="checkbox" checked> Referencias en APA 7 generadas desde los datos de las fuentes</label>
        <label class="check-inline"><input type="checkbox" checked> Eli habilitado en modo guiado (sin redactar trabajos)</label>
        <label class="check-inline"><input type="checkbox"> Permitir que los estudiantes creen proyectos propios</label></div>
      <div class="doc-section"><span>Acceso familiar</span>
        <label class="check-inline"><input type="checkbox" checked> Las familias ven solo los resúmenes que publica el docente</label></div>
    </form>`,
    footer: formFooter("Guardar configuración")
  });
}

function exportAuditDialog() {
  const events = [
    ["13 oct · 17:42", "Andrea Salazar", "Revisó permisos del perfil Familia", "Correcto"],
    ["13 oct · 15:10", "Sistema", "Prueba de aislamiento entre instituciones", "0 accesos cruzados"],
    ["13 oct · 11:05", "Cuenta desconocida", "Intento de acceso con institución no habilitada", "Denegado"],
    ["12 oct · 18:20", "Carlos Mendoza", "Inicio de sesión", "Correcto"],
    ["12 oct · 12:05", "Andrea Salazar", "Asignó docente a la sección 5.º A", "Correcto"],
    ["11 oct · 09:30", "Andrea Salazar", "Vinculó a Familia González con María González", "Correcto"],
    ["10 oct · 16:45", "Cuenta de estudiante", "Cinco intentos de contraseña fallidos", "Bloqueo temporal"]
  ];
  const rows = events.map(([date, who, what, result]) => `<tr><td>${date}</td><td>${who}</td><td>${what}</td>
    <td><span class="tag ${result === "Denegado" || result === "Bloqueo temporal" ? "tag--warning" : "tag--success"}">${result}</span></td></tr>`).join("");
  openInfo({
    kicker: "Auditoría",
    title: "Registro de auditoría",
    body: `<article class="doc-sheet">
      ${docHead("Registro de eventos de seguridad", "Colegio Santa María de Jesús · últimos 7 días")}
      <div class="case-stat-grid">
        <div class="case-stat"><span>Eventos</span><strong>${events.length}</strong></div>
        <div class="case-stat"><span>Accesos denegados</span><strong>1</strong></div>
        <div class="case-stat"><span>Bloqueos</span><strong>1</strong></div>
        <div class="case-stat"><span>Accesos cruzados</span><strong>0</strong></div>
      </div>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>Fecha</th><th>Usuario</th><th>Acción</th><th>Resultado</th></tr></thead><tbody>${rows}</tbody></table></div>
      <p class="doc-footnote">El registro no almacena contraseñas ni el contenido de los proyectos.</p>
    </article>`,
    footer: documentFooter
  });
}

/* ---------------------------------------------------------------- Familia */

function schoolDetailDialog(kind) {
  const details = {
    grades: {
      title: "Notas del periodo",
      body: `<div class="table-wrap"><table class="data-table"><thead><tr><th>Curso</th><th>I bim.</th><th>II bim.</th><th>III bim.</th><th>Promedio</th></tr></thead><tbody>
        ${[["Comunicación", 17, 18, 17], ["Matemática", 15, 16, 17], ["Ciencia y Tecnología", 17, 17, 18], ["Ciencias Sociales", 16, 17, 16], ["Inglés", 18, 17, 17], ["Educación para el Trabajo", 17, 16, 17]]
          .map(([c, a, b, d]) => `<tr><td>${c}</td><td>${a}</td><td>${b}</td><td>${d}</td><td><strong>${((a + b + d) / 3).toFixed(1)}</strong></td></tr>`).join("")}
        </tbody></table></div>`
    },
    attendance: {
      title: "Asistencia del periodo",
      body: `<div class="table-wrap"><table class="data-table"><thead><tr><th>Mes</th><th>Días de clase</th><th>Asistencias</th><th>Tardanzas</th><th>Faltas</th></tr></thead><tbody>
        ${[["Agosto", 20, 19, 1, 1], ["Septiembre", 21, 20, 0, 1], ["Octubre", 9, 9, 0, 0]]
          .map(([m, d, a, t, f]) => `<tr><td>${m}</td><td>${d}</td><td>${a}</td><td>${t}</td><td>${f}</td></tr>`).join("")}
        </tbody></table></div><p class="info-hint">Asistencia acumulada: 48 de 50 días (96 %).</p>`
    },
    payments: {
      title: "Estado de pagos",
      body: `<div class="table-wrap"><table class="data-table"><thead><tr><th>Concepto</th><th>Vencimiento</th><th>Estado</th></tr></thead><tbody>
        ${[["Pensión de agosto", "31 ago", "Pagado"], ["Pensión de septiembre", "30 sep", "Pagado"], ["Pensión de octubre", "31 oct", "Pendiente"]]
          .map(([c, v, s]) => `<tr><td>${c}</td><td>${v}</td><td><span class="tag ${s === "Pagado" ? "tag--success" : "tag--gold"}">${s}</span></td></tr>`).join("")}
        </tbody></table></div>
        <div class="case-finding">${icon("icon-lock")}<div><strong>Solo consulta</strong><p>Escholarium no procesa pagos. Para pagar, usa los canales oficiales del colegio.</p></div></div>`
    }
  };
  const detail = details[kind] ?? details.grades;
  openInfo({
    kicker: "Información escolar · datos ficticios",
    title: detail.title,
    body: `<div class="case-tags"><span class="tag">María González · 5.º A</span><span class="tag tag--warning">Sin conexión al colegio</span></div>${detail.body}
      ${demoNote("Datos ficticios incluidos solo para validar la comprensión de la consulta.")}`
  });
}

function notificationSettingsDialog() {
  openInfo({
    kicker: "Notificaciones",
    title: "Preferencias",
    body: `<form id="info-form" data-form="notification-settings" class="info-form">
      <div class="doc-section"><span>¿Qué avisos deseas recibir?</span>
        <label class="check-inline"><input type="checkbox" checked> Avance autorizado del proyecto</label>
        <label class="check-inline"><input type="checkbox" checked> Reportes compartidos por el docente</label>
        <label class="check-inline"><input type="checkbox" checked> Recordatorios de fechas de entrega</label>
        <label class="check-inline"><input type="checkbox"> Avisos institucionales generales</label></div>
      <label class="field"><span>Frecuencia</span><select><option>Apenas ocurra</option><option>Resumen semanal</option></select></label>
      <div class="doc-section"><span>Canal</span>
        <label class="check-inline"><input type="checkbox" checked disabled> Dentro de la aplicación</label>
        <label class="check-inline"><input type="checkbox" disabled> WhatsApp <span class="tag">Próximamente</span></label></div>
    </form>`,
    footer: formFooter("Guardar preferencias")
  });
}

/* ---------------------------------------------------------------- Envío de formularios */

function handleInfoForm(form) {
  const data = Object.fromEntries(new FormData(form));
  const content = document.getElementById("portal-content");
  switch (form.dataset.form) {
    case "new-project": {
      const grid = content.querySelector(".cards-grid");
      grid?.insertAdjacentHTML("afterbegin", `<article class="card card--span-12 project-card is-new"><div class="card__header"><span class="tag">Borrador</span><span class="tag tag--gold">Nuevo</span></div>
        <h3 class="project-title">${escapeHTML(data.title)}</h3><p style="color:var(--ink-600)">${escapeHTML(data.template)}${data.idea ? ` · ${escapeHTML(data.idea)}` : ""}</p>
        <div class="progress"><span style="width:0%"></span></div><div class="progress-meta"><span>Etapa 1 de 8 · Tema y delimitación</span><span>Creado ahora</span></div></article>`);
      showToast("Proyecto creado", "Se abrió la etapa 1. En el prototipo no se guarda.");
      break;
    }
    case "teacher-note":
      showToast("Orientación registrada", `Se envió a ${studentCases[data.student]?.name ?? "el estudiante"}${data.family ? " y a su familia" : ""}.`);
      break;
    case "new-user": {
      content.querySelector(".data-table tbody")?.insertAdjacentHTML("afterbegin", `<tr class="is-new"><td><strong>${escapeHTML(data.name)}</strong><br><small>${escapeHTML(data.email)}</small></td>
        <td>${escapeHTML(data.role)}</td><td>${escapeHTML(data.section)}</td><td><span class="tag tag--gold">Invitado</span></td>
        <td><button class="button button--small button--secondary" type="button" data-action="edit-user">Editar permisos</button></td></tr>`);
      showToast("Usuario creado", `Se envió una invitación a ${data.email} (simulado).`);
      break;
    }
    case "edit-user": {
      const email = form.dataset.rowEmail;
      const row = [...content.querySelectorAll(".data-table tbody tr")].find(tr => tr.querySelector("small")?.textContent === email);
      const tag = row?.children[3]?.querySelector(".tag");
      if (tag) {
        tag.textContent = data.status;
        tag.className = `tag ${data.status === "Activo" ? "tag--success" : "tag--warning"}`;
      }
      showToast("Cambios guardados", "El cambio quedó registrado en la auditoría.");
      break;
    }
    case "new-section": {
      content.querySelector(".cards-grid")?.insertAdjacentHTML("beforeend", `<article class="card card--span-6 section-card is-new"><span class="tag tag--gold">Nueva</span>
        <h3>${escapeHTML(data.name)} de ${escapeHTML(data.grade.replace(" de secundaria", ""))} secundaria</h3><p>0 estudiantes · ${escapeHTML(data.teacher)} · ${escapeHTML(data.course)}</p>
        <div class="progress"><span style="width:10%"></span></div><div class="progress-meta"><span>Configuración del entorno</span><strong>10 %</strong></div>
        <button class="button button--small button--secondary" type="button" data-action="configure-section">Configurar</button></article>`);
      showToast("Sección creada", "Ahora puedes matricular estudiantes desde «Configurar».");
      break;
    }
    case "configure-section":
      showToast("Configuración guardada", "Los cambios se aplicarán a los proyectos de la sección.");
      break;
    case "notification-settings":
      showToast("Preferencias guardadas", "Recibirás los avisos seleccionados dentro de la aplicación.");
      break;
  }
  closeInfo();
}

document.addEventListener("submit", event => {
  if (event.target.id !== "info-form") return;
  event.preventDefault();
  if (!event.target.reportValidity()) return;
  handleInfoForm(event.target);
});

infoDialog.addEventListener("click", event => {
  if (event.target === infoDialog) closeInfo();
});

window.history.scrollRestoration = "manual";
renderRoleCards();
