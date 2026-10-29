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
    metrics: "$80M+ Monthly Vol",
    description: "Next.js, Go microservices, and distributed PostgreSQL handling 1.2M daily transactions with zero downtime.",
    tech: ["Next.js", "Golang", "PostgreSQL"],
    impact: "+340% Speed",
  },
  {
    id: "aura-health",
    category: "Mobile",
    name: "Aura Health Ecosystem",
    tagline: "HIPAA-compliant patient biometrics engine",
    metrics: "99.99% Vital Sync",
    description: "Offline-first mobile health ecosystem in React Native with Bluetooth telemetry and encrypted records.",
    tech: ["React Native", "SQLite", "HIPAA Vault"],
    impact: "64% Latency Drop",
  },
  {
    id: "krypton-fleet",
    category: "Cloud & Infra",
    name: "Krypton Fleet Systems",
    tagline: "Real-time fleet tracking & supply chain telemetry",
    metrics: "15k+ Active Vehicles",
    description: "High-concurrency event ingestion pipeline handling millions of geospatial coordinates per hour.",
    tech: ["Kubernetes", "Redis", "Terraform"],
    impact: "22% Fuel Savings",
  },
  {
    id: "synthetix-console",
    category: "Cloud & Infra",
    name: "Synthetix Cloud Console",
    tagline: "Multi-cluster Kubernetes observability console",
    metrics: "Sub-10ms UI Updates",
    description: "Bespoke developer console with real-time log tailing, container crash diagnosis, and RBAC permissions.",
    tech: ["React 19", "Three.js", "Docker"],
    impact: "10x Faster Triage",
  },
  {
    id: "veloce-store",
    category: "SaaS Platforms",
    name: "Veloce Commerce",
    tagline: "Sub-second edge rendered commerce platform",
    metrics: "100 Lighthouse Score",
    description: "Lightning-fast headless store with instant search, tokenized checkout, and multi-warehouse sync.",
    tech: ["Next.js 16", "Shopify API", "Redis"],
    impact: "+48% Conversions",
  },
  {
    id: "omnigraph-ai",
    category: "AI & Systems",
    name: "OmniGraph Enterprise AI",
    tagline: "Knowledge graph & autonomous agent copilot",
    metrics: "8.5M Vector Nodes",
    description: "Enterprise agent system connecting unstructured documents with automated extraction and guardrails.",
    tech: ["Python", "FastAPI", "pgvector"],
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
              translateY: [10, 0],
              duration: 450,
              ease: "outCubic",
            });
          }

          if (cards.length > 0) {
            animate(cards, {
              opacity: [0, 1],
              translateY: [20, 0],
              delay: stagger(45, { start: 150 }),
              duration: 550,
              ease: "outCubic",
            });
          }

          if (bottomBar) {
            animate(bottomBar, {
              opacity: [0, 1],
              translateY: [10, 0],
              delay: 350,
              duration: 550,
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
      className="min-h-[calc(100dvh-64px)] lg:h-[calc(100dvh-64px)] lg:max-h-[calc(100dvh-64px)] flex flex-col justify-between py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 overflow-hidden border-b border-stone-200/70"
    >
      {/* Animated Heading on Scroll */}
      <AnimatedHeading
        badge="Our Portfolio"
        mainText="Selected Works &"
        accentText="Digital Deployments."
        subText="A curated index of production platforms, applications, and infrastructure engineered for category leaders and scale-ups."
      />

      {/* Filter Tabs */}
      <div className="portfolio-filter-tabs opacity-0 flex flex-wrap items-center gap-1.5 pt-1.5 pb-1 shrink-0">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-stone-900 text-white shadow-2xs"
                : "bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects 3x2 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 my-auto py-1.5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => scrollTo("projects")}
            className="portfolio-card-item opacity-0 group p-3 sm:p-3.5 rounded-xl bg-white border border-stone-200/90 hover:border-stone-400 transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between pb-1.5 border-b border-stone-100 mb-1.5">
                <span className="text-[10px] font-semibold text-stone-500">
                  {project.category}
                </span>
                <span className="text-[10px] font-bold text-[#C42625] bg-red-50/70 px-2 py-0.5 rounded-full">
                  {project.impact}
                </span>
              </div>

              <h3 className="text-xs sm:text-sm font-bold text-stone-900 mb-0.5 group-hover:text-[#C42625] transition-colors truncate">
                {project.name}
              </h3>
              <p className="text-[10px] text-stone-500 mb-1 font-medium truncate">
                {project.tagline}
              </p>
              <p className="text-[11px] text-stone-600 leading-snug mb-2 font-normal line-clamp-2">
                {project.description}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between text-[11px] font-medium text-stone-800 p-1.5 rounded-lg bg-stone-50 mb-1.5">
                <span className="text-stone-500 text-[10px]">Scale:</span>
                <span className="font-bold text-stone-900 text-[11px]">{project.metrics}</span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-semibold text-stone-900 pt-0.5">
                <span className="text-[10px] text-stone-500 font-normal">
                  {project.tech.slice(0, 2).join(" • ")}
                </span>
                <span className="inline-flex items-center gap-0.5 text-[#C42625] text-[11px]">
                  <span>Inspect Case</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="portfolio-bottom-bar opacity-0 rounded-xl border border-stone-200/90 bg-stone-50/70 p-2 sm:p-2.5 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-500 gap-1.5 shrink-0">
        <span className="text-[11px]">Displaying production systems engineered across fintech, health, and cloud infrastructure.</span>
        <button
          onClick={() => scrollTo("contact")}
          className="font-semibold text-stone-900 hover:text-[#C42625] transition-colors cursor-pointer self-start sm:self-auto text-xs"
        >
          Discuss Your Project Architecture →
        </button>
      </div>
    </section>
  );
}
