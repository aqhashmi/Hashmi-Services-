import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Always run on the server per request (this route writes to the database).
export const dynamic = "force-dynamic";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// In development, surface the real failure reason to the client so issues
// (e.g. env vars not loaded) are obvious. In production, stay generic.
const isDev = process.env.NODE_ENV !== "production";

/**
 * Receives a contact-form submission and stores it in the Supabase
 * `contacts` table. No authentication — anyone may submit (the database RLS
 * policy allows anonymous INSERTs only; rows cannot be read with the anon key).
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const activity = String(body.activity ?? "").trim();
  const message = String(body.message ?? "").trim();

  // Server-side validation (mirrors the client-side checks).
  if (!name || !email || !phone || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email, phone, and message." },
      { status: 400 }
    );
  }
  if (!emailRe.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  // Guard: if the Supabase env vars aren't loaded, fail with a clear reason.
  // (Most common cause: the dev server was started before .env existed —
  // env vars are only read at startup, so a restart is required.)
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  ) {
    console.error(
      "Supabase env vars are not loaded. Stop the dev server and run `npm run dev` again after creating .env."
    );
    return NextResponse.json(
      {
        error: isDev
          ? "Supabase env vars are not loaded. Stop the dev server (Ctrl+C) and run `npm run dev` again — .env is only read at startup."
          : "Server is not configured. Please try again later.",
      },
      { status: 500 }
    );
  }

  try {
    const supabase = createClient();
    const { error } = await supabase.from("contacts").insert({
      name,
      email,
      phone,
      activity: activity || null,
      message,
    });

    if (error) {
      console.error("Supabase insert error:", error.message);
      return NextResponse.json(
        {
          error: isDev
            ? `Database error: ${error.message}`
            : "We couldn't save your message. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
