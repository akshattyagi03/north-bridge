import ServicesSection from "./ServicesSection";

export default function HeroSection() {
  return (
    <div className="copy">
      <p className="eyebrow"><span /> DIGITAL PRODUCT STUDIO</p>
      <h1>Ideas,<br />connected.<br />Possibilities,<br />built.</h1>
      <p className="intro">
        We bring web, mobile, cloud, design, integrations, and digital
        marketing together to help ideas move forward.
      </p>
      <div className="status"><span className="dot" /> A new bridge is being built. Coming soon.</div>
      <ServicesSection />
    </div>
  );
}
