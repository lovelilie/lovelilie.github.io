import { createFileRoute, Link, Outlet, useChildMatches } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { SiteFooter } from "@/components/SiteFooter";
import { PROJECTS, type Project } from "@/lib/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Ayami Donald" },
      {
        name: "description",
        content:
          "A gallery of Ayami Donald's advertising, packaging, app and social work. Each polaroid opens its own case study.",
      },
      { property: "og:title", content: "Projects — Ayami Donald" },
      {
        property: "og:description",
        content: "Advertising, packaging, app and social work by Ayami Donald.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsRoute,
});

function Polaroid({ project }: { project: Project }) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className={`group block focus-visible:outline-none ${project.place}`}
    >
      <figure
        className={`relative bg-polaroid p-3 pb-4 shadow-polaroid lg:flex lg:h-full lg:flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5 ${project.tilt}`}
      >
        <span className="pv-tape" aria-hidden="true" />
        <img
          src={project.cover}
          alt={project.coverAlt}
          loading="lazy"
          className={`w-full bg-muted object-cover ${project.ratio} lg:aspect-auto lg:h-0 lg:min-h-0 lg:flex-1`}
        />
        <figcaption className="px-1 pb-1 pt-3">
          <span className="pv-line block h-px w-full bg-cocoa/45" aria-hidden="true" />
          <span className="pv-title mt-2 block font-display text-sm tracking-wide-display text-cocoa">
            {project.title}
          </span>
        </figcaption>
      </figure>
    </Link>
  );
}

// /projects is the parent of /projects/$slug. When a project is open, show that page
// (the Outlet); otherwise show the gallery. Without this, clicking a polaroid changed
// the address but kept showing the gallery.
function ProjectsRoute() {
  const childMatches = useChildMatches();
  return childMatches.length > 0 ? <Outlet /> : <Projects />;
}

function Projects() {
  return (
    <main>
      <PageHero tone="blue" title="Projects" />
      <p className="px-6 pb-12 pt-8 text-center font-display text-sm tracking-wide text-muted-foreground">
        Hover a polaroid to see its name — tap to open the project.
      </p>
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-x-8 gap-y-14 px-6 pb-28 sm:grid-cols-2 lg:auto-rows-[4rem] lg:grid-cols-12 lg:gap-5">
        {PROJECTS.map((p) => (
          <Polaroid key={p.slug} project={p} />
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
