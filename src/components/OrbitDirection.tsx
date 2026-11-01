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
    desc: "Direct Slack channel and weekly sprints shape the backlog with zero bureaucracy.",
    icon: MessageSquare,
    deliverable: "Same-day pivot responsiveness",
    angle: 0,
  },
  {
    id: "ownership",
    num: "02",
    title: "Transparent IP & Code",
    subtitle: "100% Client Repository IP",
    desc: "Every commit, PR, and spec lives in your enterprise GitHub or GitLab repositories.",
    icon: GitBranch,
    deliverable: "100% Client code ownership",
    angle: 72,
  },
  {
    id: "velocity",
    num: "03",
    title: "Continuous Sprint Demos",
    subtitle: "Live Staging URLs Bi-Weekly",
    desc: "Live testable production staging URLs deployed every two weeks for verification.",
    icon: Repeat,
    deliverable: "Bi-weekly testable demos",
    angle: 144,
  },
  {
    id: "architecture",
    num: "04",
    title: "Adaptive Architecture",
    subtitle: "Tailored to Your Roadmap",
    desc: "Sub-20ms modular microservices that flex seamlessly with your business expansion.",
    icon: Cpu,
    deliverable: "Sub-20ms scalable core",
    angle: 216,
  },
  {
    id: "scaling",
    num: "05",
    title: "Post-Launch Growth",
    subtitle: "Proactive Telemetry & Care",
    desc: "24/7 telemetry monitoring alerts, feature iterations, and proactive cloud tuning.",
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
      className={`py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24 sm:scroll-mt-28 space-y-7 transition-colors duration-300 ${
        isDark ? "border-b border-stone-800/80 text-white" : "border-b border-stone-200 text-[#18191B]"
      }`}
    >
      {/* Animated Heading on Scroll */}
      <AnimatedHeading
        mainText="Your Direction."
        accentText="Our Execution."
        subText="You set the roadmap; we engineer the platform around your continuous feedback."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
        {/* =========================================================================
            LEFT COLUMN: EDITORIAL CONTENT & ACTIVE POINT INSPECTOR WITH RED SOLID SHADOW
           ========================================================================= */}
        <div className="orbit-left-editorial opacity-0 lg:col-span-5 space-y-4">
          <h3
            className={`font-heading text-xl sm:text-2xl font-black tracking-tight leading-tight ${
              isDark ? "text-white" : "text-[#18191B]"
            }`}
          >
            Software that moves in sync with{" "}
            <span className="text-[#C52623]">your business goals.</span>
          </h3>

          <p
            className={`text-xs sm:text-sm leading-relaxed font-normal ${
              isDark ? "text-stone-300" : "text-[#484944]"
            }`}
          >
            We eliminate agency disconnect. You work directly with senior engineers with bi-weekly testable demos, transparent codebases, and zero vendor lock-in.
          </p>

          {/* Active Inspected Point Card with Solid Red Shadow */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border shadow-[5px_5px_0px_#C52623] space-y-2.5 transition-all duration-300 ${
              isDark
                ? "bg-[#121316] border-white/10 text-white"
                : "bg-white border-[#484944]/20 text-[#18191B]"
            }`}
          >
            <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
              <span className="font-mono text-[10px] font-bold text-white bg-[#C52623] px-2 py-0.5 rounded-full">
                {currentPoint.num}
              </span>
              <span className="text-[11px] font-mono text-stone-400">
                {currentPoint.deliverable}
              </span>
            </div>

            <h4 className="font-heading text-sm sm:text-base font-black text-[#C52623]">
              {currentPoint.title}
            </h4>

            <p className={`text-xs leading-relaxed ${isDark ? "text-stone-300" : "text-[#484944]"}`}>
              {currentPoint.desc}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-1 flex items-center gap-3">
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C52623] hover:bg-[#aa1f1c] text-white text-xs font-bold tracking-wide transition-all shadow-[4px_4px_0px_#851513] hover:shadow-[5px_5px_0px_#851513] hover:-translate-x-0.5 hover:-translate-y-0.5 cursor-pointer group"
            >
              <span>Build With Us</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: ORBITAL POINT SYSTEM WITH RED SOLID SHADOW
           ========================================================================= */}
        <div className="orbit-stage-container opacity-0 lg:col-span-7 flex flex-col items-center justify-center relative py-2">
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative w-[270px] h-[270px] xs:w-[310px] xs:h-[310px] sm:w-[380px] sm:h-[380px] md:w-[400px] md:h-[400px] max-w-[calc(100vw-2.5rem)] max-h-[calc(100vw-2.5rem)] rounded-full border flex items-center justify-center transition-colors duration-300 shadow-[5px_5px_0px_#C52623] sm:shadow-[6px_6px_0px_#C52623] select-none ${
              isDark
                ? "bg-[#0B0C0E]/90 border-white/10"
                : "bg-white border-[#484944]/20"
            }`}
          >
            {/* Ambient Background Core Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#C52623]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Concentric Orbital Track Rings */}
            <div className="absolute inset-4 sm:inset-6 rounded-full border border-dashed border-red-500/20 pointer-events-none" />
            <div className="absolute inset-10 sm:inset-14 rounded-full border border-stone-500/10 pointer-events-none" />
            <div className="absolute inset-16 sm:inset-24 rounded-full border border-dashed border-red-500/30 pointer-events-none" />

            {/* THE CENTER NUCLEUS: "YOUR SAY" */}
            <div className="relative z-30 flex flex-col items-center justify-center">
              <div className="relative group cursor-pointer">
                {/* Central Sphere with Red Solid Shadow */}
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#851513] via-[#C52623] to-[#ff4a47] p-1 shadow-[4px_4px_0px_#851513] flex flex-col items-center justify-center text-center text-white ring-2 ring-black/40">
                  <span className="font-heading text-[11px] sm:text-sm font-black leading-tight block">
                    YOUR SAY
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-white/90 block mt-0.5">
                    Our Direction
                  </span>
                </div>
              </div>
            </div>

            {/* THE ORBITING TRACK CONTAINER */}
            <div
              className={`absolute inset-0 flex items-center justify-center animate-orbit-track ${
                isHovered ? "orbit-paused" : ""
              }`}
            >
              {ORBIT_POINTS.map((pt, idx) => {
                const Icon = pt.icon;
                const isSelected = activePoint === idx;

                const rad = (pt.angle * Math.PI) / 180;
                const distancePct = 40;
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
                    <div
                      className={`animate-orbit-node ${isHovered ? "orbit-paused" : ""}`}
                    >
                      <button
                        onClick={() => setActivePoint(idx)}
                        onMouseEnter={() => setActivePoint(idx)}
                        className={`group relative w-11 h-11 xs:w-13 xs:h-13 sm:w-16 sm:h-16 rounded-full border flex flex-col items-center justify-center p-1 transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-[#C52623] text-white border-white scale-110 shadow-[4px_4px_0px_#851513] ring-2 ring-red-400"
                            : isDark
                            ? "bg-[#18191D] text-stone-200 border-white/15 hover:border-[#C52623] hover:scale-105 shadow-[2px_2px_0px_#C52623]"
                            : "bg-white text-stone-800 border-[#484944]/25 hover:border-[#C52623] hover:scale-105 shadow-[2px_2px_0px_#C52623]"
                        }`}
                        title={pt.title}
                        aria-label={pt.title}
                      >
                        <Icon className="w-3 h-3 sm:w-4 sm:h-4 mb-0.5 group-hover:scale-110 transition-transform" />
                        <span className="font-mono text-[6.5px] xs:text-[7px] sm:text-[8px] font-black uppercase text-center leading-tight truncate max-w-[40px] xs:max-w-[45px] sm:max-w-[55px]">
                          {pt.title.split(" ")[0]}
                        </span>
                        <span className="text-[5.5px] xs:text-[6px] font-mono text-stone-400 group-hover:text-white">
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
          <div className="pt-3 text-center">
            <span className="text-[11px] font-mono text-stone-500 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C52623] animate-ping" />
              <span>Interactive Feedback Orbit • Click to inspect</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
