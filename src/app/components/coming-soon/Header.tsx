import Link from "next/link";

export default function Header() {
  return (
    <header className="topbar">
      <Link className="brand" href="/" aria-label="North Bridge Tech">
        <span className="brand-mark">NB</span>
        <span>NORTH BRIDGE TECH</span>
      </Link>
      <span className="topbar-label">COMING SOON</span>
    </header>
  );
}
