alter table public.operations_assessments
 add column if not exists email_status text not null default 'pending',
 add column if not exists email_claimed_at timestamptz,
 add column if not exists email_sent_at timestamptz,
 add column if not exists email_provider_id text;
create or replace function public.claim_operations_email(p_assessment_id uuid, p_lead_id uuid)
returns text language plpgsql security definer set search_path = public as $$
declare rec public.operations_assessments;
begin
 select * into rec from public.operations_assessments where id=p_assessment_id and lead_id=p_lead_id for update;
 if not found then return null; end if;
 if rec.email_status='sent' then return 'sent'; end if;
 if rec.email_status='processing' and rec.email_claimed_at > now()-interval '2 minutes' then return 'processing'; end if;
 update public.operations_assessments set email_status='processing',email_claimed_at=now() where id=p_assessment_id;
 return 'claimed';
end $$;
revoke all on function public.claim_operations_email(uuid, uuid) from public, anon, authenticated;
grant execute on function public.claim_operations_email(uuid, uuid) to service_role;
