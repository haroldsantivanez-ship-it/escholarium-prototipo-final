# Escholarium · Prototipo 100 %

Prototipo navegable de **Escholarium**, plataforma web multiinstitucional para fortalecer la investigación escolar con **Eli**, un tutor de inteligencia artificial supervisado por el docente.

Este prototipo es **la misma interfaz de la plataforma funcional**: mismas pantallas, logo, pasarela de perfiles, Eli en 3D y funciones. La diferencia es que funciona **sin servidor ni base de datos**: los datos demostrativos viven en el navegador y se restablecen al cerrar la pestaña.

## Cómo abrirlo

1. Descomprime el ZIP.
2. Haz **doble clic en `index.html`**.

No necesita instalar nada ni conexión a internet. Se recomienda Chrome o Edge actualizados.

## Cuentas demostrativas

Contraseña de todas las cuentas: **`Demo2026!`** (en el inicio de sesión, el botón **«Usar cuenta demo»** la completa).

| Perfil | Correo | Institución |
|---|---|---|
| Estudiante | `estudiante@demo.edu.pe` | Colegio Santa María de Jesús |
| Docente / tutor | `docente@demo.edu.pe` | Colegio Santa María de Jesús |
| Administrador institucional | `administrador@demo.edu.pe` | Colegio Santa María de Jesús |
| Familia autorizada | `familia@demo.edu.pe` | Colegio Santa María de Jesús |

También hay estudiantes adicionales (`diego.ramos@`, `lucia.torres@`, `andrea.perez@demo.edu.pe`) y la **Institución piloto 02** (`estudiante@piloto02.edu.pe`, `docente@piloto02.edu.pe`) para mostrar que cada colegio solo ve sus datos.

## Qué se puede hacer

**Estudiante**
- Crear proyectos y avanzar por **8 etapas**: las etapas propias se cierran con **«Completar etapa»** y el docente revisa en **3 momentos** (Problema y pregunta, Notas y evidencias, Revisión y entrega). Mientras el docente revisa, el estudiante sigue avanzando.
- Conversar con **Eli**, que recuerda el proyecto activo, entiende lenguaje informal y **se niega a hacer el trabajo** (la interacción se marca para el docente). En el prototipo Eli responde en **modo pautas**; en la plataforma funcional responde con IA real.
- **Buscar fuentes reales** (artículos académicos verificados en OpenAlex, con DOI), registrarlas con un clic y evaluarlas con **7 criterios**.
- Notas de evidencia, síntesis con versiones, **referencias APA 7 automáticas** y **bitácora** que se llena sola, con **«Exportar resumen»** (imprimible o PDF).

**Docente / tutor**
- Ver los proyectos de su sección, **aprobar revisiones o pedir cambios** con retroalimentación (y decidir si se comparte con la familia).
- **Alertas** para revisión humana: interacciones con Eli, cambios pendientes, inactividad y fuentes incompletas. Cada alerta se marca como revisada, atendida o descartada, con nota.
- **Reportes** de la sección y botón **«Generar reporte»** (imprimible o PDF).
- **«Registrar orientación»**: el estudiante la ve en su bitácora.

**Administrador institucional**
- Crear cuentas con **contraseña temporal** (se cambia en el primer ingreso), desactivar o reactivar, restablecer contraseñas y **ver los permisos** de cada perfil.
- Crear secciones, matricular, asignar docentes y vincular familias.
- **Auditoría** con **«Exportar registro»** (Excel) e impresión.

**Familia autorizada**
- **Proyecto:** avance en **5 fases**, etapa actual y cómo acompañar (sin borradores ni conversaciones con Eli).
- **Reportes:** decisiones del docente y los comentarios que él decidió compartir.
- **Notificaciones** con **«Preferencias»** de avisos e **información escolar** de contexto (datos ficticios).

Prueba sugerida: entra como estudiante y envía «Notas y evidencias» al docente; cierra sesión y entra como docente para aprobarla (marca «compartir con la familia»); luego entra como familia y verás el avance y el comentario.

Para que se vea con contenido desde el inicio, el prototipo trae casos de ejemplo: una alerta de Eli (Diego), un proyecto sin actividad (Andrea) y una revisión aprobada compartida con la familia (María).

## Límites del prototipo

- No hay servidor: los cambios se guardan solo en la pestaña abierta y se pierden al cerrarla.
- Eli usa respuestas guiadas (modo pautas); la IA real está en la plataforma funcional.
- El buscador muestra resultados reales precargados; en la plataforma funcional consulta OpenAlex en vivo.

## Archivos

| Archivo | Contenido |
|---|---|
| `index.html` | Página del prototipo |
| `assets/escholarium.js` | Aplicación completa (interfaz, estilos, datos demostrativos y modelo 3D de Eli) |
| `favicon.png` | Ícono de la pestaña |

Se genera desde el código de la plataforma funcional con `npm run build:prototipo` (carpeta `frontend`), para que ambos se mantengan iguales.

Incluye bibliotecas de código abierto con licencia MIT: React, React Router, TanStack Query y Three.js.
