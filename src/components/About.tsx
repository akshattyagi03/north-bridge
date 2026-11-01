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
      className={`relative py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 space-y-7 transition-colors duration-300 ${
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
        accentText="Speed & Coordination."
        subText="Architected on hardware principles: connecting strategy, UI/UX, and high-velocity engineering."
      />

      {/* Main Grid: Content on Left, Rotating 3D Figure on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* =========================================================================
            LEFT COLUMN: WHO WE ARE CONTENT (Concise & Punchy)
           ========================================================================= */}
        <div className="about-left-content opacity-0 lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#C52623]/10 border border-[#C52623]/30 text-[10px] text-[#C52623] font-bold uppercase tracking-wider font-mono">
            <Sparkles className="w-3 h-3 text-[#C52623]" />
            <span>PARIS DIGITAL PRODUCT STUDIO</span>
          </div>

          <h3
            className={`text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-tight ${
              isDark ? "text-white" : "text-[#18191B]"
            }`}
          >
            We turn complex business visions into{" "}
            <span className="text-[#C52623]">high-performance platforms.</span>
          </h3>

          <p
            className={`text-xs sm:text-sm leading-relaxed font-normal ${
              isDark ? "text-stone-300" : "text-[#484944]"
            }`}
          >
            NorthBridge Tech is an executive software studio in Paris. We partner with ambitious founders to engineer scalable web systems, cross-platform mobile apps, and high-uptime cloud infrastructure.
          </p>

          <p
            className={`text-xs leading-relaxed font-normal ${
              isDark ? "text-stone-400" : "text-stone-600"
            }`}
          >
            Like a computer motherboard&apos;s <strong className={isDark ? "text-stone-200" : "text-stone-900"}>northbridge</strong> — the silicon hub coordinating CPU, memory, and graphics — we act as your core conduit, eliminating bottlenecks across strategy, design, and code.
          </p>

          {/* Three Key Tenets with Red Solid Shadow */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div
              className={`p-3 rounded-2xl border transition-all duration-200 shadow-[4px_4px_0px_#C52623] hover:shadow-[5px_5px_0px_#C52623] hover:-translate-x-0.5 hover:-translate-y-0.5 ${
                isDark
                  ? "bg-[#121316] border-white/10 text-white"
                  : "bg-white border-[#484944]/20 text-[#18191B]"
              }`}
            >
              <div className="w-7 h-7 rounded-lg bg-[#C52623]/10 text-[#C52623] flex items-center justify-center font-bold mb-1.5">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-xs font-bold block mb-0.5">Architecture</h4>
              <p className={`text-[10px] leading-snug ${isDark ? "text-stone-400" : "text-[#484944]"}`}>
                Sub-20ms P99 latency &amp; clean microservices.
              </p>
            </div>

            <div
              className={`p-3 rounded-2xl border transition-all duration-200 shadow-[4px_4px_0px_#C52623] hover:shadow-[5px_5px_0px_#C52623] hover:-translate-x-0.5 hover:-translate-y-0.5 ${
                isDark
                  ? "bg-[#121316] border-white/10 text-white"
                  : "bg-white border-[#484944]/20 text-[#18191B]"
              }`}
            >
              <div className="w-7 h-7 rounded-lg bg-[#C52623]/10 text-[#C52623] flex items-center justify-center font-bold mb-1.5">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-xs font-bold block mb-0.5">Velocity</h4>
              <p className={`text-[10px] leading-snug ${isDark ? "text-stone-400" : "text-[#484944]"}`}>
                Fast bi-weekly testable sprint releases.
              </p>
            </div>

            <div
              className={`p-3 rounded-2xl border transition-all duration-200 shadow-[4px_4px_0px_#C52623] hover:shadow-[5px_5px_0px_#C52623] hover:-translate-x-0.5 hover:-translate-y-0.5 ${
                isDark
                  ? "bg-[#121316] border-white/10 text-white"
                  : "bg-white border-[#484944]/20 text-[#18191B]"
              }`}
            >
              <div className="w-7 h-7 rounded-lg bg-[#C52623]/10 text-[#C52623] flex items-center justify-center font-bold mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-xs font-bold block mb-0.5">Sovereignty</h4>
              <p className={`text-[10px] leading-snug ${isDark ? "text-stone-400" : "text-[#484944]"}`}>
                100% Client code &amp; IP ownership.
              </p>
            </div>
          </div>

          {/* Quick Metrics & CTA */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={scrollToServices}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C52623] hover:bg-[#aa1f1c] text-white text-xs font-bold tracking-wide transition-all shadow-[4px_4px_0px_#851513] hover:shadow-[5px_5px_0px_#851513] hover:-translate-x-0.5 hover:-translate-y-0.5 group cursor-pointer"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center gap-2.5 text-[11px] font-mono text-stone-500">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#C52623]" />
                Paris Direct Access
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#C52623]" />
                &lt; 24h SLA
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: ROTATING 3D FIGURE WITH RED SOLID SHADOW
           ========================================================================= */}
        <div className="about-right-3d opacity-0 lg:col-span-5 relative flex flex-col items-center justify-center">
          <div
            className={`w-full max-w-sm aspect-square rounded-2xl border shadow-[6px_6px_0px_#C52623] relative overflow-hidden flex flex-col items-center justify-between p-4 sm:p-5 transition-colors duration-300 ${
              isDark
                ? "bg-gradient-to-b from-[#121316] via-[#090A0D] to-[#121316] border-white/10"
                : "bg-gradient-to-b from-stone-50 via-white to-stone-50 border-[#484944]/25"
            }`}
          >
            {/* Top Bar of 3D Sculpture Showcase */}
            <div className="w-full flex items-center justify-between text-[10px] font-mono z-10 pb-2 border-b border-white/10">
              <span className="flex items-center gap-1.5 font-bold text-[#C52623]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C52623] animate-ping" />
                3D ROTATING MONOGRAM
              </span>
              <span className="text-stone-400 flex items-center gap-1">
                <RotateCw className="w-3 h-3 text-[#C52623] animate-spin" style={{ animationDuration: "8s" }} />
                Kinematic 360°
              </span>
            </div>

            {/* Central 3D Canvas */}
            <div className="relative w-full h-[210px] sm:h-[240px] flex items-center justify-center my-auto z-10">
              <GeometricLogoCanvas
                mode="float"
                autoRotate={true}
                scale={1.0}
                transparentBg={true}
                cameraPreset="isometric"
                hoverTilt={true}
                interactive={false}
                className="w-full h-full"
              />
            </div>

            {/* Bottom Caption & Controls */}
            <div
              className={`w-full pt-2 border-t flex items-center justify-between text-[9px] font-mono z-10 ${
                isDark ? "border-white/10 text-stone-400" : "border-stone-200 text-[#484944]"
              }`}
            >
              <span>NBT ARCHITECTURAL EMBLEM</span>
              <span className="text-[#C52623] font-bold">DRAG OR TILT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
