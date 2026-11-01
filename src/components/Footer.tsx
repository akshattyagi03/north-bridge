"use client";

import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      className={`border-t py-10 sm:py-12 transition-colors duration-300 ${
        isDark
          ? "bg-[#07080A] border-stone-800 text-stone-300"
          : "bg-stone-100 border-stone-200 text-stone-600"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Band */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b gap-4 ${
            isDark ? "border-stone-800" : "border-stone-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="relative h-10 flex items-center">
              <Image
                src="/nbt-logo.png"
                alt="NorthBridge Tech"
                width={80}
                height={44}
                className={`h-9 w-auto object-contain ${isDark ? "brightness-110" : ""}`}
              />
            </div>
            <div className={`border-l pl-3 ${isDark ? "border-stone-800" : "border-stone-200"}`}>
              <span
                className={`text-sm font-bold tracking-tight block leading-tight ${
                  isDark ? "text-white" : "text-stone-900"
                }`}
              >
                NorthBridge Tech
              </span>
              <span
                className={`text-[11px] block font-normal ${
                  isDark ? "text-stone-400" : "text-stone-500"
                }`}
              >
                <span className="text-[#C52623] font-semibold">One North.</span> Infinite Digital Directions
              </span>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className={`self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
              isDark
                ? "bg-stone-900 border-stone-800 hover:border-stone-700 text-stone-300 hover:text-white shadow-2xs"
                : "bg-white border-stone-300 hover:border-stone-400 text-stone-700 hover:text-stone-900 shadow-2xs"
            }`}
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Links Columns */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-b text-xs ${
            isDark ? "border-stone-800" : "border-stone-200"
          }`}
        >
          <div>
            <div
              className={`text-[10px] font-mono font-bold uppercase tracking-wider mb-3 ${
                isDark ? "text-stone-500" : "text-stone-400"
              }`}
            >
              Navigation
            </div>
            <ul className={`space-y-2 font-normal ${isDark ? "text-stone-400" : "text-stone-600"}`}>
              <li>
                <button
                  onClick={() => scrollTo("hero")}
                  className={`transition-colors cursor-pointer ${isDark ? "hover:text-white" : "hover:text-stone-900"}`}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("about")}
                  className={`transition-colors cursor-pointer ${isDark ? "hover:text-white" : "hover:text-stone-900"}`}
                >
                  Who We Are
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("services")}
                  className={`transition-colors cursor-pointer ${isDark ? "hover:text-white" : "hover:text-stone-900"}`}
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("pillars")}
                  className={`transition-colors cursor-pointer ${isDark ? "hover:text-white" : "hover:text-stone-900"}`}
                >
                  Our Pillars
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("process")}
                  className={`transition-colors cursor-pointer ${isDark ? "hover:text-white" : "hover:text-stone-900"}`}
                >
                  How We Solve
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("orbit")}
                  className={`transition-colors cursor-pointer ${isDark ? "hover:text-white" : "hover:text-stone-900"}`}
                >
                  Your Direction
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("contact")}
                  className={`transition-colors cursor-pointer ${isDark ? "hover:text-white" : "hover:text-stone-900"}`}
                >
                  Contact Studio
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div
              className={`text-[10px] font-mono font-bold uppercase tracking-wider mb-3 ${
                isDark ? "text-stone-500" : "text-stone-400"
              }`}
            >
              Disciplines
            </div>
            <ul className={`space-y-2 font-normal ${isDark ? "text-stone-400" : "text-stone-600"}`}>
              <li>
                <button
                  onClick={() => scrollTo("services")}
                  className={`transition-colors cursor-pointer ${isDark ? "hover:text-white" : "hover:text-stone-900"}`}
                >
                  Web Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("services")}
                  className={`transition-colors cursor-pointer ${isDark ? "hover:text-white" : "hover:text-stone-900"}`}
                >
                  Mobile Apps
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("services")}
                  className={`transition-colors cursor-pointer ${isDark ? "hover:text-white" : "hover:text-stone-900"}`}
                >
                  Deployment & Cloud
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("services")}
                  className={`transition-colors cursor-pointer ${isDark ? "hover:text-white" : "hover:text-stone-900"}`}
                >
                  UI / UX Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("services")}
                  className={`transition-colors cursor-pointer ${isDark ? "hover:text-white" : "hover:text-stone-900"}`}
                >
                  API Integrations
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("services")}
                  className={`transition-colors cursor-pointer ${isDark ? "hover:text-white" : "hover:text-stone-900"}`}
                >
                  Digital Marketing
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div
              className={`text-[10px] font-mono font-bold uppercase tracking-wider mb-3 ${
                isDark ? "text-stone-500" : "text-stone-400"
              }`}
            >
              Studio Leadership
            </div>
            <ul className={`space-y-2 font-normal ${isDark ? "text-stone-400" : "text-stone-600"}`}>
              <li>
                <span className={`block text-[10px] ${isDark ? "text-stone-500" : "text-stone-400"}`}>
                  Founder & CEO
                </span>
                <span className={isDark ? "text-stone-200" : "text-stone-900"}>Dhrumit Nagarbandhara</span>
              </li>
              <li>
                <span className={`block text-[10px] ${isDark ? "text-stone-500" : "text-stone-400"}`}>
                  Email
                </span>
                <a href="mailto:dhrumit@northbridgetech.group" className="hover:text-[#C52623] transition-colors">
                  dhrumit@northbridgetech.group
                </a>
              </li>
              <li>
                <span className={`block text-[10px] ${isDark ? "text-stone-500" : "text-stone-400"}`}>
                  Phone
                </span>
                <a href="tel:+33612345678" className="hover:text-[#C52623] transition-colors">
                  +33 6 12 34 56 78
                </a>
              </li>
              <li>
                <span className={`block text-[10px] ${isDark ? "text-stone-500" : "text-stone-400"}`}>
                  Headquarters
                </span>
                <span className={isDark ? "text-stone-200" : "text-stone-900"}>Paris, France</span>
              </li>
            </ul>
          </div>

          <div>
            <div
              className={`text-[10px] font-mono font-bold uppercase tracking-wider mb-3 ${
                isDark ? "text-stone-500" : "text-stone-400"
              }`}
            >
              Studio Philosophy
            </div>
            <p className={`text-xs leading-relaxed font-normal mb-2 ${isDark ? "text-stone-400" : "text-stone-600"}`}>
              Inspired by connection, speed and coordination. Connecting critical parts so your digital products scale smoothly from idea to launch.
            </p>
            <div className="pt-2 text-[10px] font-mono font-bold text-[#C52623]">
              CONNECTION • PERFORMANCE • TECHNOLOGY
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between pt-6 text-[11px] gap-2 font-normal ${
            isDark ? "text-stone-500" : "text-stone-500"
          }`}
        >
          <div>
            © 2026 NorthBridge Tech. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-stone-500">
            <span>Paris, France</span>
            <span>•</span>
            <span>northbridgetech.group</span>
            <span>•</span>
            <span>Build • Connect • Scale</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
