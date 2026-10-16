import { createFileRoute, Link } from "@tanstack/react-router";
import { SpotlightTitle } from "@/components/SpotlightTitle";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GlassRabbit } from "@/components/GlassRabbit";
import banner from "@/assets/homepage-lilies.png";
import blueRiver from "@/assets/blue-river-sign.jpg";
import packaging from "@/assets/projects/cover-tchp.jpg";
import smileBunny from "@/assets/smile-bunny-icon.png";
import portrait from "@/assets/ayami-portrait.png";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ayami Donald — Advertising Portfolio 2026" },
      { name: "description", content: "Advertising, packaging and graphic design portfolio of Ayami \"Lilie\" Donald." },
      { property: "og:title", content: "Ayami Donald — Advertising Portfolio 2026" },
      { property: "og:description", content: "Whimsical, editorial advertising and design work by Ayami Donald." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const spotlight = [
  { title: "Blue River Social Media", slug: "blue-river", img: blueRiver, tilt: "-rotate-2", bg: "" },
  { title: "TCHP Packaging", slug: "tchp-base-boom", img: packaging, tilt: "rotate-1 md:-translate-y-4", bg: "" },
  { title: "Smile Bunny App Design", slug: "smile-bunny", img: smileBunny, tilt: "rotate-2", bg: "" },
];

function Index() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[560px] overflow-hidden md:h-[640px]">
        <SiteHeader tone="blush" />
        <img src={banner} alt="" className="homepage-lilies absolute inset-0 h-full w-full object-cover object-center" />
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
          <p className="font-display text-sm font-medium tracking-wide-display text-[color-mix(in_oklab,var(--olive)_60%,var(--cocoa))] [text-shadow:0_0_10px_rgb(255_255_255/0.75)] md:-translate-x-40">"LILIE"</p>
          <h1 className="font-script text-7xl leading-none text-cocoa md:text-[8.5rem]">Ayami Donald</h1>
          <p className="mt-2 self-center font-display text-base font-medium text-[color-mix(in_oklab,var(--olive)_60%,var(--cocoa))] [text-shadow:0_0_10px_rgb(255_255_255/0.75)] md:translate-x-40">2026 Portfolio</p>
        </div>
        <GlassRabbit top="68%" />
      </section>

      {/* Project spotlight */}
      <section className="px-6 py-20">
        <SpotlightTitle />
        <div className="mx-auto mt-14 grid max-w-4xl gap-10 sm:grid-cols-3">
          {spotlight.map((p) => (
            <Link key={p.title} to="/projects/$slug" params={{ slug: p.slug }} className={`polaroid block transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 ${p.tilt}`}>
              {p.img ? (
                <img src={p.img} alt={p.title} loading="lazy" width={816} height={816} className="aspect-square w-full bg-muted object-cover" />
              ) : (
                <div className="flex aspect-square w-full items-center justify-center bg-dusty-blue p-4 text-center text-xs text-muted-foreground">
                  Image placeholder — add your Smile Bunny artwork
                </div>
              )}
              <p className="mt-3 font-display text-xs italic text-muted-foreground">{p.title}</p>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/projects" className="inline-block rounded-full border border-cocoa px-10 py-4 font-display text-cocoa transition-colors hover:bg-cocoa hover:text-cream">View All Works</Link>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto grid max-w-5xl items-end gap-10 px-6 pt-10 md:grid-cols-2">
        <div className="pb-16">
          <h2 className="font-display text-2xl tracking-wide-display text-taupe md:text-3xl">HI I'M AYAMI</h2>
          <p className="mt-6 text-sm leading-7 tracking-wide text-muted-foreground">
            Hi, I'm Lilie (AKA Ayami), a multidisciplinary designer who believes dreams deserve a place in reality, and
            advertising is the tool to make it happen. I'm all about turning unique ideas and concepts into perfectly
            curated products.
          </p>
          <p className="mt-3 text-sm leading-7 tracking-wide text-muted-foreground">
            I love collaborating with people who aren't afraid to dream big and do things a little differently. If you
            want to realize your dream, let's collaborate!
          </p>
          <Link to="/about" className="mt-8 inline-block rounded-full border border-cocoa px-10 py-4 font-display text-cocoa transition-colors hover:bg-cocoa hover:text-cream">Read More</Link>
        </div>
        <div className="relative">
          <img src={logo} alt="" aria-hidden="true" className="absolute -top-10 left-0 w-40 opacity-70" />
          <img src={portrait} alt="Ayami Donald" loading="lazy" className="relative mx-auto max-h-[520px] w-auto" />
        </div>
      </section>

      {/* Contact band */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-contact)" }}>
        <div className="overflow-hidden whitespace-nowrap py-3" aria-hidden="true">
          <div className="marquee inline-block font-display text-xl text-primary-foreground">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="mx-4">Making Dreams Come True |</span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center px-6 pb-28 pt-12 text-center">
          <h2 className="font-script text-6xl text-primary-foreground md:text-7xl">Contact Me</h2>
          <p className="mt-16 font-display text-2xl font-semibold text-cocoa">Let's Create Together!</p>
          <Link
            to="/contact"
            className="mt-8 rounded-full border border-cocoa px-10 py-4 font-display text-cocoa transition-colors hover:bg-cocoa hover:text-cream"
          >
            Let's work together
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
