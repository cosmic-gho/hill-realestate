-- =========================================================
-- AetherHomes Supabase Database Setup
-- Run this script in your Supabase Project:
-- Supabase Dashboard -> SQL Editor -> New query -> Paste and Run
-- =========================================================

-- 1. Create properties table
CREATE TABLE IF NOT EXISTS public.properties (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  price integer NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip text NOT NULL DEFAULT '',
  beds integer NOT NULL DEFAULT 0,
  baths numeric NOT NULL DEFAULT 0,
  sqft integer NOT NULL DEFAULT 0,
  property_type text NOT NULL DEFAULT 'House',
  status text NOT NULL DEFAULT 'For sale',
  description text NOT NULL DEFAULT '',
  image_key text NOT NULL DEFAULT 'living',
  agent_name text NOT NULL DEFAULT 'Mara Ellison',
  agent_title text NOT NULL DEFAULT 'AetherHomes Broker',
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on properties
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Grants for properties
GRANT ALL ON public.properties TO anon;
GRANT ALL ON public.properties TO authenticated;
GRANT ALL ON public.properties TO service_role;

-- Policies for properties
DROP POLICY IF EXISTS "Anyone can view listings" ON public.properties;
CREATE POLICY "Anyone can view listings" ON public.properties FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for properties" ON public.properties;
CREATE POLICY "Enable insert for properties" ON public.properties FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for properties" ON public.properties;
CREATE POLICY "Enable update for properties" ON public.properties FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Enable delete for properties" ON public.properties;
CREATE POLICY "Enable delete for properties" ON public.properties FOR DELETE USING (true);


-- 2. Create saved_homes table (links authenticated users with saved properties)
CREATE TABLE IF NOT EXISTS public.saved_homes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id uuid NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, property_id)
);

-- Enable RLS on saved_homes
ALTER TABLE public.saved_homes ENABLE ROW LEVEL SECURITY;

-- Grants for saved_homes
GRANT SELECT, INSERT, UPDATE, DELETE ON public.saved_homes TO authenticated;
GRANT ALL ON public.saved_homes TO service_role;

-- Policies for saved_homes
DROP POLICY IF EXISTS "Users manage their own saved homes" ON public.saved_homes;
CREATE POLICY "Users manage their own saved homes" ON public.saved_homes 
  FOR ALL TO authenticated 
  USING (auth.uid() = user_id) 
  WITH CHECK (auth.uid() = user_id);


-- 3. Create tour_inquiries table (for scheduling tours and agent inquiries)
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

-- Enable RLS on tour_inquiries
ALTER TABLE public.tour_inquiries ENABLE ROW LEVEL SECURITY;

-- Grants for tour_inquiries
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tour_inquiries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tour_inquiries TO authenticated;
GRANT ALL ON public.tour_inquiries TO service_role;

-- Policies for tour_inquiries
DROP POLICY IF EXISTS "Anyone can submit tour inquiries" ON public.tour_inquiries;
CREATE POLICY "Anyone can submit tour inquiries" ON public.tour_inquiries FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can view tour inquiries" ON public.tour_inquiries;
CREATE POLICY "Anyone can view tour inquiries" ON public.tour_inquiries FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can update tour inquiries" ON public.tour_inquiries;
CREATE POLICY "Anyone can update tour inquiries" ON public.tour_inquiries FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Anyone can delete tour inquiries" ON public.tour_inquiries;
CREATE POLICY "Anyone can delete tour inquiries" ON public.tour_inquiries FOR DELETE USING (true);


-- 4. Seed initial property listings (only if properties table is empty)
INSERT INTO public.properties (title, price, address, city, state, zip, beds, baths, sqft, property_type, status, description, image_key, featured)
SELECT * FROM (VALUES
  ('The Halsey Loft', 745000, '1204 NE Halsey St', 'Portland', 'OR', '97232', 2, 2, 1280, 'Condo', 'For sale', 'A light-filled loft with oak floors, exposed beams, and a west-facing window wall that catches the afternoon sun.', 'living', true),
  ('Cedar Ridge Villa', 1120000, '88 Cedar Ridge Ln', 'Lake Oswego', 'OR', '97034', 4, 3, 3050, 'House', 'New', 'A quiet cedar-clad villa on a wooded lot, with a chef''s kitchen, quartz island, and pendant-lit breakfast bar.', 'kitchen', true),
  ('Maple Court Duplex', 588000, '412 SW Maple Ct', 'Beaverton', 'OR', '97005', 3, 2, 1760, 'Duplex', 'For sale', 'Bright bedrooms with evergreen views, a fenced yard, and a flexible lower level for a studio or office.', 'bedroom', true),
  ('Juniper Lane House', 812000, '214 Juniper Lane', 'Portland', 'OR', '97212', 3, 2, 2140, 'House', 'For sale', 'A mid-century home on a tree-lined lane with a sunken living room and a garden that blooms all summer.', 'living', false),
  ('Harborview Flat', 672000, '520 Harborview Rd', 'Seattle', 'WA', '98101', 2, 2, 1240, 'Condo', 'Price drop', 'Waterfront flat with floor-to-ceiling glass, a marble kitchen, and a ferry-lit view at dusk.', 'kitchen', false),
  ('Alder Court Craftsman', 895000, '87 Alder Court', 'Vancouver', 'WA', '98660', 4, 3, 2410, 'House', 'Open house', 'Original craftsman millwork, a wraparound porch, and a kitchen opened up to the back garden.', 'living', false),
  ('Marigold Terrace', 1050000, '18 Marigold Terrace', 'Portland', 'OR', '97214', 3, 2, 2040, 'House', 'New', 'Step inside and the room opens up — a cathedral foyer, east light, and a kitchen made for slow mornings.', 'kitchen', false),
  ('Sellwood Garden Cottage', 529000, '7 SE Sellwood Blvd', 'Portland', 'OR', '97202', 2, 1, 980, 'Cottage', 'For sale', 'A compact cottage with a big garden, linen-soft bedroom light, and a deck built for long dinners.', 'bedroom', false),
  ('Fremont Waterfront Condo', 640000, '901 N Fremont Way', 'Seattle', 'WA', '98103', 1, 1, 860, 'Condo', 'For sale', 'A single-bedroom waterfront condo, warm and quiet, with a canal walk two minutes from the door.', 'living', false)
) AS v(title, price, address, city, state, zip, beds, baths, sqft, property_type, status, description, image_key, featured)
WHERE NOT EXISTS (SELECT 1 FROM public.properties LIMIT 1);


-- 5. Create payment_methods table (for admin-configured payment channels)
CREATE TABLE IF NOT EXISTS public.payment_methods (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  account_name text NOT NULL DEFAULT '',
  account_number text NOT NULL,
  instructions text NOT NULL DEFAULT '',
  qr_code_url text NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on payment_methods
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;

-- Grants for payment_methods
GRANT SELECT, INSERT, UPDATE, DELETE ON public.payment_methods TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.payment_methods TO authenticated;
GRANT ALL ON public.payment_methods TO service_role;

-- Policies for payment_methods
DROP POLICY IF EXISTS "Anyone can view active payment methods" ON public.payment_methods;
CREATE POLICY "Anyone can view active payment methods" ON public.payment_methods FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can insert payment methods" ON public.payment_methods;
CREATE POLICY "Anyone can insert payment methods" ON public.payment_methods FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can update payment methods" ON public.payment_methods;
CREATE POLICY "Anyone can update payment methods" ON public.payment_methods FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Anyone can delete payment methods" ON public.payment_methods;
CREATE POLICY "Anyone can delete payment methods" ON public.payment_methods FOR DELETE USING (true);

