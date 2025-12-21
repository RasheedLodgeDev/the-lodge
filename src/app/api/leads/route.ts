import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

function isValidEmail(email?: string) {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic anti-bot honeypot
    if (body?.company) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const lead = {
      source: body.source ?? "website",
      page_path: body.page_path ?? null,

      name: body.name ?? null,
      email: body.email ?? null,
      phone: body.phone ?? null,

      lead_type: body.lead_type ?? "unknown",
      message: body.message ?? null,

      areas: body.areas ?? null,
      towns: body.towns ?? null,
      price_min: body.price_min ?? null,
      price_max: body.price_max ?? null,
      beds: body.beds ?? null,
      baths: body.baths ?? null,
      property_type: body.property_type ?? null,
      timeline: body.timeline ?? null,
      financing: body.financing ?? null,

      booked: body.booked ?? false,
    };

    // Require at least one contact method
    const hasEmail = isValidEmail(lead.email ?? undefined);
    const hasPhone = typeof lead.phone === "string" && lead.phone.trim().length >= 7;
    if (!hasEmail && !hasPhone) {
      return NextResponse.json(
        { ok: false, error: "Please provide an email or phone number." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin.from("leads").insert(lead);
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
