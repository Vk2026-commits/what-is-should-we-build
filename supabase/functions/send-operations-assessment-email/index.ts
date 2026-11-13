import { createClient } from "npm:@supabase/supabase-js@2";
import { paths, questions, type PathId } from "../../../src/content/assessment.ts";

const bookingUrl = "https://calendly.com/vektiss-info/vektiss-call";
const allowedOrigins = [
  "https://what-is-should-we-build.lovable.app",
  "https://id-preview--f05ac4d4-23b7-439f-8094-bdbac0b1fa06.lovable.app",
];
const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
const uuid = (v: unknown): v is string =>
  typeof v === "string" &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);

Deno.serve(async (request) => {
  const origin = request.headers.get("origin");
  const headers = {
    "Access-Control-Allow-Origin":
      origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
  const reply = (body: unknown, status = 200) => Response.json(body, { status, headers });
  if (request.method === "OPTIONS") return new Response("ok", { headers });
  if (request.method !== "POST") return reply({ ok: false }, 405);
  if (origin && !allowedOrigins.includes(origin)) return reply({ ok: false }, 403);
  try {
    const { leadId, assessmentId } = await request.json();
    if (!uuid(leadId) || !uuid(assessmentId))
      return reply({ ok: false, error: "Invalid assessment reference." }, 400);
    const key = Deno.env.get("RESEND_API_KEY");
    const from = Deno.env.get("RESEND_FROM_EMAIL");
    if (!key || !from) return reply({ ok: false, error: "Email is not configured." }, 503);
    const db = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { data: record, error } = await db
      .from("operations_assessments")
      .select(
        "id, lead_id, calculated_path, result_summary, answers, leads!inner(first_name,email)",
      )
      .eq("id", assessmentId)
      .eq("lead_id", leadId)
      .maybeSingle();
    if (error || !record) return reply({ ok: false, error: "Assessment not found." }, 404);
    const lead = Array.isArray(record.leads) ? record.leads[0] : record.leads;
    const path = paths[record.calculated_path as PathId];
    if (!path || !lead?.email) return reply({ ok: false, error: "Incomplete assessment." }, 400);
    const { data: claim, error: claimError } = await db.rpc("claim_operations_email", {
      p_assessment_id: assessmentId,
      p_lead_id: leadId,
    });
    if (claimError || !claim)
      return reply({ ok: false, error: "Could not start email delivery." }, 500);
    if (claim === "sent") return reply({ ok: true, status: "sent" });
    if (claim === "processing") return reply({ ok: true, status: "processing" }, 202);
    const answers = questions
      .map((q) => {
        const raw = record.answers[q.id];
        const values = Array.isArray(raw) ? raw : [raw];
        return `${q.question}\n${values.map((v) => q.options?.find((o) => o.value === v)?.label ?? String(v ?? "Not provided")).join(", ")}`;
      })
      .join("\n\n");
    const text = [
      `Hi ${lead.first_name || "there"},`,
      "",
      "Your Operations Build Brief",
      "",
      path.name,
      path.tagline,
      "",
      "WHY THIS FITS YOUR BUSINESS",
      record.result_summary,
      "",
      "YOUR FIRST TARGET",
      path.firstTarget,
      "",
      "FIRST VERSION",
      ...path.examples,
      "",
      "YOUR NEXT 3 MOVES",
      ...path.nextMoves.map((v, i) => `${i + 1}. ${v}`),
      "",
      "SCOPE GUARDRAIL",
      path.avoid,
      "",
      "YOUR ASSESSMENT ANSWERS",
      answers,
      "",
      "READY TO TALK THROUGH YOUR BUILD?",
      "Book a Vektiss call to discuss your priorities and the first version:",
      bookingUrl,
      "",
      "You received this email because you requested your operations assessment.",
    ].join("\n");
    const html = `<div style="background:#f4f6f8;padding:24px;font-family:Arial,sans-serif;color:#142033"><div style="max-width:640px;margin:auto;background:white;padding:32px;border-radius:12px"><p style="color:#1666c5;font-size:12px;letter-spacing:2px">VEKTISS · OPERATIONS BUILD FINDER</p><h1>Your Operations Build Brief</h1><h2>${escapeHtml(path.name)}</h2><div style="white-space:pre-wrap;line-height:1.7">${escapeHtml(text)}</div><p style="margin-top:28px"><a href="${bookingUrl}" style="display:inline-block;background:#0964ef;color:white;padding:16px 24px;border-radius:8px;text-decoration:none;font-weight:bold">Book a Call About My Build</a></p></div></div>`;
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `operations-assessment-${assessmentId}`,
      },
      body: JSON.stringify({
        from,
        to: [lead.email],
        subject: `Your Operations Build Brief: ${path.name}`,
        html,
        text,
        tags: [{ name: "funnel", value: "operations_build_finder" }],
      }),
    });
    const result = await response.json();
    if (!response.ok || !result.id) {
      await db
        .from("operations_assessments")
        .update({ email_status: "failed" })
        .eq("id", assessmentId);
      return reply({ ok: false, error: "Email delivery failed. Please retry." }, 502);
    }
    const { error: updateError } = await db
      .from("operations_assessments")
      .update({
        email_status: "sent",
        email_sent_at: new Date().toISOString(),
        email_provider_id: result.id,
      })
      .eq("id", assessmentId);
    if (updateError) console.error("Email tracking update failed", updateError.code);
    return reply({ ok: true, status: "sent" });
  } catch {
    return reply({ ok: false, error: "Email delivery could not be completed." }, 500);
  }
});
