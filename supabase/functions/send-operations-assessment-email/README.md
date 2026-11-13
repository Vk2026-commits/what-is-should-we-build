# Operations assessment email

Apply `supabase/operations-email.sql` before deploying this function. Uses the existing server-side `RESEND_API_KEY` and `RESEND_FROM_EMAIL` secrets. Retains the function gateway's authentication setting.

Accepts saved lead and assessment IDs, loads the recipient server-side, and sends the complete brief plus the Calendly call link. A row lock and persisted sent status prevent repeat emails; Resend also receives an idempotency key. Failures can be retried from the result screen. “Sent” means accepted by the email provider, not guaranteed inbox placement.

Deploy with the Supabase CLI, or bundle for the dashboard editor:

```
npx esbuild supabase/functions/send-operations-assessment-email/index.ts --bundle --format=esm --platform=neutral --external:npm:* --outfile=/tmp/operations-email-deploy.ts
```

The original income email function is unaffected. Rebundle this endpoint when assessment content changes so result and email copy stay aligned.
