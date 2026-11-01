"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import {
  Compass,
  FileCode,
  Palette,
  Terminal,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Clock,
  AlertCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import AnimatedHeading from "./AnimatedHeading";

export const TIMELINE_STAGES = [
  {
    num: "01",
    id: "discovery",
    title: "Problem Discovery & System Audit",
    time: "Week 1",
    icon: Compass,
    problem: "Vague technical scopes and hidden architecture traps.",
    solution: "Deep code audit, user flow mapping, and explicit scope charter.",
    deliverables: ["Architecture Audit", "Project Scope Charter"],
    outcome: "Zero architecture guesswork",
  },
  {
    num: "02",
    id: "blueprint",
    title: "System Architecture & API Specs",
    time: "Weeks 1–2",
    icon: FileCode,
    problem: "Database schema bottlenecks and API contract spaghetti.",
    solution: "Modular schemas, REST/GraphQL contracts, and caching layers.",
    deliverables: ["Modular Database Schemas", "REST & GraphQL Specs"],
    outcome: "Production engineering spec",
  },
  {
    num: "03",
    id: "design",
    title: "Figma UI/UX & Design Tokens",
    time: "Weeks 2–3",
    icon: Palette,
    problem: "High drop-off and friction between Figma designs and code.",
    solution: "Production design token systems, responsive components, and clickable flows.",
    deliverables: ["Figma Design Tokens", "Clickable Prototypes"],
    outcome: "Validated UX & clean handoff",
  },
  {
    num: "04",
    id: "build",
    title: "Sprint Engineering & Full-Stack Build",
    time: "Weeks 3–6",
    icon: Terminal,
    problem: "Slow engineering velocity and fragile breaking bugs.",
    solution: "Strongly-typed Next.js 16 & React Native with bi-weekly sprint demos.",
    deliverables: ["Full-Stack Next.js 16", "Automated Test Suites"],
    outcome: "Sub-20ms edge latency engine",
  },
  {
    num: "05",
    id: "launch",
    title: "Zero-Downtime Launch & Continuous Care",
    time: "Week 6+",
    icon: Rocket,
    problem: "Deployment outages and post-launch abandonment.",
    solution: "Zero-downtime AWS CI/CD pipelines, CDN edge caching, and 24/7 care.",
    deliverables: ["Zero-Downtime Releases", "100% Client Code IP"],
    outcome: "Live scalability & 100% IP",
  },
];

export default function Process() {
  const { theme, mounted: themeMounted } = useTheme();
  const isDark = themeMounted ? theme === "dark" : true;

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const cards = el.querySelectorAll(".timeline-stage-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target, {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 650,
              ease: "outCubic",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="process"
      ref={sectionRef}
      className={`py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 space-y-7 transition-colors duration-300 ${
        isDark ? "border-b border-stone-800/80 text-white" : "border-b border-stone-200 text-[#18191B]"
      }`}
    >
      {/* Animated Heading on Scroll */}
      <AnimatedHeading
        sectionNumber="05"
        badge="SCROLL TIMELINE • HOW WE SOLVE YOUR PROBLEMS"
        mainText="How We Solve"
        accentText="Your Problems."
        subText="Scroll down to witness each stage — from bottleneck audit to zero-downtime production."
      />

      {/* =========================================================================
          VERTICAL SCROLL-DOWN TIMELINE
         ========================================================================= */}
      <div className="relative pt-2">
        {/* Central glowing vertical spine line */}
        <div
          className={`absolute top-6 bottom-6 left-4 sm:left-1/2 -translate-x-1/2 w-0.5 pointer-events-none transition-colors duration-300 ${
            isDark
              ? "bg-gradient-to-b from-[#C52623] via-[#ff4a47]/60 to-[#C52623]"
              : "bg-gradient-to-b from-[#C52623] via-stone-300 to-[#C52623]"
          }`}
        />

        <div className="space-y-6 sm:space-y-8">
          {TIMELINE_STAGES.map((stg, idx) => {
            const Icon = stg.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={stg.id}
                className="timeline-stage-card opacity-0 relative flex flex-col sm:flex-row items-start sm:items-center w-full"
              >
                {/* Milestone Node on the Spine with Solid Red Shadow */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#18191B] border-2 border-[#C52623] text-white flex items-center justify-center font-bold text-xs shadow-[3px_3px_0px_#C52623] z-20 group-hover:scale-110 transition-transform">
                  <span className="text-[#C52623] font-mono font-black">{stg.num}</span>
                </div>

                {/* Left/Right Container Placement */}
                <div
                  className={`w-full sm:w-[calc(50%-2.5rem)] pl-12 sm:pl-0 ${
                    isEven ? "sm:mr-auto sm:text-right" : "sm:ml-auto sm:text-left"
                  }`}
                >
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border shadow-[5px_5px_0px_#C52623] transition-all duration-200 relative overflow-hidden group hover:shadow-[7px_7px_0px_#C52623] hover:-translate-x-0.5 hover:-translate-y-0.5 ${
                      isDark
                        ? "bg-[#101114] border-white/10 text-white"
                        : "bg-white border-[#484944]/20 text-[#18191B]"
                    }`}
                  >
                    {/* Top Stage Metadata */}
                    <div
                      className={`flex items-center gap-2 pb-2 mb-2 border-b border-white/10 ${
                        isEven ? "sm:justify-end" : "sm:justify-start"
                      }`}
                    >
                      <span className="font-mono text-[9px] font-bold text-white bg-[#C52623] px-2 py-0.5 rounded-full">
                        STAGE {stg.num}
                      </span>
                      <span className="text-[11px] font-mono text-stone-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#C52623]" />
                        {stg.time}
                      </span>
                    </div>

                    {/* Stage Title */}
                    <div
                      className={`flex items-center gap-2.5 mb-2.5 ${
                        isEven ? "sm:flex-row-reverse" : "sm:flex-row"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#C52623]/10 text-[#C52623] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3
                        className={`text-sm sm:text-base font-black group-hover:text-[#C52623] transition-colors leading-tight ${
                          isDark ? "text-white" : "text-[#18191B]"
                        }`}
                      >
                        {stg.title}
                      </h3>
                    </div>

                    {/* Problem vs Solution Comparison (Concise) */}
                    <div className="space-y-1.5 text-xs py-1 text-left">
                      {/* The Problem */}
                      <div
                        className={`p-2 rounded-xl border flex items-start gap-1.5 ${
                          isDark
                            ? "bg-red-950/20 border-red-900/30 text-red-200"
                            : "bg-red-50 border-red-100 text-red-900"
                        }`}
                      >
                        <AlertCircle className="w-3 h-3 text-[#C52623] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold font-mono text-[9px] block uppercase text-[#C52623]">
                            The Bottleneck:
                          </span>
                          <span className="text-[11px] leading-tight">{stg.problem}</span>
                        </div>
                      </div>

                      {/* The Solution */}
                      <div
                        className={`p-2 rounded-xl border flex items-start gap-1.5 ${
                          isDark
                            ? "bg-white/5 border-white/10 text-stone-300"
                            : "bg-stone-50 border-stone-200 text-stone-700"
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#C52623] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold font-mono text-[9px] block uppercase text-stone-400">
                            Our Solution:
                          </span>
                          <span className="text-[11px] leading-tight">{stg.solution}</span>
                        </div>
                      </div>
                    </div>

                    {/* Deliverables Checklist */}
                    <div className="pt-1.5 text-left">
                      <span className="text-[9px] font-mono font-bold uppercase text-stone-400 block mb-0.5">
                        Deliverables:
                      </span>
                      <div className="space-y-0.5">
                        {stg.deliverables.map((d, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[10px] text-stone-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C52623]" />
                            <span className="truncate">{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Outcome Footer */}
                    <div
                      className={`pt-2 mt-2 border-t flex items-center justify-between text-[10px] font-mono ${
                        isDark ? "border-white/10" : "border-stone-100"
                      }`}
                    >
                      <span className="text-stone-400">Outcome:</span>
                      <span className="text-[#C52623] font-bold">{stg.outcome}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline Bottom Cap with Solid Red Shadow */}
        <div className="pt-6 text-center">
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C52623] hover:bg-[#aa1f1c] text-white text-xs font-bold tracking-wide transition-all shadow-[4px_4px_0px_#851513] hover:shadow-[6px_6px_0px_#851513] hover:-translate-x-0.5 hover:-translate-y-0.5 cursor-pointer group"
          >
            <span>Start Stage 01 With NorthBridge Tech</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
