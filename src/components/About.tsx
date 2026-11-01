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

      {/* Clean Heading without serial numbers or badges */}
      <AnimatedHeading
        mainText="Who We Are."
        accentText="Engineering & Design."
        subText="Connecting strategy, design, and high-velocity engineering to build products that scale."
      />

      {/* Main Grid: Content on Left, Rotating 3D Figure on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* =========================================================================
            LEFT COLUMN: WHO WE ARE CONTENT (Human, Direct & Concise)
           ========================================================================= */}
        <div className="about-left-content opacity-0 lg:col-span-7 space-y-4">
          <h3
            className={`font-heading text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-tight ${
              isDark ? "text-white" : "text-[#18191B]"
            }`}
          >
            We turn complex ideas into{" "}
            <span className="text-[#C52623]">high-performance platforms.</span>
          </h3>

          <p
            className={`text-xs sm:text-sm leading-relaxed font-normal ${
              isDark ? "text-stone-300" : "text-[#484944]"
            }`}
          >
            NorthBridge Tech is an executive software studio. We partner with ambitious founders and teams to build web systems, cross-platform mobile apps, and scalable cloud infrastructure.
          </p>

          <p
            className={`text-xs leading-relaxed font-normal ${
              isDark ? "text-stone-400" : "text-stone-600"
            }`}
          >
            Inspired by the motherboard <strong className={isDark ? "text-stone-200" : "text-stone-900"}>northbridge</strong> — the silicon chip that connects CPU, memory, and graphics — we act as your core conduit, eliminating bottlenecks between product strategy, design, and code.
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
                Sub-20ms edge latency and modular services.
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
                Bi-weekly production sprint releases.
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
              <h4 className="text-xs font-bold block mb-0.5">Ownership</h4>
              <p className={`text-[10px] leading-snug ${isDark ? "text-stone-400" : "text-[#484944]"}`}>
                100% Client repository IP ownership.
              </p>
            </div>
          </div>

          {/* Clean CTA */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={scrollToServices}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C52623] hover:bg-[#aa1f1c] text-white text-xs font-bold tracking-wide transition-all shadow-[4px_4px_0px_#851513] hover:shadow-[5px_5px_0px_#851513] hover:-translate-x-0.5 hover:-translate-y-0.5 group cursor-pointer"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: ROTATING 3D FIGURE (Frameless, Proportional & Fully Responsive)
           ========================================================================= */}
        <div className="about-right-3d opacity-0 lg:col-span-5 relative flex items-center justify-center py-2">
          <div className="relative w-[250px] h-[250px] xs:w-[280px] xs:h-[280px] sm:w-[320px] sm:h-[320px] md:w-[340px] md:h-[340px] max-w-[calc(100vw-3rem)] max-h-[calc(100vw-3rem)] flex items-center justify-center overflow-visible">
            <GeometricLogoCanvas
              mode="float"
              autoRotate={true}
              scale={0.65}
              transparentBg={true}
              cameraPreset="isometric"
              hoverTilt={true}
              interactive={false}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
