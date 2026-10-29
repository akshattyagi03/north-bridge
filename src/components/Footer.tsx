"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="footer" className="bg-stone-50/80 border-t border-stone-200/80 py-10 sm:py-12 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Band */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-stone-200 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-stone-900 flex items-center justify-center text-white font-bold text-xs tracking-tight">
              NB
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-stone-900 block leading-tight">
                North Bridge Tech
              </span>
              <span className="text-[11px] text-stone-500 block font-normal">
                Digital Product & Architecture Studio
              </span>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 hover:border-stone-400 text-xs font-semibold text-stone-700 hover:text-stone-900 transition-all shadow-2xs cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-b border-stone-200 text-xs">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-3">
              Navigation
            </div>
            <ul className="space-y-2 text-stone-600 font-normal">
              <li><button onClick={() => scrollTo("hero")} className="hover:text-stone-900 transition-colors cursor-pointer">Home</button></li>
              <li><button onClick={() => scrollTo("about")} className="hover:text-stone-900 transition-colors cursor-pointer">About Us</button></li>
              <li><button onClick={() => scrollTo("services")} className="hover:text-stone-900 transition-colors cursor-pointer">Services We Provide</button></li>
              <li><button onClick={() => scrollTo("portfolio")} className="hover:text-stone-900 transition-colors cursor-pointer">Our Portfolio</button></li>
              <li><button onClick={() => scrollTo("reviews")} className="hover:text-stone-900 transition-colors cursor-pointer">Our Reviews</button></li>
              <li><button onClick={() => scrollTo("projects")} className="hover:text-stone-900 transition-colors cursor-pointer">Our Projects</button></li>
              <li><button onClick={() => scrollTo("contact")} className="hover:text-stone-900 transition-colors cursor-pointer">Contact Us</button></li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-3">
              Capabilities
            </div>
            <ul className="space-y-2 text-stone-600 font-normal">
              <li><button onClick={() => scrollTo("services")} className="hover:text-stone-900 transition-colors cursor-pointer">Custom Web & SaaS</button></li>
              <li><button onClick={() => scrollTo("services")} className="hover:text-stone-900 transition-colors cursor-pointer">Mobile Applications</button></li>
              <li><button onClick={() => scrollTo("services")} className="hover:text-stone-900 transition-colors cursor-pointer">Cloud Infrastructure & DevOps</button></li>
              <li><button onClick={() => scrollTo("services")} className="hover:text-stone-900 transition-colors cursor-pointer">UI/UX Design Systems</button></li>
              <li><button onClick={() => scrollTo("services")} className="hover:text-stone-900 transition-colors cursor-pointer">API & Systems Integration</button></li>
              <li><button onClick={() => scrollTo("services")} className="hover:text-stone-900 transition-colors cursor-pointer">Process Automation & AI</button></li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-3">
              Direct Contact
            </div>
            <ul className="space-y-2 text-stone-600 font-normal">
              <li><span className="text-stone-400 block text-[10px]">Email</span>contact@northbridgetech.group</li>
              <li><span className="text-stone-400 block text-[10px]">Locations</span>New York, NY & Global Remote</li>
              <li><span className="text-stone-400 block text-[10px]">Commitment</span>Partner reply in &lt; 24h</li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-3">
              Studio Philosophy
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-normal mb-2">
              North Bridge Tech partners with ambitious teams to engineer resilient digital
              products where software architecture and bespoke design craftsmanship intersect.
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 text-[11px] text-stone-500 gap-2 font-normal">
          <div>
            © 2026 North Bridge Tech Group. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>SOC 2 Type II Certified</span>
            <span>•</span>
            <span>99.98% High-Availability SLA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
