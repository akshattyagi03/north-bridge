"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export type AnimationMode = "float" | "explode" | "hinge" | "assemble" | "wave";

export interface GeometricLogoCanvasProps {
  mode?: AnimationMode;
  interactive?: boolean;
  autoRotate?: boolean;
  wireframe?: boolean;
  className?: string;
  transparentBg?: boolean;
  backgroundColor?: number;
  cameraPreset?: "isometric" | "front" | "side" | "top";
  loopAssemble?: boolean;
  maxAssembleCycles?: number;
  onAssembleComplete?: () => void;
  onAssembleProgress?: (ratio: number) => void;
  explodeFactor?: number;
  scale?: number;
  hoverTilt?: boolean;
}

function createRoundedRectShape(w: number, h: number, r: number): THREE.Shape {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return shape;
}

function easeOutElastic(x: number): number {
  const c4 = (2 * Math.PI) / 3;
  return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

export default function GeometricLogoCanvas({
  mode = "float",
  interactive = false,
  autoRotate = false,
  wireframe = false,
  className = "w-full h-full",
  transparentBg = true,
  backgroundColor = 0x12141a,
  cameraPreset = "isometric",
  loopAssemble = true,
  maxAssembleCycles,
  onAssembleComplete,
  onAssembleProgress,
  explodeFactor = 0.65,
  scale = 1,
  hoverTilt = true,
}: GeometricLogoCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Keep references to props so render loop can read current values without resetting Three.js scene
  const modeRef = useRef(mode);
  modeRef.current = mode;

  const autoRotateRef = useRef(autoRotate);
  autoRotateRef.current = autoRotate;

  const wireframeRef = useRef(wireframe);
  wireframeRef.current = wireframe;

  const explodeFactorRef = useRef(explodeFactor);
  explodeFactorRef.current = explodeFactor;

  const loopAssembleRef = useRef(loopAssemble);
  loopAssembleRef.current = loopAssemble;

  const maxAssembleCyclesRef = useRef(maxAssembleCycles);
  maxAssembleCyclesRef.current = maxAssembleCycles;

  const onAssembleCompleteRef = useRef(onAssembleComplete);
  onAssembleCompleteRef.current = onAssembleComplete;

  const onAssembleProgressRef = useRef(onAssembleProgress);
  onAssembleProgressRef.current = onAssembleProgress;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    if (!transparentBg) {
      scene.background = new THREE.Color(backgroundColor);
    }

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // Camera
    const fov = 42;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 100);

    const presets = {
      isometric: new THREE.Vector3(6.8, 5.2, 7.8),
      front: new THREE.Vector3(0, 0, 9.8),
      side: new THREE.Vector3(9.8, 0, 0),
      top: new THREE.Vector3(0, 10.2, 0.001),
    };
    camera.position.copy(presets[cameraPreset] || presets.isometric);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: transparentBg,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.appendChild(renderer.domElement);

    // Controls
    let controls: OrbitControls | null = null;
    if (interactive) {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.enableZoom = true;
      controls.maxDistance = 20;
      controls.minDistance = 4;
      controls.target.set(0, 0, 0);
    }

    // Lighting
    const ambLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 1.4);
    keyLight.position.set(8, 14, 10);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdbe6ff, 0.8);
    fillLight.position.set(-10, 6, -8);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
    rimLight.position.set(0, -10, 8);
    scene.add(rimLight);

    // Materials
    const redMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xc52623,
      roughness: 0.28,
      metalness: 0.08,
      clearcoat: 0.35,
      clearcoatRoughness: 0.25,
    });

    const charcoalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x484944,
      roughness: 0.32,
      metalness: 0.15,
      clearcoat: 0.3,
    });

    const whiteCoreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd6dade,
      roughness: 0.4,
      metalness: 0.05,
    });

    const allMaterials = [redMaterial, charcoalMaterial, whiteCoreMaterial];

    // Root Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    /* 1. UPPER SLAB */
    const slabW = 2.4;
    const slabH = 3.65;
    const slabDepth = 0.52;
    const slabShape = createRoundedRectShape(slabW, slabH, 0.32);
    const slabGeo = new THREE.ExtrudeGeometry(slabShape, {
      depth: slabDepth,
      bevelEnabled: true,
      bevelSegments: 5,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    });
    slabGeo.center();
    const upperSlab = new THREE.Mesh(slabGeo, redMaterial);
    upperSlab.castShadow = true;
    upperSlab.receiveShadow = true;

    const slabPivot = new THREE.Group();
    slabPivot.position.set(-0.35, 1.45, 0);
    slabPivot.add(upperSlab);
    modelGroup.add(slabPivot);

    /* 2. PILL */
    const pillRadius = 0.44;
    const pillCylinderLength = 2.45;
    const pillGeo = new THREE.CylinderGeometry(pillRadius, pillRadius, pillCylinderLength, 32);
    const pillCapGeo = new THREE.SphereGeometry(pillRadius, 32, 16);

    const pillMeshGroup = new THREE.Group();
    const pillCylinder = new THREE.Mesh(pillGeo, charcoalMaterial);
    pillCylinder.castShadow = true;
    pillMeshGroup.add(pillCylinder);

    const pillTopCap = new THREE.Mesh(pillCapGeo, charcoalMaterial);
    pillTopCap.position.y = pillCylinderLength / 2;
    pillTopCap.castShadow = true;
    pillMeshGroup.add(pillTopCap);

    const pillBottomCap = new THREE.Mesh(pillCapGeo, charcoalMaterial);
    pillBottomCap.position.y = -pillCylinderLength / 2;
    pillBottomCap.castShadow = true;
    pillMeshGroup.add(pillBottomCap);

    const pillPivot = new THREE.Group();
    pillPivot.position.set(1.48, 1.45, 0);
    pillPivot.add(pillMeshGroup);
    modelGroup.add(pillPivot);

    /* 3. STEM */
    const stemW = 0.65;
    const stemH = 2.4;
    const stemShape = createRoundedRectShape(stemW, stemH, 0.16);
    const stemGeo = new THREE.ExtrudeGeometry(stemShape, {
      depth: slabDepth,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.07,
      bevelThickness: 0.07,
    });
    stemGeo.center();
    const stemMesh = new THREE.Mesh(stemGeo, redMaterial);
    stemMesh.castShadow = true;
    stemMesh.receiveShadow = true;

    const stemPivot = new THREE.Group();
    stemPivot.position.set(-1.22, -1.05, 0);
    stemPivot.add(stemMesh);
    modelGroup.add(stemPivot);

    /* 4. BASE WITH NOTCH */
    const baseGroup = new THREE.Group();
    baseGroup.position.set(0, -2.15, 0);

    const baseLeftShape = createRoundedRectShape(2.4, 0.9, 0.22);
    const baseLeftGeo = new THREE.ExtrudeGeometry(baseLeftShape, {
      depth: slabDepth,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.07,
      bevelThickness: 0.07,
    });
    baseLeftGeo.center();
    const baseLeftMesh = new THREE.Mesh(baseLeftGeo, redMaterial);
    baseLeftMesh.position.set(-0.35, 0, 0);
    baseLeftMesh.castShadow = true;
    baseLeftMesh.receiveShadow = true;
    baseGroup.add(baseLeftMesh);

    const notchPivot = new THREE.Group();
    notchPivot.position.set(1.05, 0, 0);
    const notchCoreGeo = new THREE.BoxGeometry(0.18, 0.85, slabDepth * 0.9);
    const notchCoreMesh = new THREE.Mesh(notchCoreGeo, whiteCoreMaterial);
    notchCoreMesh.castShadow = true;
    notchPivot.add(notchCoreMesh);
    baseGroup.add(notchPivot);

    const footShape = createRoundedRectShape(0.65, 0.9, 0.25);
    const footGeo = new THREE.ExtrudeGeometry(footShape, {
      depth: slabDepth,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.07,
      bevelThickness: 0.07,
    });
    footGeo.center();
    const footMesh = new THREE.Mesh(footGeo, redMaterial);
    footMesh.position.set(1.52, 0, 0);
    footMesh.castShadow = true;
    footMesh.receiveShadow = true;
    baseGroup.add(footMesh);

    modelGroup.add(baseGroup);

    /* 5. BOOK WING WITH HINGE PIVOT */
    const bookHingePivot = new THREE.Group();
    bookHingePivot.position.set(0.72, -0.95, 0);

    const bookWingContent = new THREE.Group();
    const bookWallShape = createRoundedRectShape(2.35, 1.85, 0.25);
    const bookWallGeo = new THREE.ExtrudeGeometry(bookWallShape, {
      depth: 0.32,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    });
    bookWallGeo.center();
    const bookWallMesh = new THREE.Mesh(bookWallGeo, redMaterial);
    bookWallMesh.rotation.y = Math.PI / 2;
    bookWallMesh.position.set(0.13, 0, 1.25);
    bookWallMesh.castShadow = true;
    bookWallMesh.receiveShadow = true;
    bookWingContent.add(bookWallMesh);

    const pageCoreShape = createRoundedRectShape(2.1, 1.65, 0.15);
    const pageCoreGeo = new THREE.ExtrudeGeometry(pageCoreShape, {
      depth: 0.24,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    });
    pageCoreGeo.center();
    const pageCoreMesh = new THREE.Mesh(pageCoreGeo, whiteCoreMaterial);
    pageCoreMesh.rotation.y = Math.PI / 2;
    pageCoreMesh.position.set(-0.04, 0, 1.25);
    pageCoreMesh.castShadow = true;
    pageCoreMesh.receiveShadow = true;
    bookWingContent.add(pageCoreMesh);

    const trimGeo = new THREE.BoxGeometry(0.38, 0.14, 2.25);
    const topTrim = new THREE.Mesh(trimGeo, redMaterial);
    topTrim.position.set(0, 0.89, 1.25);
    topTrim.castShadow = true;
    bookWingContent.add(topTrim);

    const bottomTrim = new THREE.Mesh(trimGeo, redMaterial);
    bottomTrim.position.set(0, -0.89, 1.25);
    bottomTrim.castShadow = true;
    bookWingContent.add(bottomTrim);

    const sideFootGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.8, 20);
    sideFootGeo.rotateX(Math.PI / 2);
    const sideFoot = new THREE.Mesh(sideFootGeo, redMaterial);
    sideFoot.position.set(0, -1.65, 0.45);
    sideFoot.castShadow = true;
    bookWingContent.add(sideFoot);

    bookHingePivot.add(bookWingContent);
    modelGroup.add(bookHingePivot);

    // Apply scale & center
    modelGroup.scale.setScalar(scale);
    modelGroup.position.set(-0.25 * scale, 0.35 * scale, -0.6 * scale);

    // Elements lookup
    const elements = {
      slab: {
        pivot: slabPivot,
        basePos: new THREE.Vector3(-0.35, 1.45, 0),
        explodeDelta: new THREE.Vector3(-0.8, 1.6, -1.2),
      },
      pill: {
        pivot: pillPivot,
        basePos: new THREE.Vector3(1.48, 1.45, 0),
        explodeDelta: new THREE.Vector3(1.8, 1.2, 0.6),
      },
      stem: {
        pivot: stemPivot,
        basePos: new THREE.Vector3(-1.22, -1.05, 0),
        explodeDelta: new THREE.Vector3(-1.8, -0.6, -0.8),
      },
      base: {
        pivot: baseGroup,
        basePos: new THREE.Vector3(0, -2.15, 0),
        explodeDelta: new THREE.Vector3(0, -1.6, 0.4),
      },
      notch: {
        pivot: notchPivot,
        basePos: new THREE.Vector3(1.05, 0, 0),
        explodeDelta: new THREE.Vector3(0, -0.9, 1.2),
      },
      wing: {
        pivot: bookHingePivot,
        basePos: new THREE.Vector3(0.72, -0.95, 0),
        explodeDelta: new THREE.Vector3(1.4, -0.4, 2.2),
      },
    };

    // Hover tilt tracking if not interactive
    let pointerX = 0;
    let pointerY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      if (!hoverTilt || interactive) return;
      const rect = container.getBoundingClientRect();
      pointerX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = pointerX * 0.35;
      targetRotX = -pointerY * 0.25;
    };

    const handlePointerLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
    };

    if (hoverTilt && !interactive) {
      container.addEventListener("mousemove", handlePointerMove);
      container.addEventListener("mouseleave", handlePointerLeave);
    }

    // Animation loop state
    let animTime = 0;
    let assembleTime = 0;
    let currentExplode = 0;
    let assembleHasCompleted = false;
    let isVisible = true;
    let reqId = 0;
    let prevTime = performance.now();

    // IntersectionObserver to pause rendering when offscreen
    const obs = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    obs.observe(container);

    const stages = [
      { key: "base", start: 0.0, end: 0.55, offset: new THREE.Vector3(0, -6, 0) },
      { key: "stem", start: 0.2, end: 0.75, offset: new THREE.Vector3(-6, 0, 0) },
      { key: "slab", start: 0.4, end: 1.05, offset: new THREE.Vector3(0, 8, -4) },
      { key: "wing", start: 0.65, end: 1.35, offset: new THREE.Vector3(6, 0, 6) },
      { key: "pill", start: 0.9, end: 1.6, offset: new THREE.Vector3(5, 7, 0) },
      { key: "notch", start: 1.15, end: 1.8, offset: new THREE.Vector3(0, -3, 4) },
    ];

    const render = (now: number) => {
      reqId = requestAnimationFrame(render);
      if (!isVisible) return;

      const dt = Math.min((now - prevTime) / 1000, 0.1);
      prevTime = now;

      animTime += dt;
      assembleTime += dt;

      // Update wireframe state
      const isWf = wireframeRef.current;
      allMaterials.forEach((m) => {
        if (m.wireframe !== isWf) m.wireframe = isWf;
      });

      // Reset base transforms
      for (const k in elements) {
        const el = elements[k as keyof typeof elements];
        el.pivot.position.copy(el.basePos);
        el.pivot.rotation.set(0, 0, 0);
        el.pivot.scale.setScalar(1);
      }

      const activeMode = modeRef.current;

      if (activeMode === "float") {
        const t = animTime * 1.5;
        elements.slab.pivot.position.y += Math.sin(t) * 0.12;
        elements.slab.pivot.rotation.z = Math.sin(t * 0.8) * 0.02;

        elements.pill.pivot.position.y += Math.sin(t + 1.2) * 0.18;
        elements.pill.pivot.rotation.x = Math.cos(t * 1.1) * 0.04;

        elements.stem.pivot.position.y += Math.sin(t + 2.1) * 0.1;
        elements.base.pivot.position.y += Math.sin(t + 2.8) * 0.08;

        elements.wing.pivot.rotation.y = Math.sin(t * 0.9) * 0.08;
        elements.wing.pivot.position.y += Math.sin(t + 1.6) * 0.14;
      } else if (activeMode === "explode") {
        currentExplode = THREE.MathUtils.lerp(currentExplode, explodeFactorRef.current, 0.08);
        for (const k in elements) {
          const el = elements[k as keyof typeof elements];
          el.pivot.position.addScaledVector(el.explodeDelta, currentExplode);
          el.pivot.position.y += Math.sin(animTime * 2 + el.basePos.x) * (0.04 * currentExplode);
          el.pivot.rotation.y = Math.sin(animTime * 1.5 + el.basePos.y) * (0.05 * currentExplode);
        }
      } else if (activeMode === "hinge") {
        const swing = Math.sin(animTime * 2.2);
        elements.wing.pivot.rotation.y = swing * 0.75;
        elements.slab.pivot.position.z = Math.sin(animTime * 2.2) * 0.08;
        elements.pill.pivot.position.x = elements.pill.basePos.x + Math.cos(animTime * 2.2) * 0.06;
      } else if (activeMode === "assemble") {
        const duration = 1.85;
        const pause = 0.35;
        const cyclePeriod = duration + pause;
        const maxCycles = maxAssembleCyclesRef.current;

        let cycle = 0;
        if (maxCycles !== undefined && maxCycles > 0) {
          const totalDuration = maxCycles * cyclePeriod;
          const currentProgress = Math.min(assembleTime / totalDuration, 1);
          if (onAssembleProgressRef.current) {
            onAssembleProgressRef.current(currentProgress);
          }

          if (assembleTime >= totalDuration) {
            cycle = duration;
            if (!assembleHasCompleted) {
              assembleHasCompleted = true;
              if (onAssembleCompleteRef.current) {
                onAssembleCompleteRef.current();
              }
            }
          } else {
            const rawInCycle = assembleTime % cyclePeriod;
            cycle = Math.min(rawInCycle, duration);
          }
        } else {
          cycle = loopAssembleRef.current
            ? assembleTime % (duration + 1.2)
            : Math.min(assembleTime, duration + 0.1);

          if (cycle >= duration && !assembleHasCompleted) {
            assembleHasCompleted = true;
            if (onAssembleCompleteRef.current) {
              onAssembleCompleteRef.current();
            }
          }
        }

        stages.forEach((s) => {
          const el = elements[s.key as keyof typeof elements];
          if (cycle < s.start) {
            el.pivot.position.add(s.offset);
            el.pivot.scale.set(0.001, 0.001, 0.001);
          } else if (cycle >= s.start && cycle <= s.end) {
            const p = (cycle - s.start) / (s.end - s.start);
            const eased = easeOutElastic(Math.min(p, 1));
            el.pivot.position.lerpVectors(el.basePos.clone().add(s.offset), el.basePos, eased);
            const scaleEased = easeOutCubic(Math.min(p * 1.2, 1));
            el.pivot.scale.setScalar(scaleEased);
          } else {
            el.pivot.position.copy(el.basePos);
            el.pivot.scale.setScalar(1);
          }
        });
      } else if (activeMode === "wave") {
        const order: (keyof typeof elements)[] = ["base", "notch", "stem", "wing", "slab", "pill"];
        order.forEach((k, index) => {
          const el = elements[k];
          const wave = Math.sin(animTime * 3.5 - index * 0.8);
          const pulse = Math.max(0, wave);
          el.pivot.position.addScaledVector(el.explodeDelta, pulse * 0.45);
          el.pivot.scale.setScalar(1 + pulse * 0.06);
        });
      }

      // Auto rotation
      if (autoRotateRef.current) {
        modelGroup.rotation.y += dt * 0.65;
      } else if (hoverTilt && !interactive) {
        modelGroup.rotation.y = THREE.MathUtils.lerp(modelGroup.rotation.y, targetRotY, 0.06);
        modelGroup.rotation.x = THREE.MathUtils.lerp(modelGroup.rotation.x, targetRotX, 0.06);
      }

      if (controls) {
        controls.update();
      }

      renderer.render(scene, camera);
    };

    reqId = requestAnimationFrame(render);

    // Resize handling
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(reqId);
      obs.disconnect();
      resizeObserver.disconnect();
      if (hoverTilt && !interactive) {
        container.removeEventListener("mousemove", handlePointerMove);
        container.removeEventListener("mouseleave", handlePointerLeave);
      }
      if (controls) controls.dispose();
      renderer.dispose();
      slabGeo.dispose();
      pillGeo.dispose();
      pillCapGeo.dispose();
      stemGeo.dispose();
      baseLeftGeo.dispose();
      notchCoreGeo.dispose();
      footGeo.dispose();
      bookWallGeo.dispose();
      pageCoreGeo.dispose();
      trimGeo.dispose();
      sideFootGeo.dispose();
      allMaterials.forEach((m) => m.dispose());
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [cameraPreset, interactive, scale, transparentBg, backgroundColor, hoverTilt]);

  return <div ref={containerRef} className={className} />;
}
