import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { SiteFooter } from "@/components/SiteFooter";
import { CONTACT_ENDPOINT, CONTACT_EMAIL } from "@/lib/contact-config";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Let's Work Together — Ayami Donald" },
      { name: "description", content: "Get in touch with Ayami Donald about a project or collaboration." },
      { property: "og:title", content: "Contact Ayami Donald" },
      { property: "og:description", content: "Reach out about a project or collaboration." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

type Field = "name" | "email" | "subject" | "message";
type Errors = Partial<Record<Field, string>>;
type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please tell me your name.";
  if (!values.email.trim()) errors.email = "Please add your email so I can reply.";
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "That email doesn't look quite right.";
  if (!values.subject.trim()) errors.subject = "Please add a subject.";
  if (!values.message.trim()) errors.message = "Please write a short message.";
  return errors;
}

const inputClass =
  "mt-2 w-full border border-cocoa/40 bg-cream/60 px-4 py-3 text-sm text-cocoa outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-cocoa focus-visible:ring-2 focus-visible:ring-olive/50";

function Contact() {
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", subject: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const sending = status.kind === "sending";

  function update(field: Field, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // A real person never sees or fills this hidden field; bots usually do.
    // Pretend it worked so bots don't learn anything, but send nothing.
    if (honeypot) {
      setStatus({ kind: "success" });
      return;
    }

    if (!CONTACT_ENDPOINT) {
      setStatus({
        kind: "error",
        message: `The form isn't connected yet. Please email ${CONTACT_EMAIL} directly for now.`,
      });
      return;
    }

    setStatus({ kind: "sending" });
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        // text/plain keeps this a "simple" request, which Google Apps Script accepts from any website.
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
          website: honeypot,
        }),
        signal: controller.signal,
      });
      const result: unknown = await response.json();
      const ok = typeof result === "object" && result !== null && (result as { ok?: unknown }).ok === true;
      if (!response.ok || !ok) throw new Error("Sheet did not confirm");
      setValues({ name: "", email: "", subject: "", message: "" });
      setStatus({ kind: "success" });
    } catch {
      setStatus({
        kind: "error",
        message: `Something went wrong and your message wasn't sent. Please try again, or email ${CONTACT_EMAIL}.`,
      });
    } finally {
      window.clearTimeout(timer);
    }
  }

  return (
    <main>
      <PageHero tone="green" title="Let's work together">
        <p className="mx-auto max-w-md font-display text-sm text-cocoa/80">
          Have a project, idea or collaboration in mind? Tell me about it and I'll get back to you.
        </p>
      </PageHero>

      <section className="mx-auto max-w-xl px-6 pb-24 pt-6">
        {status.kind === "success" ? (
          <div role="status" className="border border-cocoa/30 bg-cream/70 p-10 text-center">
            <p className="font-script text-5xl text-cocoa">Thank you!</p>
            <p className="mt-4 font-display text-sm text-muted-foreground">
              Your message was sent. I'll reply as soon as I can.
            </p>
            <button
              type="button"
              onClick={() => setStatus({ kind: "idle" })}
              className="mt-6 text-sm text-cocoa underline underline-offset-4"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="space-y-6">
            {(["name", "email", "subject"] as const).map((field) => (
              <div key={field}>
                <label htmlFor={field} className="font-display text-xs tracking-wide-display text-cocoa">
                  {field.toUpperCase()}
                </label>
                <input
                  id={field}
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  autoComplete={field === "email" ? "email" : field === "name" ? "name" : "off"}
                  value={values[field]}
                  onChange={(e) => update(field, e.target.value)}
                  disabled={sending}
                  aria-invalid={errors[field] ? true : undefined}
                  aria-describedby={errors[field] ? `${field}-error` : undefined}
                  className={inputClass}
                />
                {errors[field] && (
                  <p id={`${field}-error`} className="mt-1 text-xs text-destructive">
                    {errors[field]}
                  </p>
                )}
              </div>
            ))}

            <div>
              <label htmlFor="message" className="font-display text-xs tracking-wide-display text-cocoa">
                MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={values.message}
                onChange={(e) => update("message", e.target.value)}
                disabled={sending}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={inputClass}
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-xs text-destructive">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Hidden spam trap: people can't see it, bots fill it in. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="website">Leave this empty</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div aria-live="polite">
              {status.kind === "error" && <p className="text-sm text-destructive">{status.message}</p>}
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-full border border-cocoa px-10 py-4 font-display text-cocoa transition-colors hover:bg-cocoa hover:text-cream disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
