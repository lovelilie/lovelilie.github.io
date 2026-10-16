import { useEffect, useState } from "react";

const TYPE_DELAY = 70; // ms per letter
const WORD_PAUSE = 260; // ms between titles
const START_DELAY = 500;

// Types each title out in turn when the page opens, then leaves all of them showing.
// Every title reserves its full width up front, so nothing shifts while typing.
export function RoleTyper({ titles }: { titles: readonly string[] }) {
  const [typed, setTyped] = useState<number[]>(() => titles.map(() => 0));
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(titles.map((t) => t.length));
      return;
    }

    let cancelled = false;
    let timer = 0;
    let word = 0;
    let letters = 0;

    const tick = () => {
      if (cancelled) return;
      const title = titles[word];
      if (title === undefined) {
        setActive(-1);
        return;
      }
      letters += 1;
      const index = word;
      const count = letters;
      setTyped((prev) => prev.map((n, i) => (i === index ? count : n)));
      setActive(index);
      if (letters >= title.length) {
        word += 1;
        letters = 0;
        timer = window.setTimeout(tick, WORD_PAUSE);
      } else {
        timer = window.setTimeout(tick, TYPE_DELAY);
      }
    };

    timer = window.setTimeout(tick, START_DELAY);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [titles]);

  return (
    <ul
      aria-label="Roles"
      className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-8 gap-y-3 text-base text-cocoa md:gap-x-12 md:text-xl"
    >
      {titles.map((title, i) => (
        <li key={title}>
          <span className="sr-only">{title}</span>
          <span aria-hidden="true" className="relative inline-block whitespace-nowrap">
            <span className="invisible">{title}</span>
            <span className="absolute inset-0">
              {title.slice(0, typed[i] ?? 0)}
              {active === i && <span className="type-caret" />}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
