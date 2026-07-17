import Link from "next/link";
import { navigation, siteConfig } from "@/data/site";

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label={`${siteConfig.name} home`}>
      <span className="logo-mark">C</span>
      <span>{siteConfig.name}</span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <nav className="nav" aria-label="Main navigation">
        <Logo />
        <div className="nav-links">
          {navigation.map((item) => (
            <Link href={item.href} key={item.label}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="header-actions">
          <Link className="button secondary clipper-nav-cta" href="/for-clippers">
            For clippers
          </Link>
          <Link className="button primary nav-cta" href="/#qualification">
            Build campaign army <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <Logo />
          <p>
            A $1,000 distribution campaign that keeps moving until approved
            posts reach 250,000 verified views.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <span>Campaigns</span>
            <Link href="/#pilot">Pilot offer</Link>
            <Link href="/case-studies">Case studies</Link>
            <Link href="/#qualification">Check fit</Link>
          </div>
          <div>
            <span>Company</span>
            <Link href="/for-clippers">For clippers</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <span>Legal</span>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.name}</span>
        <span>The 250K commitment applies only under an accepted campaign agreement.</span>
      </div>
    </footer>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-intro">
      <span className="kicker">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}
