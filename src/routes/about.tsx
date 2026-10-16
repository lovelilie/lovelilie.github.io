import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { RoleTyper } from "@/components/RoleTyper";
import { SiteFooter } from "@/components/SiteFooter";
import photostrip from "@/assets/photostrip.png";
import deansList from "@/assets/deans-list-spring-2025.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Ayami — Ayami Donald" },
      { name: "description", content: "About Ayami Donald, advertising student, designer and content creator." },
      { property: "og:title", content: "About Ayami Donald" },
      { property: "og:description", content: "Background, skills and honors of Ayami Donald." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const ROLES = [
  "Packaging Designer",
  "Marketer",
  "Content Creator",
  "Artist",
  "Advertiser",
  "Graphic Designer",
] as const;

const AWARDS = [
  "Dean's List — Freshman Year",
  "Dean's List — Sophomore Year",
  "Virginia FCCLA Fashion Design, 1st Place (2023)",
];

function About() {
  return (
    <main>
      <PageHero tone="pink" title="About Ayami" tall>
        <RoleTyper titles={ROLES} />
      </PageHero>

      {/* Intro: two paragraphs with the photostrip beside them */}
      <section className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-20 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl tracking-wide-display text-taupe md:text-3xl">HI I'M AYAMI</h2>
          <p className="mt-6 text-sm leading-7 tracking-wide text-muted-foreground">
            I am a Creator born and raised in Japan. I always saw those funny and unique advertisements. It used to
            fill my world, and make everything seem so light and easy.
          </p>
          <p className="mt-3 text-sm leading-7 tracking-wide text-muted-foreground">
            The media you take in influences how you see the world. That is why my dream is to create unique, cute,
            and beautiful advertisements that can reach and positively influence everyone who sees it!
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-block rounded-full border border-cocoa px-8 py-3 font-display text-sm text-cocoa transition-colors hover:bg-cocoa hover:text-cream"
          >
            Let's work together
          </Link>
        </div>
        <div className="flex justify-center">
          <img
            src={photostrip}
            alt="Two film photo strips of Ayami: playful poses on the left, polished portraits in a blazer on the right"
            width={616}
            height={1014}
            className="max-h-[560px] w-auto drop-shadow-[0_14px_20px_rgba(60,40,30,0.25)]"
          />
        </div>
      </section>

      {/* Awards & Honors */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="text-center">
          <span className="font-display text-3xl tracking-wide-display text-olive md:text-4xl">AWARDS</span>
          <span className="ml-2 font-script text-3xl text-olive">&amp; Honors</span>
        </h2>
        <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
          <ul className="space-y-6 font-display text-cocoa">
            {AWARDS.map((a) => (
              <li key={a} className="border-b border-cocoa/25 pb-4 text-lg">
                {a}
              </li>
            ))}
          </ul>
          <figure>
            <div className="polaroid -rotate-1 transition-transform duration-300 hover:rotate-0">
              <img
                src={deansList}
                alt="Virginia Tech Dean's List certificate, Spring 2025, College of Liberal Arts and Human Sciences"
                loading="lazy"
                className="w-full"
              />
            </div>
          </figure>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
