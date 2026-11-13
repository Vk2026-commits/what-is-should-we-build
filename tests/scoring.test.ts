import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { scoreAssessment, buildSummary } from "../src/lib/scoring";
import { pathOrder, questions } from "../src/content/assessment";

describe("operations recommendations", () => {
  for (const bottleneck of pathOrder) {
    for (const information of pathOrder) {
      for (const impact of pathOrder) {
        it(`${bottleneck} stays first with ${information}/${impact} context`, () => {
          const result = scoreAssessment({ bottleneck, information, impact });
          assert.equal(result.path, bottleneck);
          for (const score of Object.values(result.percentages))
            assert.ok(score >= 0 && score <= 100);
        });
      }
    }
  }
  it("uses recovery and ownership answers in the brief", () => {
    const summary = buildSummary(
      { continuity: "unsure", owner: "unsure" },
      "workflow",
      () => "Test",
    );
    assert.match(summary, /pick one person to lead/);
    assert.match(summary, /safe copy of your files/);
  });
  it("has unique question ids and supported scoring values", () => {
    assert.equal(new Set(questions.map((q) => q.id)).size, questions.length);
    for (const id of ["bottleneck", "information", "impact"]) {
      assert.deepEqual(
        questions.find((q) => q.id === id)?.options?.map((o) => o.value),
        pathOrder,
      );
    }
  });
});
