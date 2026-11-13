# Operations Build Finder

This remix uses nine business operations questions and four first-build recommendations. The chosen bottleneck receives six points; information gaps receive three and business impact two. These are priorities, not ROI predictions. Business context, ownership, timing, and recovery readiness inform the brief. Downloaded briefs include all answers.

## Connect your Supabase project

1. Run `supabase/schema.sql` in the SQL editor for `bkmbgyhrldolybyuebwj`. It preserves the original income tables and adds `operations_assessments` and the write-only `create_operations_assessment` RPC. The existing lead healing block remains intact.
2. Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` using `.env.example`. Use a public anon/publishable key. Never put a secret or service-role key in frontend environment variables.
3. Rebuild and submit a test assessment. Confirm the lead and operations assessment in the project dashboard. Public clients cannot select operations assessments.

The supplied secret key is not a database migration credential. The migration has not been applied remotely. No production submissions or email delivery have been tested. The old income email Edge Function is retained for compatibility but is not called by this funnel.

The result offers a local text download. Contact submission explicitly requests follow-up. No booking link is needed; the funnel ends with the brief and download.

## Validation

- `npx tsc --noEmit`
- `npm run build`
- `npx tsx --test tests/scoring.test.ts`

Local preview: `npm run dev`.
