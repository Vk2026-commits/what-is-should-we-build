import { paths, pathOrder, type PathId } from "@/content/assessment";
export type Answers = Record<string, string | string[] | number | undefined>;
export type Scores = Record<PathId, number>;
export function scoreAssessment(answers: Answers) {
  const scores: Scores = { knowledge: 0, workflow: 0, vendors: 0, connected: 0 };
  // The explicitly chosen bottleneck takes priority; context adds supporting evidence.
  for (const [question, weight] of [
    ["bottleneck", 6],
    ["information", 3],
    ["impact", 2],
  ] as const) {
    const answer = answers[question] as PathId;
    if (pathOrder.includes(answer)) scores[answer] += weight;
  }
  const path = pathOrder.reduce((best, id) => (scores[id] > scores[best] ? id : best));
  const percentages = Object.fromEntries(
    pathOrder.map((id) => [id, Math.round((scores[id] / 11) * 100)]),
  ) as Scores;
  return { scores, percentages, path };
}
export function buildSummary(answers: Answers, path: PathId, labelOf: (q: string) => string) {
  const recovery =
    answers["continuity"] === "tested"
      ? "Keep your tested recovery process as part of the pilot."
      : "Include an access, export, and recovery review before relying on the new system.";
  const ownership =
    answers["owner"] === "unsure"
      ? "Your first planning step is to appoint a process owner."
      : `Pilot ownership: ${labelOf("owner").toLowerCase()}.`;
  return `For your business (${labelOf("business_type").toLowerCase()}, ${labelOf("team_size").toLowerCase()}), you chose “${labelOf("bottleneck")}” as the first problem to fix. Start with a ${paths[path].name}. ${paths[path].tagline} ${ownership} ${recovery} Your timing: ${labelOf("timeline").toLowerCase()}.`;
}
