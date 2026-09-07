"use server";

import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

export interface PaymentMethod {
  id: string;
  name: string;
  account_name: string;
  account_number: string;
  instructions: string;
  qr_code_url: string;
  is_active: boolean;
  display_order: number;
  created_at?: string;
}

// Built-in initial payment methods (used if table is empty or not yet migrated)
const DEFAULT_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "pm-bank-wire",
    name: "Bank Wire / Direct ACH",
    account_name: "AetherHomes Realty Escrow",
    account_number: "Account: 8839201948 | Routing: 121000358",
    instructions:
      "Please initiate a wire or ACH transfer to our escrow holding account. Use your Tour Reference ID in the memo or reference field.",
    qr_code_url: "",
    is_active: true,
    display_order: 1,
  },
  {
    id: "pm-zelle",
    name: "Zelle Instant Pay",
    account_name: "AetherHomes Payments",
    account_number: "payments@aetherhomes.com",
    instructions:
      "Send verification fee via Zelle to payments@aetherhomes.com. Verification is instant and will confirm your tour slot within 15 minutes.",
    qr_code_url: "",
    is_active: true,
    display_order: 2,
  },
  {
    id: "pm-cashapp",
    name: "Cash App",
    account_name: "AetherHomes Concierge",
    account_number: "$AetherHomesReal",
    instructions:
      "Send to $AetherHomesReal on Cash App. Include your name and property name in the 'For' note field.",
    qr_code_url: "",
    is_active: true,
    display_order: 3,
  },
  {
    id: "pm-crypto",
    name: "USDT / Bitcoin (Crypto)",
    account_name: "AetherHomes Digital Asset Escrow",
    account_number: "USDT (TRC20): TYP9kX7mQ3vR9aW1zJ4d5L8s2N6kY8bZ4x",
    instructions:
      "Send USDT (TRC-20) or Bitcoin to the escrow wallet address. Upload a transaction hash / screenshot below after sending.",
    qr_code_url: "",
    is_active: true,
    display_order: 4,
  },
];

// Fallback in-memory store for seamless runtime changes before/without database migrations
let fallbackMemoryMethods: PaymentMethod[] = [...DEFAULT_PAYMENT_METHODS];

export async function getDefaultPaymentMethods(): Promise<PaymentMethod[]> {
  return DEFAULT_PAYMENT_METHODS;
}

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

// 1. List payment methods
export async function listPaymentMethods(activeOnly: boolean = false): Promise<PaymentMethod[]> {
  try {
    const supabase = getPublicClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query = (supabase as any)
      .from("payment_methods")
      .select("*")
      .order("display_order", { ascending: true });

    if (activeOnly) {
      query = query.eq("is_active", true);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      // Table doesn't exist yet or is empty, use in-memory state
      return activeOnly
        ? fallbackMemoryMethods.filter((m) => m.is_active)
        : fallbackMemoryMethods;
    }
    return data as PaymentMethod[];
  } catch {
    return activeOnly
      ? fallbackMemoryMethods.filter((m) => m.is_active)
      : fallbackMemoryMethods;
  }
}

// 2. Create payment method
const createPaymentMethodSchema = z.object({
  name: z.string().min(1, "Method name is required"),
  account_name: z.string().optional().default(""),
  account_number: z.string().min(1, "Account number or identifier is required"),
  instructions: z.string().optional().default(""),
  qr_code_url: z.string().optional().default(""),
  is_active: z.boolean().optional().default(true),
  display_order: z.number().optional().default(0),
});

export type CreatePaymentMethodInput = z.infer<typeof createPaymentMethodSchema>;

export async function createPaymentMethod(
  input: { data: CreatePaymentMethodInput } | CreatePaymentMethodInput,
): Promise<PaymentMethod> {
  const raw = ("data" in input ? input.data : input) as CreatePaymentMethodInput;
  const data = createPaymentMethodSchema.parse(raw);

  const newRecord: PaymentMethod = {
    id: `pm-${Date.now()}`,
    ...data,
    created_at: new Date().toISOString(),
  };

  try {
    const supabase = getPublicClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: created, error } = await (supabase as any)
      .from("payment_methods")
      .insert(data)
      .select()
      .single();

    if (!error && created) {
      return created as PaymentMethod;
    }
  } catch {
    // Fall back to memory
  }

  fallbackMemoryMethods.push(newRecord);
  return newRecord;
}

// 3. Update payment method
const updatePaymentMethodSchema = z.object({
  id: z.string(),
  data: z.object({
    name: z.string().optional(),
    account_name: z.string().optional(),
    account_number: z.string().optional(),
    instructions: z.string().optional(),
    qr_code_url: z.string().optional(),
    is_active: z.boolean().optional(),
    display_order: z.number().optional(),
  }),
});

export type UpdatePaymentMethodInput = z.infer<typeof updatePaymentMethodSchema>;

export async function updatePaymentMethod(
  input: { data: UpdatePaymentMethodInput } | UpdatePaymentMethodInput,
): Promise<PaymentMethod> {
  const raw = ("data" in input ? input.data : input) as UpdatePaymentMethodInput;
  const { id, data } = updatePaymentMethodSchema.parse(raw);

  try {
    const supabase = getPublicClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: updated, error } = await (supabase as any)
      .from("payment_methods")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (!error && updated) {
      return updated as PaymentMethod;
    }
  } catch {
    // Fall back to memory
  }

  fallbackMemoryMethods = fallbackMemoryMethods.map((m) =>
    m.id === id ? { ...m, ...data } : m,
  );
  const found = fallbackMemoryMethods.find((m) => m.id === id);
  if (!found) throw new Error("Payment method not found");
  return found;
}

// 4. Delete payment method
export async function deletePaymentMethod(
  input: { data: { id: string } } | { id: string },
): Promise<{ success: boolean }> {
  const id = "data" in input ? input.data.id : input.id;

  try {
    const supabase = getPublicClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from("payment_methods").delete().eq("id", id);
  } catch {
    // Fall back to memory
  }

  fallbackMemoryMethods = fallbackMemoryMethods.filter((m) => m.id !== id);
  return { success: true };
}

// 5. Submit payment confirmation / proof for an inquiry
const paymentProofSchema = z.object({
  inquiryId: z.string(),
  methodName: z.string(),
  transactionReference: z.string().optional().default(""),
  proofImageUrl: z.string().optional().default(""),
  senderName: z.string().optional().default(""),
});

export type PaymentProofInput = z.infer<typeof paymentProofSchema>;

export async function submitPaymentProof(
  input: { data: PaymentProofInput } | PaymentProofInput,
) {
  const raw = ("data" in input ? input.data : input) as PaymentProofInput;
  const data = paymentProofSchema.parse(raw);

  try {
    const supabase = getPublicClient();

    // 1. Try updating tour_inquiries status and message
    const { data: inq } = await supabase
      .from("tour_inquiries")
      .select("message")
      .eq("id", data.inquiryId)
      .single();

    const note = `\n[PAYMENT SUBMITTED via ${data.methodName}${data.transactionReference ? ` | Ref: ${data.transactionReference}` : ""
      }${data.senderName ? ` | Sender: ${data.senderName}` : ""}${data.proofImageUrl ? ` | Proof: ${data.proofImageUrl}` : ""
      }]`;

    await supabase
      .from("tour_inquiries")
      .update({
        message: `${inq?.message || ""}${note}`,
      })
      .eq("id", data.inquiryId);

    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Could not submit payment confirmation";
    return { success: false, error: msg };
  }
}
