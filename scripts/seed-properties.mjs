import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

function loadEnv() {
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
        const envFile = fs.readFileSync(envPath, "utf-8");
        for (const line of envFile.split("\n")) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith("#")) continue;
            const equalsIndex = trimmed.indexOf("=");
            if (equalsIndex !== -1) {
                const key = trimmed.substring(0, equalsIndex).trim();
                let val = trimmed.substring(equalsIndex + 1).trim();
                if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                    val = val.substring(1, val.length - 1);
                }
                if (!process.env[key]) {
                    process.env[key] = val;
                }
            }
        }
    }
}

loadEnv();

const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    "https://ynogpuirqahuftjwnjpm.supabase.co";

const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    "sb_publishable_7W4CYQwM3j3bj-e1idMGJg_DMNF8huW";

console.log("Connecting to Supabase URL:", supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
        fetch: (input, init) => {
            const h = new Headers(init?.headers);
            if (supabaseKey.startsWith("sb_") && h.get("Authorization") === `Bearer ${supabaseKey}`) {
                h.delete("Authorization");
            }
            if (supabaseKey) h.set("apikey", supabaseKey);
            return fetch(input, { ...init, headers: h });
        },
    },
});

const seedProperties = [
    {
        title: "The Halsey Loft & Penthouse",
        price: 745000,
        address: "1204 NE Halsey St",
        city: "Portland",
        state: "OR",
        zip: "97232",
        beds: 2,
        baths: 2,
        sqft: 1280,
        property_type: "Condo",
        status: "For sale",
        description: "A light-filled loft with soaring double-height ceilings, exposed timber beams, custom steel staircases, and a west-facing window wall capturing magnificent sunset skyline views.",
        image_key: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
        agent_name: "Mara Ellison",
        agent_title: "AetherHomes Senior Broker",
        featured: true,
    },
    {
        title: "Cedar Ridge Glass Villa",
        price: 1350000,
        address: "88 Cedar Ridge Ln",
        city: "Lake Oswego",
        state: "OR",
        zip: "97034",
        beds: 4,
        baths: 3.5,
        sqft: 3250,
        property_type: "Villa",
        status: "New",
        description: "A serene cedar-and-glass villa nestled in private mature woodland. Features a designer chef's kitchen with waterfall quartz island, heated outdoor patio, and spa-inspired master sanctuary.",
        image_key: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
        agent_name: "Mara Ellison",
        agent_title: "AetherHomes Senior Broker",
        featured: true,
    },
    {
        title: "Bellevue Modern Sanctuary",
        price: 2450000,
        address: "4102 108th Ave NE",
        city: "Bellevue",
        state: "WA",
        zip: "98004",
        beds: 5,
        baths: 4.5,
        sqft: 4800,
        property_type: "House",
        status: "For sale",
        description: "Architectural masterpiece with smart automation, floor-to-ceiling glass walls, temperature-controlled wine cellar, infinite pool deck, and panoramic Lake Washington views.",
        image_key: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        agent_name: "Julian Vance",
        agent_title: "Luxury Estates Director",
        featured: true,
    },
    {
        title: "Harborview Waterfront Flat",
        price: 890000,
        address: "520 Harborview Rd",
        city: "Seattle",
        state: "WA",
        zip: "98101",
        beds: 2,
        baths: 2,
        sqft: 1420,
        property_type: "Condo",
        status: "Price drop",
        description: "Waterfront corner residence featuring direct Elliott Bay views, Italian marble kitchen islands, private balcony terrace, and concierge amenity access.",
        image_key: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        agent_name: "Sophia Chen",
        agent_title: "Pacific Northwest Specialist",
        featured: true,
    },
    {
        title: "Alder Court Restored Craftsman",
        price: 925000,
        address: "87 Alder Court",
        city: "Vancouver",
        state: "WA",
        zip: "98660",
        beds: 4,
        baths: 3,
        sqft: 2650,
        property_type: "House",
        status: "Open house",
        description: "Meticulously restored 1920s craftsman with handcrafted fir woodwork, wraparound covered porch, gourmet Viking range kitchen, and lush organic garden beds.",
        image_key: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
        agent_name: "Mara Ellison",
        agent_title: "AetherHomes Senior Broker",
        featured: false,
    },
    {
        title: "Maple Court Garden Duplex",
        price: 615000,
        address: "412 SW Maple Ct",
        city: "Beaverton",
        state: "OR",
        zip: "97005",
        beds: 3,
        baths: 2.5,
        sqft: 1840,
        property_type: "Duplex",
        status: "For sale",
        description: "Modern duplex design featuring oak floorboards, skylit upper bedrooms, fenced private backyard garden, and flexible garden studio workspace.",
        image_key: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        agent_name: "Derek Hayes",
        agent_title: "Residential Advisor",
        featured: false,
    },
    {
        title: "Juniper Heights Residence",
        price: 849000,
        address: "214 Juniper Lane",
        city: "Portland",
        state: "OR",
        zip: "97212",
        beds: 3,
        baths: 2,
        sqft: 2210,
        property_type: "House",
        status: "For sale",
        description: "Iconic mid-century modern home on an elevated quiet street. Boasts sunken living room with original stone fireplace, cedar decks, and pristine tree-canopy vistas.",
        image_key: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
        agent_name: "Mara Ellison",
        agent_title: "AetherHomes Senior Broker",
        featured: false,
    },
    {
        title: "Marigold Terrace Estate",
        price: 1180000,
        address: "18 Marigold Terrace",
        city: "Portland",
        state: "OR",
        zip: "97214",
        beds: 4,
        baths: 3,
        sqft: 2890,
        property_type: "House",
        status: "New",
        description: "Contemporary urban masterpiece boasting double-height foyer, radiant heated concrete floors, customized minimalist kitchen, and sunny courtyard.",
        image_key: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        agent_name: "Julian Vance",
        agent_title: "Luxury Estates Director",
        featured: true,
    },
    {
        title: "Sellwood Rose Cottage",
        price: 549000,
        address: "7 SE Sellwood Blvd",
        city: "Portland",
        state: "OR",
        zip: "97202",
        beds: 2,
        baths: 1.5,
        sqft: 1050,
        property_type: "Cottage",
        status: "For sale",
        description: "Charming storybook cottage steps from Sellwood Riverfront Park. Custom built-ins, sunlit kitchen nook, blooming perennial gardens, and cedar dining patio.",
        image_key: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
        agent_name: "Sophia Chen",
        agent_title: "Pacific Northwest Specialist",
        featured: false,
    },
    {
        title: "Fremont Canal Front Residence",
        price: 675000,
        address: "901 N Fremont Way",
        city: "Seattle",
        state: "WA",
        zip: "98103",
        beds: 1,
        baths: 1.5,
        sqft: 920,
        property_type: "Condo",
        status: "For sale",
        description: "Sleek modern canal-front home with hardwood flooring, high-end Bosch appliances, rooftop deck access, and immediate access to bike paths and cafes.",
        image_key: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
        agent_name: "Sophia Chen",
        agent_title: "Pacific Northwest Specialist",
        featured: false,
    },
    {
        title: "Mercer Island Modern Waterfront",
        price: 3850000,
        address: "3820 E Mercer Way",
        city: "Mercer Island",
        state: "WA",
        zip: "98040",
        beds: 5,
        baths: 5.5,
        sqft: 5600,
        property_type: "Villa",
        status: "New",
        description: "World-class private waterfront residence with deep-water dock, glass elevator, infinity pool, outdoor kitchen pavilion, and breathtaking Seattle skyline backdrop.",
        image_key: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
        agent_name: "Julian Vance",
        agent_title: "Luxury Estates Director",
        featured: true,
    },
    {
        title: "La Jolla Oceanfront Cliffside",
        price: 4950000,
        address: "7402 Coast Blvd",
        city: "La Jolla",
        state: "CA",
        zip: "92037",
        beds: 4,
        baths: 4.5,
        sqft: 4350,
        property_type: "House",
        status: "For sale",
        description: "Unrivaled oceanfront coastal sanctuary perched above Pacific ocean surf. Automated floor-to-ceiling glass walls, private path to cove, and sunset rooftop deck.",
        image_key: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80",
        agent_name: "Julian Vance",
        agent_title: "Luxury Estates Director",
        featured: true,
    },
    {
        title: "Beverly Hills Contemporary Estate",
        price: 6850000,
        address: "1040 Loma Vista Dr",
        city: "Beverly Hills",
        state: "CA",
        zip: "90210",
        beds: 6,
        baths: 7,
        sqft: 6800,
        property_type: "House",
        status: "New",
        description: "Ultra-luxurious architectural statement home in prime Trousdale Estates. Infinity zero-edge pool, private screening room, wellness spa, and city light views.",
        image_key: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
        agent_name: "Julian Vance",
        agent_title: "Luxury Estates Director",
        featured: true,
    },
    {
        title: "San Francisco Pacific Heights Townhouse",
        price: 3450000,
        address: "2840 Broadway St",
        city: "San Francisco",
        state: "CA",
        zip: "94115",
        beds: 4,
        baths: 3.5,
        sqft: 3600,
        property_type: "Townhouse",
        status: "For sale",
        description: "Classic grand victorian townhouse thoroughly modernized with custom European kitchen, wine lounge, roof deck overlooking San Francisco Bay and Golden Gate Bridge.",
        image_key: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1200&q=80",
        agent_name: "Sophia Chen",
        agent_title: "Pacific Northwest Specialist",
        featured: false,
    },
    {
        title: "Pearl District Glass Penthouse",
        price: 1650000,
        address: "1130 NW 12th Ave #1201",
        city: "Portland",
        state: "OR",
        zip: "97209",
        beds: 2,
        baths: 2.5,
        sqft: 2100,
        property_type: "Penthouse",
        status: "New",
        description: "Corner penthouse with 270-degree mountain and city views. Polished concrete floors, Sub-Zero & Wolf appliances, wrapped terrace, and 2 private parking stalls.",
        image_key: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
        agent_name: "Mara Ellison",
        agent_title: "AetherHomes Senior Broker",
        featured: true,
    },
    {
        title: "West Hills Forest Villa",
        price: 1890000,
        address: "3205 SW Fairmount Blvd",
        city: "Portland",
        state: "OR",
        zip: "97239",
        beds: 4,
        baths: 4,
        sqft: 4100,
        property_type: "House",
        status: "For sale",
        description: "Private organic contemporary retreat surrounded by lush forest canopy. Cedar detailing, radiant floors, glass fireplace, and detached guest suite.",
        image_key: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80",
        agent_name: "Mara Ellison",
        agent_title: "AetherHomes Senior Broker",
        featured: false,
    },
    {
        title: "Austin Modern Hill Country Estate",
        price: 2150000,
        address: "4810 Westlake Dr",
        city: "Austin",
        state: "TX",
        zip: "78746",
        beds: 4,
        baths: 4.5,
        sqft: 4400,
        property_type: "House",
        status: "Open house",
        description: "Stunning Hill Country glass & limestone residence on 1.5 acres overlooking Lake Austin. Resort pool, outdoor kitchen pavilion, and solar energy systems.",
        image_key: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
        agent_name: "Derek Hayes",
        agent_title: "Residential Advisor",
        featured: false,
    },
    {
        title: "Miami Beach Palms Villa",
        price: 4200000,
        address: "4420 North View Dr",
        city: "Miami Beach",
        state: "FL",
        zip: "33140",
        beds: 5,
        baths: 5,
        sqft: 4900,
        property_type: "Villa",
        status: "For sale",
        description: "Tropical modern waterfront estate with private dock, palm grove gardens, summer kitchen, rooftop lounge, and immediate ocean access.",
        image_key: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
        agent_name: "Julian Vance",
        agent_title: "Luxury Estates Director",
        featured: false,
    },
    {
        title: "Queen Anne Skyline Modern",
        price: 1750000,
        address: "1420 5th Ave W",
        city: "Seattle",
        state: "WA",
        zip: "98119",
        beds: 3,
        baths: 3,
        sqft: 2750,
        property_type: "House",
        status: "Price drop",
        description: "Striking architectural home on Queen Anne's south slope. Expansive deck featuring unobstructed views of Space Needle, downtown skyline, and Mount Rainier.",
        image_key: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80",
        agent_name: "Sophia Chen",
        agent_title: "Pacific Northwest Specialist",
        featured: false,
    },
    {
        title: "Bend Alpine Timber Lodge",
        price: 1290000,
        address: "19420 Mount Washington Dr",
        city: "Bend",
        state: "OR",
        zip: "97702",
        beds: 4,
        baths: 3.5,
        sqft: 3400,
        property_type: "House",
        status: "For sale",
        description: "High Desert mountain home with timber frame construction, stone hearth fireplace, heated driveway, three-car garage, and Cascade mountain range views.",
        image_key: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1200&q=80",
        agent_name: "Derek Hayes",
        agent_title: "Residential Advisor",
        featured: false,
    },
    {
        title: "Kirkland Waterfront Townhome",
        price: 1480000,
        address: "210 Lake Street S",
        city: "Kirkland",
        state: "WA",
        zip: "98033",
        beds: 3,
        baths: 2.5,
        sqft: 2250,
        property_type: "Townhouse",
        status: "For sale",
        description: "Luxury lakefront living in downtown Kirkland. Walk out your door to marina, dining, and parks. Custom millwork, elevator, and rooftop terrace.",
        image_key: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1200&q=80",
        agent_name: "Sophia Chen",
        agent_title: "Pacific Northwest Specialist",
        featured: false,
    },
    {
        title: "Irvington Heritage Modern",
        price: 1150000,
        address: "2314 NE 19th Ave",
        city: "Portland",
        state: "OR",
        zip: "97212",
        beds: 4,
        baths: 3,
        sqft: 3100,
        property_type: "House",
        status: "Open house",
        description: "Grand historic Irvington English Tudor seamlessly blended with modern architectural additions. Gourmet island kitchen, primary suite balcony, and secret garden.",
        image_key: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
        agent_name: "Mara Ellison",
        agent_title: "AetherHomes Senior Broker",
        featured: false,
    },
    {
        title: "Cap Hill Scandinavian Flat",
        price: 520000,
        address: "715 E Pine St #402",
        city: "Seattle",
        state: "WA",
        zip: "98122",
        beds: 1,
        baths: 1,
        sqft: 780,
        property_type: "Condo",
        status: "For sale",
        description: "Minimalist Scandinavian design in vibrant Capitol Hill. Light ash wood floors, built-in storage solutions, private sun deck, and low HOA dues.",
        image_key: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        agent_name: "Sophia Chen",
        agent_title: "Pacific Northwest Specialist",
        featured: false,
    },
    {
        title: "Camden Hill Country Cottage",
        price: 479000,
        address: "105 Country Club Rd",
        city: "Lake Oswego",
        state: "OR",
        zip: "97034",
        beds: 2,
        baths: 2,
        sqft: 1350,
        property_type: "Cottage",
        status: "For sale",
        description: "Charming single-level living near Lake Oswego village. Vaulted ceilings, stone patio, serene Japanese maple garden, and private community pool access.",
        image_key: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
        agent_name: "Derek Hayes",
        agent_title: "Residential Advisor",
        featured: false,
    }
];

async function main() {
    console.log(`Checking existing properties...`);

    const { data: existing, error: countErr } = await supabase
        .from("properties")
        .select("id, title");

    if (countErr) {
        console.error("Error querying properties table:", countErr.message);
        process.exit(1);
    }

    console.log(`Current row count in 'properties': ${existing?.length ?? 0}`);

    console.log(`Inserting ${seedProperties.length} new properties...`);

    const { data, error } = await supabase
        .from("properties")
        .insert(seedProperties)
        .select();

    if (error) {
        console.error("Failed to insert properties:", error.message);
        process.exit(1);
    }

    console.log(`Successfully inserted ${data.length} properties!`);
    console.log("Sample inserted property:", data[0]);

    const { data: allProps } = await supabase.from("properties").select("id, title, price, city");
    console.log(`Total properties now in DB: ${allProps?.length}`);
}

main().catch((err) => {
    console.error("Unexpected error:", err);
    process.exit(1);
});
