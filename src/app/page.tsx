"use client";

/**
 * North Bridge Tech: interactive 3D symbol.
 *
 * Three independent extruded meshes (box-1, box-2, box-3), each built from its own
 * <path id="box-N"> in /public/logo-symbol.svg, each with its own pivot group, its own
 * spring and its own cursor response. The whole symbol sits inside a parent group whose
 * rotation is hard-clamped, so nothing can turn edge-on.
 *
 * The scene is kept in the client page so its canvas and page composition share one module.
 */

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { Component, useEffect, useMemo, useRef, useState } from "react";
import type {
  ErrorInfo,
  MutableRefObject,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import type { SVGResult } from "three/examples/jsm/loaders/SVGLoader.js";

/* ──────────────────────────────────────────────────────────────────────────────
 * TUNING. Everything that controls how the logo looks and moves lives here.
 * Angles are radians (0.05 rad ≈ 2.9°). World units: the whole symbol is LOGO_HEIGHT tall.
 * ────────────────────────────────────────────────────────────────────────────── */

const LOGO_SRC = "/logo-symbol.svg";
const LOGO_HEIGHT = 2.6;

/** Share of the visible frame the symbol may occupy. The rest is margin for tilt + float. */
const FRAME_FILL = 0.84;

/** Camera: a long-ish lens placed far back keeps perspective gentle and the framing stable. */
const CAMERA = {
  position: [0, 0, 7] as [number, number, number],
  fov: 30,
  near: 0.5,
  far: 24,
};

/**
 * Edge treatment, in world units. bevelOffset is set to -bevelSize when extruding, so the
 * side walls stay exactly on the traced outline (the silhouette is not inflated) and the
 * bevel is cut into the front/back faces. Keep 2 × bevelSize below the thinnest feature,
 * the ~4 px outline strokes, which are ≈ 0.026 world units thick.
 */
const EDGE = {
  bevelSize: 0.01,
  bevelThickness: 0.012,
  bevelSegments: 4,
  curveSegments: 5,
};

/** Whole-symbol response: maxYaw/maxPitch/maxRoll are the hard clamp, idle sway included. */
const PARENT = {
  yaw: 0.14,
  pitch: 0.09,
  maxYaw: 0.2,
  maxPitch: 0.13,
  maxRoll: 0.02,
  stiffness: 22,
  damping: 1.0,
  floatAmplitude: 0.035,
  floatSpeed: 0.7,
};

type BoxConfig = {
  /** Must match <path id="…"> in logo-symbol.svg. */
  id: string;
  /** Extrusion depth between the bevelled faces, world units. */
  depth: number;
  /** Extra rotation on top of the parent at full pointer deflection. */
  yaw: number;
  pitch: number;
  roll: number;
  /** This box's own spring. */
  stiffness: number;
  damping: number;
  /** Idle micro-sway. */
  idleSpeed: number;
  idlePhase: number;
};

const BOXES: readonly BoxConfig[] = [
  {
    id: "box-1",
    depth: 0.3,
    yaw: 0.035,
    pitch: 0.02,
    roll: -0.006,
    stiffness: 34,
    damping: 0.95,
    idleSpeed: 0.52,
    idlePhase: 0.0,
  },
  {
    id: "box-2",
    depth: 0.3,
    yaw: 0.055,
    pitch: 0.035,
    roll: 0.008,
    stiffness: 46,
    damping: 0.9,
    idleSpeed: 0.63,
    idlePhase: 2.1,
  },
  {
    id: "box-3",
    depth: 0.3,
    yaw: 0.075,
    pitch: 0.05,
    roll: -0.01,
    stiffness: 28,
    damping: 0.97,
    idleSpeed: 0.47,
    idlePhase: 4.2,
  },
];

/** Final per-box clamp on the child rotation, idle sway included. */
const BOX_MAX_ANGLE = 0.1;
const BOX_IDLE_AMPLITUDE = 0.012;

/**
 * SMOKED GLASS. Opaque dielectric: metalness 0 means reflections come from Fresnel
 * (weak face-on, strong at grazing angles), which is what separates glass from dark metal.
 * Too dark: lighten `color`. Too mirror-like: lower `clearcoat` or raise `roughness`.
 */
const MATERIAL = {
  color: "#16120f",
  roughness: 0.18,
  metalness: 0,
  ior: 1.5,
  specularIntensity: 1,
  specularColor: "#fff0dc",
  clearcoat: 0.5,
  clearcoatRoughness: 0.06,
};

/**
 * Scene-level environment strength, applied through <Environment environmentIntensity>.
 * (material.envMapIntensity is ignored when the environment comes from scene.environment.)
 */
const ENV_INTENSITY = 1;

/**
 * One broad, camera-side champagne Lightformer. The front faces reflect the environment
 * around +z (behind the camera), where the original setup had no light. This panel's lower
 * edge sits just below the camera axis so it fades down across the faces as a soft gradient.
 * intensity: raise if the faces stay flat, lower if they wash out.
 */
const FRONT_LIGHT = {
  color: "#f4ebde",
  intensity: 1.1,
  position: [-1.2, 1.0, 6] as [number, number, number],
  scale: [3.6, 3.0, 1] as [number, number, number],
  /** Roll about z: tilts the panel's lower edge so the falloff runs diagonally across the logo. */
  rotation: [0, 0, 0.9] as [number, number, number],
};

/**
 * GOLDEN-HOUR LIGHT.
 * The strongest illumination remains inside the transparent WebGL canvas around the logo.
 * sunSize is only an upper bound: the sun plane is also shrunk at runtime so its falloff reaches
 * zero inside the visible frame (see sunPlane in Logo). sunEdgeMargin is the share of the available
 * room it may use; the remainder absorbs the tilt and float so the glow never meets the canvas edge.
 */
const LIGHT = {
  champagne: "#ffd9a0",
  amber: "#e8a04a",
  deepAmber: "#dc8c36",
  rimLight: 2.4,
  rimEnv: 7,
  frontFill: 1.5,
  sunOpacity: 0.34,
  sunSize: 2.5,
  sunEdgeMargin: 0.94,
  sunOffset: [0.2, 0.22] as [number, number],
  bodyOpacity: 0.5,
  bodySize: [1.3, 1.2] as [number, number],
  glowZ: -0.62,
};

type Loop = {
  outline: THREE.Vector2[];
  holes: THREE.Vector2[][];
};

function rgba(hex: string, a: number) {
  const c = new THREE.Color(hex);
  return `rgba(${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(
    c.b * 255,
  )},${a})`;
}

function toTexture(canvas: HTMLCanvasElement) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Low sun beyond the upper right: a stretched, tilted wash with no hard core. */
function makeSunTexture(core: string, edge: string) {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.save();
  ctx.translate(size * 0.68, size * 0.3);
  ctx.rotate(-0.5);
  ctx.scale(1.8, 1);

  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.4);
  g.addColorStop(0, rgba(core, 0.5));
  g.addColorStop(0.3, rgba(core, 0.34));
  g.addColorStop(0.6, rgba(edge, 0.14));
  g.addColorStop(1, rgba(edge, 0));

  ctx.fillStyle = g;
  ctx.fillRect(-size * 2, -size * 2, size * 4, size * 4);
  ctx.restore();

  ctx.globalCompositeOperation = "destination-in";

  const mask = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  mask.addColorStop(0, "rgba(0,0,0,1)");
  mask.addColorStop(0.5, "rgba(0,0,0,0.9)");
  mask.addColorStop(0.8, "rgba(0,0,0,0.25)");
  mask.addColorStop(1, "rgba(0,0,0,0)");

  ctx.fillStyle = mask;
  ctx.fillRect(0, 0, size, size);

  return toTexture(canvas);
}

/** Light slab directly behind the symbol, with a soft elliptical falloff. */
function makeBodyTexture(color: string) {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  g.addColorStop(0, rgba(color, 0.9));
  g.addColorStop(0.55, rgba(color, 0.8));
  g.addColorStop(0.8, rgba(color, 0.26));
  g.addColorStop(1, rgba(color, 0));

  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);

  ctx.globalCompositeOperation = "destination-in";

  const v = ctx.createLinearGradient(0, 0, 0, size);
  v.addColorStop(0, "rgba(0,0,0,1)");
  v.addColorStop(1, "rgba(0,0,0,0.45)");

  ctx.fillStyle = v;
  ctx.fillRect(0, 0, size, size);

  return toTexture(canvas);
}

/* ──────────────────────────────────────────────────────────────────────────────
 * Geometry
 * ────────────────────────────────────────────────────────────────────────────── */

type BuiltBox = {
  config: BoxConfig;
  geometry: THREE.ExtrudeGeometry;
  pivot: THREE.Vector3;
};

type BuiltLogo = {
  boxes: BuiltBox[];
  width: number;
  height: number;
};

function dropClosePoints(points: THREE.Vector2[], epsilon = 1e-6) {
  const out: THREE.Vector2[] = [];

  for (const p of points) {
    const last = out[out.length - 1];
    if (!last || last.distanceToSquared(p) > epsilon * epsilon) {
      out.push(p);
    }
  }

  if (
    out.length > 1 &&
    out[0].distanceToSquared(out[out.length - 1]) <= epsilon * epsilon
  ) {
    out.pop();
  }

  return out;
}

function buildLogoBoxes(
  svg: SVGResult,
  configs: readonly BoxConfig[] = BOXES,
): BuiltLogo {
  const parsed = configs.map((config) => {
    const path = svg.paths.find(
      (p) =>
        (p.userData?.node as { id?: string } | undefined)?.id === config.id,
    );

    if (!path) {
      throw new Error(`${LOGO_SRC} has no <path id="${config.id}">`);
    }

    const loops: Loop[] = path.toShapes().map((shape) => {
      const { shape: outline, holes } = shape.extractPoints(
        EDGE.curveSegments,
      );

      return {
        outline: dropClosePoints(outline),
        holes: holes.map((hole) => dropClosePoints(hole)),
      };
    });

    if (!loops.length) {
      throw new Error(`<path id="${config.id}"> produced no shapes`);
    }

    const bounds = new THREE.Box2();

    for (const loop of loops) {
      loop.outline.forEach((point) => bounds.expandByPoint(point));
    }

    return { config, loops, bounds };
  });

  const all = new THREE.Box2();
  parsed.forEach((item) => all.union(item.bounds));

  const allSize = all.getSize(new THREE.Vector2());
  const allCenter = all.getCenter(new THREE.Vector2());
  const k = LOGO_HEIGHT / allSize.y;

  const boxes = parsed.map(({ config, loops, bounds }) => {
    const center = bounds.getCenter(new THREE.Vector2());

    const toLocal = (point: THREE.Vector2) =>
      new THREE.Vector2(
        (point.x - center.x) * k,
        -(point.y - center.y) * k,
      );

    const shapes = loops.map(({ outline, holes }) => {
      const shape = new THREE.Shape(outline.map(toLocal));
      shape.holes = holes.map((hole) => new THREE.Path(hole.map(toLocal)));
      return shape;
    });

    const geometry = new THREE.ExtrudeGeometry(shapes, {
      depth: config.depth,
      steps: 1,
      curveSegments: EDGE.curveSegments,
      bevelEnabled: true,
      bevelSize: EDGE.bevelSize,
      bevelOffset: -EDGE.bevelSize,
      bevelThickness: EDGE.bevelThickness,
      bevelSegments: EDGE.bevelSegments,
    });

    geometry.translate(0, 0, -config.depth / 2);
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();

    const pivot = new THREE.Vector3(
      (center.x - allCenter.x) * k,
      -(center.y - allCenter.y) * k,
      0,
    );

    return { config, geometry, pivot };
  });

  return {
    boxes,
    width: allSize.x * k,
    height: LOGO_HEIGHT,
  };
}

/** Dev-time sanity check for outward-facing winding and closed geometry. */
function inspectGeometry(id: string, geometry: THREE.BufferGeometry) {
  const pos = geometry.getAttribute("position");
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();
  const net = new THREE.Vector3();
  let volume = 0;

  for (let i = 0; i + 2 < pos.count; i += 3) {
    a.fromBufferAttribute(pos, i);
    b.fromBufferAttribute(pos, i + 1);
    c.fromBufferAttribute(pos, i + 2);

    volume += a.dot(new THREE.Vector3().crossVectors(b, c)) / 6;

    net.add(
      new THREE.Vector3()
        .crossVectors(b.clone().sub(a), c.clone().sub(a))
        .multiplyScalar(0.5),
    );
  }

  if (!(volume > 0)) {
    console.warn(
      `[LogoScene] ${id}: signed volume ${volume.toFixed(
        5,
      )}; faces may be inverted`,
    );
  }

  if (net.length() > 1e-3) {
    console.warn(
      `[LogoScene] ${id}: surface is not closed (residual ${net
        .length()
        .toFixed(5)})`,
    );
  }

  if (Number.isNaN(geometry.boundingSphere?.radius ?? NaN)) {
    console.warn(`[LogoScene] ${id}: NaN in geometry`);
  }
}

/* ──────────────────────────────────────────────────────────────────────────────
 * Motion helpers
 * ────────────────────────────────────────────────────────────────────────────── */

type Spring = {
  x: number;
  v: number;
};

function stepSpring(
  spring: Spring,
  target: number,
  stiffness: number,
  dampingRatio: number,
  dt: number,
) {
  const damping = 2 * dampingRatio * Math.sqrt(stiffness);
  const steps = Math.max(1, Math.ceil(dt / (1 / 120)));
  const h = dt / steps;

  for (let i = 0; i < steps; i++) {
    spring.v +=
      (stiffness * (target - spring.x) - damping * spring.v) * h;
    spring.x += spring.v * h;
  }

  return spring.x;
}

const clamp = THREE.MathUtils.clamp;

type PointerRef = MutableRefObject<THREE.Vector2>;

function useReducedMotion() {
  const ref = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      ref.current = query.matches;
    };

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return ref;
}

/* ──────────────────────────────────────────────────────────────────────────────
 * Scene
 * ────────────────────────────────────────────────────────────────────────────── */

type BoxSprings = {
  yaw: Spring;
  pitch: Spring;
  roll: Spring;
};

const newBoxSprings = (): BoxSprings => ({
  yaw: { x: 0, v: 0 },
  pitch: { x: 0, v: 0 },
  roll: { x: 0, v: 0 },
});

function Logo({
  pointer,
  onFloorY,
}: {
  pointer: PointerRef;
  onFloorY: (y: number) => void;
}) {
  const svg = useLoader(SVGLoader, LOGO_SRC);
  const built = useMemo(() => buildLogoBoxes(svg), [svg]);
  const material = useMemo(
    () => new THREE.MeshPhysicalMaterial(MATERIAL),
    [],
  );
  const sunTexture = useMemo(
    () => makeSunTexture(LIGHT.amber, LIGHT.deepAmber),
    [],
  );
  const bodyTexture = useMemo(
    () => makeBodyTexture(LIGHT.deepAmber),
    [],
  );

  useEffect(
    () => () => {
      sunTexture.dispose();
      bodyTexture.dispose();
    },
    [sunTexture, bodyTexture],
  );

  const root = useRef<THREE.Group>(null);
  const pivots = useRef<Array<THREE.Group | null>>([]);
  const parentSprings = useRef({
    yaw: { x: 0, v: 0 },
    pitch: { x: 0, v: 0 },
  });
  const boxSprings = useRef(BOXES.map(newBoxSprings));
  const reducedMotion = useReducedMotion();
  const { viewport } = useThree();

  const fit = Math.min(
    1,
    (viewport.width * FRAME_FILL) / built.width,
    (viewport.height * FRAME_FILL) / built.height,
  );
  const floorY = -(built.height / 2) * fit - 0.3;

  // The canvas is a rectangle, so any glow still lit at its border is cut off in a hard edge.
  // Size the sun plane (a circular falloff) to the room left in the frame at its depth.
  const camZ = CAMERA.position[2];
  const sunWorldZ = (LIGHT.glowZ - 0.12) * fit;
  const depthScale = (camZ - sunWorldZ) / camZ;
  const sunRoom = Math.min(
    (viewport.width / 2) * depthScale - Math.abs(LIGHT.sunOffset[0] * LOGO_HEIGHT) * fit,
    (viewport.height / 2) * depthScale - Math.abs(LIGHT.sunOffset[1] * LOGO_HEIGHT) * fit,
  );
  const sunPlane = Math.min(
    LOGO_HEIGHT * LIGHT.sunSize,
    (2 * Math.max(sunRoom, 0.2) * LIGHT.sunEdgeMargin) / fit,
  );

  useEffect(() => onFloorY(floorY), [floorY, onFloorY]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      built.boxes.forEach((box) =>
        inspectGeometry(box.config.id, box.geometry),
      );
    }

    return () => built.boxes.forEach((box) => box.geometry.dispose());
  }, [built]);

  useEffect(() => () => material.dispose(), [material]);

  useFrame((state, delta) => {
    const group = root.current;
    if (!group) return;

    const dt = Math.min(delta, 1 / 20);
    const t = state.clock.elapsedTime;
    const idle = reducedMotion.current ? 0 : 1;
    const response = reducedMotion.current ? 0.35 : 1;
    const { x, y } = pointer.current;

    const parent = parentSprings.current;

    const yaw = stepSpring(
      parent.yaw,
      x * PARENT.yaw * response,
      PARENT.stiffness,
      PARENT.damping,
      dt,
    );

    const pitch = stepSpring(
      parent.pitch,
      -y * PARENT.pitch * response,
      PARENT.stiffness,
      PARENT.damping,
      dt,
    );

    group.rotation.set(
      clamp(
        pitch + Math.sin(t * 0.33 + 1.2) * 0.02 * idle,
        -PARENT.maxPitch,
        PARENT.maxPitch,
      ),
      clamp(
        yaw + Math.sin(t * 0.42) * 0.03 * idle,
        -PARENT.maxYaw,
        PARENT.maxYaw,
      ),
      clamp(
        Math.sin(t * 0.45) * 0.012 * idle,
        -PARENT.maxRoll,
        PARENT.maxRoll,
      ),
    );

    group.position.y =
      Math.sin(t * PARENT.floatSpeed) * PARENT.floatAmplitude * idle;

    BOXES.forEach((config, index) => {
      const pivot = pivots.current[index];
      if (!pivot) return;

      const spring = boxSprings.current[index];
      const sway =
        Math.sin(t * config.idleSpeed + config.idlePhase) *
        BOX_IDLE_AMPLITUDE *
        idle;

      const ry = stepSpring(
        spring.yaw,
        x * config.yaw * response,
        config.stiffness,
        config.damping,
        dt,
      );

      const rx = stepSpring(
        spring.pitch,
        -y * config.pitch * response,
        config.stiffness,
        config.damping,
        dt,
      );

      const rz = stepSpring(
        spring.roll,
        x * config.roll * response,
        config.stiffness,
        config.damping,
        dt,
      );

      pivot.rotation.set(
        clamp(rx + sway * 0.6, -BOX_MAX_ANGLE, BOX_MAX_ANGLE),
        clamp(ry + sway, -BOX_MAX_ANGLE, BOX_MAX_ANGLE),
        clamp(rz, -BOX_MAX_ANGLE, BOX_MAX_ANGLE),
      );
    });
  });

  return (
    <group ref={root} scale={fit} name="logo-root">
      <mesh
        position={[
          LIGHT.sunOffset[0] * LOGO_HEIGHT,
          LIGHT.sunOffset[1] * LOGO_HEIGHT,
          LIGHT.glowZ - 0.12,
        ]}
        scale={[sunPlane, sunPlane, 1]}
        renderOrder={-2}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={sunTexture}
          transparent
          opacity={LIGHT.sunOpacity}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <mesh
        position={[0, 0.03 * LOGO_HEIGHT, LIGHT.glowZ]}
        scale={[
          built.width * LIGHT.bodySize[0],
          built.height * LIGHT.bodySize[1],
          1,
        ]}
        renderOrder={-1}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={bodyTexture}
          transparent
          opacity={LIGHT.bodyOpacity}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {built.boxes.map(({ config, geometry, pivot }, index) => (
        <group
          key={config.id}
          name={`${config.id}-pivot`}
          ref={(node) => {
            pivots.current[index] = node;
          }}
          position={pivot}
        >
          <mesh
            name={config.id}
            geometry={geometry}
            material={material}
          />
        </group>
      ))}
    </group>
  );
}

function Scene({ pointer }: { pointer: PointerRef }) {
  const [floorY, setFloorY] = useState(-1.6);

  return (
    <>
      <hemisphereLight args={["#ffeed8", "#1a1612", 0.3]} />
      <directionalLight
        position={[-3, 2, 6]}
        intensity={LIGHT.frontFill}
        color="#fff0dc"
      />
      <directionalLight
        position={[2.5, 3.5, -4]}
        intensity={LIGHT.rimLight}
        color={LIGHT.amber}
      />

      <Environment
        resolution={256}
        frames={1}
        background={false}
        environmentIntensity={ENV_INTENSITY}
      >
        <Lightformer
          form="rect"
          intensity={LIGHT.rimEnv}
          color={LIGHT.champagne}
          position={[1.5, 5, -1.5]}
          scale={[9, 1.1, 1]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={LIGHT.rimEnv * 0.7}
          color={LIGHT.amber}
          position={[5.5, 1, -1]}
          scale={[1.2, 7, 1]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={LIGHT.rimEnv * 0.4}
          color={LIGHT.amber}
          position={[-5.5, 1, -1]}
          scale={[1.2, 7, 1]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={LIGHT.rimEnv * 0.9}
          color={LIGHT.amber}
          position={[0, 1, -7]}
          scale={[10, 6, 1]}
          target={[0, 0, 0]}
        />
        {/* Camera-side champagne panel: gives the front faces something to reflect. */}
        <Lightformer
          form="rect"
          intensity={FRONT_LIGHT.intensity}
          color={FRONT_LIGHT.color}
          position={FRONT_LIGHT.position}
          scale={FRONT_LIGHT.scale}
          rotation={FRONT_LIGHT.rotation}
        />
      </Environment>

      <ContactShadows
        position={[0, floorY, 0]}
        opacity={0.35}
        scale={4.4}
        blur={2.8}
        far={3.4}
        resolution={512}
      />

      <Logo pointer={pointer} onFloorY={setFloorY} />
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
 * Shell: pointer tracking, visibility pausing, graceful fallback
 * ────────────────────────────────────────────────────────────────────────────── */

class SceneBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error(
      "[LogoScene] falling back to the flat logo:",
      error,
      info.componentStack,
    );
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function LogoScene() {
  const pointer = useRef(new THREE.Vector2(0, 0));
  const shell = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  // Bumped when the browser restores a lost WebGL context, which remounts the Canvas.
  const [canvasKey, setCanvasKey] = useState(0);

  useEffect(() => {
    const element = shell.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    pointer.current.set(
      clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1),
      clamp(-(((event.clientY - rect.top) / rect.height) * 2 - 1), -1, 1),
    );
  }

  const rest = () => pointer.current.set(0, 0);

  return (
    <div
      ref={shell}
      className="canvas-shell"
      role="img"
      aria-label="North Bridge Tech symbol"
      onPointerMove={onPointerMove}
      onPointerLeave={rest}
      onPointerCancel={rest}
      onPointerUp={(event) => {
        if (event.pointerType !== "mouse") rest();
      }}
    >
      <SceneBoundary
        fallback={
          <img
            className="logo-fallback"
            src={LOGO_SRC}
            alt="North Bridge Tech symbol"
          />
        }
      >
        <Canvas
          key={canvasKey}
          dpr={[1, 2]}
          frameloop={visible ? "always" : "never"}
          camera={CAMERA}
          gl={{
            antialias: true,
            alpha: true,
            premultipliedAlpha: true,
            powerPreference: "high-performance",
          }}
          onCreated={({ gl }) => {
            // Keep the WebGL layer genuinely transparent so the page atmosphere
            // continues behind and around the Three.js scene.
            gl.setClearColor(0x000000, 0);
            gl.setClearAlpha(0);
            gl.outputColorSpace = THREE.SRGBColorSpace;

            // After a context loss the one-off environment map (the amber rim light) comes
            // back empty, so rebuild the whole scene once the context is restored.
            gl.domElement.addEventListener(
              "webglcontextrestored",
              () => setCanvasKey((key) => key + 1),
              { once: true },
            );
          }}
        >
          <Scene pointer={pointer} />
        </Canvas>
      </SceneBoundary>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
 * Services selector: one row open at a time. Plain buttons, no dependencies.
 * ────────────────────────────────────────────────────────────────────────────── */

const SERVICES = [
  {
    name: "Web Development",
    text: "Websites, e-commerce, SaaS, and custom software.",
  },
  {
    name: "Mobile Development",
    text: "Cross-platform applications and mobile products.",
  },
  {
    name: "Cloud & Deployment",
    text: "Deployment, cloud infrastructure, maintenance, and support.",
  },
  {
    name: "UI/UX Design",
    text: "User flows, interface design, prototypes, and handoff.",
  },
  {
    name: "Integrations",
    text: "API integrations, third-party services, and workflow automation.",
  },
  {
    name: "Digital Marketing",
    text: "Instagram profile setup, creative assets, flyers, and advertising support.",
  },
] as const;

function Services() {
  const [active, setActive] = useState(0);

  return (
    <div className="services" role="group" aria-label="Services">
      <p className="services-label">WHAT WE BUILD</p>
      <ul className="services-list">
        {SERVICES.map((service, index) => {
          const open = index === active;

          return (
            <li key={service.name} className="service" data-open={open}>
              <button
                type="button"
                id={`service-button-${index}`}
                className="service-button"
                aria-expanded={open}
                aria-controls={`service-panel-${index}`}
                onClick={() => setActive(index)}
              >
                <span className="service-num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="service-name">{service.name}</span>
                <span className="service-mark" aria-hidden="true" />
              </button>
              <div
                id={`service-panel-${index}`}
                className="service-panel"
                role="group"
                aria-labelledby={`service-button-${index}`}
              >
                <div className="service-panel-inner">
                  <p>{service.text}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Home() {
  return (
    <main className="page">
      <header className="topbar">
        <a className="brand" href="/" aria-label="North Bridge Tech">
          <span className="brand-mark">NB</span>
          <span>NORTH BRIDGE TECH</span>
        </a>
        <span className="topbar-label">COMING SOON</span>
      </header>

      <section className="content">
        <div className="visual">
          <LogoScene />
        </div>
        <div className="copy">
          <p className="eyebrow"><span /> DIGITAL PRODUCT STUDIO</p>
          <h1>Ideas,<br />connected.<br />Possibilities,<br />built.</h1>
          <p className="intro">
            We bring web, mobile, cloud, design, integrations, and digital
            marketing together to help ideas move forward.
          </p>
          <div className="status"><span className="dot" /> A new bridge is being built. Coming soon.</div>
          <Services />
        </div>
      </section>

      <footer className="footer">
        <span>northbridgetech.group</span>
      </footer>
    </main>
  );
}