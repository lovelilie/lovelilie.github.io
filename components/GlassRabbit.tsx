import { RABBIT_FRAMES, RABBIT_TIMELINE } from "./rabbitMorph";

function toPolygon(frame: string): string {
  const n = frame.split(",").map(Number);
  const pts: string[] = [];
  for (let i = 0; i + 1 < n.length; i += 2) pts.push(`${(n[i] ?? 0) / 10}% ${(n[i + 1] ?? 0) / 10}%`);
  return `polygon(${pts.join(",")})`;
}

// Each pose is held crisp for part of the stride, then glides quickly into the next one.
// RABBIT_TIMELINE says which outline to show at each moment of the cycle.
const MORPH_KEYFRAMES = (() => {
  const stops = RABBIT_TIMELINE.map(([at, index]) => `${at}%{clip-path:${toPolygon(RABBIT_FRAMES[index] ?? "")}}`);
  return `@keyframes rabbit-morph{${stops.join("")}}`;
})();

/**
 * Frosted-glass rabbit. Its body is a pane of frosted glass: it blurs and lightens whatever
 * is behind it, so the flowers underneath stay visible through it. The outline morphs through
 * Ayami's own gallop poses. Parent must be `position: relative; overflow: hidden`.
 * Change `size` (width in px) or `top` to adjust.
 */
export function GlassRabbit({ size = 190, top = "62%" }: { size?: number; top?: string }) {
  return (
    <div aria-hidden="true" className="rabbit-track pointer-events-none absolute left-0 z-10" style={{ top }}>
      <style>{MORPH_KEYFRAMES}</style>
      <div className="rabbit-arc relative" style={{ width: size, aspectRatio: "125 / 100" }}>
        <div className="rabbit-shadow">
          <div className="rabbit-morph rabbit-shadow-shape" />
        </div>
        <div className="rabbit-morph rabbit-rim" />
        <div className="rabbit-morph rabbit-glass" />
      </div>
    </div>
  );
}
