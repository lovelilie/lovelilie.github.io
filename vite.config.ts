// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages can only serve plain files, so the GitHub Action sets GITHUB_PAGES=true and the
// site is built as a "single page app" (static files + the browser draws each page).
const forPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(forPages ? { spa: { enabled: true } } : {}),
  },
  // PAGES_BASE_PATH is "/" for a username.github.io site, or "/repo-name/" for a project site.
  ...(forPages ? { vite: { base: process.env.PAGES_BASE_PATH || "/" } } : {}),
});
