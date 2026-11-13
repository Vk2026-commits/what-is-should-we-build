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
export function buildSummary(answers: Answers, path: PathId, _labelOf: (q: string) => string) {
  const reasons: Record<PathId, string> = {
    knowledge:
      "Your team spends too much time looking for answers. A shared place for files and notes can help.",
    workflow:
      "Work gets stuck or missed. A clear list of tasks, names, and due dates can help your team keep up.",
    vendors:
      "Updates from clients or suppliers are hard to track. Keeping their notes and next steps together can help.",
    connected:
      "It is hard to see what is going on across your business. One shared view can help you spot work that needs help.",
  };
  const ownership =
    answers["owner"] === "unsure"
      ? "First, pick one person to lead the test."
      : answers["owner"] === "me"
        ? "You can lead the first test."
        : answers["owner"] === "technical"
          ? "Ask your tech team to help with the first test."
          : "Ask a team member to lead the first test.";
  const recovery =
    answers["continuity"] === "tested"
      ? "Keep using your backup plan. Test it with the new tool, too."
      : "Keep a safe copy of your files. Test how your team will work if a tool goes down.";
  const timing =
    answers["timeline"] === "now"
      ? "Start with one small fix now."
      : answers["timeline"] === "quarter"
        ? "Use the next few months to plan and test one small fix."
        : "Start by writing down the problem you want to fix.";
  return `${reasons[path]} ${ownership} ${recovery} ${timing}`;
}
