"use client";

import { useState, useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import {
  Globe,
  Smartphone,
  Cloud,
  Palette,
  Network,
  Bot,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";

const SERVICES_DATA = [
  {
    id: "web",
    title: "Custom Web & SaaS",
    subtitle: "High-throughput platforms",
    icon: Globe,
    description: "Next.js 16, React 19, and edge compute engineered for instant hydration and state resilience.",
    deliverables: [
      "Custom SaaS Platforms & Enterprise Portals",
      "Headless High-Conversion Web Apps",
      "Interactive 3D / WebGL Visual Experiences",
    ],
    tech: ["Next.js", "React 19", "TypeScript"],
    badge: "Enterprise Web",
  },
  {
    id: "mobile",
    title: "Mobile Applications",
    subtitle: "Cross-platform iOS and Android",
    icon: Smartphone,
    description: "React Native and native modules with offline-first synchronization, biometrics, and push telemetry.",
    deliverables: [
      "Cross-Platform iOS & Android Deployments",
      "Offline-First SQLite Synchronization",
      "Real-Time WebSockets & Push Telemetry",
    ],
    tech: ["React Native", "Expo", "Kotlin"],
    badge: "iOS & Android",
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure",
    subtitle: "Automated multi-region systems",
    icon: Cloud,
    description: "Kubernetes orchestration, Terraform IaC, and automated blue-green zero-downtime rollouts.",
    deliverables: [
      "Kubernetes Cluster Orchestration",
      "Infrastructure-as-Code via Terraform",
      "Automated Blue/Green Zero-Downtime Rollouts",
    ],
    tech: ["AWS", "GCP", "Kubernetes", "Docker"],
    badge: "Cloud Scale",
  },
  {
    id: "design",
    title: "UI/UX & Design Systems",
    subtitle: "Tokenized systems and micro-motion",
    icon: Palette,
    description: "Design token systems, clickable prototypes, and accessible component libraries for scale.",
    deliverables: [
      "Design Token Systems & Libraries",
      "Clickable Wireframe Prototypes",
      "WCAG 2.1 AA Compliance",
    ],
    tech: ["Figma", "Design Tokens", "Anime.js"],
    badge: "Design Craft",
  },
  {
    id: "integrations",
    title: "API & Systems Integrations",
    subtitle: "Data bridges and event streams",
    icon: Network,
    description: "GraphQL, RESTful APIs, event message brokers (Kafka/RabbitMQ), and enterprise CRM/ERP bridges.",
    deliverables: [
      "Federated GraphQL & REST Architecture",
      "Payment Gateways (Stripe, Paddle)",
      "Idempotent Webhook Processing",
    ],
    tech: ["GraphQL", "Kafka", "Redis", "Stripe"],
    badge: "Enterprise APIs",
  },
  {
    id: "ai",
    title: "Process & AI Automation",
    subtitle: "Practical intelligence and RAG",
    icon: Bot,
    description: "Retrieval-Augmented Generation (RAG), autonomous multi-agent pipelines, and document intelligence.",
    deliverables: [
      "Production RAG Knowledge Retrieval",
      "Autonomous Multi-Agent Workflows",
      "Intelligent Document Analysis",
    ],
    tech: ["Python", "FastAPI", "Vector DBs"],
    badge: "Applied AI",
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);

          const cards = el.querySelectorAll(".services-card-item");
          const bottomBar = el.querySelector(".services-bottom-bar");

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
      id="services"
      ref={sectionRef}
      className="min-h-[calc(100dvh-64px)] lg:h-[calc(100dvh-64px)] lg:max-h-[calc(100dvh-64px)] flex flex-col justify-between py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 overflow-hidden border-b border-stone-200/70"
    >
      {/* Animated Heading on Scroll */}
      <AnimatedHeading
        badge="Services We Provide"
        mainText="Comprehensive Capabilities,"
        accentText="Engineered for Outcomes."
        subText="Whether architecting a new product from scratch or modernizing critical infrastructure, we bring deep technical craftsmanship to every engagement."
      />

      {/* Services Grid (6 cards in 3x2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 my-auto py-2">
        {SERVICES_DATA.map((srv, idx) => {
          const Icon = srv.icon;
          const isSelected = activeService === idx;

          return (
            <div
              key={srv.id}
              onClick={() => setActiveService(idx)}
              className={`services-card-item opacity-0 cursor-pointer rounded-xl p-3 sm:p-3.5 border transition-all flex flex-col justify-between group ${
                isSelected
                  ? "bg-stone-50/90 border-stone-900 shadow-2xs ring-1 ring-stone-900"
                  : "bg-white border-stone-200/90 hover:border-stone-400 hover:shadow-2xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                    {srv.badge}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-[#C42625] text-white"
                        : "bg-stone-100 text-stone-800 group-hover:bg-stone-200"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-stone-900 mb-1">
                  {srv.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-stone-600 leading-snug mb-2 font-normal line-clamp-2">
                  {srv.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1 pt-2 border-t border-stone-100 mb-2">
                  {srv.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-stone-50 border border-stone-200 text-stone-600 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] font-semibold text-stone-800">
                  <span className="text-[#C42625]">Selected Deliverables</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Service Deliverables Bar */}
      <div className="services-bottom-bar opacity-0 rounded-xl border border-stone-200/90 bg-stone-50/70 p-2.5 sm:p-3 shadow-2xs shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <span className="font-bold text-stone-900 text-xs shrink-0">
            {SERVICES_DATA[activeService].title} Scope:
          </span>
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-[11px] text-stone-600">
            {SERVICES_DATA[activeService].deliverables.map((item, i) => (
              <span key={i} className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C42625] shrink-0" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
