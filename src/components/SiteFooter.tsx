import { Link } from "@tanstack/react-router";
import { Mail, Linkedin, Instagram } from "lucide-react";
import lily from "@/assets/footer-lily.png";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-background pt-24">
      <img
        src={lily}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1594}
        height={899}
        className="footer-lily pointer-events-none absolute bottom-0 left-1/2 w-[780px] max-w-[130%] -translate-x-1/2 translate-y-[10%]"
      />
      <div className="relative mx-auto grid max-w-5xl gap-10 px-6 pb-10 md:grid-cols-2">
        <h2 className="font-display text-5xl tracking-wide-display text-cocoa md:text-6xl">LET'S</h2>
        <div className="md:justify-self-end">
          <p className="font-script text-5xl text-cocoa">Collaborate</p>
          <dl className="mt-4 space-y-2 rounded bg-background/70 p-4 text-sm backdrop-blur-sm">
            <dt className="font-semibold tracking-widest">EMAIL</dt>
            <dd>lilie8877@gmail.com</dd>
            <dt className="font-semibold tracking-widest">READ RESUME HERE</dt>
            <dd><a className="underline underline-offset-4" target="_blank" rel="noreferrer" href="https://docs.google.com/document/d/1Yzw-IukQgiYC2zqd0VMvJlYzlZQ6WWym54PMqij1I3Y/edit?usp=sharing">Open resume</a></dd>
          </dl>
          <Link
            to="/contact"
            className="mt-4 inline-block bg-primary px-6 py-3 text-xs tracking-[0.3em] text-primary-foreground transition-opacity hover:opacity-85"
          >
            CONTACT ME
          </Link>
        </div>
      </div>
      <div className="relative flex justify-center px-6 pb-12 pt-28">
        <div className="flex items-center gap-6 rounded-full bg-background/75 px-6 py-3 text-primary backdrop-blur-sm">
          <a href="mailto:lilie8877@gmail.com" aria-label="Email"><Mail /></a>
          <a href="https://www.linkedin.com/in/ayami-donald-b47788319/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
          <a href="https://www.instagram.com/ayamis.ads/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a>
        </div>
      </div>
    </footer>
  );
}
