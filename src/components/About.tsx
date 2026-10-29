"use client";

import { useState, useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { Cpu, ShieldCheck, Zap, Layers, ArrowRight, CheckCircle2 } from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";

const PILLARS = [
  {
    icon: Cpu,
    title: "Strategic Architecture",
    description:
      "We design robust software systems grounded in clean modularity, strict type safety, and optimized execution paths.",
    deliverables: ["Modular Domain Design", "Strict Type Safety", "Performance Benchmarking"],
  },
  {
    icon: Zap,
    title: "Cloud Resilience & Scale",
    description:
      "Engineered to effortlessly sustain traffic surges with containerized clusters and edge-first delivery networks.",
    deliverables: ["Auto-Scaling Clusters", "Multi-Region Edge Caching", "99.98% Guaranteed Uptime"],
  },
  {
    icon: Layers,
    title: "Bespoke UI/UX Systems",
    description:
      "Form and function in harmonious balance. Comprehensive design token systems, fluid micro-interactions, and accessibility.",
    deliverables: ["Component Design Tokens", "Fluid Motion Systems", "WCAG 2.1 AA Compliance"],
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Security embedded from line one. Cryptographic data integrity, role-based governance, and strict compliance standards.",
    deliverables: ["End-to-End Encryption", "SOC2 & HIPAA Preparedness", "Audit Log Verification"],
  },
];

const LIFECYCLE_STAGES = [
  {
    id: "discovery",
    number: "01",
    phase: "Discovery & Strategy",
    headline: "Uncovering Core Business Objectives & Architecture Constraints",
    description:
      "Our architects analyze your user flows, data schemas, compliance mandates, and bottlenecks to formulate a deterministic roadmap.",
    deliverables: ["Architecture Blueprint", "Data Schema & API Specs", "Milestone Roadmap"],
  },
  {
    id: "architecture",
    number: "02",
    phase: "Systems Design",
    headline: "Prototyping High-Concurrence Data Flows & Interfaces",
    description:
      "We construct living prototypes and stress-test core system boundaries, building design token libraries and defining clean API contracts.",
    deliverables: ["Figma Interactive Tokens", "API Contracts (GraphQL/REST)", "Terraform IaC Templates"],
  },
  {
    id: "engineering",
    number: "03",
    phase: "Precision Engineering",
    headline: "Iterative Sprints with Automated Testing & Continuous Verification",
    description:
      "Senior engineers develop modular features in rapid sprints with automated regression tests and profiling before merging.",
    deliverables: ["Production-Grade Codebase", "Comprehensive Test Suites", "Staging Environments"],
  },
  {
    id: "deployment",
    number: "04",
    phase: "Deployment & Scale",
    headline: "Zero-Downtime Rollout & Long-Term Observability",
    description:
      "Blue-green deployments with automated health checks, continuous telemetry, and alerting for sub-30ms response times.",
    deliverables: ["Kubernetes CI/CD Automation", "Prometheus Telemetry", "SLA Guarantees"],
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
              translateY: [32, 0],
              delay: stagger(70, { start: 200 }),
              duration: 650,
              ease: "outCubic",
            });
          }

          if (lifecycle) {
            animate(lifecycle, {
              opacity: [0, 1],
              translateY: [24, 0],
              delay: 450,
              duration: 700,
              ease: "outCubic",
            });
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-[calc(100dvh-64px)] flex flex-col justify-between py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 border-b border-stone-200/70"
    >
      {/* Animated Heading on Scroll */}
      <AnimatedHeading
        badge="About North Bridge Tech"
        mainText="Rooted in Engineering Integrity,"
        accentText="Built for Enduring Scale."
        subText="North Bridge Tech was founded on a singular conviction: ambitious digital products require uncompromising engineering rigor paired with refined, human-centered design."
      />

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-auto py-6">
        {PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="about-pillar-card opacity-0 p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/90 hover:border-stone-400 transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900 mb-4">
                  <Icon className="w-4 h-4" />
                </div>

                <h3 className="text-base font-bold text-stone-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4 font-normal">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 space-y-1.5">
                {pillar.deliverables.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C42625]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Product Lifecycle Stages */}
      <div className="about-lifecycle-box opacity-0 rounded-2xl border border-stone-200/90 bg-stone-50/70 p-5 sm:p-6 shadow-xs mt-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Phase Switcher Tabs */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-2.5">
            {LIFECYCLE_STAGES.map((stage, idx) => (
              <button
                key={stage.id}
                onClick={() => setActiveStage(idx)}
                className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  activeStage === idx
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-white border-stone-200 text-stone-700 hover:bg-stone-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold opacity-60">{stage.number}</span>
                  <span className="text-xs font-semibold truncate">{stage.phase}</span>
                </div>
                <ArrowRight
                  className={`w-3.5 h-3.5 ${
                    activeStage === idx ? "text-[#C42625]" : "text-stone-300"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Stage Detail Pane */}
          <div className="lg:col-span-7 p-4 sm:p-5 rounded-xl bg-white border border-stone-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-100 mb-2">
                <span className="font-semibold text-stone-800">
                  Lifecycle Phase {LIFECYCLE_STAGES[activeStage].number} of 04
                </span>
                <span className="text-[#C42625] font-semibold">
                  {LIFECYCLE_STAGES[activeStage].phase}
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-stone-900 mb-1.5">
                {LIFECYCLE_STAGES[activeStage].headline}
              </h4>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal mb-3">
                {LIFECYCLE_STAGES[activeStage].description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2.5 border-t border-stone-100 text-xs text-stone-500">
              <span className="font-semibold text-stone-700">Outcomes:</span>
              {LIFECYCLE_STAGES[activeStage].deliverables.map((item, i) => (
                <span key={i} className="inline-flex items-center gap-1 font-medium text-stone-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C42625]" />
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
