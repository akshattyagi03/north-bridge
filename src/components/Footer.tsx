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
    <footer id="footer" className="bg-stone-50/80 border-t border-stone-200/80 py-16 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Band */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-12 border-b border-stone-200 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center text-white font-bold text-xs tracking-tight">
              NB
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-stone-900 block leading-tight">
                North Bridge Tech
              </span>
              <span className="text-xs text-stone-500 block font-normal">
                Digital Product & Architecture Studio
              </span>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-200 hover:border-stone-400 text-xs font-semibold text-stone-700 hover:text-stone-900 transition-all shadow-2xs cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-stone-200 text-sm">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4">
              Navigation
            </div>
            <ul className="space-y-2.5 text-stone-600 font-normal text-xs sm:text-sm">
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
            <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4">
              Capabilities
            </div>
            <ul className="space-y-2.5 text-stone-600 font-normal text-xs sm:text-sm">
              <li><button onClick={() => scrollTo("services")} className="hover:text-stone-900 transition-colors cursor-pointer">Custom Web & SaaS</button></li>
              <li><button onClick={() => scrollTo("services")} className="hover:text-stone-900 transition-colors cursor-pointer">Mobile Applications</button></li>
              <li><button onClick={() => scrollTo("services")} className="hover:text-stone-900 transition-colors cursor-pointer">Cloud Infrastructure & DevOps</button></li>
              <li><button onClick={() => scrollTo("services")} className="hover:text-stone-900 transition-colors cursor-pointer">UI/UX Design Systems</button></li>
              <li><button onClick={() => scrollTo("services")} className="hover:text-stone-900 transition-colors cursor-pointer">API & Systems Integration</button></li>
              <li><button onClick={() => scrollTo("services")} className="hover:text-stone-900 transition-colors cursor-pointer">Process Automation & AI</button></li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4">
              Direct Contact
            </div>
            <ul className="space-y-2.5 text-stone-600 font-normal text-xs sm:text-sm">
              <li><span className="text-stone-400 block text-xs">Email</span>contact@northbridgetech.group</li>
              <li><span className="text-stone-400 block text-xs">Location</span>New York, NY & Global Remote</li>
              <li><span className="text-stone-400 block text-xs">Commitment</span>Direct partner reply in &lt; 24h</li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4">
              Studio Philosophy
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal mb-3">
              North Bridge Tech partners with ambitious teams to engineer resilient digital
              products where software architecture and bespoke design craftsmanship intersect.
            </p>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-8 text-xs text-stone-500 gap-4 font-normal">
          <div>
            © 2026 North Bridge Tech Group. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-900 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-stone-900 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-stone-900 cursor-pointer transition-colors">Security Overview</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
