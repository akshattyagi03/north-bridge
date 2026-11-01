"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Cpu,
  Zap,
  ShieldCheck,
  RotateCw,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import AnimatedHeading from "./AnimatedHeading";
import GeometricLogoCanvas from "./GeometricLogoCanvas";

export default function About() {
  const { theme, mounted: themeMounted } = useTheme();
  const isDark = themeMounted ? theme === "dark" : true;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);

          const leftContent = el.querySelector(".about-left-content");
          const right3D = el.querySelector(".about-right-3d");

          if (leftContent) {
            animate(leftContent, {
              opacity: [0, 1],
              translateX: [-30, 0],
              duration: 700,
              ease: "outCubic",
            });
          }

          if (right3D) {
            animate(right3D, {
              opacity: [0, 1],
              translateX: [30, 0],
              scale: [0.95, 1],
              delay: 150,
              duration: 750,
              ease: "outCubic",
            });
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animated]);

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 space-y-12 transition-colors duration-300 ${
        isDark ? "text-white" : "text-[#18191B]"
      }`}
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#C52623]/8 rounded-full blur-[130px] pointer-events-none" />

      {/* Animated Heading on Scroll */}
      <AnimatedHeading
        sectionNumber="02"
        badge="WHO WE ARE • STUDIO OVERVIEW"
        mainText="Who We Are."
        accentText="Speed, Coordination & Scale."
        subText="A technology partner engineered on the principles of computer hardware architecture."
      />

      {/* Main Grid: Content on Left, Rotating 3D Figure on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* =========================================================================
            LEFT COLUMN: WHO WE ARE CONTENT
           ========================================================================= */}
        <div className="about-left-content opacity-0 lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C52623]/10 border border-[#C52623]/30 text-[11px] text-[#C52623] font-bold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#C52623]" />
            <span>PARIS DIGITAL PRODUCT STUDIO</span>
          </div>

          <h3
            className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight ${
              isDark ? "text-white" : "text-[#18191B]"
            }`}
          >
            We turn complex business visions into{" "}
            <span className="text-[#C52623]">high-performance digital platforms.</span>
          </h3>

          <p
            className={`text-sm sm:text-base leading-relaxed font-normal ${
              isDark ? "text-stone-300" : "text-[#484944]"
            }`}
          >
            NorthBridge Tech is a premier software development studio headquartered in Paris. We partner with ambitious founders, startups, and established enterprises to architect, design, and deploy reliable digital products.
          </p>

          <p
            className={`text-xs sm:text-sm leading-relaxed font-normal ${
              isDark ? "text-stone-400" : "text-stone-600"
            }`}
          >
            Our name is inspired by the motherboard <strong className={isDark ? "text-stone-200" : "text-stone-900"}>northbridge chip</strong> — the critical silicon hub that coordinates high-speed communication between the CPU, high-bandwidth memory, and graphics. Without this bridge, systems bottleneck and stall. We act as your product’s northbridge, connecting strategy, UI/UX design, modern code, and cloud infrastructure seamlessly.
          </p>

          {/* Three Key Tenets */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div
              className={`p-3.5 rounded-2xl border transition-all ${
                isDark
                  ? "bg-[#121316] border-white/10 text-white"
                  : "bg-white border-[#484944]/15 text-[#18191B] shadow-2xs"
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#C52623]/10 text-[#C52623] flex items-center justify-center font-bold mb-2">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold block mb-1">Architecture</h4>
              <p className={`text-[11px] leading-snug ${isDark ? "text-stone-400" : "text-[#484944]"}`}>
                Sub-20ms P99 latency & clean microservices.
              </p>
            </div>

            <div
              className={`p-3.5 rounded-2xl border transition-all ${
                isDark
                  ? "bg-[#121316] border-white/10 text-white"
                  : "bg-white border-[#484944]/15 text-[#18191B] shadow-2xs"
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#C52623]/10 text-[#C52623] flex items-center justify-center font-bold mb-2">
                <Zap className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold block mb-1">Delivery</h4>
              <p className={`text-[11px] leading-snug ${isDark ? "text-stone-400" : "text-[#484944]"}`}>
                Zero handoff friction from Figma to APIs.
              </p>
            </div>

            <div
              className={`p-3.5 rounded-2xl border transition-all ${
                isDark
                  ? "bg-[#121316] border-white/10 text-white"
                  : "bg-white border-[#484944]/15 text-[#18191B] shadow-2xs"
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#C52623]/10 text-[#C52623] flex items-center justify-center font-bold mb-2">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold block mb-1">Sovereignty</h4>
              <p className={`text-[11px] leading-snug ${isDark ? "text-stone-400" : "text-[#484944]"}`}>
                100% Client code & IP ownership guaranteed.
              </p>
            </div>
          </div>

          {/* Quick Metrics & CTA */}
          <div className="pt-3 flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToServices}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C52623] hover:bg-[#aa1f1c] text-white text-xs font-bold tracking-wide transition-all shadow-lg hover:shadow-red-950/40 group cursor-pointer"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center gap-3 text-xs font-mono text-stone-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C52623]" />
                Paris Studio Direct Access
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C52623]" />
                &lt; 24h Response SLA
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: ROTATING 3D FIGURE
           ========================================================================= */}
        <div className="about-right-3d opacity-0 lg:col-span-5 relative flex flex-col items-center justify-center">
          <div
            className={`w-full max-w-md aspect-square rounded-3xl border shadow-2xl relative overflow-hidden flex flex-col items-center justify-between p-5 sm:p-6 transition-colors duration-300 ${
              isDark
                ? "bg-gradient-to-b from-[#121316] via-[#090A0D] to-[#121316] border-white/10"
                : "bg-gradient-to-b from-stone-50 via-white to-stone-50 border-[#484944]/20"
            }`}
          >
            {/* Top Bar of 3D Sculpture Showcase */}
            <div className="w-full flex items-center justify-between text-[11px] font-mono z-10 pb-2 border-b border-white/10">
              <span className="flex items-center gap-2 font-bold text-[#C52623]">
                <span className="w-2 h-2 rounded-full bg-[#C52623] animate-ping" />
                3D ROTATING MONOGRAM
              </span>
              <span className="text-stone-400 flex items-center gap-1">
                <RotateCw className="w-3 h-3 text-[#C52623] animate-spin" style={{ animationDuration: "8s" }} />
                Kinematic 360°
              </span>
            </div>

            {/* Radiant Ambient Core Halo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#C52623]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Central 3D Canvas with continuous auto-rotation */}
            <div className="relative w-full h-[260px] sm:h-[300px] flex items-center justify-center my-auto z-10">
              <GeometricLogoCanvas
                mode="float"
                autoRotate={true}
                scale={1.05}
                transparentBg={true}
                cameraPreset="isometric"
                hoverTilt={true}
                interactive={false}
                className="w-full h-full"
              />
            </div>

            {/* Bottom Caption & Controls */}
            <div
              className={`w-full pt-3 border-t flex items-center justify-between text-[10px] font-mono z-10 ${
                isDark ? "border-white/10 text-stone-400" : "border-stone-200 text-[#484944]"
              }`}
            >
              <span>NBT ARCHITECTURAL EMBLEM</span>
              <span className="text-[#C52623] font-bold">DRAG OR TILT TO INSPECT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
