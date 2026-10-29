import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import Reviews from "../components/Reviews";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-stone-900 selection:bg-[#C42625] selection:text-white">
      {/* Sticky Header Navbar (64px) */}
      <Header />

      {/* Continuous Scrolling Website Sections */}
      <main className="w-full">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Reviews />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
