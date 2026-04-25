CREATE TABLE IF NOT EXISTS public.push_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  merchant_id TEXT NOT NULL,
  merchant_name TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (merchant_id, endpoint)
);

CREATE INDEX IF NOT EXISTS push_subscriptions_merchant_id_idx ON public.push_subscriptions (merchant_id);

ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Anonymous demo: anyone can insert/delete their own subscription. Reads happen only from edge functions (service role bypasses RLS).
CREATE POLICY "Anyone can insert push subscriptions"
  ON public.push_subscriptions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can delete by endpoint"
  ON public.push_subscriptions FOR DELETE
  TO anon, authenticated
  USING (true);