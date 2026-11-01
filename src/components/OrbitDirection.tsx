"use client";

import { useState, useEffect, useRef } from "react";
import { animate } from "animejs";
import {
  MessageSquare,
  GitBranch,
  Repeat,
  Cpu,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Compass,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import AnimatedHeading from "./AnimatedHeading";

export const ORBIT_POINTS = [
  {
    id: "feedback",
    num: "01",
    title: "Direct Client Feedback",
    subtitle: "Real-time Slack & Weekly Sync",
    desc: "Your insights and real-world domain feedback immediately shape the next sprint backlog. Zero bureaucratic layers.",
    icon: MessageSquare,
    deliverable: "Same-day pivot responsiveness",
    angle: 0,
  },
  {
    id: "ownership",
    num: "02",
    title: "Transparent IP & Code",
    subtitle: "100% Client Repository IP",
    desc: "Every commit, PR, and architectural document lives directly in your enterprise GitHub or GitLab repositories from day one.",
    icon: GitBranch,
    deliverable: "100% Client code ownership",
    angle: 72,
  },
  {
    id: "velocity",
    num: "03",
    title: "Continuous Sprint Demos",
    subtitle: "Live Staging URLs Bi-Weekly",
    desc: "Never wait months to see software. We deploy testable production builds to staging environments every two weeks.",
    icon: Repeat,
    deliverable: "Bi-weekly testable demos",
    angle: 144,
  },
  {
    id: "architecture",
    num: "04",
    title: "Adaptive Architecture",
    subtitle: "Tailored to Your Roadmap",
    desc: "We construct modular, sub-20ms microservices that flex as your user base and business requirements expand.",
    icon: Cpu,
    deliverable: "Sub-20ms scalable core",
    angle: 216,
  },
  {
    id: "scaling",
    num: "05",
    title: "Post-Launch Growth",
    subtitle: "Proactive Telemetry & Care",
    desc: "Our partnership continues beyond deployment with 24/7 telemetry monitoring alerts, feature iterations, and cloud scaling.",
    icon: TrendingUp,
    deliverable: "24/7 SLA & Maintenance",
    angle: 288,
  },
];

export default function OrbitDirection() {
  const { theme, mounted: themeMounted } = useTheme();
  const isDark = themeMounted ? theme === "dark" : true;

  const [activePoint, setActivePoint] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);

          const leftContent = el.querySelector(".orbit-left-editorial");
          const orbitStage = el.querySelector(".orbit-stage-container");

          if (leftContent) {
            animate(leftContent, {
              opacity: [0, 1],
              translateX: [-30, 0],
              duration: 700,
              ease: "outCubic",
            });
          }

          if (orbitStage) {
            animate(orbitStage, {
              opacity: [0, 1],
              scale: [0.85, 1],
              delay: 150,
              duration: 750,
              ease: "outBack(1.2)",
            });
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animated]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const currentPoint = ORBIT_POINTS[activePoint];

  // Orbit radius (pixels from center)
  const orbitRadius = 145; // mobile / base
  // For responsive rendering, standard trigonometry on relative percentages

  return (
    <section
      id="orbit"
      ref={sectionRef}
      className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 space-y-12 transition-colors duration-300 ${
        isDark ? "border-b border-stone-800/80 text-white" : "border-b border-stone-200 text-[#18191B]"
      }`}
    >
      {/* Animated Heading on Scroll */}
      <AnimatedHeading
        sectionNumber="06"
        badge="CLIENT-CENTRIC ORBIT • GOVERNANCE"
        mainText="Your Say is"
        accentText="Our Direction."
        subText="You define the destination. We engineer the high-speed bridge. Every architectural milestone revolves around your direct feedback."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-4">
        {/* =========================================================================
            LEFT COLUMN: EDITORIAL CONTENT & ACTIVE POINT INSPECTOR
           ========================================================================= */}
        <div className="orbit-left-editorial opacity-0 lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C52623]/10 border border-[#C52623]/30 text-[11px] text-[#C52623] font-bold uppercase tracking-wider font-mono">
            <Compass className="w-3.5 h-3.5 text-[#C52623]" />
            <span>GRAVITATIONAL ALIGNMENT</span>
          </div>

          <h3
            className={`text-2xl sm:text-3xl font-black tracking-tight leading-tight ${
              isDark ? "text-white" : "text-[#18191B]"
            }`}
          >
            Software that moves in sync with{" "}
            <span className="text-[#C52623]">your business requirements.</span>
          </h3>

          <p
            className={`text-xs sm:text-sm leading-relaxed font-normal ${
              isDark ? "text-stone-300" : "text-[#484944]"
            }`}
          >
            We eliminate the traditional agency disconnect. Instead of disappearing for months to build assumptions, our engineering studio places your leadership at the center of the orbital system.
          </p>

          {/* Active Inspected Point Card */}
          <div
            className={`p-5 sm:p-6 rounded-3xl border shadow-xl space-y-3 transition-all duration-300 ${
              isDark
                ? "bg-[#121316] border-white/10 text-white"
                : "bg-white border-[#484944]/15 text-[#18191B]"
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="font-mono text-xs font-bold text-white bg-[#C52623] px-2.5 py-0.5 rounded-full">
                ORBITAL NODE {currentPoint.num}
              </span>
              <span className="text-xs font-mono text-stone-400">
                {currentPoint.deliverable}
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-black text-[#C52623]">
              {currentPoint.title}
            </h4>

            <p className={`text-xs leading-relaxed ${isDark ? "text-stone-300" : "text-[#484944]"}`}>
              {currentPoint.desc}
            </p>

            <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-stone-400">
              <span>Status: Active Orbit</span>
              <span className="text-[#C52623] font-bold">100% Transparent</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C52623] hover:bg-[#aa1f1c] text-white text-xs font-bold tracking-wide transition-all shadow-lg hover:shadow-red-950/40 cursor-pointer group"
            >
              <span>Build Around Your Vision</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <span className="text-xs font-mono text-stone-500">
              Hover or click any circle to inspect
            </span>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: ORBITAL POINT SYSTEM (CIRCLES ORBITING CENTER POINT)
           ========================================================================= */}
        <div className="orbit-stage-container opacity-0 lg:col-span-7 flex flex-col items-center justify-center relative">
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] rounded-full border flex items-center justify-center transition-colors duration-300 shadow-2xl select-none ${
              isDark
                ? "bg-[#0B0C0E]/90 border-white/10"
                : "bg-white border-[#484944]/15"
            }`}
          >
            {/* Ambient Background Core Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#C52623]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Concentric Orbital Track Rings */}
            <div className="absolute inset-8 rounded-full border border-dashed border-red-500/20 pointer-events-none" />
            <div className="absolute inset-16 rounded-full border border-stone-500/10 pointer-events-none" />
            <div className="absolute inset-28 rounded-full border border-dashed border-red-500/30 pointer-events-none" />

            {/* =========================================================================
                THE CENTER NUCLEUS: "YOUR SAY" (The Gravitational Center Point)
               ========================================================================= */}
            <div className="relative z-30 flex flex-col items-center justify-center">
              <div className="relative group cursor-pointer">
                {/* Radiant Pulsing Core Aura */}
                <div className="absolute -inset-3 bg-[#C52623] rounded-full blur-xl opacity-75 group-hover:opacity-100 animate-pulse transition-opacity duration-500" />

                {/* Central Sphere */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#851513] via-[#C52623] to-[#ff4a47] p-1 shadow-2xl flex flex-col items-center justify-center text-center text-white ring-4 ring-black/40">
                  <span className="font-mono text-[9px] font-black uppercase tracking-widest text-red-200 block mb-0.5">
                    CENTER OF GRAVITY
                  </span>
                  <span className="text-xs sm:text-sm font-black leading-tight block">
                    YOUR SAY
                  </span>
                  <span className="text-[10px] font-bold text-white/90 block mt-0.5">
                    Our Direction
                  </span>
                </div>
              </div>
            </div>

            {/* =========================================================================
                THE ORBITING TRACK CONTAINER (Rotates continuously around the center)
               ========================================================================= */}
            <div
              className={`absolute inset-0 flex items-center justify-center animate-orbit-track ${
                isHovered ? "orbit-paused" : ""
              }`}
            >
              {ORBIT_POINTS.map((pt, idx) => {
                const Icon = pt.icon;
                const isSelected = activePoint === idx;

                // Position nodes at equal angular increments along circle
                const rad = (pt.angle * Math.PI) / 180;
                // Responsive distance from center
                const distancePct = 40; // 40% from center
                const x = Math.cos(rad) * distancePct;
                const y = Math.sin(rad) * distancePct;

                return (
                  <div
                    key={pt.id}
                    style={{
                      position: "absolute",
                      left: `calc(50% + ${x}%)`,
                      top: `calc(50% + ${y}%)`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {/* Counter-rotating wrapper to keep child upright and readable */}
                    <div
                      className={`animate-orbit-node ${isHovered ? "orbit-paused" : ""}`}
                    >
                      <button
                        onClick={() => setActivePoint(idx)}
                        onMouseEnter={() => setActivePoint(idx)}
                        className={`group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border flex flex-col items-center justify-center p-1.5 transition-all duration-300 shadow-xl cursor-pointer ${
                          isSelected
                            ? "bg-[#C52623] text-white border-white scale-110 shadow-[0_0_25px_rgba(197,38,35,0.85)] ring-4 ring-red-500/30"
                            : isDark
                            ? "bg-[#18191D] text-stone-200 border-white/15 hover:border-[#C52623] hover:scale-105"
                            : "bg-white text-stone-800 border-[#484944]/20 hover:border-[#C52623] hover:scale-105"
                        }`}
                        title={pt.title}
                        aria-label={pt.title}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5 group-hover:scale-110 transition-transform" />
                        <span className="font-mono text-[8px] sm:text-[9px] font-black uppercase text-center leading-tight truncate max-w-[55px] sm:max-w-[65px]">
                          {pt.title.split(" ")[0]}
                        </span>
                        <span className="text-[7px] font-mono text-stone-400 group-hover:text-white">
                          {pt.num}
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick status bar below the orbit */}
          <div className="pt-4 text-center">
            <span className="text-xs font-mono text-stone-500 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C52623] animate-ping" />
              <span>5 Client Planetary Nodes in Continuous Synchronous Orbit</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
