-- =========================================================
-- Populate Properties Seed Data for AetherHomes
-- Copy and paste this script directly into Supabase Dashboard:
-- Supabase Dashboard -> SQL Editor -> New query -> Run
-- =========================================================

INSERT INTO public.properties (
  title, price, address, city, state, zip, beds, baths, sqft, property_type, status, description, image_key, agent_name, agent_title, featured
) VALUES
  (
    'The Halsey Loft & Penthouse', 745000, '1204 NE Halsey St', 'Portland', 'OR', '97232', 2, 2, 1280, 'Condo', 'For sale',
    'A light-filled loft with soaring double-height ceilings, exposed timber beams, custom steel staircases, and a west-facing window wall capturing magnificent sunset skyline views.',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    'Mara Ellison', 'AetherHomes Senior Broker', true
  ),
  (
    'Cedar Ridge Glass Villa', 1350000, '88 Cedar Ridge Ln', 'Lake Oswego', 'OR', '97034', 4, 3.5, 3250, 'Villa', 'New',
    'A serene cedar-and-glass villa nestled in private mature woodland. Features a designer chef''s kitchen with waterfall quartz island, heated outdoor patio, and spa-inspired master sanctuary.',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    'Mara Ellison', 'AetherHomes Senior Broker', true
  ),
  (
    'Bellevue Modern Sanctuary', 2450000, '4102 108th Ave NE', 'Bellevue', 'WA', '98004', 5, 4.5, 4800, 'House', 'For sale',
    'Architectural masterpiece with smart automation, floor-to-ceiling glass walls, temperature-controlled wine cellar, infinite pool deck, and panoramic Lake Washington views.',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'Julian Vance', 'Luxury Estates Director', true
  ),
  (
    'Harborview Waterfront Flat', 890000, '520 Harborview Rd', 'Seattle', 'WA', '98101', 2, 2, 1420, 'Condo', 'Price drop',
    'Waterfront corner residence featuring direct Elliott Bay views, Italian marble kitchen islands, private balcony terrace, and concierge amenity access.',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    'Sophia Chen', 'Pacific Northwest Specialist', true
  ),
  (
    'Alder Court Restored Craftsman', 925000, '87 Alder Court', 'Vancouver', 'WA', '98660', 4, 3, 2650, 'House', 'Open house',
    'Meticulously restored 1920s craftsman with handcrafted fir woodwork, wraparound covered porch, gourmet Viking range kitchen, and lush organic garden beds.',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    'Mara Ellison', 'AetherHomes Senior Broker', false
  ),
  (
    'Maple Court Garden Duplex', 615000, '412 SW Maple Ct', 'Beaverton', 'OR', '97005', 3, 2.5, 1840, 'Duplex', 'For sale',
    'Modern duplex design featuring oak floorboards, skylit upper bedrooms, fenced private backyard garden, and flexible garden studio workspace.',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    'Derek Hayes', 'Residential Advisor', false
  ),
  (
    'Juniper Heights Residence', 849000, '214 Juniper Lane', 'Portland', 'OR', '97212', 3, 2, 2210, 'House', 'For sale',
    'Iconic mid-century modern home on an elevated quiet street. Boasts sunken living room with original stone fireplace, cedar decks, and pristine tree-canopy vistas.',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
    'Mara Ellison', 'AetherHomes Senior Broker', false
  ),
  (
    'Marigold Terrace Estate', 1180000, '18 Marigold Terrace', 'Portland', 'OR', '97214', 4, 3, 2890, 'House', 'New',
    'Contemporary urban masterpiece boasting double-height foyer, radiant heated concrete floors, customized minimalist kitchen, and sunny courtyard.',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    'Julian Vance', 'Luxury Estates Director', true
  ),
  (
    'Sellwood Rose Cottage', 549000, '7 SE Sellwood Blvd', 'Portland', 'OR', '97202', 2, 1.5, 1050, 'Cottage', 'For sale',
    'Charming storybook cottage steps from Sellwood Riverfront Park. Custom built-ins, sunlit kitchen nook, blooming perennial gardens, and cedar dining patio.',
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    'Sophia Chen', 'Pacific Northwest Specialist', false
  ),
  (
    'Fremont Canal Front Residence', 675000, '901 N Fremont Way', 'Seattle', 'WA', '98103', 1, 1.5, 920, 'Condo', 'For sale',
    'Sleek modern canal-front home with hardwood flooring, high-end Bosch appliances, rooftop deck access, and immediate access to bike paths and cafes.',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    'Sophia Chen', 'Pacific Northwest Specialist', false
  ),
  (
    'Mercer Island Modern Waterfront', 3850000, '3820 E Mercer Way', 'Mercer Island', 'WA', '98040', 5, 5.5, 5600, 'Villa', 'New',
    'World-class private waterfront residence with deep-water dock, glass elevator, infinity pool, outdoor kitchen pavilion, and breathtaking Seattle skyline backdrop.',
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    'Julian Vance', 'Luxury Estates Director', true
  ),
  (
    'La Jolla Oceanfront Cliffside', 4950000, '7402 Coast Blvd', 'La Jolla', 'CA', '92037', 4, 4.5, 4350, 'House', 'For sale',
    'Unrivaled oceanfront coastal sanctuary perched above Pacific ocean surf. Automated floor-to-ceiling glass walls, private path to cove, and sunset rooftop deck.',
    'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
    'Julian Vance', 'Luxury Estates Director', true
  ),
  (
    'Beverly Hills Contemporary Estate', 6850000, '1040 Loma Vista Dr', 'Beverly Hills', 'CA', '90210', 6, 7, 6800, 'House', 'New',
    'Ultra-luxurious architectural statement home in prime Trousdale Estates. Infinity zero-edge pool, private screening room, wellness spa, and city light views.',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
    'Julian Vance', 'Luxury Estates Director', true
  ),
  (
    'San Francisco Pacific Heights Townhouse', 3450000, '2840 Broadway St', 'San Francisco', 'CA', '94115', 4, 3.5, 3600, 'Townhouse', 'For sale',
    'Classic grand victorian townhouse thoroughly modernized with custom European kitchen, wine lounge, roof deck overlooking San Francisco Bay and Golden Gate Bridge.',
    'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1200&q=80',
    'Sophia Chen', 'Pacific Northwest Specialist', false
  ),
  (
    'Pearl District Glass Penthouse', 1650000, '1130 NW 12th Ave #1201', 'Portland', 'OR', '97209', 2, 2.5, 2100, 'Penthouse', 'New',
    'Corner penthouse with 270-degree mountain and city views. Polished concrete floors, Sub-Zero & Wolf appliances, wrapped terrace, and 2 private parking stalls.',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    'Mara Ellison', 'AetherHomes Senior Broker', true
  ),
  (
    'West Hills Forest Villa', 1890000, '3205 SW Fairmount Blvd', 'Portland', 'OR', '97239', 4, 4, 4100, 'House', 'For sale',
    'Private organic contemporary retreat surrounded by lush forest canopy. Cedar detailing, radiant floors, glass fireplace, and detached guest suite.',
    'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80',
    'Mara Ellison', 'AetherHomes Senior Broker', false
  ),
  (
    'Austin Modern Hill Country Estate', 2150000, '4810 Westlake Dr', 'Austin', 'TX', '78746', 4, 4.5, 4400, 'House', 'Open house',
    'Stunning Hill Country glass & limestone residence on 1.5 acres overlooking Lake Austin. Resort pool, outdoor kitchen pavilion, and solar energy systems.',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
    'Derek Hayes', 'Residential Advisor', false
  ),
  (
    'Miami Beach Palms Villa', 4200000, '4420 North View Dr', 'Miami Beach', 'FL', '33140', 5, 5, 4900, 'Villa', 'For sale',
    'Tropical modern waterfront estate with private dock, palm grove gardens, summer kitchen, rooftop lounge, and immediate ocean access.',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    'Julian Vance', 'Luxury Estates Director', false
  ),
  (
    'Queen Anne Skyline Modern', 1750000, '1420 5th Ave W', 'Seattle', 'WA', '98119', 3, 3, 2750, 'House', 'Price drop',
    'Striking architectural home on Queen Anne''s south slope. Expansive deck featuring unobstructed views of Space Needle, downtown skyline, and Mount Rainier.',
    'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80',
    'Sophia Chen', 'Pacific Northwest Specialist', false
  ),
  (
    'Bend Alpine Timber Lodge', 1290000, '19420 Mount Washington Dr', 'Bend', 'OR', '97702', 4, 3.5, 3400, 'House', 'For sale',
    'High Desert mountain home with timber frame construction, stone hearth fireplace, heated driveway, three-car garage, and Cascade mountain range views.',
    'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1200&q=80',
    'Derek Hayes', 'Residential Advisor', false
  ),
  (
    'Kirkland Waterfront Townhome', 1480000, '210 Lake Street S', 'Kirkland', 'WA', '98033', 3, 2.5, 2250, 'Townhouse', 'For sale',
    'Luxury lakefront living in downtown Kirkland. Walk out your door to marina, dining, and parks. Custom millwork, elevator, and rooftop terrace.',
    'https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1200&q=80',
    'Sophia Chen', 'Pacific Northwest Specialist', false
  ),
  (
    'Irvington Heritage Modern', 1150000, '2314 NE 19th Ave', 'Portland', 'OR', '97212', 4, 3, 3100, 'House', 'Open house',
    'Grand historic Irvington English Tudor seamlessly blended with modern architectural additions. Gourmet island kitchen, primary suite balcony, and secret garden.',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    'Mara Ellison', 'AetherHomes Senior Broker', false
  ),
  (
    'Cap Hill Scandinavian Flat', 520000, '715 E Pine St #402', 'Seattle', 'WA', '98122', 1, 1, 780, 'Condo', 'For sale',
    'Minimalist Scandinavian design in vibrant Capitol Hill. Light ash wood floors, built-in storage solutions, private sun deck, and low HOA dues.',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    'Sophia Chen', 'Pacific Northwest Specialist', false
  ),
  (
    'Camden Hill Country Cottage', 479000, '105 Country Club Rd', 'Lake Oswego', 'OR', '97034', 2, 2, 1350, 'Cottage', 'For sale',
    'Charming single-level living near Lake Oswego village. Vaulted ceilings, stone patio, serene Japanese maple garden, and private community pool access.',
    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
    'Derek Hayes', 'Residential Advisor', false
  );
