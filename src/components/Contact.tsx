"use client";

import { useState, useEffect, useRef } from "react";
import { animate } from "animejs";
import { Mail, MapPin, Clock, ArrowRight, CheckCircle2, Calendar } from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";

const SERVICES_OPTIONS = [
  "Custom Web & SaaS",
  "Mobile Apps",
  "Cloud & DevOps",
  "UI/UX Systems",
  "Integrations",
  "AI & Automation",
];

export default function Contact() {
  const [selectedService, setSelectedService] = useState("Custom Web & SaaS");
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
      className="min-h-[calc(100dvh-64px)] lg:h-[calc(100dvh-64px)] lg:max-h-[calc(100dvh-64px)] flex flex-col justify-between py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 overflow-hidden border-b border-stone-200/70"
    >
      {/* Animated Heading on Scroll */}
      <AnimatedHeading
        badge="Contact Us"
        mainText="Start a Conversation"
        accentText="with Our Principals."
        subText="Whether scoping a greenfield product or seeking architectural guidance, our principals are ready to consult."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center my-auto py-1">
        {/* Left Column: Direct Inquiries */}
        <div className="contact-left-card opacity-0 lg:col-span-5 space-y-3">
          <div className="p-3.5 sm:p-4 rounded-xl bg-stone-50/80 border border-stone-200/80 space-y-2.5">
            <h3 className="text-xs sm:text-sm font-bold text-stone-900">Direct Inquiries</h3>
            <div className="space-y-2 text-xs text-stone-600">
              <div className="flex items-start gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#C42625] shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-400 block text-[10px]">Email</span>
                  <a href="mailto:contact@northbridgetech.group" className="text-stone-900 font-semibold hover:text-[#C42625] text-xs">
                    contact@northbridgetech.group
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#C42625] shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-400 block text-[10px]">Locations</span>
                  <span className="text-stone-900 font-medium text-xs">New York, NY & Global Remote</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-3.5 h-3.5 text-[#C42625] shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-400 block text-[10px]">Response SLA</span>
                  <span className="text-stone-900 font-medium text-xs">Reply guaranteed in &lt; 24 business hours</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
              <Calendar className="w-3.5 h-3.5 text-[#C42625]" />
              <span>15-Minute Technical Scoping Call</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-snug font-normal">
              Speak directly with a principal architect to evaluate engineering feasibility.
            </p>
            <a
              href="mailto:contact@northbridgetech.group?subject=Technical%20Scoping%20Call%20Request"
              className="inline-flex items-center justify-between w-full p-2 rounded-lg bg-stone-50 border border-stone-200 hover:border-stone-400 text-xs font-semibold text-stone-900 hover:text-[#C42625] transition-all"
            >
              <span>Request Discovery Call</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Right Column: Clean Form */}
        <div className="contact-form-card opacity-0 lg:col-span-7">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-50/70 border border-stone-200 shadow-2xs">
            {submitted ? (
              <div className="py-6 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-red-50 text-[#C42625] flex items-center justify-center mx-auto border border-red-100">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-900">Thank You</h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto font-normal">
                  Your inquiry has been received. A partner will review your brief within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", details: "" });
                  }}
                  className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-semibold text-stone-900 hover:bg-stone-50 cursor-pointer mt-1"
                >
                  <span>Submit Another Brief</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-800 mb-0.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Mercer"
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-stone-200 focus:border-stone-900 focus:outline-none text-xs text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-800 mb-0.5">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-stone-200 focus:border-stone-900 focus:outline-none text-xs text-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-800 mb-1">Capability Interest:</label>
                  <div className="flex flex-wrap gap-1">
                    {SERVICES_OPTIONS.map((srv) => (
                      <button
                        key={srv}
                        type="button"
                        onClick={() => setSelectedService(srv)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                          selectedService === srv
                            ? "bg-stone-900 text-white font-semibold"
                            : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"
                        }`}
                      >
                        {srv}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-800 mb-0.5">Project Brief *</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Briefly describe your objectives, timelines, or technical requirements..."
                    className="w-full p-2.5 rounded-lg bg-white border border-stone-200 focus:border-stone-900 focus:outline-none text-xs text-stone-900 resize-none font-normal"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-5 rounded-full bg-[#C42625] hover:bg-[#a81f1e] text-white text-xs font-semibold tracking-wide transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {loading ? (
                    <span>Submitting Brief...</span>
                  ) : (
                    <>
                      <span>Submit Project Brief</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-stone-200/90 bg-stone-50/70 p-2 text-center text-[11px] text-stone-500 shrink-0">
        All technical briefs are handled under strict non-disclosure confidentiality.
      </div>
    </section>
  );
}
