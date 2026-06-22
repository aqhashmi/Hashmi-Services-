import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Always run on the server per request (this route writes to the database).
export const dynamic = "force-dynamic";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      // Log server-side for debugging; keep the client message generic.
      console.error("Supabase insert error:", error.message);
      return NextResponse.json(
        { error: "We couldn't save your message. Please try again." },
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
