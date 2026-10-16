import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import embeddedEliModel from "./assets/Eli_Avatar_3D.glb";

/*
 * Eli en 3D. Se monta en todo elemento con [data-eli-3d]:
 *   - data-eli-mode="stage" (portada): coreografía completa con dos vueltas al anillo.
 *   - data-eli-mode="compact" (acceso y chat): saludo, reposo y sonrisa, sin desplazarse.
 * Los elementos que aparecen después (por ejemplo, al abrir el chat) se montan automáticamente.
 */

let modelPromise;
const mounted = new Map();

function loadModel() {
  if (!modelPromise) {
    modelPromise = new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      const url = embeddedEliModel;
      if (url.startsWith("data:")) {
        try {
          const separator = url.indexOf(",");
          const metadata = url.slice(0, separator);
          const content = url.slice(separator + 1);
          const binary = metadata.includes(";base64") ? atob(content) : decodeURIComponent(content);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
          loader.parse(bytes.buffer, "", resolve, reject);
        } catch (error) {
          reject(error);
        }
        return;
      }
      loader.load(url, resolve, undefined, reject);
    });
  }
  return modelPromise;
}

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error("El modelo 3D tardó demasiado en responder.")), ms);
    promise.then(value => { window.clearTimeout(timer); resolve(value); },
      error => { window.clearTimeout(timer); reject(error); });
  });
}

function mountAll() {
  document.querySelectorAll("[data-eli-3d]").forEach(host => {
    if (!mounted.has(host)) mounted.set(host, mount(host));
  });
  // Libera las escenas cuyos elementos ya no están en la página (el chat se vuelve a dibujar al cambiar de vista).
  mounted.forEach((cleanup, host) => {
    if (!document.contains(host)) {
      cleanup();
      mounted.delete(host);
    }
  });
}

function mount(container) {
  const mode = container.dataset.eliMode === "compact" ? "compact" : "stage";
  const canvas = container.querySelector("canvas");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const statusTitle = mode === "stage" ? document.querySelector("[data-eli-status-title]") : null;
  const statusDetail = mode === "stage" ? document.querySelector("[data-eli-status-detail]") : null;
  let disposed = false;
  let frame = 0;
  const cleanups = [];

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  } catch {
    showFallback(container);
    return () => {};
  }

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0.08, mode === "compact" ? 6.3 : 8.5);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.HemisphereLight(0xfff6df, 0x26030a, 2.7));
  const keyLight = new THREE.DirectionalLight(0xfff4d0, 4.1);
  keyLight.position.set(3.8, 5.4, 6.2);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0x8a2440, 3.8);
  rimLight.position.set(-4.5, 1.8, -3.5);
  scene.add(rimLight);
  const goldLight = new THREE.PointLight(0xe0b83f, 13, 9, 2);
  goldLight.position.set(0, -1.1, 3.1);
  scene.add(goldLight);

  const travelRoot = new THREE.Group();
  scene.add(travelRoot);

  withTimeout(loadModel(), 12000).then(gltf => {
    if (disposed) return;
    const model = gltf.scene.clone(true);
    prepareModel(model, renderer);
    normalizeModel(model);
    travelRoot.add(model);
    const pose = createPoseController(model);

    let visible = true;
    let startTime = performance.now();
    let activePhase = "";

    container.classList.add("is-ready");
    container.querySelector(".eli-3d__loader")?.setAttribute("aria-hidden", "true");

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      const w = Math.max(1, Math.round(width));
      const h = Math.max(1, Math.round(height));
      const ratio = renderer.getPixelRatio();
      if (canvas.width !== Math.round(w * ratio) || canvas.height !== Math.round(h * ratio)) {
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    cleanups.push(() => resizeObserver.disconnect());

    const visibilityObserver = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
    }, { threshold: 0.02 });
    visibilityObserver.observe(container);
    cleanups.push(() => visibilityObserver.disconnect());

    canvas.addEventListener("webglcontextlost", event => {
      event.preventDefault();
      showFallback(container);
    });

    const updateStatus = phase => {
      if (phase === activePhase || !statusTitle) return;
      activePhase = phase;
      const messages = {
        greeting: ["Eli te da la bienvenida", "Saludo y gestos automáticos"],
        idle: ["Eli está listo", "Orientación activa · Supervisión docente"],
        prepare: ["Eli se prepara", "Iniciando recorrido por el entorno"],
        orbit: ["Eli está explorando", "Dos vueltas automáticas por el anillo"],
        return: ["Eli regresa a su espacio", "Retorno suave a la posición inicial"],
        smile: ["Eli está atento", "Listo para acompañar la investigación"]
      };
      const [title, detail] = messages[phase] || messages.idle;
      statusTitle.textContent = title;
      if (statusDetail) statusDetail.textContent = detail;
    };

    const render = now => {
      frame = requestAnimationFrame(render);
      if (!visible || document.hidden || container.classList.contains("is-fallback")) return;
      resize();
      const elapsed = (now - startTime) / 1000;
      if (reducedMotion.matches) {
        pose.restore();
        travelRoot.position.set(0, 0, 0);
        travelRoot.rotation.set(0, 0, 0);
        travelRoot.scale.setScalar(1);
        pose.applyStillPose();
        updateStatus("idle");
      } else {
        updateStatus(mode === "compact" ? animateCompact(elapsed, travelRoot, pose) : animateStage(elapsed, travelRoot, pose));
      }
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(render);
  }).catch(error => {
    console.error("No se pudo iniciar la experiencia 3D de Eli:", error);
    showFallback(container);
  });

  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    cleanups.forEach(cleanup => cleanup());
    renderer.dispose();
  };
}

function prepareModel(model, renderer) {
  model.traverse(object => {
    if (!object.isMesh) return;
    object.frustumCulled = false;
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.forEach(material => {
      if (!material) return;
      material.depthWrite = material.transparent ? false : material.depthWrite;
      if ("envMapIntensity" in material) material.envMapIntensity = 1.15;
      material.needsUpdate = true;
    });
    if (object.geometry?.attributes?.uv && object.material?.map) {
      object.material.map.anisotropy = renderer.capabilities.getMaxAnisotropy();
    }
  });
}

function normalizeModel(model) {
  model.updateMatrixWorld(true);
  const size = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3());
  model.scale.setScalar(3.12 / Math.max(size.y, 0.001));
  model.updateMatrixWorld(true);
  const center = new THREE.Box3().setFromObject(model).getCenter(new THREE.Vector3());
  model.position.sub(center);
  model.position.y += 0.04;
}

function createPoseController(model) {
  const names = [
    "CharacterRoot", "HeadPivot", "EyeGroup", "LeftEye", "RightEye",
    "MouthGroup", "MouthDot1", "MouthDot2", "MouthDot3",
    "MouthLineLeft", "MouthLineRight", "LeftArmPivot", "RightArmPivot",
    "LeftHandGlow", "RightHandGlow", "LeftFoot", "RightFoot",
    "BookMark", "HoverRing", "GroundGlow"
  ];
  const nodes = Object.fromEntries(names.map(name => [name, model.getObjectByName(name)]));
  const rest = new Map();
  Object.values(nodes).filter(Boolean).forEach(object => {
    rest.set(object, { position: object.position.clone(), rotation: object.rotation.clone(), scale: object.scale.clone() });
  });
  const restOf = name => (nodes[name] ? rest.get(nodes[name]) : null);

  function restore() {
    rest.forEach((value, object) => {
      object.position.copy(value.position);
      object.rotation.copy(value.rotation);
      object.scale.copy(value.scale);
    });
  }

  function applySmile(amount) {
    const { MouthLineLeft: left, MouthLineRight: right, MouthDot1: d1, MouthDot2: d2, MouthDot3: d3 } = nodes;
    if (left) left.rotation.z = restOf("MouthLineLeft").rotation.z - 0.18 * amount;
    if (right) right.rotation.z = restOf("MouthLineRight").rotation.z + 0.18 * amount;
    if (d2) d2.position.y = restOf("MouthDot2").position.y - 0.045 * amount;
    if (d1) d1.position.y = restOf("MouthDot1").position.y + 0.025 * amount;
    if (d3) d3.position.y = restOf("MouthDot3").position.y + 0.025 * amount;
  }

  function blink(time) {
    const cycle = time % 4.65;
    const openness = cycle < 0.16 ? Math.max(0.08, Math.abs(cycle - 0.08) / 0.08) : 1;
    ["LeftEye", "RightEye"].forEach(name => {
      const eye = nodes[name];
      const eyeRest = restOf(name);
      if (eye && eyeRest) eye.scale.y = eyeRest.scale.y * openness;
    });
  }

  function applyIdle(time, strength = 1) {
    const n = nodes;
    if (n.CharacterRoot) {
      n.CharacterRoot.position.y += Math.sin(time * 1.7) * 0.035 * strength;
      n.CharacterRoot.rotation.z += Math.sin(time * 0.92) * 0.018 * strength;
    }
    if (n.HeadPivot) {
      n.HeadPivot.rotation.y += Math.sin(time * 0.72) * 0.11 * strength;
      n.HeadPivot.rotation.z += Math.sin(time * 1.05) * 0.025 * strength;
    }
    if (n.LeftArmPivot) n.LeftArmPivot.rotation.z += Math.sin(time * 1.45) * 0.07 * strength;
    if (n.RightArmPivot) n.RightArmPivot.rotation.z -= Math.sin(time * 1.45) * 0.07 * strength;
    if (n.LeftFoot) n.LeftFoot.rotation.x += Math.sin(time * 1.55) * 0.075 * strength;
    if (n.RightFoot) n.RightFoot.rotation.x -= Math.sin(time * 1.55) * 0.075 * strength;
    if (n.BookMark) n.BookMark.rotation.y += Math.sin(time * 1.1) * 0.07 * strength;
    if (n.HoverRing) n.HoverRing.rotation.z += time * 0.23;
    applySmile(0.22);
    blink(time);
  }

  function applyGreeting(time, progress) {
    const envelope = smoothWindow(progress, 0.04, 0.2, 0.82, 0.98);
    const n = nodes;
    if (n.RightArmPivot) {
      n.RightArmPivot.rotation.z += 2.08 * envelope;
      n.RightArmPivot.rotation.x += 0.18 * envelope;
      n.RightArmPivot.rotation.y += Math.sin(time * 10.2) * 0.32 * envelope;
    }
    if (n.RightHandGlow) n.RightHandGlow.rotation.z += Math.sin(time * 10.2 + 0.6) * 0.42 * envelope;
    if (n.HeadPivot) {
      n.HeadPivot.rotation.y += Math.sin(time * 2.1) * 0.16 * envelope;
      n.HeadPivot.rotation.z -= 0.08 * envelope;
    }
    if (n.CharacterRoot) n.CharacterRoot.rotation.z -= 0.025 * envelope;
    applySmile(0.9 * envelope + 0.22);
  }

  function applyPrepare(progress, amount = 1) {
    const eased = easeInOut(progress) * amount;
    const n = nodes;
    if (n.CharacterRoot) {
      n.CharacterRoot.position.y -= 0.15 * eased;
      n.CharacterRoot.rotation.x += 0.1 * eased;
    }
    if (n.HeadPivot) n.HeadPivot.rotation.x -= 0.13 * eased;
    if (n.LeftArmPivot) n.LeftArmPivot.rotation.z -= 0.42 * eased;
    if (n.RightArmPivot) n.RightArmPivot.rotation.z += 0.42 * eased;
    if (n.LeftFoot) n.LeftFoot.rotation.x += 0.2 * eased;
    if (n.RightFoot) n.RightFoot.rotation.x += 0.2 * eased;
  }

  function applyTravel(time, intensity = 1) {
    const n = nodes;
    const stride = Math.sin(time * 8.2);
    if (n.CharacterRoot) n.CharacterRoot.position.y += Math.abs(Math.sin(time * 4.1)) * 0.055 * intensity;
    if (n.HeadPivot) n.HeadPivot.rotation.z += Math.sin(time * 4.1) * 0.055 * intensity;
    if (n.LeftArmPivot) {
      n.LeftArmPivot.rotation.z -= 0.4 * intensity;
      n.LeftArmPivot.rotation.x += stride * 0.38 * intensity;
    }
    if (n.RightArmPivot) {
      n.RightArmPivot.rotation.z += 0.4 * intensity;
      n.RightArmPivot.rotation.x -= stride * 0.38 * intensity;
    }
    if (n.LeftFoot) n.LeftFoot.rotation.x += stride * 0.5 * intensity;
    if (n.RightFoot) n.RightFoot.rotation.x -= stride * 0.5 * intensity;
    applySmile(0.55);
    blink(time);
  }

  function applyCelebration(time, progress) {
    const envelope = Math.sin(Math.PI * progress);
    const n = nodes;
    if (n.LeftArmPivot) n.LeftArmPivot.rotation.z -= 0.72 * envelope;
    if (n.RightArmPivot) n.RightArmPivot.rotation.z += 0.72 * envelope;
    if (n.HeadPivot) n.HeadPivot.rotation.z += Math.sin(time * 2.4) * 0.08 * envelope;
    if (n.CharacterRoot) n.CharacterRoot.position.y += Math.sin(progress * Math.PI * 2) * 0.04 * envelope;
    applySmile(1);
  }

  function applyStillPose() {
    applySmile(0.65);
    if (nodes.HeadPivot) nodes.HeadPivot.rotation.z -= 0.045;
    if (nodes.RightArmPivot) nodes.RightArmPivot.rotation.z += 0.18;
    if (nodes.LeftArmPivot) nodes.LeftArmPivot.rotation.z -= 0.12;
  }

  return { restore, applyIdle, applyGreeting, applyPrepare, applyTravel, applyCelebration, applyStillPose };
}

function resetRoot(travelRoot, pose, elapsed) {
  pose.restore();
  travelRoot.position.set(0, 0, 0);
  travelRoot.rotation.set(0, 0, 0);
  travelRoot.scale.setScalar(1);
  pose.applyIdle(elapsed, 1);
}

/** Coreografía completa de la portada: ciclo de 27 s con dos vueltas al anillo. */
function animateStage(elapsed, travelRoot, pose) {
  const time = elapsed % 27;
  resetRoot(travelRoot, pose, elapsed);
  if (time < 4.6) { pose.applyGreeting(elapsed, time / 4.6); return "greeting"; }
  if (time < 8.2) return "idle";
  if (time < 9.5) { pose.applyPrepare((time - 8.2) / 1.3); return "prepare"; }

  const orbitStart = orbitPoint(Math.PI / 2);
  if (time < 10.6) {
    const progress = easeInOut((time - 9.5) / 1.1);
    travelRoot.position.lerpVectors(new THREE.Vector3(), orbitStart, progress);
    travelRoot.scale.setScalar(THREE.MathUtils.lerp(1, 0.58, progress));
    pose.applyPrepare(1 - progress, 0.9);
    pose.applyTravel(elapsed, progress * 0.6);
    return "prepare";
  }
  if (time < 20) {
    const angle = Math.PI / 2 - Math.PI * 4 * easeInOut((time - 10.6) / 9.4);
    travelRoot.position.copy(orbitPoint(angle));
    travelRoot.position.z = -Math.sin(angle) * 0.52;
    travelRoot.scale.setScalar(0.61 + THREE.MathUtils.mapLinear(travelRoot.position.z, -0.52, 0.52, -0.045, 0.045));
    travelRoot.rotation.y = -Math.cos(angle) * 0.34;
    travelRoot.rotation.z = -Math.cos(angle) * 0.13;
    pose.applyTravel(elapsed, 1);
    return "orbit";
  }
  if (time < 21.2) {
    const progress = easeInOut((time - 20) / 1.2);
    travelRoot.position.lerpVectors(orbitStart, new THREE.Vector3(), progress);
    travelRoot.scale.setScalar(THREE.MathUtils.lerp(0.58, 1, progress));
    pose.applyTravel(elapsed, 1 - progress);
    return "return";
  }
  if (time < 24.7) { pose.applyCelebration(elapsed, (time - 21.2) / 3.5); return "smile"; }
  return "idle";
}

/** Variante para espacios pequeños: saludo, reposo y sonrisa, sin salir de su recuadro. */
function animateCompact(elapsed, travelRoot, pose) {
  const time = elapsed % 16;
  resetRoot(travelRoot, pose, elapsed);
  if (time < 4.6) { pose.applyGreeting(elapsed, time / 4.6); return "greeting"; }
  if (time < 11) return "idle";
  if (time < 14.5) { pose.applyCelebration(elapsed, (time - 11) / 3.5); return "smile"; }
  return "idle";
}

function orbitPoint(angle) {
  const tilt = THREE.MathUtils.degToRad(-12);
  const x = Math.cos(angle) * 1.83;
  const y = Math.sin(angle) * 1.27;
  return new THREE.Vector3(x * Math.cos(tilt) - y * Math.sin(tilt), x * Math.sin(tilt) + y * Math.cos(tilt), 0);
}

function smoothWindow(value, inStart, inEnd, outStart, outEnd) {
  const fadeIn = THREE.MathUtils.smoothstep(value, inStart, inEnd);
  const fadeOut = 1 - THREE.MathUtils.smoothstep(value, outStart, outEnd);
  return Math.min(fadeIn, fadeOut);
}

function easeInOut(value) {
  const clamped = THREE.MathUtils.clamp(value, 0, 1);
  return -(Math.cos(Math.PI * clamped) - 1) / 2;
}

function showFallback(container) {
  container.classList.remove("is-ready");
  container.classList.add("is-fallback");
  container.querySelector(".eli-3d__loader")?.setAttribute("aria-hidden", "true");
  if (container.dataset.eliMode !== "compact") {
    const title = document.querySelector("[data-eli-status-title]");
    const detail = document.querySelector("[data-eli-status-detail]");
    if (title) title.textContent = "Eli está listo";
    if (detail) detail.textContent = "Vista compatible activada";
  }
}

mountAll();
new MutationObserver(mountAll).observe(document.body, { childList: true, subtree: true });
