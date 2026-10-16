import { useEffect, useRef, useState } from "react";

// Styles live here (not in styles.css) so this heading is fully self-contained.
const CSS = `
@keyframes spot-shimmer { from { background-position: 125% 0; } to { background-position: -125% 0; } }
@keyframes spot-draw { to { stroke-dashoffset: 0; } }
.spot-text {
  color: var(--olive);
  background-image: linear-gradient(100deg, var(--olive) 0%, var(--olive) 36%, color-mix(in oklab, var(--blush) 65%, var(--olive)) 50%, var(--olive) 64%, var(--olive) 100%);
  background-size: 250% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: spot-shimmer 7s ease-in-out infinite;
}
.spot-line path { stroke-dasharray: 1; stroke-dashoffset: 1; }
.spot-in .spot-line path { animation: spot-draw 1.5s ease-out 0.25s forwards; }
@media (prefers-reduced-motion: reduce) {
  .spot-text { animation: none; background-image: none; -webkit-text-fill-color: var(--olive); }
  .spot-line path { stroke-dashoffset: 0; animation: none; }
}
`;

/**
 * "Project Spotlight" heading: Ayami's script font, a slow blush shimmer that sweeps across the
 * letters, and a loose hand-drawn underline that draws itself the first time the heading scrolls into view.
 */
export function SpotlightTitle() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <h2 ref={ref} className={`text-center ${seen ? "spot-in" : ""}`}>
      <style>{CSS}</style>
      <span className="relative inline-block px-8">
        <span className="spot-text font-script text-5xl leading-tight md:text-7xl">Project Spotlight</span>
        {/* a loose, hand-drawn pen line: one wobbly stroke that draws itself, left to right */}
        <svg
          aria-hidden="true"
          viewBox="0 0 320 24"
          className="spot-line mx-auto mt-1 block h-5 w-60 text-olive md:w-[22rem]"
          fill="none"
        >
          <path
            d="M6 14.5 C 17 10.5, 27 16.5, 44 12 C 63 7, 78 15.5, 101 12.5 C 123 9.5, 137 17.5, 161 13 C 183 9, 196 7, 219 11.5 C 240 15.5, 257 8.5, 277 10.5 C 292 12, 304 14.5, 314 9"
            pathLength={1}
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </h2>
  );
}
