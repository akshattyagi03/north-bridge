"use client";

import { useTheme } from "../context/ThemeContext";
import SplashScreen from "../components/SplashScreen";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Pillars from "../components/Pillars";
import Process from "../components/Process";
import OrbitDirection from "../components/OrbitDirection";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  const { theme, mounted } = useTheme();
  const isDark = mounted ? theme === "dark" : true;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 selection:bg-[#C52623] selection:text-white ${
        isDark ? "bg-[#090A0D] text-white" : "bg-[#F7F7F5] text-[#18191B]"
      }`}
    >
      {/* 3D Kinematic Flash Screen */}
      <SplashScreen />

      {/* Sticky Header Navbar with Theme Toggler */}
      <Header />

      {/* Continuous Scrolling Website Sections Matching Exact Specifications */}
      <main className="w-full">
        {/* 1. Hero: Center Logo & Direct Access Buttons */}
        <Hero />

        {/* 2. About Us: Who We Are Content on Left & Rotating 3D Figure on Right */}
        <About />

        {/* 3. Our Services: Interactive Infinite Automatic Carousel with 3D Hover & Background Images */}
        <Services />

        {/* 4. Our Pillars: Pillar Formations Supporting The North Bridge Overhead Deck */}
        <Pillars />

        {/* 5. How We Solve Your Problems: Scroll-Down Progressive Timeline */}
        <Process />

        {/* 6. Your Say is Our Direction: Planetary Points in Circles Orbiting Central Nucleus */}
        <OrbitDirection />

        {/* 7. Contact Us: Clean Inquiry Experience (Preserved as requested) */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
