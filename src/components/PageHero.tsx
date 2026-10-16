import type { CSSProperties, ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";

type Tone = "blue" | "pink" | "green";

const TONE_CLASS: Record<Tone, string> = {
  blue: "hero-blue",
  pink: "hero-pink",
  green: "hero-green",
};

// The coloured header used on every inner page: a cream script title over a colour that
// fades into the cream page background. Pass `tone` for the three main pages, or `color`
// (any CSS colour) for a one-off, like a project's own colour.
export function PageHero({
  tone,
  color,
  title,
  tall = false,
  children,
}: {
  tone?: Tone;
  color?: string;
  title: string;
  tall?: boolean;
  children?: ReactNode;
}) {
  const colorClass = tone ? TONE_CLASS[tone] : "";
  // A project colour is applied right here as an inline gradient, so it works without any extra CSS.
  const style: CSSProperties | undefined = color
    ? { background: `linear-gradient(180deg, ${color} 0%, ${color} 28%, var(--cream) 100%)` }
    : undefined;
  return (
    <section
      style={style}
      className={`relative flex flex-col items-center text-center ${colorClass} ${
        tall ? "min-h-[400px] md:min-h-[440px]" : "min-h-[280px] md:min-h-[320px]"
      }`}
    >
      <SiteHeader tone="light" />
      <h1 className="hero-title max-w-4xl px-6 pt-28 font-script text-5xl leading-none text-cream md:pt-32 md:text-7xl">
        {title}
      </h1>
      {children ? <div className="mt-auto w-full px-6 pb-10 pt-12">{children}</div> : null}
    </section>
  );
}
