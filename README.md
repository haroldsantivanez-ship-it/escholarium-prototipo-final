# Escholarium — Prototipo navegable 100%

Prototipo académico de **Escholarium**, plataforma con inteligencia artificial para fortalecer la investigación escolar. Representa el recorrido completo de los **cuatro perfiles** con contenido precargado. No usa base de datos ni guarda información: al recargar la página todo vuelve a su estado inicial.

> Este prototipo valida navegación, organización de pantallas y comprensión del servicio. La versión funcional (con base de datos, inicio de sesión real y Eli conectado a IA) se desarrolla por separado.

## Cómo abrirlo

**Opción 1 (más simple):** descomprime el ZIP y abre `index.html` con doble clic.

**Opción 2 (recomendada):** abre la carpeta en Visual Studio Code y usa la extensión **Live Server**, o ejecuta dentro de la carpeta:

```bash
python -m http.server 4173
```

y visita `http://localhost:4173`.

No necesita instalar paquetes, conexión a internet ni compilación. Si el navegador no admite WebGL, el prototipo muestra automáticamente una vista de respaldo de Eli.

## Cuentas demostrativas

Selecciona siempre **Colegio Santa María de Jesús**. El formulario se completa solo al elegir el perfil.

| Perfil | Correo | Contraseña |
|---|---|---|
| Estudiante | `estudiante@demo.edu.pe` | `Demo2026!` |
| Docente / tutor | `docente@demo.edu.pe` | `Demo2026!` |
| Administrador institucional | `administrador@demo.edu.pe` | `Demo2026!` |
| Familia autorizada | `familia@demo.edu.pe` | `Demo2026!` |

Elegir **Institución piloto 02**, otro correo o una contraseña incorrecta muestra el mensaje de acceso denegado.

## Qué incluye

- **Portada** de Escholarium como plataforma multiinstitucional, con Eli en 3D (saludo, sonrisa, movimientos y dos vueltas al anillo principal) y el mensaje *«Investigar es aprender a pensar por ti mismo»*.
- **Estudiante:** inicio, proyectos con **8 etapas** (tema, pregunta, búsqueda, evaluación de fuentes, notas, síntesis, citación y revisión), conversación guiada con Eli, fuentes evaluadas con **7 criterios** (autoría, actualidad, procedencia, evidencia, propósito, pertinencia y contraste) y bitácora.
- **Docente / tutor:** supervisión, proyectos, estudiantes, alertas revisables y reportes demostrativos.
- **Administrador institucional:** usuarios y roles, secciones, **Mi institución** y auditoría. Su alcance se limita a su propio colegio.
- **Familia autorizada:** vista móvil con el avance autorizado agrupado en 5 fases, reportes, información escolar ficticia y notificaciones.
- **Eli en 3D** en la portada (coreografía completa), en la selección de perfiles y en el encabezado del chat (versión compacta: saludo, reposo y sonrisa).
- **Todos los botones responden** con una ventana de contenido:

| Perfil | Botón | Qué muestra |
|---|---|---|
| Estudiante | Nuevo proyecto | Formulario; el proyecto aparece en la lista en la etapa 1 de 8 |
| Estudiante | Exportar resumen (bitácora) | Documento con el proyecto, la pregunta y las decisiones registradas |
| Docente | Registrar orientación | Formulario para enviar una orientación a un estudiante |
| Docente | Generar reporte | Reporte de la sección con indicadores y detalle por estudiante |
| Administrador | Nuevo usuario | Formulario; el usuario aparece en la tabla como «Invitado» |
| Administrador | Editar permisos | Qué puede y qué no puede hacer el perfil, y estado de la cuenta |
| Administrador | Crear sección / Configurar | Formulario de sección; configuración de docente, estudiantes y proyecto |
| Administrador | Exportar registro | Registro de auditoría con eventos de seguridad |
| Familia | Ver detalle | Notas por curso, asistencia por mes y estado de pagos (ficticios) |
| Familia | Preferencias | Avisos que desea recibir y frecuencia |

  Los documentos tienen el botón **Imprimir o guardar como PDF**. Lo que se crea en los formularios se ve en pantalla, pero no se guarda.
- Navegación en la misma pestaña, barra lateral fija, posición de desplazamiento conservada y diseño adaptable a computadora, tableta y teléfono.

## Límites de esta versión

- No hay autenticación real, base de datos ni conexión con sistemas del colegio.
- Eli responde con un flujo guiado predeterminado; no usa un modelo de inteligencia artificial.
- Notas, asistencia y estado de pagos son ficticios y solo de consulta; no hay transacciones.
- La vista familiar representa el flujo móvil; la plataforma de la futura aplicación se decidirá después.
- WhatsApp y otras integraciones quedan para una fase posterior.

## Publicarlo

La carpeta puede subirse tal cual a un repositorio de GitHub y publicarse en **Netlify** o **Vercel** como sitio estático: sin comando de compilación y con la raíz de la carpeta como directorio de publicación.

## Archivos

| Archivo | Contenido |
|---|---|
| `index.html` | Estructura de pantallas |
| `styles.css` | Sistema visual (colores, tipografía, componentes) |
| `app.js` | Navegación, perfiles, validaciones y contenido demostrativo |
| `eli-3d.js` | Código fuente de la escena y animaciones de Eli |
| `eli-3d.bundle.js` | Versión compilada que usa el navegador (incluye el modelo) |
| `eli-loader-guard.js` | Activa la vista de respaldo si el 3D no carga |
| `assets/Eli_Avatar_3D.glb` | Modelo tridimensional oficial de Eli |
| `assets/eli-avatar.png` | Imagen de respaldo si el navegador no admite 3D |
| `vendor/` | Motor 3D (Three.js) y su licencia |
