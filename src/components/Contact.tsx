"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { animate } from "animejs";
import {
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Phone,
  Globe,
  User,
  Sparkles,
  ShieldCheck,
  Send,
} from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";
import { useTheme } from "../context/ThemeContext";

const SERVICES_OPTIONS = [
  "Web Development",
  "Mobile Apps",
  "Cloud & DevOps",
  "UI / UX Design",
  "API Integrations",
  "Digital Marketing",
];

const BUDGET_OPTIONS = [
  "< $10k",
  "$10k - $25k",
  "$25k - $50k",
  "$50k+",
];

export default function Contact() {
  const { theme, mounted: themeMounted } = useTheme();
  const isDark = themeMounted ? theme === "dark" : true;

  const [selectedService, setSelectedService] = useState("Web Development");
  const [selectedBudget, setSelectedBudget] = useState("$25k - $50k");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    details: "",
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);

          const leftCard = el.querySelector(".contact-left-card");
          const formCard = el.querySelector(".contact-form-card");

          if (leftCard) {
            animate(leftCard, {
              opacity: [0, 1],
              translateX: [-20, 0],
              duration: 550,
              ease: "outCubic",
            });
          }

          if (formCard) {
            animate(formCard, {
              opacity: [0, 1],
              translateX: [20, 0],
              delay: 100,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 border-b transition-colors duration-300 ${
        isDark ? "border-stone-800/80 text-white" : "border-stone-200 text-[#18191B]"
      }`}
    >
      {/* Animated Heading on Scroll */}
      <AnimatedHeading
        mainText="Have an Idea?"
        accentText="Let’s Build It Together."
        subText="Direct access to our engineering team. Reach out to discuss your project scope."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-6">
        {/* Left Column: Direct Inquiries */}
        <div className="contact-left-card opacity-0 lg:col-span-5 space-y-4">
          {/* Visual Banner with Red Solid Shadow */}
          <div
            className={`rounded-2xl border overflow-hidden shadow-[5px_5px_0px_#C52623] relative group transition-colors duration-300 ${
              isDark ? "border-white/10 bg-[#101114]" : "border-[#484944]/15 bg-[#141518]"
            }`}
          >
            <div className="relative aspect-16/9 w-full">
              <Image
                src="/slides/slide-11.webp"
                alt="Let's Build Together"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
              />
            </div>
            <div className="p-3 bg-stone-950/90 backdrop-blur-md border-t border-white/10 text-white flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C52623]" />
                <span className="font-bold text-[11px]">Let&apos;s Build Together</span>
              </div>
              <span className="text-[10px] text-stone-400">
                Strategic Engineering
              </span>
            </div>
          </div>

          {/* Contact Details Card with Red Solid Shadow */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border space-y-3 transition-colors duration-300 shadow-[5px_5px_0px_#C52623] ${
              isDark
                ? "bg-[#101114] border-white/10 text-stone-300"
                : "bg-white border-[#484944]/20 text-[#18191B]"
            }`}
          >
            <div
              className={`flex items-center gap-3 pb-3 border-b ${
                isDark ? "border-white/10" : "border-stone-100"
              }`}
            >
              <Image
                src="/nbt-logo.png"
                alt="NorthBridge Tech"
                width={70}
                height={38}
                className={`h-5 w-auto object-contain ${isDark ? "brightness-110" : ""}`}
              />
              <div className={`border-l pl-3 ${isDark ? "border-white/10" : "border-stone-200"}`}>
                <span
                  className={`text-xs font-bold block leading-tight ${
                    isDark ? "text-white" : "text-stone-900"
                  }`}
                >
                  NorthBridge Tech
                </span>
                <span className={`text-[10px] leading-tight ${isDark ? "text-stone-400" : "text-[#484944]"}`}>
                  Paris, France • Global Reach
                </span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center text-[#C52623] shrink-0">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-stone-400 block text-[8px] uppercase font-mono">Studio Leadership</span>
                  <span className={`font-semibold text-[11px] ${isDark ? "text-white" : "text-stone-900"}`}>
                    Dhrumit Nagarbandhara, Founder &amp; CEO
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center text-[#C52623] shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-stone-400 block text-[8px] uppercase font-mono">Direct Inquiry</span>
                  <a
                    href="mailto:dhrumit@northbridgetech.group"
                    className={`font-semibold text-[11px] transition-colors ${
                      isDark ? "text-stone-200 hover:text-[#C52623]" : "text-stone-900 hover:text-[#C52623]"
                    }`}
                  >
                    dhrumit@northbridgetech.group
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center text-[#C52623] shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-stone-400 block text-[8px] uppercase font-mono">Paris Headquarters</span>
                  <span className={`font-medium text-[11px] ${isDark ? "text-stone-300" : "text-stone-900"}`}>
                    Paris, France (Worldwide Remote Operations)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center text-[#C52623] shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-stone-400 block text-[8px] uppercase font-mono">Response SLA</span>
                  <span className="text-[#C52623] font-bold font-mono text-[11px]">
                    &lt; 24h Response Guaranteed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Inquiry Form with Red Solid Shadow */}
        <div className="contact-form-card opacity-0 lg:col-span-7">
          <div
            className={`p-5 sm:p-6 rounded-2xl border shadow-[6px_6px_0px_#C52623] transition-colors duration-300 ${
              isDark ? "bg-[#101114] border-white/10" : "bg-white border-[#484944]/20"
            }`}
          >
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-red-500/15 border border-[#C52623] flex items-center justify-center mx-auto text-[#C52623]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-stone-900"}`}>
                  Inquiry Received
                </h3>
                <p className={`text-xs sm:text-sm max-w-md mx-auto ${isDark ? "text-stone-400" : "text-[#484944]"}`}>
                  Thank you for reaching out. Our engineering team in Paris will review your requirements and respond within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", details: "" });
                  }}
                  className="px-5 py-2 rounded-full border text-xs font-semibold hover:border-[#C52623] transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider font-mono mb-2 ${isDark ? "text-stone-300" : "text-[#18191B]"}`}>
                    Select Capability:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES_OPTIONS.map((srv) => (
                      <button
                        key={srv}
                        type="button"
                        onClick={() => setSelectedService(srv)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                          selectedService === srv
                            ? "bg-[#C52623] text-white shadow-xs"
                            : isDark
                            ? "bg-white/5 border border-white/10 text-stone-300 hover:text-white hover:bg-white/10"
                            : "bg-stone-50 border border-stone-200 text-[#484944] hover:text-[#18191B] hover:bg-stone-100"
                        }`}
                      >
                        {srv}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider font-mono mb-2 ${isDark ? "text-stone-300" : "text-[#18191B]"}`}>
                    Estimated Project Budget:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGET_OPTIONS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBudget(b)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                          selectedBudget === b
                            ? "bg-[#C52623] text-white shadow-xs"
                            : isDark
                            ? "bg-white/5 border border-white/10 text-stone-300 hover:text-white hover:bg-white/10"
                            : "bg-stone-50 border border-stone-200 text-[#484944] hover:text-[#18191B] hover:bg-stone-100"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${isDark ? "text-stone-300" : "text-stone-700"}`}>
                      Your Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs transition-colors outline-hidden focus:border-[#C52623] focus:ring-1 focus:ring-[#C52623] ${
                        isDark
                          ? "bg-white/5 border-white/10 text-white placeholder-stone-500"
                          : "bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400"
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-medium mb-1 ${isDark ? "text-stone-300" : "text-stone-700"}`}>
                      Work Email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs transition-colors outline-hidden focus:border-[#C52623] focus:ring-1 focus:ring-[#C52623] ${
                        isDark
                          ? "bg-white/5 border-white/10 text-white placeholder-stone-500"
                          : "bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1 ${isDark ? "text-stone-300" : "text-stone-700"}`}>
                    Project Brief & Goals *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your product idea, target timeline, or architectural challenges..."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs transition-colors outline-hidden focus:border-[#C52623] focus:ring-1 focus:ring-[#C52623] resize-none ${
                      isDark
                        ? "bg-white/5 border-white/10 text-white placeholder-stone-500"
                        : "bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400"
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 rounded-full bg-[#C52623] hover:bg-[#aa1f1c] disabled:opacity-50 text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-[4px_4px_0px_#851513] hover:shadow-[5px_5px_0px_#851513] hover:-translate-x-0.5 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span>Sending Inquiry...</span>
                  ) : (
                    <>
                      <span>Submit Project Brief</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
