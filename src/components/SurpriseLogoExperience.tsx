"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import * as THREE from "three";
import { animate, createTimeline } from "animejs";
import "animejs/adapters/three";
import { ArrowLeft, RotateCcw, Sparkles } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface SurpriseLogoExperienceProps {
  isOpen: boolean;
  onClose: () => void;
}

// -----------------------------------------------------------------------------
// 3D Geometry Builders for "Bridge" wordmark
// Styled in the iconic geometric Anime.js design, where "i" has the signature
// Anime.js pill stem and bouncing floating dot.
// -----------------------------------------------------------------------------

function createBridgeGeometries() {
  const extrudeSettings = {
    depth: 0.42,
    bevelEnabled: true,
    bevelSegments: 4,
    bevelSize: 0.06,
    bevelThickness: 0.06,
  };

  // 1. Letter B (Uppercase geometric)
  const bShape = new THREE.Shape();
  const x0 = -0.75,
    w = 1.5,
    h = 2.5;
  bShape.moveTo(x0, -h / 2);
  bShape.lineTo(x0, h / 2);
  bShape.lineTo(x0 + 0.8, h / 2);
  bShape.quadraticCurveTo(x0 + w, h / 2, x0 + w, h / 4);
  bShape.quadraticCurveTo(x0 + w, 0.05, x0 + 0.75, 0.05);
  bShape.quadraticCurveTo(x0 + w + 0.08, 0.05, x0 + w + 0.08, -h / 4);
  bShape.quadraticCurveTo(x0 + w + 0.08, -h / 2, x0 + 0.8, -h / 2);
  bShape.closePath();

  const bTopHole = new THREE.Path();
  bTopHole.moveTo(x0 + 0.45, 0.25);
  bTopHole.lineTo(x0 + 0.45, h / 2 - 0.25);
  bTopHole.lineTo(x0 + 0.75, h / 2 - 0.25);
  bTopHole.quadraticCurveTo(x0 + w - 0.35, h / 2 - 0.25, x0 + w - 0.35, h / 4);
  bTopHole.quadraticCurveTo(x0 + w - 0.35, 0.25, x0 + 0.75, 0.25);
  bTopHole.closePath();
  bShape.holes.push(bTopHole);

  const bBotHole = new THREE.Path();
  bBotHole.moveTo(x0 + 0.45, -h / 2 + 0.25);
  bBotHole.lineTo(x0 + 0.45, -0.15);
  bBotHole.lineTo(x0 + 0.8, -0.15);
  bBotHole.quadraticCurveTo(x0 + w - 0.25, -0.15, x0 + w - 0.25, -h / 4);
  bBotHole.quadraticCurveTo(x0 + w - 0.25, -h / 2 + 0.25, x0 + 0.8, -h / 2 + 0.25);
  bBotHole.closePath();
  bShape.holes.push(bBotHole);

  const bGeo = new THREE.ExtrudeGeometry(bShape, extrudeSettings);
  bGeo.center();

  // 2. Letter r (lowercase geometric)
  const rShape = new THREE.Shape();
  const stemW = 0.44,
    rH = 1.6;
  rShape.moveTo(-0.45, -rH / 2);
  rShape.lineTo(-0.45, rH / 2);
  rShape.lineTo(-0.45 + stemW, rH / 2);
  rShape.lineTo(-0.45 + stemW, 0.2);
  rShape.quadraticCurveTo(0.1, rH / 2, 0.55, rH / 2);
  rShape.lineTo(0.55, rH / 2 - 0.42);
  rShape.quadraticCurveTo(0.18, rH / 2 - 0.42, -0.45 + stemW, 0.0);
  rShape.lineTo(-0.45 + stemW, -rH / 2);
  rShape.closePath();
  const rGeo = new THREE.ExtrudeGeometry(rShape, extrudeSettings);
  rGeo.center();

  // 3. Letter i (Signature Anime.js style: Capsule Stem + Floating Dot)
  const iStemShape = new THREE.Shape();
  const iw = 0.44,
    ih = 1.45,
    ir = 0.22;
  iStemShape.moveTo(-iw / 2 + ir, -ih / 2);
  iStemShape.lineTo(iw / 2 - ir, -ih / 2);
  iStemShape.quadraticCurveTo(iw / 2, -ih / 2, iw / 2, -ih / 2 + ir);
  iStemShape.lineTo(iw / 2, ih / 2 - ir);
  iStemShape.quadraticCurveTo(iw / 2, ih / 2, iw / 2 - ir, ih / 2);
  iStemShape.lineTo(-iw / 2 + ir, ih / 2);
  iStemShape.quadraticCurveTo(-iw / 2, ih / 2, -iw / 2, ih / 2 - ir);
  iStemShape.lineTo(-iw / 2, -ih / 2 + ir);
  iStemShape.quadraticCurveTo(-iw / 2, -ih / 2, -iw / 2 + ir, -ih / 2);
  const iStemGeo = new THREE.ExtrudeGeometry(iStemShape, extrudeSettings);
  iStemGeo.center();

  // Signature Anime.js floating spherical dot
  const iDotGeo = new THREE.SphereGeometry(0.28, 32, 24);

  // 4. Letter d (lowercase geometric)
  const dShape = new THREE.Shape();
  const dStemW = 0.44,
    dH = 2.5,
    dBowlH = 1.6,
    xRight = 0.55;
  dShape.moveTo(xRight - dStemW, -dBowlH / 2);
  dShape.lineTo(xRight, -dBowlH / 2);
  dShape.lineTo(xRight, dH / 2);
  dShape.lineTo(xRight - dStemW, dH / 2);
  dShape.lineTo(xRight - dStemW, dBowlH / 2);
  dShape.quadraticCurveTo(-0.55, dBowlH / 2, -0.55, 0);
  dShape.quadraticCurveTo(-0.55, -dBowlH / 2, xRight - dStemW, -dBowlH / 2);
  dShape.closePath();

  const dHole = new THREE.Path();
  dHole.moveTo(xRight - dStemW, -dBowlH / 2 + 0.36);
  dHole.lineTo(xRight - dStemW, dBowlH / 2 - 0.36);
  dHole.quadraticCurveTo(-0.15, dBowlH / 2 - 0.36, -0.15, 0);
  dHole.quadraticCurveTo(-0.15, -dBowlH / 2 + 0.36, xRight - dStemW, -dBowlH / 2 + 0.36);
  dHole.closePath();
  dShape.holes.push(dHole);
  const dGeo = new THREE.ExtrudeGeometry(dShape, extrudeSettings);
  dGeo.center();

  // 5. Letter g (lowercase geometric)
  const gShape = new THREE.Shape();
  gShape.moveTo(0.48, 0.8);
  gShape.lineTo(0.48, -0.75);
  gShape.quadraticCurveTo(0.48, -1.2, 0, -1.2);
  gShape.quadraticCurveTo(-0.48, -1.2, -0.48, -0.85);
  gShape.lineTo(-0.08, -0.85);
  gShape.quadraticCurveTo(-0.08, -0.9, 0, -0.9);
  gShape.quadraticCurveTo(0.12, -0.9, 0.12, -0.65);
  gShape.lineTo(0.12, -0.05);
  gShape.quadraticCurveTo(-0.55, -0.05, -0.55, 0.4);
  gShape.quadraticCurveTo(-0.55, 0.8, 0, 0.8);
  gShape.closePath();

  const gHole = new THREE.Path();
  gHole.moveTo(0.12, 0.22);
  gHole.lineTo(0.12, 0.58);
  gHole.quadraticCurveTo(-0.18, 0.58, -0.18, 0.4);
  gHole.quadraticCurveTo(-0.18, 0.22, 0.12, 0.22);
  gHole.closePath();
  gShape.holes.push(gHole);
  const gGeo = new THREE.ExtrudeGeometry(gShape, extrudeSettings);
  gGeo.center();

  // 6. Letter e (lowercase geometric)
  const eShape = new THREE.Shape();
  eShape.moveTo(-0.35, 0.08);
  eShape.lineTo(0.5, 0.08);
  eShape.quadraticCurveTo(0.58, 0.8, 0, 0.8);
  eShape.quadraticCurveTo(-0.58, 0.8, -0.58, 0);
  eShape.quadraticCurveTo(-0.58, -0.8, 0, -0.8);
  eShape.quadraticCurveTo(0.52, -0.8, 0.52, -0.3);
  eShape.lineTo(0.15, -0.3);
  eShape.quadraticCurveTo(0.1, -0.42, 0, -0.42);
  eShape.quadraticCurveTo(-0.22, -0.42, -0.22, 0);
  eShape.quadraticCurveTo(-0.22, 0.08, 0, 0.08);
  eShape.lineTo(0.5, 0.08);
  eShape.lineTo(0.5, 0.22);
  eShape.quadraticCurveTo(0.5, 0.48, 0, 0.48);
  eShape.quadraticCurveTo(-0.22, 0.48, -0.22, 0.22);
  eShape.closePath();
  const eGeo = new THREE.ExtrudeGeometry(eShape, extrudeSettings);
  eGeo.center();

  return { bGeo, rGeo, iStemGeo, iDotGeo, dGeo, gGeo, eGeo };
}

export default function SurpriseLogoExperience({
  isOpen,
  onClose,
}: SurpriseLogoExperienceProps) {
  const { theme, mounted: themeMounted } = useTheme();
  const isDark = themeMounted ? theme === "dark" : false;

  const [domReady, setDomReady] = useState(false);
  const [closing, setClosing] = useState(false);
  const [countdown, setCountdown] = useState(6);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasHolderRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const countdownBarRef = useRef<HTMLDivElement>(null);

  const autoReturnTimerRef = useRef<any>(null);
  const countdownIntervalRef = useRef<any>(null);
  const replayTriggerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setDomReady(true);
  }, []);

  const handleReturn = useCallback(() => {
    if (closing) return;
    setClosing(true);

    if (autoReturnTimerRef.current) clearTimeout(autoReturnTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 450);
  }, [closing, onClose]);

  useEffect(() => {
    if (!isOpen || !domReady) return;

    // Prevent background scrolling
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const canvasHolder = canvasHolderRef.current;
    if (!canvasHolder) return;

    setCountdown(6);

    // Three.js Scene Setup with Theme Awareness
    const scene = new THREE.Scene();
    const bgColor = isDark ? 0x08090d : 0xf7f7f5;
    scene.fog = new THREE.FogExp2(bgColor, 0.022);

    const width = canvasHolder.clientWidth || window.innerWidth;
    const height = canvasHolder.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 13.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark ? 1.25 : 1.1;

    canvasHolder.innerHTML = "";
    canvasHolder.appendChild(renderer.domElement);

    // Dynamic Lighting
    const ambLight = new THREE.AmbientLight(0xffffff, isDark ? 0.75 : 1.1);
    scene.add(ambLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, isDark ? 1.8 : 1.5);
    keyLight.position.set(8, 12, 10);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(isDark ? 0xc52623 : 0xff4a47, isDark ? 2.2 : 1.2);
    rimLight.position.set(-10, -6, -4);
    scene.add(rimLight);

    const redPointLight = new THREE.PointLight(0xc52623, isDark ? 2.5 : 1.8, 30);
    redPointLight.position.set(-0.95, 1.4, 3.5);
    scene.add(redPointLight);

    // Theme Materials
    // In light mode: sleek polished dark charcoal letters with specular reflections
    // In dark mode: pearl white / frosted titanium letters with crisp specular highlights
    const letterMat = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0xeeeff5 : 0x27282b,
      metalness: isDark ? 0.2 : 0.12,
      roughness: 0.18,
      clearcoat: 0.85,
      clearcoatRoughness: 0.15,
    });

    // The signature Anime.js crimson accent for the floating "i" dot
    const iDotMat = new THREE.MeshPhysicalMaterial({
      color: 0xc52623,
      emissive: isDark ? 0x4a0907 : 0x2d0504,
      metalness: 0.25,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
    });

    // Subtitle background particles
    const particleGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
    const particles: THREE.Mesh[] = [];
    for (let p = 0; p < 12; p++) {
      const part = new THREE.Mesh(particleGeo, p % 3 === 0 ? iDotMat : letterMat);
      const angle = (p / 12) * Math.PI * 2;
      const radius = 6.5 + (p % 4) * 0.8;
      part.position.set(Math.cos(angle) * radius, Math.sin(angle) * 3.2, (p - 6) * 1.2);
      scene.add(part);
      particles.push(part);
    }

    // Geometries
    const geos = createBridgeGeometries();

    // Wordmark Group
    const wordmarkGroup = new THREE.Group();
    scene.add(wordmarkGroup);

    // Letter specifications for "Bridge"
    // letter 'i' is at index 2, featuring the Anime.js stem + bouncing dot
    const letterSpecs = [
      { id: "B", geo: geos.bGeo, x: -3.75, y: 0, isI: false },
      { id: "r", geo: geos.rGeo, x: -2.15, y: -0.32, isI: false },
      { id: "i", geo: geos.iStemGeo, x: -0.95, y: -0.35, isI: true },
      { id: "d", geo: geos.dGeo, x: 0.45, y: 0.12, isI: false },
      { id: "g", geo: geos.gGeo, x: 2.05, y: -0.38, isI: false },
      { id: "e", geo: geos.eGeo, x: 3.65, y: -0.32, isI: false },
    ];

    const letterNodes: {
      group: THREE.Group;
      baseX: number;
      baseY: number;
      isI: boolean;
    }[] = [];

    let dotMeshRef: THREE.Mesh | null = null;

    letterSpecs.forEach((spec) => {
      const group = new THREE.Group();
      group.position.set(spec.x, spec.y, 0);

      const mesh = new THREE.Mesh(spec.geo, letterMat);
      group.add(mesh);

      if (spec.isI) {
        // Anime.js signature floating dot
        const dotMesh = new THREE.Mesh(geos.iDotGeo, iDotMat);
        dotMesh.position.set(0, 1.25, 0);
        group.add(dotMesh);
        dotMeshRef = dotMesh;
      }

      wordmarkGroup.add(group);
      letterNodes.push({
        group,
        baseX: spec.x,
        baseY: spec.y,
        isI: spec.isI,
      });
    });

    // -------------------------------------------------------------------------
    // Anime.js 3D Logo Animation (Julian Garnier Three.js Adapter Pattern)
    // -------------------------------------------------------------------------
    const runAnimation = () => {
      const tl = createTimeline({
        defaults: { ease: "outExpo" },
      });

      // Camera zooms dynamically
      tl.add(
        camera.position,
        {
          z: [24, 13.5],
          duration: 1600,
          ease: "outCubic",
        },
        0
      );

      // Staggered arrival for all 6 letters of "Bridge"
      letterNodes.forEach((node, i) => {
        const staggerDelay = 80 + i * 90;
        const spinSign = i % 2 === 0 ? 1 : -1;

        // Reset to exploded coordinates
        node.group.position.set(node.baseX, node.baseY, -30 - (i % 2) * 5);
        node.group.rotation.set(
          spinSign * Math.PI * 1.6,
          (i - 2.5) * 1.2,
          (i - 2.5) * 0.4
        );
        node.group.scale.set(0.001, 0.001, 0.001);

        // Fly in with Three.js adapter
        tl.add(
          node.group.position,
          {
            x: node.baseX,
            y: node.baseY,
            z: 0,
            duration: 1400,
            ease: "outBack(1.5)",
          },
          staggerDelay
        );

        tl.add(
          node.group.rotation,
          {
            x: 0,
            y: 0,
            z: 0,
            duration: 1550,
            ease: "outExpo",
          },
          staggerDelay
        );

        tl.add(
          node.group.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 1350,
            ease: "outBack(1.7)",
          },
          staggerDelay
        );
      });

      // Signature Anime.js "i" bouncing dot entrance
      if (dotMeshRef) {
        dotMeshRef.position.set(0, 5.5, 0);
        dotMeshRef.scale.set(0.001, 0.001, 0.001);

        tl.add(
          dotMeshRef.position,
          {
            y: [5.5, 1.25],
            duration: 1200,
            ease: "outBounce",
          },
          480
        );

        tl.add(
          dotMeshRef.scale,
          {
            x: [0.2, 1],
            y: [0.2, 1],
            z: [0.2, 1],
            duration: 850,
            ease: "outBack(2.2)",
          },
          480
        );

        // Dot flare glow
        tl.add(
          redPointLight,
          {
            intensity: [0.4, isDark ? 4.5 : 3.0, isDark ? 2.5 : 1.8],
            duration: 700,
            ease: "outQuad",
          },
          850
        );
      }

      // Subtitle reveal
      if (subtitleRef.current) {
        animate(subtitleRef.current, {
          opacity: [0, 1],
          translateY: [25, 0],
          delay: 950,
          duration: 800,
          ease: "outCubic",
        });
      }
    };

    replayTriggerRef.current = runAnimation;
    runAnimation();

    // -------------------------------------------------------------------------
    // Interactive 3D Cursor Parallax & Render Loop
    // -------------------------------------------------------------------------
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      targetTiltY = normX * 0.45;
      targetTiltX = -normY * 0.35;
    };
    window.addEventListener("pointermove", handlePointerMove);

    let reqId: number;
    let clock = 0;

    const render = () => {
      clock += 0.025;

      // Smooth damping tilt
      currentTiltX += (targetTiltX - currentTiltX) * 0.06;
      currentTiltY += (targetTiltY - currentTiltY) * 0.06;

      wordmarkGroup.rotation.y = currentTiltY;
      wordmarkGroup.rotation.x = currentTiltX;

      // Idle harmonic wave across letters
      letterNodes.forEach((node, idx) => {
        const floatOffset = Math.sin(clock * 1.8 + idx * 0.5) * 0.08;
        node.group.position.y = node.baseY + floatOffset;
      });

      // Playful spring pulse on the Anime.js dot
      if (dotMeshRef) {
        dotMeshRef.position.y = 1.25 + Math.sin(clock * 3.2) * 0.12;
      }

      // Orbiting particles
      particles.forEach((p, idx) => {
        const theta = clock * 0.6 + (idx / 12) * Math.PI * 2;
        p.position.x = Math.cos(theta) * 6.5;
        p.position.y = Math.sin(theta) * 3.2;
        p.rotation.x += 0.02;
        p.rotation.y += 0.03;
      });

      renderer.render(scene, camera);
      reqId = requestAnimationFrame(render);
    };

    reqId = requestAnimationFrame(render);

    // Auto-return countdown
    let secondsLeft = 6;
    countdownIntervalRef.current = setInterval(() => {
      secondsLeft -= 1;
      setCountdown(Math.max(secondsLeft, 0));
      if (secondsLeft <= 0) {
        clearInterval(countdownIntervalRef.current);
      }
    }, 1000);

    autoReturnTimerRef.current = setTimeout(() => {
      handleReturn();
    }, 6500);

    if (countdownBarRef.current) {
      animate(countdownBarRef.current, {
        width: ["100%", "0%"],
        duration: 6500,
        ease: "linear",
      });
    }

    // Resize
    const handleResize = () => {
      if (!canvasHolder) return;
      const w = canvasHolder.clientWidth || window.innerWidth;
      const h = canvasHolder.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Keyboard controls
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleReturn();
      } else if (e.key === " " || e.key === "r" || e.key === "R") {
        e.preventDefault();
        runAnimation();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(reqId);
      document.body.style.overflow = origOverflow;

      if (autoReturnTimerRef.current) clearTimeout(autoReturnTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

      renderer.dispose();
      geos.bGeo.dispose();
      geos.rGeo.dispose();
      geos.iStemGeo.dispose();
      geos.iDotGeo.dispose();
      geos.dGeo.dispose();
      geos.gGeo.dispose();
      geos.eGeo.dispose();
      particleGeo.dispose();
      letterMat.dispose();
      iDotMat.dispose();
    };
  }, [isOpen, domReady, isDark, handleReturn]);

  if (!isOpen || !domReady) return null;

  // Render via createPortal directly into document.body so it guarantees
  // z-index stacking above the fixed navbar (z-40) and every other element.
  return createPortal(
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[99999] flex flex-col justify-between select-none transition-all duration-500 overflow-hidden ${
        isDark ? "bg-[#08090D] text-white" : "bg-[#F7F7F5] text-[#18191B]"
      } ${
        closing ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* 3D Three.js WebGL Stage */}
      <div
        ref={canvasHolderRef}
        onClick={() => replayTriggerRef.current?.()}
        className="absolute inset-0 z-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Ambient background glows tailored to mode */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] rounded-full blur-[160px] ${
            isDark ? "bg-[#C52623]/22" : "bg-[#C52623]/10"
          }`}
        />
        <div
          className={`absolute top-1/3 left-1/3 w-[360px] h-[360px] rounded-full blur-[120px] ${
            isDark ? "bg-red-600/15" : "bg-red-400/10"
          }`}
        />
      </div>

      {/* Top Bar with Status, Replay & Return button */}
      <div className="relative z-20 w-full max-w-7xl mx-auto p-5 sm:p-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C52623] animate-ping" />
          <span
            className={`font-mono text-xs tracking-wider uppercase font-bold ${
              isDark ? "text-stone-300" : "text-stone-700"
            }`}
          >
            3D LOGO ANIMATION // ANIME.JS THREE.JS ADAPTER
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => replayTriggerRef.current?.()}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow cursor-pointer backdrop-blur-md hover:scale-105 ${
              isDark
                ? "bg-white/10 hover:bg-white/20 border border-white/15 text-white"
                : "bg-white/80 hover:bg-white border border-stone-300 text-stone-800"
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#C52623]" />
            <span className="hidden sm:inline">Replay</span>
            <span className="text-[10px] opacity-60 font-mono">[R]</span>
          </button>

          <button
            onClick={handleReturn}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all shadow-md cursor-pointer backdrop-blur-md hover:scale-105 ${
              isDark
                ? "bg-white/10 hover:bg-white/20 border border-white/15 text-white hover:shadow-red-950/40"
                : "bg-white hover:bg-stone-50 border border-stone-300 text-stone-900 hover:shadow-red-100"
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#C52623]" />
            <span>Back to Homescreen</span>
            <span className="text-[10px] opacity-60 font-mono">[Esc]</span>
          </button>
        </div>
      </div>

      {/* Center Cinematic Typographic Showcase Subtitle */}
      <div className="relative z-10 w-full max-w-5xl mx-auto my-auto px-6 py-4 flex flex-col items-center justify-center text-center pointer-events-none">
        <div
          ref={subtitleRef}
          className="flex flex-col items-center gap-3 opacity-0 transition-opacity"
        >
          {/* Subtle tag pill */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase backdrop-blur-md border ${
              isDark
                ? "bg-black/60 border-white/10 text-stone-300"
                : "bg-white/80 border-stone-300 text-stone-700"
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#C52623]" />
            <span>NORTH BRIDGE TECH // 3D KINEMATICS</span>
          </div>

          <div
            className={`text-xs sm:text-sm font-mono tracking-widest uppercase ${
              isDark ? "text-stone-300" : "text-stone-700"
            }`}
          >
            <span className="font-bold">ONE NORTH.</span>{" "}
            <span className="text-[#C52623] font-bold">INFINITE DIGITAL DIRECTIONS.</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Auto-return countdown indicator */}
      <div className="relative z-20 w-full max-w-xl mx-auto pb-6 sm:pb-8 px-6 space-y-2">
        <div
          className={`flex items-center justify-between text-xs font-mono ${
            isDark ? "text-stone-400" : "text-stone-600"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C52623] animate-pulse" />
            <span>Returning to homescreen in {countdown}s...</span>
          </span>
          <button
            onClick={handleReturn}
            className={`underline text-[11px] cursor-pointer hover:text-[#C52623] ${
              isDark ? "text-stone-300" : "text-stone-700"
            }`}
          >
            Return Now
          </button>
        </div>

        <div
          className={`w-full h-1 rounded-full overflow-hidden ${
            isDark ? "bg-white/10" : "bg-stone-300"
          }`}
        >
          <div
            ref={countdownBarRef}
            className="h-full bg-gradient-to-r from-red-600 to-[#C52623] rounded-full shadow-[0_0_8px_rgba(197,38,35,0.8)]"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
