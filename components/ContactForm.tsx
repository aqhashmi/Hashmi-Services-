"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  phone: string;
  activity: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  activity: "",
  message: "",
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Client-side validated contact form.
 *
 * 🔌 BACKEND INTEGRATION:
 * This form is wired to a placeholder handler that simulates a request.
 * To connect a real backend, replace the body of `submitToBackend` below with
 * a fetch() to your API route (e.g. POST /api/contact) or an email service
 * such as Resend, SendGrid, or Formspree. See README.md for details.
 */
async function submitToBackend(data: FormState): Promise<void> {
  // --- Replace everything inside this function with your real integration ---
  //
  // Example (Next.js Route Handler at app/api/contact/route.ts):
  //
  //   const res = await fetch("/api/contact", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   });
  //   if (!res.ok) throw new Error("Request failed");
  //
  // For now we just log and simulate a network delay so the UX is testable.
  console.log("Contact form submission (placeholder):", data);
  await new Promise((resolve) => setTimeout(resolve, 1200));
  // To test the error state, throw here instead:
  // throw new Error("Simulated failure");
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear the field error as the user corrects it.
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!emailRe.test(form.email)) next.email = "Please enter a valid email.";
    if (!form.phone.trim()) next.phone = "Please enter your phone number.";
    if (!form.message.trim()) next.message = "Please tell us a little about your plans.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      await submitToBackend(form);
      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center justify-center rounded-2xl border border-primary/40 bg-card p-10 text-center"
      >
        <CheckCircle2 className="h-12 w-12 text-primary-light" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-bold">Thank you!</h3>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Your message has been received. One of our advisors will be in touch
          within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-primary-light hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const fieldBase =
    "w-full rounded-xl border bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
          Full name <span className="text-primary-light">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={cn(fieldBase, errors.name ? "border-red-500/70" : "border-border")}
          placeholder="Jane Doe"
        />
        {errors.name && (
          <p id="name-error" className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
            <AlertCircle className="h-3.5 w-3.5" /> {errors.name}
          </p>
        )}
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
            Email <span className="text-primary-light">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(fieldBase, errors.email ? "border-red-500/70" : "border-border")}
            placeholder="jane@company.com"
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
            Phone <span className="text-primary-light">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={cn(fieldBase, errors.phone ? "border-red-500/70" : "border-border")}
            placeholder="+971 50 000 0000"
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Business activity */}
      <div>
        <label htmlFor="activity" className="mb-1.5 block text-sm font-medium text-ink">
          Business activity / service of interest
        </label>
        <select
          id="activity"
          name="activity"
          value={form.activity}
          onChange={(e) => update("activity", e.target.value)}
          className={cn(fieldBase, "border-border", !form.activity && "text-muted/60")}
        >
          <option value="">Select an option…</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title} className="text-ink">
              {s.title}
            </option>
          ))}
          <option value="Not sure yet" className="text-ink">
            Not sure yet — need advice
          </option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          How can we help? <span className="text-primary-light">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(fieldBase, "resize-none", errors.message ? "border-red-500/70" : "border-border")}
          placeholder="Tell us about your business idea, timeline, and any questions…"
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
            <AlertCircle className="h-3.5 w-3.5" /> {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p className="flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Something went wrong. Please try again or contact us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-chevron-gradient px-6 py-3.5 text-sm font-semibold tracking-brand text-white transition-all hover:shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Request My Free Consultation
          </>
        )}
      </button>

      <p className="text-center text-xs text-muted/70">
        By submitting, you agree to be contacted about your enquiry. We respect
        your privacy and never share your details.
      </p>
    </form>
  );
}
