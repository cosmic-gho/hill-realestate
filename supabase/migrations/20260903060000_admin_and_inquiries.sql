-- Create tour inquiries table for visitor tour bookings and leads
CREATE TABLE IF NOT EXISTS public.tour_inquiries (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id uuid REFERENCES public.properties(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  preferred_date date,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tour_inquiries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tour_inquiries TO authenticated;
GRANT ALL ON public.tour_inquiries TO service_role;

ALTER TABLE public.tour_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit tour inquiries" ON public.tour_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view tour inquiries" ON public.tour_inquiries FOR SELECT USING (true);
CREATE POLICY "Anyone can update tour inquiries" ON public.tour_inquiries FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete tour inquiries" ON public.tour_inquiries FOR DELETE USING (true);

-- Allow full property management for admin operations
GRANT ALL ON public.properties TO anon;
GRANT ALL ON public.properties TO authenticated;

DROP POLICY IF EXISTS "Enable insert for properties" ON public.properties;
CREATE POLICY "Enable insert for properties" ON public.properties FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for properties" ON public.properties;
CREATE POLICY "Enable update for properties" ON public.properties FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Enable delete for properties" ON public.properties;
CREATE POLICY "Enable delete for properties" ON public.properties FOR DELETE USING (true);
