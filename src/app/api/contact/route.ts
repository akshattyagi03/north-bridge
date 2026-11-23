import { NextResponse } from "next/server";
import {
  CONTACT_LIMITS,
  normalizeInternationalPhone,
  validateContactForm,
  type ContactFormValues,
} from "@/lib/contact-validation";
import { getMongoClient } from "@/lib/mongodb";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16 * 1024;

function cleanSingleLine(value: string) {
  return value.replace(/[\u0000-\u001f\u007f-\u009f]/g, "").trim();
}

function cleanRequirement(value: string) {
  return value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/g, "").trim();
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return NextResponse.json({ error: "Send the form as JSON." }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "The submitted message is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "The submitted message is too large." }, { status: 413 });
    }
    body = JSON.parse(rawBody) as unknown;
  } catch {
    return NextResponse.json({ error: "The request body must contain valid JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Enter all required contact details." }, { status: 400 });
  }

  const submitted = body as Record<string, unknown>;
  if (typeof submitted.website === "string" && submitted.website.trim()) {
    return NextResponse.json({ error: "Unable to submit this message." }, { status: 400 });
  }

  const values: ContactFormValues = {
    name: typeof submitted.name === "string" ? cleanSingleLine(submitted.name) : "",
    email: typeof submitted.email === "string" ? cleanSingleLine(submitted.email).toLowerCase() : "",
    phone: typeof submitted.phone === "string" ? cleanSingleLine(submitted.phone) : "",
    requirement: typeof submitted.requirement === "string" ? cleanRequirement(submitted.requirement) : "",
  };
  const errors = validateContactForm(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Check the required fields and try again.", fields: errors }, { status: 400 });
  }

  const phone = normalizeInternationalPhone(values.phone);
  if (!phone) {
    return NextResponse.json({ error: "Check the phone number and try again." }, { status: 400 });
  }

  const name = values.name.slice(0, CONTACT_LIMITS.name);
  const email = values.email.slice(0, CONTACT_LIMITS.email);
  const requirement = values.requirement.slice(0, CONTACT_LIMITS.requirement);

  try {
    const client = await getMongoClient();
    const result = await client.db().collection("contact_submissions").insertOne({
      name,
      email,
      phone,
      requirement,
      createdAt: new Date(),
    });

    if (!result.acknowledged) {
      return NextResponse.json({ error: "We couldn't save your message. Please try again." }, { status: 503 });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("[contact] Failed to save submission.", error);
    return NextResponse.json(
      { error: "Contact submissions are temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }
}
