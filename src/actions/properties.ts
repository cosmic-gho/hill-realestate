"use server";

import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import { sendTourBookingEmails } from "@/lib/email";

export type Property = Database["public"]["Tables"]["properties"]["Row"];
export type PropertyInsert = Database["public"]["Tables"]["properties"]["Insert"];
export type PropertyUpdate = Database["public"]["Tables"]["properties"]["Update"];
export type TourInquiry = Database["public"]["Tables"]["tour_inquiries"]["Row"];

function getPublicClient() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    "";
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    "";

  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        if (key) h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

const listPropertiesSchema = z.object({
  q: z.string().optional(),
  beds: z.number().optional(),
  baths: z.number().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  featuredOnly: z.boolean().optional(),
});

export type ListPropertiesParams = z.infer<typeof listPropertiesSchema>;

export async function listProperties(
  input?: { data?: ListPropertiesParams } | ListPropertiesParams,
): Promise<Property[]> {
  const raw = (input && "data" in input ? input.data : input) as ListPropertiesParams | undefined;
  const data = listPropertiesSchema.parse(raw ?? {});

  let query = getPublicClient()
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (data.featuredOnly) query = query.eq("featured", true);
  if (data.beds) query = query.gte("beds", data.beds);
  if (data.baths) query = query.gte("baths", data.baths);
  if (data.minPrice) query = query.gte("price", data.minPrice);
  if (data.maxPrice) query = query.lte("price", data.maxPrice);
  if (data.type && data.type !== "all") query = query.eq("property_type", data.type);
  if (data.status && data.status !== "all") query = query.eq("status", data.status);
  if (data.q) {
    const term = `%${data.q}%`;
    query = query.or(
      `city.ilike.${term},address.ilike.${term},zip.ilike.${term},title.ilike.${term}`,
    );
  }

  const { data: rows, error } = await query;
  if (error) throw new Error(error.message);
  return rows ?? [];
}

export async function getProperty(
  input: { data: { id: string } } | { id: string },
): Promise<Property | null> {
  const id = "data" in input ? input.data.id : input.id;
  const { data: row, error } = await getPublicClient()
    .from("properties")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return row;
}

const createPropertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().positive("Price must be positive"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().default(""),
  beds: z.number().min(0).default(1),
  baths: z.number().min(0).default(1),
  sqft: z.number().min(0).default(500),
  property_type: z.string().default("House"),
  status: z.string().default("For sale"),
  description: z.string().default(""),
  image_key: z.string().default("living"),
  agent_name: z.string().default("Mara Ellison"),
  agent_title: z.string().default("AetherHomes Broker"),
  featured: z.boolean().default(false),
});

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;

export async function createProperty(
  input: { data: CreatePropertyInput } | CreatePropertyInput,
): Promise<Property> {
  const raw = ("data" in input ? input.data : input) as CreatePropertyInput;
  const data = createPropertySchema.parse(raw);

  const { data: created, error } = await getPublicClient()
    .from("properties")
    .insert(data)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return created;
}

const updatePropertySchema = z.object({
  id: z.string(),
  data: z.object({
    title: z.string().optional(),
    price: z.number().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
    beds: z.number().optional(),
    baths: z.number().optional(),
    sqft: z.number().optional(),
    property_type: z.string().optional(),
    status: z.string().optional(),
    description: z.string().optional(),
    image_key: z.string().optional(),
    agent_name: z.string().optional(),
    agent_title: z.string().optional(),
    featured: z.boolean().optional(),
  }),
});

export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>;

export async function updateProperty(
  input: { data: UpdatePropertyInput } | UpdatePropertyInput,
): Promise<Property> {
  const raw = ("data" in input ? input.data : input) as UpdatePropertyInput;
  const { id, data } = updatePropertySchema.parse(raw);

  const { data: updated, error } = await getPublicClient()
    .from("properties")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return updated;
}

export async function deleteProperty(
  input: { data: { id: string } } | { id: string },
): Promise<{ success: boolean }> {
  const id = "data" in input ? input.data.id : input.id;
  const { error } = await getPublicClient().from("properties").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { success: true };
}

const inquirySchema = z.object({
  property_id: z.string().optional().nullable(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional().default(""),
  message: z.string().default(""),
  preferred_date: z.string().optional().nullable(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export async function submitInquiry(
  input: { data: InquiryInput } | InquiryInput,
): Promise<TourInquiry> {
  const raw = ("data" in input ? input.data : input) as InquiryInput;
  const data = inquirySchema.parse(raw);

  const { data: inquiry, error } = await getPublicClient()
    .from("tour_inquiries")
    .insert({
      property_id: data.property_id || null,
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      preferred_date: data.preferred_date || null,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  // Send tour confirmation email to customer & alert to admin
  try {
    let property = null;
    if (data.property_id) {
      property = await getProperty({ id: data.property_id });
    }
    await sendTourBookingEmails({
      inquiry,
      property,
    });
  } catch (emailErr) {
    console.error("Error triggering tour booking emails:", emailErr);
  }

  return inquiry;
}

export async function getInquiry(
  input: { data: { id: string } } | { id: string } | string,
) {
  const id =
    typeof input === "string" ? input : "data" in input ? input.data.id : input.id;
  const { data: row, error } = await getPublicClient()
    .from("tour_inquiries")
    .select("*, properties(*)")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return row;
}

export async function listInquiries(
  input?: { data?: { status?: string } } | { status?: string },
) {
  const raw = (input && "data" in input ? input.data : input) as { status?: string } | undefined;
  const status = raw?.status;

  let query = getPublicClient()
    .from("tour_inquiries")
    .select("*, properties(id, title, address, price, city)")
    .order("created_at", { ascending: false });

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data: rows, error } = await query;
  if (error) throw new Error(error.message);
  return rows ?? [];
}

export async function updateInquiryStatus(
  input:
    | { data: { id: string; status: "pending" | "contacted" | "archived" } }
    | { id: string; status: "pending" | "contacted" | "archived" },
) {
  const raw = ("data" in input ? input.data : input) as {
    id: string;
    status: "pending" | "contacted" | "archived";
  };
  const { id, status } = z
    .object({
      id: z.string(),
      status: z.enum(["pending", "contacted", "archived"]),
    })
    .parse(raw);

  const { data: updated, error } = await getPublicClient()
    .from("tour_inquiries")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return updated;
}

export async function deleteInquiry(
  input: { data: { id: string } } | { id: string },
): Promise<{ success: boolean }> {
  const id = "data" in input ? input.data.id : input.id;
  const { error } = await getPublicClient().from("tour_inquiries").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { success: true };
}
