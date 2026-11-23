import Link from "next/link";
import ContactForm from "./ContactForm";

export default function Header() {
  return (
    <header className="topbar">
      <Link className="brand" href="/" aria-label="North Bridge Tech">
        <span className="brand-mark">NB</span>
        <span>NORTH BRIDGE TECH</span>
      </Link>
      <div className="topbar-actions">
        <span className="topbar-label">COMING SOON</span>
        <ContactForm />
      </div>
    </header>
  );
}
