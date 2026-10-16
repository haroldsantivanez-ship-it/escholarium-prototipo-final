"use strict";

// Si el modelo 3D no termina de cargar, activa la vista de respaldo para no dejar el indicador detenido.
window.addEventListener("DOMContentLoaded", () => {
  window.setTimeout(() => {
    document.querySelectorAll("[data-eli-3d]").forEach(eli => {
      if (eli.classList.contains("is-ready") || eli.classList.contains("is-fallback")) return;
      eli.classList.add("is-fallback");
      eli.querySelector(".eli-3d__loader")?.setAttribute("aria-hidden", "true");
      if (eli.dataset.eliMode !== "compact") {
        const title = document.querySelector("[data-eli-status-title]");
        const detail = document.querySelector("[data-eli-status-detail]");
        if (title) title.textContent = "Eli está listo";
        if (detail) detail.textContent = "Vista de respaldo activada";
      }
      console.warn("Eli 3D no terminó de cargar; se activó la vista de respaldo.");
    });
  }, 9000);
});
