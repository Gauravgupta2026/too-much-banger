import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    name?: string;
    contact?: string;
    note?: string;
    attendeeStatus?: string;
  } | null;

  const name = body?.name?.trim();
  const contact = body?.contact?.trim();

  if (!name || !contact) {
    return NextResponse.json({ error: "Name and contact are required." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured for submissions." },
      { status: 503 }
    );
  }

  const { error } = await supabase.from("interest_submissions").insert({
    name,
    contact,
    note: body?.note?.trim() || null,
    attendee_status: body?.attendeeStatus || null
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
