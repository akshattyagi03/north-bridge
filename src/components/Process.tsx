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
    problem: "Vague technical scopes, unverified architecture assumptions, and hidden scalability traps.",
    solution: "Deep technical audit, user workflow mapping, performance risk assessment, and clear project scope charter.",
    deliverables: ["Technical Architecture Audit", "User Persona & Flow Mapping", "Infrastructure & Security Roadmap"],
    outcome: "Clear project charter & zero architecture guesswork",
  },
  {
    num: "02",
    id: "blueprint",
    title: "System Architecture & API Specs",
    time: "Weeks 1–2",
    icon: FileCode,
    problem: "Database schema bottlenecks, microservice spaghetti, and mismatched third-party API contracts.",
    solution: "Modular database schemas, REST & GraphQL contracts, caching layers, and high-concurrency blueprints.",
    deliverables: ["Modular Database Schemas", "REST & GraphQL Specifications", "High-Availability Cloud Blueprint"],
    outcome: "Production-ready engineering specification",
  },
  {
    num: "03",
    id: "design",
    title: "Figma UI/UX & Design Tokens",
    time: "Weeks 2–3",
    icon: Palette,
    problem: "Cluttered user interfaces, high user drop-off, and painful friction between designer Figma files and dev code.",
    solution: "Production design token systems (colors, spacing, typography), responsive component libraries, and clickable user flow prototypes.",
    deliverables: ["Figma Design Token System", "Responsive Component Library", "Interactive Clickable Prototypes"],
    outcome: "Validated user experience & pixel-perfect handoff",
  },
  {
    num: "04",
    id: "build",
    title: "Sprint Engineering & Full-Stack Build",
    time: "Weeks 3–6",
    icon: Terminal,
    problem: "Slow engineering velocity, fragile untyped code, and breaking bugs right before release.",
    solution: "Clean, strongly-typed Next.js 16 & React Native engineering with automated test suites, sub-20ms edge tuning, and bi-weekly sprint demos.",
    deliverables: ["Full-Stack Next.js 16 & React 19", "Cross-Platform iOS & Android Native", "End-to-End Automated Test Suites"],
    outcome: "Sub-20ms latency engine & production build",
  },
  {
    num: "05",
    id: "launch",
    title: "Zero-Downtime Launch & Continuous Care",
    time: "Week 6+",
    icon: Rocket,
    problem: "Deployment outages, unmonitored server crashes, and abandonment after initial launch.",
    solution: "Zero-downtime AWS CI/CD pipelines, global CDN edge caching, 24/7 telemetry monitoring alerts, and ongoing maintenance SLA.",
    deliverables: ["Zero-Downtime AWS Deployment", "Global CDN Caching & Telemetry", "100% Client IP Code Ownership"],
    outcome: "100% Client IP ownership & live scalability",
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
      className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 space-y-12 transition-colors duration-300 ${
        isDark ? "border-b border-stone-800/80 text-white" : "border-b border-stone-200 text-[#18191B]"
      }`}
    >
      {/* Animated Heading on Scroll */}
      <AnimatedHeading
        sectionNumber="05"
        badge="SCROLL TIMELINE • HOW WE SOLVE YOUR PROBLEMS"
        mainText="How We Solve"
        accentText="Your Problems."
        subText="Scroll down to witness each stage your project goes through — from initial bottleneck audit to scalable zero-downtime production."
      />

      {/* =========================================================================
          VERTICAL SCROLL-DOWN TIMELINE
         ========================================================================= */}
      <div className="relative pt-4">
        {/* Central glowing vertical spine line */}
        <div
          className={`absolute top-8 bottom-8 left-4 sm:left-1/2 -translate-x-1/2 w-0.5 pointer-events-none transition-colors duration-300 ${
            isDark
              ? "bg-gradient-to-b from-[#C52623] via-[#ff4a47]/60 to-[#C52623]"
              : "bg-gradient-to-b from-[#C52623] via-stone-300 to-[#C52623]"
          }`}
        />

        <div className="space-y-10 sm:space-y-16">
          {TIMELINE_STAGES.map((stg, idx) => {
            const Icon = stg.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={stg.id}
                className="timeline-stage-card opacity-0 relative flex flex-col sm:flex-row items-start sm:items-center w-full"
              >
                {/* Milestone Node on the Spine */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#18191B] border-2 border-[#C52623] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-xl z-20 group-hover:scale-110 transition-transform">
                  <span className="text-[#C52623] font-mono font-black">{stg.num}</span>
                </div>

                {/* Left/Right Container Placement */}
                <div
                  className={`w-full sm:w-[calc(50%-3rem)] pl-12 sm:pl-0 ${
                    isEven ? "sm:mr-auto sm:text-right" : "sm:ml-auto sm:text-left"
                  }`}
                >
                  <div
                    className={`p-6 sm:p-7 rounded-3xl border shadow-xl transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 ${
                      isDark
                        ? "bg-[#101114] border-white/10 text-white hover:border-[#C52623] hover:shadow-2xl hover:shadow-red-950/20"
                        : "bg-white border-[#484944]/15 text-[#18191B] hover:border-[#C52623] hover:shadow-xl"
                    }`}
                  >
                    {/* Top Stage Metadata */}
                    <div
                      className={`flex items-center gap-2 pb-3 mb-3 border-b border-white/10 ${
                        isEven ? "sm:justify-end" : "sm:justify-start"
                      }`}
                    >
                      <span className="font-mono text-[10px] font-bold text-white bg-[#C52623] px-2.5 py-0.5 rounded-full">
                        STAGE {stg.num}
                      </span>
                      <span className="text-xs font-mono text-stone-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#C52623]" />
                        {stg.time}
                      </span>
                    </div>

                    {/* Stage Title */}
                    <div
                      className={`flex items-center gap-3 mb-3 ${
                        isEven ? "sm:flex-row-reverse" : "sm:flex-row"
                      }`}
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#C52623]/10 text-[#C52623] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3
                        className={`text-base sm:text-lg font-black group-hover:text-[#C52623] transition-colors leading-tight ${
                          isDark ? "text-white" : "text-[#18191B]"
                        }`}
                      >
                        {stg.title}
                      </h3>
                    </div>

                    {/* Problem vs Solution Comparison */}
                    <div className="space-y-2 text-xs py-2 text-left">
                      {/* The Problem */}
                      <div
                        className={`p-2.5 rounded-xl border flex items-start gap-2 ${
                          isDark
                            ? "bg-red-950/20 border-red-900/30 text-red-200"
                            : "bg-red-50 border-red-100 text-red-900"
                        }`}
                      >
                        <AlertCircle className="w-3.5 h-3.5 text-[#C52623] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold font-mono text-[10px] block uppercase text-[#C52623]">
                            The Bottleneck:
                          </span>
                          <span className="text-[11px] leading-snug">{stg.problem}</span>
                        </div>
                      </div>

                      {/* The Solution */}
                      <div
                        className={`p-2.5 rounded-xl border flex items-start gap-2 ${
                          isDark
                            ? "bg-white/5 border-white/10 text-stone-300"
                            : "bg-stone-50 border-stone-200 text-stone-700"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C52623] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold font-mono text-[10px] block uppercase text-stone-400">
                            How We Solve It:
                          </span>
                          <span className="text-[11px] leading-snug">{stg.solution}</span>
                        </div>
                      </div>
                    </div>

                    {/* Deliverables Checklist */}
                    <div className="pt-2 text-left">
                      <span className="text-[10px] font-mono font-bold uppercase text-stone-400 block mb-1">
                        Verified Deliverables:
                      </span>
                      <div className="space-y-1">
                        {stg.deliverables.map((d, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px] text-stone-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C52623]" />
                            <span className="truncate">{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Outcome Footer */}
                    <div
                      className={`pt-3 mt-3 border-t flex items-center justify-between text-[11px] font-mono ${
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

        {/* Timeline Bottom Cap */}
        <div className="pt-8 text-center">
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C52623] hover:bg-[#aa1f1c] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-xl hover:shadow-red-950/50 cursor-pointer group"
          >
            <span>Start Stage 01 With NorthBridge Tech</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
