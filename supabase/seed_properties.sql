-- =========================================================
-- Dynamic Properties Seed Data for AetherHomes
-- Includes: For Sale, Condos, Airbnbs (Vacation Rentals), and Rentals
-- Features: Dynamic multi-photo galleries (JSON arrays) for every property
-- 
-- Instructions:
-- 1. Open your Supabase Project Dashboard
-- 2. Go to "SQL Editor" -> "New Query"
-- 3. Paste this script and click "Run"
-- =========================================================

-- Optional: To clear out older demo properties before seeding, uncomment the line below:
-- TRUNCATE TABLE public.properties CASCADE;

INSERT INTO public.properties (
  title, price, address, city, state, zip, beds, baths, sqft, property_type, status, description, image_key, agent_name, agent_title, featured
) VALUES
  -- -------------------------------------------------------------
  -- 1. LUXURY CONDOS & LOFTS
  -- -------------------------------------------------------------
  (
    'The Halsey Loft & Penthouse',
    745000,
    '1204 NE Halsey St, Unit 802',
    'Portland',
    'OR',
    '97232',
    2,
    2,
    1280,
    'Condo',
    'For sale',
    'A sun-drenched industrial penthouse loft in the Lloyd District featuring soaring 18-foot ceilings, exposed Douglas fir beams, custom steel architectural stairs, and expansive west-facing glass walls with sweeping sunset vistas over the Portland skyline.',
    '["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80"]',
    'Mara Ellison',
    'AetherHomes Senior Broker',
    true
  ),
  (
    'Harborview Elliott Bay Sky Flat',
    890000,
    '520 Harborview Rd, Apt 14B',
    'Seattle',
    'WA',
    '98101',
    2,
    2,
    1420,
    'Condo',
    'Price drop',
    'Front-row Seattle waterfront corner condo offering dramatic uninterrupted views of Elliott Bay and Mount Rainier. Boasts imported Calacatta marble kitchen countertops, motorized solar shades, a private deep balcony, and 24/7 concierge amenities.',
    '["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80"]',
    'Sophia Chen',
    'Pacific Northwest Specialist',
    true
  ),
  (
    'Pearl District Warehouse Residence',
    675000,
    '1028 NW Couch St #405',
    'Portland',
    'OR',
    '97209',
    1,
    1.5,
    1150,
    'Condo',
    'New',
    'Authentic historic warehouse conversion in the heart of the Pearl District. Features original red brick walls, polished concrete flooring, European Poggenpohl cabinetry, chef gas range, and deeded garage parking with EV charging.',
    '["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"]',
    'Derek Hayes',
    'Residential Advisor',
    false
  ),

  -- -------------------------------------------------------------
  -- 2. AIRBNB & VACATION SHORT-TERM RENTALS
  -- -------------------------------------------------------------
  (
    'Mt. Hood Timberline Alpine A-Frame',
    285,
    '74000 E Timberline Rd',
    'Government Camp',
    'OR',
    '97028',
    3,
    2,
    1650,
    'Airbnb',
    'Airbnb',
    'Iconic cedar A-frame mountain cabin nestled among old-growth firs just 10 minutes from ski lifts. Features a sunken wood-burning stone hearth, cedar sauna, outdoor cedar barrel hot tub under the stars, high-speed fiber internet, and game loft.',
    '["https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80"]',
    'Mara Ellison',
    'AetherHomes Senior Broker',
    true
  ),
  (
    'Cannon Beach Oceanfront Haven',
    420,
    '315 Ocean Crest Ave',
    'Cannon Beach',
    'OR',
    '97110',
    4,
    3,
    2200,
    'Airbnb',
    'Airbnb',
    'Spectacular modern oceanfront lodge with direct private stairs down to the sand and panoramic Haystack Rock views. Enjoy floor-to-ceiling glass, a gas fire pit deck, gourmet kitchen with wine cooler, and sunset viewing lounge.',
    '["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80"]',
    'Julian Vance',
    'Luxury Estates Director',
    true
  ),
  (
    'Leavenworth Bavarian Chalet Retreat',
    340,
    '18405 Icicle Canyon Rd',
    'Leavenworth',
    'WA',
    '98826',
    3,
    2.5,
    1950,
    'Airbnb',
    'Airbnb',
    'Picturesque handcrafted log chalet overlooking the snow-capped Enchantment peaks and Icicle Creek. Custom river-rock fireplace, heated flagstone floors, wrap-around deck with BBQ station, and year-round private Jacuzzi.',
    '["https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"]',
    'Sophia Chen',
    'Pacific Northwest Specialist',
    false
  ),
  (
    'Bend Modern High Desert Sanctuary',
    295,
    '61440 Broken Top Dr',
    'Bend',
    'OR',
    '97702',
    3,
    2,
    1800,
    'Airbnb',
    'Airbnb',
    'Architect-designed high desert oasis situated minutes from Phil''s Trail mountain biking and downtown Bend breweries. Features passive solar design, private fenced courtyard, gas fire bowl, and indoor-outdoor living slider walls.',
    '["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"]',
    'Derek Hayes',
    'Residential Advisor',
    true
  ),

  -- -------------------------------------------------------------
  -- 3. LONG-TERM RENTAL HOMES & APARTMENTS
  -- -------------------------------------------------------------
  (
    'South Lake Union Designer Flat',
    3200,
    '400 9th Ave N, Apt 6C',
    'Seattle',
    'WA',
    '98109',
    2,
    2,
    1100,
    'Rental',
    'For rent',
    'Luxury tech-hub apartment right in South Lake Union. Features quartz countertops, stainless Bosch appliances, in-unit washer/dryer, pet spa, rooftop sky lounge with outdoor cinema, and secure package lockers.',
    '["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"]',
    'Sophia Chen',
    'Pacific Northwest Specialist',
    true
  ),
  (
    'Hawthorne District Modern Townhome',
    2850,
    '1520 SE 34th Ave',
    'Portland',
    'OR',
    '97214',
    3,
    2.5,
    1550,
    'Townhouse',
    'For rent',
    'Spacious 3-story townhome rental nestled off vibrant SE Hawthorne Boulevard. Light hardwood floors throughout, dedicated home office flex room, private balcony, attached one-car garage, and walk score of 96.',
    '["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80"]',
    'Derek Hayes',
    'Residential Advisor',
    false
  ),
  (
    'Kirkland Waterfront Terrace Apartment',
    4100,
    '210 Lake St S, Suite 301',
    'Kirkland',
    'WA',
    '98033',
    2,
    2.5,
    1600,
    'Rental',
    'For rent',
    'Waterfront luxury apartment overlooking Lake Washington and the Seattle skyline. Private lakefront beach access, marble gas fireplace, expansive entertaining terrace, fitness center, and subterranean parking.',
    '["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"]',
    'Julian Vance',
    'Luxury Estates Director',
    true
  ),

  -- -------------------------------------------------------------
  -- 4. SINGLE-FAMILY HOMES & ARCHITECTURAL VILLAS
  -- -------------------------------------------------------------
  (
    'Cedar Ridge Glass Villa',
    1350000,
    '88 Cedar Ridge Ln',
    'Lake Oswego',
    'OR',
    '97034',
    4,
    3.5,
    3250,
    'Villa',
    'New',
    'A serene cedar-and-glass villa nestled in private mature woodland. Features a designer chef''s kitchen with waterfall quartz island, heated outdoor patio, and spa-inspired master sanctuary.',
    '["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"]',
    'Mara Ellison',
    'AetherHomes Senior Broker',
    true
  ),
  (
    'Bellevue Modern Sanctuary',
    2450000,
    '4102 108th Ave NE',
    'Bellevue',
    'WA',
    '98004',
    5,
    4.5,
    4800,
    'House',
    'For sale',
    'Architectural masterpiece with smart automation, floor-to-ceiling glass walls, temperature-controlled wine cellar, infinite pool deck, and panoramic Lake Washington views.',
    '["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80"]',
    'Julian Vance',
    'Luxury Estates Director',
    true
  ),
  (
    'Alder Court Restored Craftsman',
    925000,
    '87 Alder Court',
    'Vancouver',
    'WA',
    '98660',
    4,
    3,
    2650,
    'House',
    'Open house',
    'Meticulously restored 1920s craftsman with handcrafted fir woodwork, wraparound covered porch, gourmet Viking range kitchen, and lush organic garden beds.',
    '["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"]',
    'Mara Ellison',
    'AetherHomes Senior Broker',
    false
  ),
  (
    'Marigold Terrace Minimalist Villa',
    1180000,
    '18 Marigold Terrace',
    'Portland',
    'OR',
    '97214',
    4,
    3,
    2890,
    'Villa',
    'New',
    'Contemporary urban masterpiece boasting double-height foyer, radiant heated concrete floors, customized minimalist kitchen, and sunny courtyard.',
    '["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"]',
    'Julian Vance',
    'Luxury Estates Director',
    true
  ),
  (
    'Sellwood Storybook Rose Cottage',
    549000,
    '7 SE Sellwood Blvd',
    'Portland',
    'OR',
    '97202',
    2,
    1.5,
    1050,
    'Cottage',
    'For sale',
    'Charming storybook cottage steps from Sellwood Riverfront Park. Custom built-ins, sunlit kitchen nook, blooming perennial gardens, and cedar dining patio.',
    '["https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"]',
    'Derek Hayes',
    'Residential Advisor',
    false
  );
