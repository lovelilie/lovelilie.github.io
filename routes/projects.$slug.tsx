import { useState, type CSSProperties } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { SiteFooter } from "@/components/SiteFooter";
import { PROJECTS, getProject, type MediaItem, type Project } from "@/lib/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} — Ayami Donald` : "Project — Ayami Donald" },
      {
        name: "description",
        content: loaderData ? loaderData.blurb : "Project from Ayami Donald's portfolio.",
      },
      { property: "og:title", content: loaderData ? loaderData.title : "Project" },
      {
        property: "og:description",
        content: loaderData ? loaderData.blurb : "Project from Ayami Donald's portfolio.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CaseStudy,
});

// Items in the same row are sized in proportion to their own shape, so every item in a row
// ends up exactly the same height: no gaps, no cropping. On phones they simply stack.
function Gallery({ project }: { project: Project }) {
  const [ratios, setRatios] = useState<Record<number, number>>({});

  const measure = (index: number, img: HTMLImageElement) => {
    if (!img.naturalWidth || !img.naturalHeight) return;
    const ratio = img.naturalWidth / img.naturalHeight;
    setRatios((prev) => (prev[index] === ratio ? prev : { ...prev, [index]: ratio }));
  };

  const rows: { item: MediaItem; index: number }[][] = [];
  let cursor = 0;
  for (const count of project.rows) {
    const row = project.media.slice(cursor, cursor + count).map((item, k) => ({ item, index: cursor + k }));
    if (row.length) rows.push(row);
    cursor += count;
  }
  // anything not covered by `rows` gets a row of its own
  project.media.slice(cursor).forEach((item, k) => rows.push([{ item, index: cursor + k }]));

  return (
    <div className="mt-14 space-y-6">
      {rows.map((row, r) => (
        <div key={r} className="flex flex-col gap-6 sm:flex-row">
          {row.map(({ item, index }) => {
            const ratio = item.kind === "video" ? 16 / 9 : (ratios[index] ?? 1.4);
            const narrow = row.length === 1 && item.kind === "image" && item.narrow;
            return (
              <div
                key={index}
                className={`min-w-0 w-full sm:w-auto sm:[flex:var(--r)_1_0%] ${narrow ? "mx-auto max-w-xl" : ""}`}
                style={{ "--r": ratio } as CSSProperties}
              >
                {item.kind === "video" ? (
                  <div className="aspect-video w-full overflow-hidden bg-muted shadow-polaroid">
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube.com/embed/${item.id}`}
                      title={item.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                ) : item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-transform duration-300 hover:-translate-y-1"
                  >
                    <GalleryImage item={item} index={index} measure={measure} />
                  </a>
                ) : (
                  <GalleryImage item={item} index={index} measure={measure} />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function GalleryImage({
  item,
  index,
  measure,
}: {
  item: Extract<MediaItem, { kind: "image" }>;
  index: number;
  measure: (index: number, img: HTMLImageElement) => void;
}) {
  return (
    <img
      ref={(el) => {
        if (el?.complete) measure(index, el);
      }}
      onLoad={(e) => measure(index, e.currentTarget)}
      src={item.src}
      alt={item.alt}
      loading="lazy"
      className="block h-auto w-full shadow-polaroid"
    />
  );
}

function CaseStudy() {
  const project = Route.useLoaderData();
  const index = PROJECTS.findIndex((p) => p.slug === project.slug);
  const prev = index > 0 ? PROJECTS[index - 1] : undefined;
  const next = index < PROJECTS.length - 1 ? PROJECTS[index + 1] : undefined;

  return (
    <main>
      <PageHero color={project.color} title={project.title}>
        <p className="font-display text-xs uppercase tracking-wide-display text-cocoa/80">
          {project.period} · {project.category}
        </p>
      </PageHero>
      <article className="mx-auto max-w-5xl px-6 pb-24 pt-10">
        <Link
          to="/projects"
          className="font-display text-xs tracking-wide-display text-taupe underline-offset-4 hover:underline"
        >
          ← All projects
        </Link>

        <div className="mx-auto mt-10 max-w-2xl">
          <h2 className="font-display text-xl tracking-wide-display text-olive md:text-2xl">Overview</h2>
          {project.body.map((p, i) => (
            <p key={i} className="mt-4 text-sm leading-7 tracking-wide text-muted-foreground">
              {p}
            </p>
          ))}
          {project.links?.length ? (
            <div className="mt-8 flex flex-wrap gap-4">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border border-cocoa px-8 py-3 font-display text-sm text-cocoa transition-colors hover:bg-cocoa hover:text-cream"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <Gallery project={project} />

        <div className="mt-24 flex items-center justify-between gap-6 border-t border-border pt-8">
          {prev ? (
            <Link
              to="/projects/$slug"
              params={{ slug: prev.slug }}
              className="font-display text-sm text-cocoa underline-offset-4 hover:underline"
            >
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to="/projects/$slug"
              params={{ slug: next.slug }}
              className="font-display text-sm text-cocoa underline-offset-4 hover:underline"
            >
              {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
