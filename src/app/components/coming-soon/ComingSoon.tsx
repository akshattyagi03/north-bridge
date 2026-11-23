import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";
import HeroVisual from "./HeroVisual";

export default function ComingSoon() {
  return (
    <main className="page">
      <Header />
      <section className="content">
        <div className="visual">
          <HeroVisual />
        </div>
        <HeroSection />
      </section>
      <Footer />
    </main>
  );
}
