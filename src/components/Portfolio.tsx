"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { animate, stagger } from "animejs";
import { ArrowUpRight, Sparkles, TrendingUp, Cpu } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import AnimatedHeading from "./AnimatedHeading";

const CATEGORIES = ["All", "Web & SaaS", "Mobile", "Cloud", "UI/UX & Brand"];

const PORTFOLIO_PROJECTS = [
  {
    id: "nexus-pay",
    code: "NBT-01",
    category: "Web & SaaS",
    name: "SaaS Billing & Dashboard",
    tagline: "Subscription & invoice automation",
    metrics: "Sub-20ms Engine",
    description: "Modular subscription engine with automated billing and customer dashboards.",
    tech: ["Next.js 16", "TypeScript", "Stripe API"],
    impact: "+340% Speed",
    client: "NexusPay Global",
  },
  {
    id: "aura-health",
    code: "NBT-02",
    category: "Mobile",
    name: "Cross-Platform Mobile App",
    tagline: "Native iOS & Android experience",
    metrics: "99.9% Sync SLA",
    description: "Offline-first React Native mobile application with real-time telemetry notifications.",
    tech: ["React Native", "Expo", "SQLite WAL"],
    impact: "64% Faster Sync",
    client: "Aura Health Ecosystem",
  },
  {
    id: "krypton-fleet",
    code: "NBT-03",
    category: "Cloud",
    name: "Production Cloud Setup",
    tagline: "Automated container orchestration",
    metrics: "99.98% High Uptime",
    description: "High-uptime AWS cloud environments with automated CI/CD and system telemetry.",
    tech: ["AWS", "Docker", "CI/CD Pipeline"],
    impact: "Zero Downtime",
    client: "Krypton Fleet Systems",
  },
  {
    id: "synthetix-console",
    code: "NBT-04",
    category: "UI/UX & Brand",
    name: "Design Token System",
    tagline: "Figma wireframes & prototypes",
    metrics: "40+ Components",
    description: "Full UI design system, interactive prototypes, and frictionless developer token handoff.",
    tech: ["Figma", "Design Tokens", "Wireframing"],
    impact: "10x Faster Handoff",
    client: "Synthetix Labs",
  },
  {
    id: "veloce-store",
    code: "NBT-05",
    category: "Web & SaaS",
    name: "Headless E-Commerce",
    tagline: "High-conversion web storefront",
    metrics: "100 Lighthouse",
    description: "Fast, responsive web store with instant checkout and modern faceted product filters.",
    tech: ["Next.js", "Tailwind CSS", "Stripe Elements"],
    impact: "+48% Conversion",
    client: "Veloce Commerce",
  },
  {
    id: "brand-creative",
    code: "NBT-06",
    category: "UI/UX & Brand",
    name: "Digital Brand Presence",
    tagline: "Social assets & ad creatives",
    metrics: "3.2x Engagement",
    description: "Multi-channel visual identity guidelines, corporate decks, and high-conversion ad campaign assets.",
    tech: ["Brand Identity", "Vector Graphics", "Ad Assets"],
    impact: "+210% Reach",
    client: "AeroDynamics Co",
  },
];

export default function Portfolio() {
  const { theme, mounted: themeMounted } = useTheme();
  const isDark = themeMounted ? theme === "dark" : true;

  const [activeCategory, setActiveCategory] = useState("All");
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
              translateY: [16, 0],
              delay: stagger(40, { start: 120 }),
              duration: 500,
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
    activeCategory === "All"
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === activeCategory);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 transition-colors duration-300 ${
        isDark ? "border-b border-stone-800/80 text-white" : "border-b border-stone-200 text-[#18191B]"
      }`}
    >
      {/* Animated Heading on Scroll */}
      <AnimatedHeading
        sectionNumber="05"
        badge="PORTFOLIO • SELECTED WORKS"
        mainText="Selected Works &"
        accentText="Digital Products."
        subText="Web applications, mobile platforms, and cloud deployments engineered with precision."
      />

      {/* Filter Tabs */}
      <div className="portfolio-filter-tabs opacity-0 flex flex-wrap items-center justify-between gap-3 pt-6 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#C52623] text-white shadow-md shadow-red-950/40"
                  : isDark
                  ? "bg-white/5 border border-white/10 text-stone-300 hover:text-white hover:bg-white/10"
                  : "bg-white border border-[#484944]/20 text-[#484944] hover:text-[#18191B] hover:bg-stone-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Image
            src="/nbt-logo.png"
            alt="NorthBridge Tech"
            width={60}
            height={32}
            className={`h-4.5 w-auto object-contain ${isDark ? "brightness-110" : ""}`}
          />
          <span className="text-xs font-medium text-[#484944] font-mono">
            Build • Connect • Scale
          </span>
        </div>
      </div>

      {/* Flagship Enterprise Spotlight Showcase */}
      {activeCategory === "All" && (
        <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#18191B] via-[#242528] to-[#141517] text-white border border-[#484944]/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-[#C52623]/25 via-[#C52623]/5 to-transparent pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-[10px] font-bold text-white bg-[#C52623] px-3 py-0.5 rounded-full shadow-xs">
                  FLAGSHIP ARCHITECTURE • NBT-01
                </span>
                <span className="text-xs font-semibold text-stone-300">
                  NexusPay Global Settlement Platform
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                High-Concurrency Billing Engine with Sub-18ms Settlement Latency
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl font-normal">
                Architected an event-driven payment orchestrator processing over 1.2M daily transactions. Replaced legacy database bottlenecks with distributed caching and fault-tolerant webhook dispatchers.
              </p>

              {/* Architecture Tech Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {["Next.js 16", "Go Microservices", "Kafka Streams", "Redis Caching", "Stripe API"].map((t) => (
                  <span key={t} className="text-[10px] px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-stone-200 font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics Cockpit Block */}
            <div className="lg:col-span-4 bg-black/60 p-5 sm:p-6 rounded-2xl border border-white/10 space-y-3.5 text-center sm:text-left">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                <span className="text-stone-400 font-mono text-[11px]">PRODUCTION IMPACT</span>
                <span className="text-[#C52623] font-bold font-mono">+340% SPEED</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-2xl font-extrabold text-white block">16ms</span>
                  <span className="text-[10px] text-stone-400 font-mono">P99 LATENCY</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-2xl font-extrabold text-[#C52623] block">100%</span>
                  <span className="text-[10px] text-stone-400 font-mono">UPTIME SLA</span>
                </div>
              </div>

              <button
                onClick={scrollToContact}
                className="w-full py-2.5 px-4 rounded-xl bg-[#C52623] hover:bg-[#aa1f1c] text-white text-xs font-bold transition-all shadow-md inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Case Study Brief</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Projects 3x2 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 py-2">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={scrollToContact}
            className={`portfolio-card-item opacity-0 group p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden hover:-translate-y-1.5 ${
              isDark
                ? "bg-[#121316] border-white/10 text-white hover:border-[#C52623] hover:shadow-2xl hover:shadow-red-950/20"
                : "bg-white border-[#484944]/15 text-[#18191B] hover:border-[#C52623] hover:shadow-xl"
            }`}
          >
            {/* Top red micro-accent on hover */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C52623] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div>
              <div
                className={`flex items-center justify-between pb-3 border-b mb-3 ${
                  isDark ? "border-white/10" : "border-stone-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold text-[#C52623] bg-[#C52623]/10 px-2.5 py-0.5 rounded">
                    {project.code}
                  </span>
                  <span className={`text-xs font-semibold ${isDark ? "text-stone-400" : "text-[#484944]"}`}>
                    {project.category}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#C52623] bg-red-50/80 border border-red-200/80 px-2.5 py-0.5 rounded-full font-mono">
                  {project.impact}
                </span>
              </div>

              <h3
                className={`text-base font-bold mb-1 group-hover:text-[#C52623] transition-colors ${
                  isDark ? "text-white" : "text-[#18191B]"
                }`}
              >
                {project.name}
              </h3>
              <p className={`text-xs mb-2.5 font-medium ${isDark ? "text-stone-400" : "text-[#484944]"}`}>
                {project.tagline} • <span className={isDark ? "text-stone-200 font-semibold" : "text-[#18191B] font-semibold"}>{project.client}</span>
              </p>
              <p className={`text-xs leading-relaxed font-normal mb-4 ${isDark ? "text-stone-300" : "text-[#484944]"}`}>
                {project.description}
              </p>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className={`text-[10px] px-2 py-0.5 rounded-md border font-medium ${
                      isDark
                        ? "bg-white/5 border-white/10 text-stone-300"
                        : "bg-stone-100 border-[#484944]/15 text-[#484944]"
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div
              className={`pt-3 border-t flex items-center justify-between text-xs ${
                isDark ? "border-white/10" : "border-stone-100"
              }`}
            >
              <span className={`text-[11px] font-mono font-semibold ${isDark ? "text-stone-400" : "text-[#484944]"}`}>
                {project.metrics}
              </span>
              <span className="inline-flex items-center gap-1 text-[#C52623] font-bold group-hover:translate-x-1 transition-transform text-xs">
                <span>Inquire Scope</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
