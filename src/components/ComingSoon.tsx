import { Link } from "@tanstack/react-router";
import { SiteHeader } from "./SiteHeader";

export function ComingSoon({ title }: { title: string }) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-dusty-blue/40 px-6 text-center">
      <SiteHeader />
      <h1 className="font-script text-7xl text-cocoa">{title}</h1>
      <p className="mt-4 text-muted-foreground">This page is coming in the next step.</p>
      <Link to="/" className="mt-6 text-cocoa underline underline-offset-4">Back home</Link>
    </main>
  );
}
