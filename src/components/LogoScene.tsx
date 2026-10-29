"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { Component, useEffect, useMemo, useRef, useState } from "react";
import type { ErrorInfo, MutableRefObject, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import type { SVGResult } from "three/examples/jsm/loaders/SVGLoader.js";

const LOGO_SRC = "/logo-symbol.svg";
const LOGO_HEIGHT = 2.6;
const FRAME_FILL = 0.84;

const CAMERA = {
  position: [0, 0, 7] as [number, number, number],
  fov: 30,
  near: 0.5,
  far: 24,
};

const EDGE = {
  bevelSize: 0.01,
  bevelThickness: 0.012,
  bevelSegments: 4,
  curveSegments: 5,
};

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
  id: string;
  depth: number;
  yaw: number;
  pitch: number;
  roll: number;
  stiffness: number;
  damping: number;
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
    depth: 0.26,
    yaw: 0.05,
    pitch: -0.025,
    roll: 0.008,
    stiffness: 38,
    damping: 0.95,
    idleSpeed: 0.65,
    idlePhase: 1.7,
  },
  {
    id: "box-3",
    depth: 0.32,
    yaw: -0.04,
    pitch: 0.03,
    roll: -0.01,
    stiffness: 30,
    damping: 0.95,
    idleSpeed: 0.44,
    idlePhase: 3.1,
  },
];

// Precision light theme titanium finish with #8A8683 slate metal and #C42625 crimson rim
const MATERIAL = {
  color: "#7E7A77",
  roughness: 0.2,
  metalness: 0.85,
  clearcoat: 0.8,
  clearcoatRoughness: 0.12,
  ior: 1.52,
  specularIntensity: 1.0,
  specularColor: "#C42625",
};

const LIGHT = {
  crimson: "#C42625",
  titanium: "#E8E6E4",
  studioWhite: "#FFFFFF",
  ground: "#F5F3F0",
};

const FRONT_LIGHT = {
  intensity: 3.2,
  color: "#FFFFFF",
  position: [-0.6, 0.4, 4.2] as [number, number, number],
  scale: [7.2, 5.4, 1] as [number, number, number],
  rotation: [0, 0.1, 0] as [number, number, number],
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function Spring(stiffness: number, damping: number) {
  let position = 0;
  let velocity = 0;

  return {
    step(target: number, delta: number): number {
      const dt = Math.min(delta, 0.064);
      const force = (target - position) * stiffness;
      const dampingForce = -velocity * 2 * Math.sqrt(stiffness) * damping;
      velocity += (force + dampingForce) * dt;
      position += velocity * dt;
      return position;
    },
    get value() {
      return position;
    },
    reset(val = 0) {
      position = val;
      velocity = 0;
    },
  };
}

type ExtrudedBox = {
  id: string;
  config: BoxConfig;
  geometry: THREE.BufferGeometry;
  localCenter: THREE.Vector3;
  pivotOffset: THREE.Vector3;
};

function useExtrudedLogo(scale: number): {
  boxes: ExtrudedBox[];
  totalBounds: THREE.Box3;
} {
  const svg = useLoader(SVGLoader, LOGO_SRC) as SVGResult;

  return useMemo(() => {
    const totalBounds = new THREE.Box3();
    const parsedBoxes: {
      id: string;
      config: BoxConfig;
      shape: THREE.Shape;
      geometry: THREE.BufferGeometry;
      localCenter: THREE.Vector3;
    }[] = [];

    const extrudeSettingsBase = {
      bevelEnabled: true,
      bevelSize: EDGE.bevelSize,
      bevelThickness: EDGE.bevelThickness,
      bevelOffset: -EDGE.bevelSize,
      bevelSegments: EDGE.bevelSegments,
      curveSegments: EDGE.curveSegments,
    };

    for (const config of BOXES) {
      const path = svg.paths.find(
        (p) => (p.userData?.node as SVGElement | undefined)?.id === config.id
      );
      if (!path) continue;

      const shapes = SVGLoader.createShapes(path);
      if (!shapes.length) continue;

      const shape = shapes[0];
      const geom = new THREE.ExtrudeGeometry(shape, {
        ...extrudeSettingsBase,
        depth: config.depth,
      });

      // SVG coordinates: Y down, scale to fit world height
      geom.scale(scale, -scale, scale);
      geom.computeBoundingBox();

      const localCenter = new THREE.Vector3();
      if (geom.boundingBox) {
        geom.boundingBox.getCenter(localCenter);
        totalBounds.union(geom.boundingBox);
      }

      parsedBoxes.push({
        id: config.id,
        config,
        shape,
        geometry: geom,
        localCenter,
      });
    }

    const symbolCenter = new THREE.Vector3();
    totalBounds.getCenter(symbolCenter);

    const boxes: ExtrudedBox[] = parsedBoxes.map((b) => {
      // Center geometry around world origin
      b.geometry.translate(-symbolCenter.x, -symbolCenter.y, 0);

      const adjustedCenter = b.localCenter
        .clone()
        .sub(new THREE.Vector3(symbolCenter.x, symbolCenter.y, 0));

      return {
        id: b.id,
        config: b.config,
        geometry: b.geometry,
        localCenter: adjustedCenter,
        pivotOffset: adjustedCenter.clone(),
      };
    });

    return { boxes, totalBounds };
  }, [svg, scale]);
}

function Logo({
  pointer,
  onFloorY,
}: {
  pointer: MutableRefObject<THREE.Vector2>;
  onFloorY: (y: number) => void;
}) {
  const { viewport } = useThree();
  const parentRef = useRef<THREE.Group>(null);
  const boxRefs = useRef<(THREE.Group | null)[]>([]);

  // Compute world scale to fit viewport height comfortably
  const scale = useMemo(() => {
    const rawSvgHeight = 1215; // Known height from SVG viewBox
    return (LOGO_HEIGHT / rawSvgHeight) * Math.min(1, viewport.height / 5.2);
  }, [viewport.height]);

  const { boxes, totalBounds } = useExtrudedLogo(scale);

  // Send floor shadow Y position
  useEffect(() => {
    const bottomY = -((totalBounds.max.y - totalBounds.min.y) * 0.52);
    onFloorY(bottomY);
  }, [totalBounds, onFloorY]);

  // Spring physics
  const parentSpringX = useMemo(() => Spring(PARENT.stiffness, PARENT.damping), []);
  const parentSpringY = useMemo(() => Spring(PARENT.stiffness, PARENT.damping), []);

  const boxSprings = useMemo(
    () =>
      BOXES.map((b) => ({
        x: Spring(b.stiffness, b.damping),
        y: Spring(b.stiffness, b.damping),
      })),
    []
  );

  const material = useMemo(() => new THREE.MeshPhysicalMaterial(MATERIAL), []);

  useEffect(() => {
    return () => {
      material.dispose();
      boxes.forEach((b) => b.geometry.dispose());
    };
  }, [material, boxes]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const px = pointer.current.x;
    const py = pointer.current.y;

    // Parent group tilt with micro-float
    const targetParentYaw = clamp(px * PARENT.yaw, -PARENT.maxYaw, PARENT.maxYaw);
    const targetParentPitch = clamp(-py * PARENT.pitch, -PARENT.maxPitch, PARENT.maxPitch);

    const curParentYaw = parentSpringX.step(targetParentYaw, delta);
    const curParentPitch = parentSpringY.step(targetParentPitch, delta);

    if (parentRef.current) {
      parentRef.current.rotation.y = curParentYaw;
      parentRef.current.rotation.x = curParentPitch;
      parentRef.current.position.y = Math.sin(time * PARENT.floatSpeed) * PARENT.floatAmplitude;
    }

    // Individual box springs for organic mechanical micro-response
    boxRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const cfg = BOXES[i];
      const springs = boxSprings[i];

      const targetYaw = px * cfg.yaw + Math.sin(time * cfg.idleSpeed + cfg.idlePhase) * 0.015;
      const targetPitch = -py * cfg.pitch + Math.cos(time * cfg.idleSpeed + cfg.idlePhase) * 0.012;

      ref.rotation.y = springs.x.step(targetYaw, delta);
      ref.rotation.x = springs.y.step(targetPitch, delta);
    });
  });

  return (
    <group ref={parentRef}>
      {boxes.map((box, index) => (
        <group
          key={box.id}
          ref={(el) => {
            boxRefs.current[index] = el;
          }}
          position={[0, 0, 0]}
        >
          <mesh geometry={box.geometry} material={material} castShadow receiveShadow />
        </group>
      ))}
    </group>
  );
}

function Scene({ pointer }: { pointer: MutableRefObject<THREE.Vector2> }) {
  const [floorY, setFloorY] = useState(-1.4);

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 6, 4]} intensity={2.4} color="#FFFFFF" castShadow />
      <directionalLight position={[-5, 4, -3]} intensity={1.8} color={LIGHT.crimson} />
      <directionalLight position={[0, -4, 2]} intensity={0.6} color={LIGHT.titanium} />

      <Environment resolution={256}>
        {/* Soft studio light ring */}
        <Lightformer
          form="ring"
          intensity={2.8}
          color={LIGHT.studioWhite}
          position={[0, 4, 2]}
          scale={[8, 8, 1]}
          target={[0, 0, 0]}
        />
        {/* Subtle crimson tech lightformer on the right */}
        <Lightformer
          form="rect"
          intensity={3.5}
          color={LIGHT.crimson}
          position={[5, 1, -2]}
          scale={[6, 8, 1]}
          target={[0, 0, 0]}
        />
        {/* Front fill lightformer */}
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
        opacity={0.3}
        scale={4.8}
        blur={2.4}
        far={3.6}
        color="#8A8683"
      />

      <Logo pointer={pointer} onFloorY={setFloorY} />
    </>
  );
}

class SceneBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error("[LogoScene] error fallback:", error, info.componentStack);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function LogoScene({ className = "" }: { className?: string }) {
  const pointer = useRef(new THREE.Vector2(0, 0));
  const shell = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const element = shell.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    pointer.current.set(
      clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1),
      clamp(-(((event.clientY - rect.top) / rect.height) * 2 - 1), -1, 1)
    );
  }

  const rest = () => pointer.current.set(0, 0);

  return (
    <div
      ref={shell}
      className={`relative w-full h-[190px] sm:h-[220px] lg:h-[240px] flex items-center justify-center ${className}`}
      role="img"
      aria-label="North Bridge Tech 3D Architecture Symbol"
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
            className="w-48 h-auto object-contain opacity-90 filter drop-shadow-md"
            src={LOGO_SRC}
            alt="North Bridge Tech symbol"
          />
        }
      >
        <Canvas
          dpr={[1, 2]}
          frameloop={visible ? "always" : "never"}
          camera={CAMERA}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.outputColorSpace = THREE.SRGBColorSpace;
          }}
        >
          <Scene pointer={pointer} />
        </Canvas>
      </SceneBoundary>
    </div>
  );
}
