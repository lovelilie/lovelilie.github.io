// Finds the website that "bun run build" produced and tidies it up for GitHub Pages:
//  - makes sure there is an index.html (the page every visitor starts from)
//  - makes a 404.html copy, so links like /projects/blue-river still open the site
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync, copyFileSync } from "node:fs";
import { join } from "node:path";

const candidates = [".output/public", "dist/client", "dist", ".output/client", "build/client"];

function findShellDir(dir, depth = 0) {
  if (!existsSync(dir) || depth > 4) return null;
  const names = readdirSync(dir);
  if (names.includes("_shell.html") || names.includes("index.html")) return dir;
  for (const name of names) {
    if (name === "node_modules") continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      const found = findShellDir(full, depth + 1);
      if (found) return found;
    }
  }
  return null;
}

let source = candidates.find((c) => existsSync(join(c, "_shell.html")) || existsSync(join(c, "index.html")));
if (!source) source = findShellDir(".output") ?? findShellDir("dist");
if (!source) {
  console.error("Could not find the built website. Folders that exist now:");
  for (const name of readdirSync(".")) console.error(" -", name);
  process.exit(1);
}

console.log("Built website found in:", source);
rmSync("site", { recursive: true, force: true });
mkdirSync("site", { recursive: true });
cpSync(source, "site", { recursive: true });

if (!existsSync("site/index.html")) {
  if (existsSync("site/_shell.html")) copyFileSync("site/_shell.html", "site/index.html");
  else {
    console.error("There is no index.html or _shell.html in the build.");
    process.exit(1);
  }
}
copyFileSync("site/index.html", "site/404.html");
writeFileSync("site/.nojekyll", "");
console.log("Files ready for GitHub Pages:");
for (const name of readdirSync("site")) console.log(" -", name);
