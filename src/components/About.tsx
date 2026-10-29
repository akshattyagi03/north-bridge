"use client";

import { useState, useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { Cpu, ShieldCheck, Zap, Layers, ArrowRight, CheckCircle2 } from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";

const PILLARS = [
  {
    icon: Cpu,
    title: "Strategic Architecture",
    description: "Robust software systems grounded in clean modularity, strict type safety, and optimized execution paths.",
    deliverables: ["Modular Domain Design", "Strict Type Safety"],
  },
  {
    icon: Zap,
    title: "Cloud Resilience",
    description: "Engineered to effortlessly sustain traffic surges with containerized clusters and edge-first delivery.",
    deliverables: ["Auto-Scaling Clusters", "99.98% High Uptime"],
  },
  {
    icon: Layers,
    title: "Bespoke UI Systems",
    description: "Design tokens, fluid micro-interactions, accessible components, and human-centered ergonomics.",
    deliverables: ["Design Token Systems", "WCAG 2.1 Compliance"],
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description: "Cryptographic data integrity, role-based governance, and strict compliance standards from day one.",
    deliverables: ["End-to-End Encryption", "SOC2 Preparedness"],
  },
];

const LIFECYCLE_STAGES = [
  {
    id: "discovery",
    number: "01",
    phase: "Discovery & Strategy",
    headline: "Uncovering Core Business Objectives & Architecture Constraints",
    description: "Our architects analyze user flows, data schemas, and bottlenecks to formulate a deterministic delivery roadmap.",
    deliverables: ["Architecture Blueprint", "Data Schema Specs", "Milestone Roadmap"],
  },
  {
    id: "architecture",
    number: "02",
    phase: "Systems Design",
    headline: "Prototyping High-Concurrence Data Flows & Interfaces",
    description: "We construct living prototypes and stress-test system boundaries, defining design tokens and strict API contracts.",
    deliverables: ["Interactive Tokens", "API Contracts (REST/GraphQL)", "IaC Templates"],
  },
  {
    id: "engineering",
    number: "03",
    phase: "Precision Engineering",
    headline: "Iterative Sprints with Automated Continuous Verification",
    description: "Senior engineers develop modular features in rapid sprints with automated regression tests and profiling.",
    deliverables: ["Production Codebase", "Comprehensive Tests", "CI/CD Staging"],
  },
  {
    id: "deployment",
    number: "04",
    phase: "Deployment & Scale",
    headline: "Zero-Downtime Rollout & Long-Term Observability",
    description: "Blue-green deployments with automated health checks, continuous telemetry, and sub-30ms edge latency.",
    deliverables: ["Kubernetes CI/CD", "Prometheus Telemetry", "SLA Guarantees"],
  },
];

export default function About() {
  const [activeStage, setActiveStage] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);

          const cards = el.querySelectorAll(".about-pillar-card");
          const lifecycle = el.querySelector(".about-lifecycle-box");

          if (cards.length > 0) {
            animate(cards, {
              opacity: [0, 1],
              translateY: [20, 0],
              delay: stagger(50, { start: 150 }),
              duration: 550,
              ease: "outCubic",
            });
          }

          if (lifecycle) {
            animate(lifecycle, {
              opacity: [0, 1],
              translateY: [15, 0],
              delay: 350,
              duration: 600,
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-[calc(100dvh-64px)] lg:h-[calc(100dvh-64px)] lg:max-h-[calc(100dvh-64px)] flex flex-col justify-between py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 overflow-hidden border-b border-stone-200/70"
    >
      {/* Animated Heading on Scroll */}
      <AnimatedHeading
        badge="About North Bridge Tech"
        mainText="Rooted in Engineering Integrity,"
        accentText="Built for Enduring Scale."
        subText="We partner with ambitious teams to engineer resilient digital products where software architecture and bespoke design craftsmanship intersect."
      />

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-auto py-2">
        {PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="about-pillar-card opacity-0 p-3.5 sm:p-4 rounded-xl bg-white border border-stone-200/90 hover:border-stone-400 transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-900 mb-2.5">
                  <Icon className="w-4 h-4" />
                </div>

                <h3 className="text-sm font-bold text-stone-900 mb-1">
                  {pillar.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-2.5 font-normal line-clamp-2">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 space-y-1">
                {pillar.deliverables.map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] text-stone-500 font-medium truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C42625] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Product Lifecycle Stages */}
      <div className="about-lifecycle-box opacity-0 rounded-xl border border-stone-200/90 bg-stone-50/70 p-3 sm:p-3.5 shadow-2xs shrink-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
          {/* Phase Switcher Tabs */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-2">
            {LIFECYCLE_STAGES.map((stage, idx) => (
              <button
                key={stage.id}
                onClick={() => setActiveStage(idx)}
                className={`text-left p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                  activeStage === idx
                    ? "bg-stone-900 text-white shadow-2xs"
                    : "bg-white border-stone-200 text-stone-700 hover:bg-stone-100"
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-[10px] font-bold opacity-60">{stage.number}</span>
                  <span className="text-xs font-semibold truncate">{stage.phase}</span>
                </div>
                <ArrowRight
                  className={`w-3 h-3 shrink-0 ${
                    activeStage === idx ? "text-[#C42625]" : "text-stone-300"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Stage Detail Pane */}
          <div className="lg:col-span-7 p-3 rounded-lg bg-white border border-stone-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 pb-1.5 border-b border-stone-100 mb-1.5">
                <span className="font-semibold text-stone-800">
                  Lifecycle Phase {LIFECYCLE_STAGES[activeStage].number} of 04
                </span>
                <span className="text-[#C42625] font-semibold">
                  {LIFECYCLE_STAGES[activeStage].phase}
                </span>
              </div>

              <h4 className="text-xs sm:text-sm font-bold text-stone-900 mb-1">
                {LIFECYCLE_STAGES[activeStage].headline}
              </h4>

              <p className="text-xs text-stone-600 leading-relaxed font-normal mb-2 line-clamp-2">
                {LIFECYCLE_STAGES[activeStage].description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-stone-100 text-xs text-stone-500">
              <span className="font-semibold text-stone-700 text-[11px]">Outcomes:</span>
              {LIFECYCLE_STAGES[activeStage].deliverables.map((item, i) => (
                <span key={i} className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-600">
                  <CheckCircle2 className="w-3 h-3 text-[#C42625]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
