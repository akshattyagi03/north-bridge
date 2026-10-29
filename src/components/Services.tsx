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
    title: "Custom Web & SaaS Architecture",
    subtitle: "High-throughput web applications",
    icon: Globe,
    description:
      "Next.js 16, React 19, TypeScript, and edge compute engineered for instant hydration and resilient state management.",
    deliverables: [
      "Custom SaaS Platforms & Enterprise Portals",
      "Headless E-Commerce & High-Conversion Stores",
      "Interactive 3D / WebGL Visual Experiences",
    ],
    tech: ["Next.js", "React 19", "TypeScript", "Tailwind CSS"],
    badge: "Enterprise Web",
  },
  {
    id: "mobile",
    title: "Mobile Application Engineering",
    subtitle: "Cross-platform iOS and Android",
    icon: Smartphone,
    description:
      "React Native and native modules with offline-first synchronization, biometrics, and push telemetry.",
    deliverables: [
      "Cross-Platform iOS & Android Deployments",
      "Offline-First SQLite Synchronization",
      "Real-Time WebSockets & Push Notifications",
    ],
    tech: ["React Native", "Expo", "iOS Swift", "Android Kotlin"],
    badge: "iOS & Android",
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure & DevOps",
    subtitle: "Automated multi-region cloud systems",
    icon: Cloud,
    description:
      "Kubernetes container orchestration, Terraform infrastructure-as-code, and zero-downtime CI/CD automated rollouts.",
    deliverables: [
      "Kubernetes (EKS/GKE) Cluster Orchestration",
      "Infrastructure-as-Code with Terraform",
      "Automated Blue/Green Zero-Downtime Rollouts",
    ],
    tech: ["AWS", "Google Cloud", "Kubernetes", "Docker", "Terraform"],
    badge: "Cloud Scale",
  },
  {
    id: "design",
    title: "UI/UX & Design Systems",
    subtitle: "Tokenized systems and micro-motion",
    icon: Palette,
    description:
      "Figma design tokens, clickable prototypes, and accessible component libraries for effortless engineering handoff.",
    deliverables: [
      "Design Token Systems & Component Libraries",
      "High-Fidelity Clickable Wireframe Prototypes",
      "WCAG 2.1 AA Accessibility Verification",
    ],
    tech: ["Figma", "Design Tokens", "Anime.js", "WCAG 2.1"],
    badge: "Design Craft",
  },
  {
    id: "integrations",
    title: "API & Systems Integrations",
    subtitle: "Data bridges and event streams",
    icon: Network,
    description:
      "GraphQL and RESTful APIs, asynchronous message brokers (Kafka/RabbitMQ), and enterprise CRM/ERP bridges.",
    deliverables: [
      "Federated GraphQL & REST API Architecture",
      "Global Payment Gateways (Stripe, Paddle)",
      "Idempotent Webhook Processing & Retries",
    ],
    tech: ["GraphQL", "REST", "Apache Kafka", "Redis", "Stripe API"],
    badge: "Enterprise APIs",
  },
  {
    id: "ai",
    title: "Process & AI Automation",
    subtitle: "Practical machine intelligence and RAG",
    icon: Bot,
    description:
      "Retrieval-Augmented Generation (RAG), autonomous multi-agent pipelines, and automated document analysis.",
    deliverables: [
      "Retrieval-Augmented Generation (RAG) Architecture",
      "Autonomous Task Pipelines & Workflow Agents",
      "Vector Search Databases (pgvector, Pinecone)",
    ],
    tech: ["OpenAI API", "LangChain", "pgvector", "Python", "FastAPI"],
    badge: "Machine Intelligence",
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

  return (
    <section
      id="services"
      ref={sectionRef}
      className="min-h-[calc(100dvh-64px)] flex flex-col justify-between py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 border-b border-stone-200/70"
    >
      {/* Animated Heading on Scroll */}
      <AnimatedHeading
        badge="Services We Provide"
        mainText="Comprehensive Capabilities,"
        accentText="Engineered for Outcomes."
        subText="Whether architecting a new digital product from scratch or modernizing critical infrastructure, we bring deep technical craftsmanship to every engagement."
      />

      {/* Services Grid (6 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 my-auto py-6">
        {SERVICES_DATA.map((srv, idx) => {
          const Icon = srv.icon;
          const isSelected = activeService === idx;

          return (
            <div
              key={srv.id}
              onClick={() => setActiveService(idx)}
              className={`services-card-item opacity-0 cursor-pointer rounded-2xl p-5 sm:p-6 border transition-all flex flex-col justify-between group ${
                isSelected
                  ? "bg-stone-50 border-stone-900 shadow-xs ring-1 ring-stone-900"
                  : "bg-white border-stone-200 hover:border-stone-400 hover:shadow-xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700">
                    {srv.badge}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-[#C42625] text-white"
                        : "bg-stone-100 text-stone-800 group-hover:bg-stone-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-1.5">
                  {srv.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4 font-normal">
                  {srv.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-stone-100 mb-3">
                  {srv.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-0.5 rounded-full bg-white border border-stone-200 text-stone-600 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-stone-800">
                  <span className="text-[#C42625]">Selected Deliverables</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Service Deliverables Bar */}
      <div className="services-bottom-bar opacity-0 rounded-2xl border border-stone-200/90 bg-stone-50/70 p-4 sm:p-5 shadow-xs mt-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs sm:text-sm font-bold text-stone-900">
            {SERVICES_DATA[activeService].title} Scope:
          </span>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-stone-600">
            {SERVICES_DATA[activeService].deliverables.map((item, i) => (
              <span key={i} className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#C42625] shrink-0" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
