"use client";

import { useState, useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { ArrowUpRight } from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";

const CATEGORIES = ["All Works", "SaaS Platforms", "Mobile", "Cloud & Infra", "AI & Systems"];

const PORTFOLIO_PROJECTS = [
  {
    id: "nexus-pay",
    category: "SaaS Platforms",
    name: "NexusPay Global",
    tagline: "High-throughput fintech payment engine",
    metrics: "$80M+ Monthly Volume",
    description: "Next.js, Go microservices, and distributed PostgreSQL handling 1.2M daily transactions with zero downtime.",
    tech: ["Next.js", "Golang", "PostgreSQL", "Kafka"],
    impact: "+340% Throughput",
  },
  {
    id: "aura-health",
    category: "Mobile",
    name: "Aura Health Ecosystem",
    tagline: "HIPAA-compliant patient biometrics engine",
    metrics: "99.99% Vital Sync",
    description: "Offline-first mobile health ecosystem in React Native with Bluetooth telemetry and encrypted records.",
    tech: ["React Native", "WebSockets", "SQLite", "HIPAA Vault"],
    impact: "64% Latency Drop",
  },
  {
    id: "krypton-fleet",
    category: "Cloud & Infra",
    name: "Krypton Fleet Systems",
    tagline: "Real-time fleet tracking & supply chain telemetry",
    metrics: "15k+ Active Vehicles",
    description: "High-concurrency event ingestion pipeline handling millions of geospatial coordinates per hour.",
    tech: ["Kubernetes", "Redis", "Terraform", "Go"],
    impact: "22% Fuel Savings",
  },
  {
    id: "synthetix-console",
    category: "Cloud & Infra",
    name: "Synthetix Cloud Console",
    tagline: "Multi-cluster Kubernetes observability console",
    metrics: "Sub-10ms UI Updates",
    description: "Bespoke developer console with real-time log tailing, container crash diagnosis, and RBAC permissions.",
    tech: ["React 19", "Three.js", "gRPC-Web", "Docker"],
    impact: "10x Faster Triage",
  },
  {
    id: "veloce-store",
    category: "SaaS Platforms",
    name: "Veloce Commerce",
    tagline: "Sub-second edge rendered commerce platform",
    metrics: "100 Lighthouse Score",
    description: "Lightning-fast headless store with instant search, tokenized checkout, and multi-warehouse sync.",
    tech: ["Next.js 16", "Turbopack", "Shopify API", "Redis"],
    impact: "+48% Conversions",
  },
  {
    id: "omnigraph-ai",
    category: "AI & Systems",
    name: "OmniGraph Enterprise AI",
    tagline: "Knowledge graph & autonomous agent copilot",
    metrics: "8.5M Vector Nodes",
    description: "Enterprise agent system connecting unstructured documents with automated extraction and guardrails.",
    tech: ["Python", "FastAPI", "pgvector", "LangChain"],
    impact: "85% Auto-Resolved",
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All Works");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);

          const filterTabs = el.querySelector(".portfolio-filter-tabs");
          const cards = el.querySelectorAll(".portfolio-card-item");
          const bottomBar = el.querySelector(".portfolio-bottom-bar");

          if (filterTabs) {
            animate(filterTabs, {
              opacity: [0, 1],
              translateY: [15, 0],
              duration: 500,
              ease: "outCubic",
            });
          }

          if (cards.length > 0) {
            animate(cards, {
              opacity: [0, 1],
              translateY: [32, 0],
              delay: stagger(60, { start: 200 }),
              duration: 650,
              ease: "outCubic",
            });
          }

          if (bottomBar) {
            animate(bottomBar, {
              opacity: [0, 1],
              translateY: [20, 0],
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

  const filteredProjects =
    activeCategory === "All Works"
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === activeCategory);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="min-h-[calc(100dvh-64px)] flex flex-col justify-between py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 border-b border-stone-200/70"
    >
      {/* Animated Heading on Scroll */}
      <AnimatedHeading
        badge="Our Portfolio"
        mainText="Selected Works &"
        accentText="Digital Deployments."
        subText="A curated index of production platforms, applications, and infrastructure we have engineered for category leaders and scale-ups."
      />

      {/* Filter Tabs */}
      <div className="portfolio-filter-tabs opacity-0 flex flex-wrap items-center gap-2 pt-4 pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-stone-900 text-white shadow-xs"
                : "bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects 3x2 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 my-auto py-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => scrollTo("projects")}
            className="portfolio-card-item opacity-0 group p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/90 hover:border-stone-400 transition-all shadow-xs hover:shadow-md flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
                <span className="text-xs font-semibold text-stone-500">
                  {project.category}
                </span>
                <span className="text-xs font-bold text-[#C42625] bg-red-50/70 px-2.5 py-0.5 rounded-full">
                  {project.impact}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-1 group-hover:text-[#C42625] transition-colors">
                {project.name}
              </h3>
              <p className="text-xs text-stone-500 mb-2.5 font-medium">
                {project.tagline}
              </p>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4 font-normal">
                {project.description}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-medium text-stone-800 p-2.5 rounded-xl bg-stone-50 mb-3">
                <span className="text-stone-500 text-xs">Scale Metric:</span>
                <span className="font-bold text-stone-900 text-xs">{project.metrics}</span>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-stone-900 pt-1">
                <span className="text-xs text-stone-500 font-normal">
                  {project.tech.slice(0, 3).join(" • ")}
                </span>
                <span className="inline-flex items-center gap-1 text-[#C42625] text-xs">
                  <span>Inspect Case</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="portfolio-bottom-bar opacity-0 rounded-2xl border border-stone-200/90 bg-stone-50/70 p-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-stone-500 gap-2 mt-auto">
        <span>Displaying production systems engineered across fintech, health, and cloud infrastructure.</span>
        <button
          onClick={() => scrollTo("contact")}
          className="font-semibold text-stone-900 hover:text-[#C42625] transition-colors cursor-pointer self-start sm:self-auto"
        >
          Discuss Your Project Architecture →
        </button>
      </div>
    </section>
  );
}
