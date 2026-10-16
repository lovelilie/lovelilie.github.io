import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

// dark  - brown wordmark (inner pages on cream)
// blush - soft blush wordmark, as in the homepage design
// light - cream logo and wordmark, for the coloured page headers
type Tone = "dark" | "blush" | "light";

const WORDMARK: Record<Tone, string> = {
  dark: "text-cocoa",
  blush: "text-blush",
  light: "text-cream opacity-90",
};

export function SiteHeader({ tone = "dark" }: { tone?: Tone }) {
  const logoUrl = `url(${logo})`;
  return (
    <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 md:px-10">
      <Link to="/" className="flex items-center gap-2 text-primary-foreground" aria-label="Ayamis Ads home">
        {tone === "light" ? (
          // Recolours the logo cream by using its shape as a stencil
          <span
            aria-hidden="true"
            className="block h-12 w-12 bg-cream opacity-90"
            style={{
              WebkitMaskImage: logoUrl,
              maskImage: logoUrl,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          />
        ) : (
          <img src={logo} alt="" className="h-12 w-12 object-contain" />
        )}
        <span className={`font-display text-sm font-semibold leading-tight tracking-wide md:text-base ${WORDMARK[tone]}`}>
          Ayamis<br />Ads
        </span>
      </Link>
      <nav className="flex gap-6 font-display text-sm text-primary">
        <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "underline underline-offset-4" }}>Home</Link>
        <Link to="/projects" activeProps={{ className: "underline underline-offset-4" }}>Projects</Link>
        <Link to="/about" activeProps={{ className: "underline underline-offset-4" }}>About</Link>
      </nav>
    </header>
  );
}
