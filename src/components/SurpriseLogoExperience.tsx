"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { animate, createTimeline } from "animejs";
import { X, ArrowLeft, RotateCcw, Sparkles } from "lucide-react";

interface SurpriseLogoExperienceProps {
  isOpen: boolean;
  onClose: () => void;
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

export default function SurpriseLogoExperience({
  isOpen,
  onClose,
}: SurpriseLogoExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasHolderRef = useRef<HTMLDivElement>(null);

  const textNorthRef = useRef<HTMLDivElement>(null);
  const textBridgeRef = useRef<HTMLDivElement>(null);
  const textTechRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const countdownBarRef = useRef<HTMLDivElement>(null);

  const [closing, setClosing] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [animationPhase, setAnimationPhase] = useState<"assembling" | "revealed">("assembling");

  const timelineRef = useRef<any>(null);
  const autoReturnTimerRef = useRef<any>(null);
  const countdownIntervalRef = useRef<any>(null);

  const handleReturn = () => {
    if (closing) return;
    setClosing(true);

    if (autoReturnTimerRef.current) clearTimeout(autoReturnTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 450);
  };

  useEffect(() => {
    if (!isOpen) return;

    // Prevent background scrolling
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const canvasHolder = canvasHolderRef.current;
    if (!canvasHolder) return;

    setAnimationPhase("assembling");
    setCountdown(5);

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060709, 0.025);

    const width = canvasHolder.clientWidth || window.innerWidth;
    const height = canvasHolder.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 24);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    canvasHolder.innerHTML = "";
    canvasHolder.appendChild(renderer.domElement);

    // Lighting
    const ambLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 1.8);
    keyLight.position.set(10, 15, 12);
    scene.add(keyLight);

    const redRimLight = new THREE.DirectionalLight(0xc52623, 2.5);
    redRimLight.position.set(-12, -8, -6);
    scene.add(redRimLight);

    const redPointLight = new THREE.PointLight(0xc52623, 2.0, 40);
    redPointLight.position.set(0, 0, 6);
    scene.add(redPointLight);

    // Materials
    const redMat = new THREE.MeshPhysicalMaterial({
      color: 0xc52623,
      metalness: 0.15,
      roughness: 0.22,
      clearcoat: 0.45,
      clearcoatRoughness: 0.2,
    });

    const charcoalMat = new THREE.MeshPhysicalMaterial({
      color: 0x484944,
      metalness: 0.35,
      roughness: 0.25,
      clearcoat: 0.35,
    });

    const accentMat = new THREE.MeshPhysicalMaterial({
      color: 0xff4a47,
      metalness: 0.2,
      roughness: 0.18,
      clearcoat: 0.6,
    });

    // Root Monogram Group
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // 1. Slab (Upper Red Stem)
    const slabShape = createRoundedRectShape(2.4, 3.65, 0.32);
    const slabGeo = new THREE.ExtrudeGeometry(slabShape, {
      depth: 0.52,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    });
    slabGeo.center();
    const slabMesh = new THREE.Mesh(slabGeo, redMat);
    const slabPivot = new THREE.Group();
    slabPivot.add(slabMesh);
    logoGroup.add(slabPivot);

    // 2. Pill Cylinder & Caps (Dark Charcoal)
    const pillRadius = 0.44;
    const pillHeight = 2.45;
    const pillGeo = new THREE.CylinderGeometry(pillRadius, pillRadius, pillHeight, 32);
    const capGeo = new THREE.SphereGeometry(pillRadius, 32, 16);

    const pillGroup = new THREE.Group();
    const pillCyl = new THREE.Mesh(pillGeo, charcoalMat);
    const pillTop = new THREE.Mesh(capGeo, charcoalMat);
    pillTop.position.y = pillHeight / 2;
    const pillBot = new THREE.Mesh(capGeo, charcoalMat);
    pillBot.position.y = -pillHeight / 2;
    pillGroup.add(pillCyl, pillTop, pillBot);
    logoGroup.add(pillGroup);

    // 3. Hinge Front Plate
    const hingeShape = createRoundedRectShape(1.48, 1.48, 0.22);
    const hingeGeo = new THREE.ExtrudeGeometry(hingeShape, {
      depth: 0.44,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    });
    hingeGeo.center();
    const hingeMesh = new THREE.Mesh(hingeGeo, redMat);
    const hingePivot = new THREE.Group();
    hingePivot.add(hingeMesh);
    logoGroup.add(hingePivot);

    // 4. Foot Base Block
    const footShape = createRoundedRectShape(0.9, 0.9, 0.18);
    const footGeo = new THREE.ExtrudeGeometry(footShape, {
      depth: 0.48,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    });
    footGeo.center();
    const footMesh = new THREE.Mesh(footGeo, accentMat);
    const footGroup = new THREE.Group();
    footGroup.add(footMesh);
    logoGroup.add(footGroup);

    // 5. Kinetic Satellite Shards that orbit around
    const satelliteGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35);
    const satellites: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const sat = new THREE.Mesh(satelliteGeo, i % 2 === 0 ? redMat : charcoalMat);
      scene.add(sat);
      satellites.push(sat);
    }

    // Set Initial Deconstructed Exploded Coordinates
    slabPivot.position.set(-14, 12, -10);
    slabPivot.rotation.set(-2, 3, -1);
    slabPivot.scale.set(0.1, 0.1, 0.1);

    pillGroup.position.set(16, -10, -12);
    pillGroup.rotation.set(2, -2, 3);
    pillGroup.scale.set(0.1, 0.1, 0.1);

    hingePivot.position.set(-10, -14, 14);
    hingePivot.rotation.set(1, 4, -2);
    hingePivot.scale.set(0.1, 0.1, 0.1);

    footGroup.position.set(12, 14, 8);
    footGroup.rotation.set(-3, 1, 2);
    footGroup.scale.set(0.1, 0.1, 0.1);

    satellites.forEach((sat, i) => {
      const angle = (i / 6) * Math.PI * 2;
      sat.position.set(Math.cos(angle) * 16, Math.sin(angle) * 16, (i - 3) * 4);
    });

    // Resting Target Coordinates
    const targetSlab = { x: -0.35, y: 1.45, z: 0 };
    const targetPill = { x: 1.25, y: 1.45, z: 0 };
    const targetHinge = { x: -0.35, y: -0.45, z: 0.42 };
    const targetFoot = { x: 0.72, y: -0.95, z: 0 };

    // Anime.js 3D Logo Animation Timeline (Three.js Adapter pattern)
    const tl = createTimeline({
      defaults: { ease: "outExpo" },
    });
    timelineRef.current = tl;

    // Camera zooms dynamically in
    tl.add(camera.position, {
      z: [24, 10.5],
      y: [4, 0],
      duration: 1700,
      ease: "outCubic",
    }, 0);

    // Slab flies into position
    tl.add(slabPivot.position, {
      x: targetSlab.x,
      y: targetSlab.y,
      z: targetSlab.z,
      duration: 1500,
    }, 80);
    tl.add(slabPivot.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1600,
    }, 80);
    tl.add(slabPivot.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1400,
    }, 80);

    // Pill flies into position with stagger
    tl.add(pillGroup.position, {
      x: targetPill.x,
      y: targetPill.y,
      z: targetPill.z,
      duration: 1550,
    }, 180);
    tl.add(pillGroup.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1650,
    }, 180);
    tl.add(pillGroup.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1450,
    }, 180);

    // Hinge plate snaps with dynamic spring hinge
    tl.add(hingePivot.position, {
      x: targetHinge.x,
      y: targetHinge.y,
      z: targetHinge.z,
      duration: 1600,
    }, 280);
    tl.add(hingePivot.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1700,
    }, 280);
    tl.add(hingePivot.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1500,
    }, 280);

    // Foot base snaps into alignment
    tl.add(footGroup.position, {
      x: targetFoot.x,
      y: targetFoot.y,
      z: targetFoot.z,
      duration: 1500,
    }, 380);
    tl.add(footGroup.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1600,
    }, 380);
    tl.add(footGroup.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1400,
    }, 380);

    // Point Light pulse on assembly climax
    tl.add(redPointLight, {
      intensity: [0.5, 4.5, 2.2],
      duration: 800,
      ease: "outQuad",
    }, 900);

    // Satellite shards collapse toward the logo orbit
    satellites.forEach((sat, i) => {
      const restingAngle = (i / 6) * Math.PI * 2;
      const rx = Math.cos(restingAngle) * 3.8;
      const ry = Math.sin(restingAngle) * 2.8;
      const rz = Math.sin(i) * 1.5;

      tl.add(sat.position, {
        x: rx,
        y: ry,
        z: rz,
        duration: 1300,
      }, 300 + i * 50);

      tl.add(sat.scale, {
        x: [0.1, 0.8],
        y: [0.1, 0.8],
        z: [0.1, 0.8],
        duration: 900,
      }, 300 + i * 50);
    });

    // Typographic Grand Reveal Animation
    if (textNorthRef.current) {
      animate(textNorthRef.current, {
        opacity: [0, 1],
        translateY: [45, 0],
        letterSpacing: ["0.2em", "0.04em"],
        delay: 500,
        duration: 800,
        ease: "outExpo",
      });
    }

    if (textBridgeRef.current) {
      animate(textBridgeRef.current, {
        opacity: [0, 1],
        translateY: [45, 0],
        letterSpacing: ["0.2em", "0.04em"],
        delay: 750,
        duration: 850,
        ease: "outExpo",
      });
    }

    if (textTechRef.current) {
      animate(textTechRef.current, {
        opacity: [0, 1],
        translateY: [45, 0],
        letterSpacing: ["0.2em", "0.04em"],
        delay: 1000,
        duration: 850,
        ease: "outExpo",
        onComplete: () => {
          setAnimationPhase("revealed");
        },
      });
    }

    if (subtitleRef.current) {
      animate(subtitleRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        delay: 1250,
        duration: 700,
        ease: "outCubic",
      });
    }

    // Render loop with idle harmonic floating wave
    let reqId: number;
    let clock = 0;

    const render = () => {
      clock += 0.02;

      // Gentle floating oscillation
      logoGroup.position.y = Math.sin(clock * 1.2) * 0.18;
      logoGroup.rotation.y = Math.sin(clock * 0.8) * 0.15;
      logoGroup.rotation.x = Math.cos(clock * 0.9) * 0.08;

      // Orbiting satellites rotation
      satellites.forEach((sat, i) => {
        const theta = clock * 0.9 + (i / 6) * Math.PI * 2;
        sat.position.x = Math.cos(theta) * 3.8;
        sat.position.y = Math.sin(theta) * 2.8;
        sat.rotation.x += 0.02;
        sat.rotation.y += 0.03;
      });

      renderer.render(scene, camera);
      reqId = requestAnimationFrame(render);
    };

    reqId = requestAnimationFrame(render);

    // Auto Return Timer: Returns to homescreen after revealing
    // Countdown starts from 5 seconds
    let secondsLeft = 5;
    countdownIntervalRef.current = setInterval(() => {
      secondsLeft -= 1;
      setCountdown(Math.max(secondsLeft, 0));
      if (secondsLeft <= 0) {
        clearInterval(countdownIntervalRef.current);
      }
    }, 1000);

    autoReturnTimerRef.current = setTimeout(() => {
      handleReturn();
    }, 5500);

    // Countdown bar animation
    if (countdownBarRef.current) {
      animate(countdownBarRef.current, {
        width: ["100%", "0%"],
        duration: 5500,
        ease: "linear",
      });
    }

    // Resize handler
    const handleResize = () => {
      if (!canvasHolder) return;
      const w = canvasHolder.clientWidth || window.innerWidth;
      const h = canvasHolder.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Keydown escape handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        handleReturn();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(reqId);
      document.body.style.overflow = origOverflow;

      if (autoReturnTimerRef.current) clearTimeout(autoReturnTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

      renderer.dispose();
      slabGeo.dispose();
      pillGeo.dispose();
      capGeo.dispose();
      hingeGeo.dispose();
      footGeo.dispose();
      satelliteGeo.dispose();
      redMat.dispose();
      charcoalMat.dispose();
      accentMat.dispose();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 flex flex-col justify-between bg-[#060709] text-white select-none transition-all duration-500 overflow-hidden ${
        closing ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* 3D Three.js WebGL Stage (Background) */}
      <div
        ref={canvasHolderRef}
        className="absolute inset-0 z-0 pointer-events-none w-full h-full"
      />

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#C52623]/20 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-red-600/15 rounded-full blur-[100px]" />
      </div>

      {/* Top Bar with Status and Return button */}
      <div className="relative z-20 w-full max-w-7xl mx-auto p-5 sm:p-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C52623] animate-ping" />
          <span className="font-mono text-xs tracking-widest uppercase font-bold text-stone-300">
            NBT 3D KINEMATIC REVEAL // ANIME.JS THREE ADAPTER
          </span>
        </div>

        <button
          onClick={handleReturn}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold tracking-wide transition-all shadow-lg hover:shadow-red-950/40 cursor-pointer backdrop-blur-md hover:scale-105"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#C52623]" />
          <span>Back to Homescreen</span>
          <span className="text-[10px] text-stone-400 font-mono">[Esc]</span>
        </button>
      </div>

      {/* Center Cinematic Typographic Showcase:
          North
          Bridge
          Tech
      */}
      <div className="relative z-10 w-full max-w-5xl mx-auto my-auto px-6 py-4 flex flex-col items-center justify-center text-center pointer-events-none">
        {/* Subtle pill header */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/10 text-[11px] font-mono tracking-widest uppercase text-stone-300 mb-4 backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-[#C52623]" />
          <span>ENGINEERING DIGITAL PRODUCTS</span>
        </div>

        {/* 3 Large Stacked Words as requested */}
        <div className="space-y-0 sm:space-y-1">
          <div
            ref={textNorthRef}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-none opacity-0 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
          >
            NORTH
          </div>

          <div
            ref={textBridgeRef}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#C52623] uppercase leading-none opacity-0 drop-shadow-[0_0_35px_rgba(197,38,35,0.7)]"
          >
            BRIDGE
          </div>

          <div
            ref={textTechRef}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-none opacity-0 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
          >
            TECH
          </div>
        </div>

        {/* Subtitle Moniker */}
        <div
          ref={subtitleRef}
          className="mt-6 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm font-mono tracking-widest uppercase text-stone-300 opacity-0"
        >
          <span className="text-white font-bold">DIGITAL PRODUCT STUDIO</span>
          <span className="hidden sm:inline text-[#C52623]">•</span>
          <span className="text-stone-400">INNOVATIVE TECH. LASTING IMPACT.</span>
        </div>
      </div>

      {/* Bottom Bar: Auto-return countdown indicator */}
      <div className="relative z-20 w-full max-w-xl mx-auto pb-6 sm:pb-8 px-6 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-stone-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C52623] animate-pulse" />
            <span>Returning to homescreen in {countdown}s...</span>
          </span>
          <button
            onClick={handleReturn}
            className="text-stone-300 hover:text-white underline text-[11px] cursor-pointer"
          >
            Return Now
          </button>
        </div>

        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            ref={countdownBarRef}
            className="h-full bg-gradient-to-r from-red-600 to-[#C52623] rounded-full shadow-[0_0_8px_rgba(197,38,35,0.8)]"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
