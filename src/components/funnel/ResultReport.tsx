import { ArrowRight, Ban, Target } from "lucide-react";
import { paths, pathOrder, questions, type PathId } from "@/content/assessment";
import type { Answers, Scores } from "@/lib/scoring";

export function PathProgression({ current }: { current: PathId }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
      {pathOrder.map((id) => {
        const active = id === current;
        return (
          <div key={id} className="flex flex-1 items-center gap-2">
            <div
              className={[
                "flex-1 rounded-xl border px-4 py-3 transition-all",
                active ? "border-primary bg-primary/10 glow-ring" : "border-border bg-card/50",
              ].join(" ")}
            >
              <p
                className={[
                  "text-[10px] font-semibold uppercase tracking-[0.18em]",
                  active ? "text-primary" : "text-muted-foreground/60",
                ].join(" ")}
              >
                {active ? "Build first" : "Other build area"}
              </p>
              <p
                className={[
                  "mt-1 text-sm font-semibold",
                  active ? "text-foreground" : "text-muted-foreground",
                ].join(" ")}
              >
                {paths[id].name}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ResultHeader({ path, firstName }: { path: PathId; firstName: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
        {firstName ? `${firstName}, your` : "Your"} recommended first operations build
      </p>
      <h1 className="mt-3 text-[34px] font-bold leading-[1.08] sm:text-6xl">{paths[path].name}</h1>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-lg">
        {paths[path].tagline}
      </p>
    </div>
  );
}

export function ResultDashboard({ path, incomeGoal }: { path: PathId; incomeGoal: string }) {
  const d = paths[path].dashboard;
  const rows = [
    { label: "Team Size", value: incomeGoal },
    { label: "Recommended Build", value: paths[path].name },
    { label: "Pilot Ownership", value: d.timeCommitment },
    { label: "Delivery Approach", value: d.speedToMarket },
    { label: "Technical Complexity", value: d.technicalComplexity },
    { label: "Scalability", value: d.scalability },
    { label: "Foundation", value: d.customerAcquisition },
  ];
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {rows.map((r) => (
        <div key={r.label} className="bg-navy-deep px-5 py-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {r.label}
          </p>
          <p className="mt-2 font-display text-lg font-semibold leading-snug">{r.value}</p>
        </div>
      ))}
    </div>
  );
}

export function OpportunityFitChart({
  percentages,
  current,
}: {
  percentages: Scores;
  current: PathId;
}) {
  return (
    <div>
      <h3 className="text-xl font-bold sm:text-2xl">Your Build Priorities</h3>
      <div className="mt-5 space-y-4">
        {pathOrder.map((id) => {
          const active = id === current;
          return (
            <div key={id}>
              <div className="mb-1.5 flex items-baseline justify-between gap-4">
                <span
                  className={[
                    "text-sm font-medium",
                    active ? "text-foreground" : "text-muted-foreground",
                  ].join(" ")}
                >
                  {paths[id].name}
                </span>
                <span
                  className={[
                    "font-display text-sm font-semibold",
                    active ? "text-primary" : "text-muted-foreground",
                  ].join(" ")}
                >
                  {percentages[id]}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className={[
                    "h-full rounded-full transition-[width] duration-700 ease-out",
                    active ? "bg-primary" : "bg-muted-foreground/35",
                  ].join(" ")}
                  style={{
                    width: `${percentages[id]}%`,
                    boxShadow: active
                      ? "0 0 18px color-mix(in oklab, var(--primary) 70%, transparent)"
                      : undefined,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        These scores show how your bottleneck, information gaps, and business impact align with each
        build. They are not ROI forecasts.
      </p>
    </div>
  );
}

export function NextSteps({ path }: { path: PathId }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="panel rounded-2xl p-6">
        <div className="flex items-center gap-2 text-primary">
          <Target className="size-4" />
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em]">Your First Target</h3>
        </div>
        <p className="mt-3 font-display text-xl font-semibold leading-snug sm:text-2xl">
          {paths[path].firstTarget}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {paths[path].examples.map((ex) => (
            <span
              key={ex}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
            >
              {ex}
            </span>
          ))}
        </div>
      </div>

      <div className="panel rounded-2xl p-6">
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          Your Next 3 Moves
        </h3>
        <ol className="mt-4 space-y-3">
          {paths[path].nextMoves.map((move, i) => (
            <li key={move} className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-primary/50 bg-primary/10 font-display text-xs font-semibold text-primary">
                {i + 1}
              </span>
              <span className="text-[15px] leading-relaxed">{move}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function AvoidSection({ path }: { path: PathId }) {
  return (
    <div className="rounded-2xl border border-border bg-navy-deep p-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Ban className="size-4" />
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em]">
          What NOT to Focus On Yet
        </h3>
      </div>
      <p className="mt-3 text-[17px] leading-relaxed sm:text-xl">{paths[path].avoid}</p>
    </div>
  );
}

export function WaitlistCTA({
  summary,
  path,
  answers,
  emailStatus,
  onRetry,
}: {
  summary: string;
  path: PathId;
  answers: Answers;
  emailStatus: "idle" | "sending" | "sent" | "failed" | "processing";
  onRetry?: (() => void) | undefined;
}) {
  const download = () => {
    const responses = questions
      .map((q) => {
        const raw = answers[q.id];
        const values = Array.isArray(raw) ? raw : [raw];
        return `${q.question}\n${values.map((v) => q.options?.find((o) => o.value === v)?.label ?? v).join(", ")}`;
      })
      .join("\n\n");
    const text = `OPERATIONS BUILD BRIEF\n\n${paths[path].name}\n\n${summary}\n\nFIRST VERSION\n${paths[path].examples.join("\n")}\n\nNEXT STEPS\n${paths[path].nextMoves.join("\n")}\n\nSCOPE GUARDRAIL\n${paths[path].avoid}\n\nYOUR ANSWERS\n${responses}`;
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "operations-build-brief.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <div className="panel rounded-2xl p-7 sm:p-10">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">
        From brief to first build
      </p>
      <h3 className="mt-3 text-3xl font-bold">Let’s Map Your First Version.</h3>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Book a call to walk through your assessment, identify the highest-priority workflow, and
        discuss what a first version could look like for your business.
      </p>
      <p role="status" aria-live="polite" className="mt-4 text-sm text-muted-foreground">
        {emailStatus === "sent"
          ? "Your assessment has been emailed to you. Check your inbox and spam folder."
          : emailStatus === "sending"
            ? "Sending your assessment to your email…"
            : emailStatus === "processing"
              ? "Your assessment email is being processed."
              : emailStatus === "failed"
                ? "We couldn’t email your assessment yet. You can retry or download it below."
                : "Keep a copy of your assessment using the download below."}
      </p>
      {(emailStatus === "failed" || emailStatus === "processing") && onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 text-sm font-semibold text-primary underline"
        >
          {emailStatus === "processing" ? "Check email status" : "Retry email"}
        </button>
      )}
      <a
        href="https://calendly.com/vektiss-info/vektiss-call"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground"
      >
        Book a Call About My Build <ArrowRight className="size-4" />
      </a>
      <button
        type="button"
        onClick={download}
        className="mt-3 flex min-h-12 items-center gap-2 rounded-xl border border-border px-6 py-3 font-semibold text-foreground"
      >
        Download My Build Brief <ArrowRight className="size-4" />
      </button>
    </div>
  );
}

export function WhyThisFits({ summary }: { summary: string }) {
  return (
    <div className="panel rounded-2xl p-6 sm:p-8">
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
        Why This Fits You
      </h3>
      <p className="mt-4 text-[17px] leading-relaxed sm:text-xl">{summary}</p>
    </div>
  );
}
