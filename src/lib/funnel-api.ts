/**
 * Supabase persistence for the funnel. Kept separate from scoring + UI.
 *
 * All writes go through SECURITY DEFINER helpers (see supabase/schema.sql):
 * upsert_lead, create_operations_assessment. The tables have no
 * SELECT policy, so the app must not use .select()/returning on them.
 */
import { supabase, supabaseConfigured } from "@/lib/supabase";
import type { Attribution } from "@/lib/attribution";
import type { Answers, Scores } from "@/lib/scoring";
import type { PathId } from "@/content/assessment";

export interface LeadInput {
  first_name: string;
  email: string;
  phone: string;
  current_job: string;
}

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

export interface SubmitResult {
  leadId: string | null;
  assessmentId: string | null;
  persisted: boolean;
  error?: string;
}

export async function submitAssessment(params: {
  lead: LeadInput;
  attribution: Attribution;
  answers: Answers;
  scores: Scores;
  path: PathId;
  summary: string;
}): Promise<SubmitResult> {
  if (!supabaseConfigured) {
    return {
      leadId: null,
      assessmentId: null,
      persisted: false,
      error: "Supabase is not configured.",
    };
  }

  const email = normalizeEmail(params.lead.email);

  try {
    // Upsert on normalized email: one lead, many assessments. No public read access needed.
    const { data: leadId, error: leadErr } = await supabase.rpc("upsert_lead", {
      p_lead: {
        first_name: params.lead.first_name.trim(),
        email,
        phone: params.lead.phone.trim(),
        current_job: params.lead.current_job.trim(),
        ...params.attribution,
      },
    });
    if (leadErr) throw leadErr;
    if (!leadId) throw new Error("Lead save returned no id.");

    const { data: assessmentId, error: aErr } = await supabase.rpc("create_operations_assessment", {
      p_assessment: {
        lead_id: leadId,
        answers: params.answers,
        scores: params.scores,
        calculated_path: params.path,
        result_summary: params.summary,
      },
    });
    if (aErr) throw aErr;
    if (!assessmentId) throw new Error("Assessment save returned no id.");

    return { leadId, assessmentId, persisted: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not save your answers.";
    return { leadId: null, assessmentId: null, persisted: false, error: message };
  }
}

export async function sendOperationsEmail(leadId: string, assessmentId: string) {
  const { data, error } = await supabase.functions.invoke<{ ok: boolean; status?: string }>(
    "send-operations-assessment-email",
    { body: { leadId, assessmentId } },
  );
  if (error || !data?.ok) throw new Error("Email delivery failed.");
  return data.status === "sent" ? "sent" : "processing";
}
