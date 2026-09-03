"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import {
  listProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  listInquiries,
  updateInquiryStatus,
  deleteInquiry,
  type Property,
  type TourInquiry,
} from "@/actions/properties";
import {
  listPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  type PaymentMethod,
} from "@/actions/payments";
import { GlassBackdrop } from "@/components/glass-backdrop";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ImageUploader } from "@/components/image-uploader";
import { formatPrice, imageFor } from "@/lib/property-images";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import {
  Plus,
  Trash2,
  Edit,
  Star,
  Building,
  Mail,
  Calendar,
  CheckCircle,
  Clock,
  Search,
  ExternalLink,
  DollarSign,
  TrendingUp,
  X,
  RefreshCw,
  ShieldAlert,
  Lock,
  ShieldCheck,
  LogOut,
  CreditCard,
  QrCode,
} from "lucide-react";

interface PropertyFormState {
  id?: string;
  title: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  beds: number;
  baths: number;
  sqft: number;
  property_type: string;
  status: string;
  description: string;
  image_key: string;
  agent_name: string;
  agent_title: string;
  featured: boolean;
}

const initialForm: PropertyFormState = {
  title: "",
  price: 650000,
  address: "",
  city: "Portland",
  state: "OR",
  zip: "97201",
  beds: 3,
  baths: 2,
  sqft: 1850,
  property_type: "House",
  status: "For sale",
  description: "",
  image_key: "living",
  agent_name: "Mara Ellison",
  agent_title: "AetherHomes Broker",
  featured: false,
};

export default function AdminPage() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();

  interface AdminInquiry extends TourInquiry {
    properties?: {
      id: string;
      title: string;
      address: string;
      price: number;
      city: string;
    } | null;
  }

  const [activeTab, setActiveTab] = useState<"listings" | "inquiries" | "payments">("listings");
  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states for properties
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PropertyFormState>(initialForm);
  const [saving, setSaving] = useState(false);

  // Modal states for payment methods
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [editingPaymentId, setEditingPaymentId] = useState<string | null>(null);
  const initialPaymentForm = {
    name: "",
    account_name: "",
    account_number: "",
    instructions: "",
    qr_code_url: "",
    is_active: true,
    display_order: 0,
  };
  const [paymentForm, setPaymentForm] = useState(initialPaymentForm);
  const [savingPayment, setSavingPayment] = useState(false);

  // Inquiry filter
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState("all");

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [props, inqs, pms] = await Promise.all([
        listProperties({ data: {} }),
        listInquiries({
          data: { status: inquiryStatusFilter === "all" ? undefined : inquiryStatusFilter },
        }),
        listPaymentMethods(false),
      ]);
      setProperties(props);
      setInquiries(inqs as AdminInquiry[]);
      setPaymentMethods(pms);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load admin data";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [inquiryStatusFilter]);

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin, loadData]);

  function handleOpenCreate() {
    setEditingId(null);
    setForm(initialForm);
    setModalOpen(true);
  }

  function handleOpenEdit(property: Property) {
    setEditingId(property.id);
    setForm({
      id: property.id,
      title: property.title,
      price: property.price,
      address: property.address,
      city: property.city,
      state: property.state,
      zip: property.zip,
      beds: property.beds,
      baths: Number(property.baths),
      sqft: property.sqft,
      property_type: property.property_type,
      status: property.status,
      description: property.description,
      image_key: property.image_key,
      agent_name: property.agent_name,
      agent_title: property.agent_title,
      featured: property.featured,
    });
    setModalOpen(true);
  }

  async function handleSaveProperty(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateProperty({
          data: {
            id: editingId,
            data: {
              title: form.title,
              price: form.price,
              address: form.address,
              city: form.city,
              state: form.state,
              zip: form.zip,
              beds: form.beds,
              baths: form.baths,
              sqft: form.sqft,
              property_type: form.property_type,
              status: form.status,
              description: form.description,
              image_key: form.image_key,
              agent_name: form.agent_name,
              agent_title: form.agent_title,
              featured: form.featured,
            },
          },
        });
        toast.success("Property updated successfully");
      } else {
        await createProperty({
          data: {
            title: form.title,
            price: form.price,
            address: form.address,
            city: form.city,
            state: form.state,
            zip: form.zip,
            beds: form.beds,
            baths: form.baths,
            sqft: form.sqft,
            property_type: form.property_type,
            status: form.status,
            description: form.description,
            image_key: form.image_key,
            agent_name: form.agent_name,
            agent_title: form.agent_title,
            featured: form.featured,
          },
        });
        toast.success("Listing created successfully");
      }
      setModalOpen(false);
      loadData();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Could not save property");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleFeatured(property: Property) {
    try {
      await updateProperty({
        data: {
          id: property.id,
          data: { featured: !property.featured },
        },
      });
      setProperties((prev) =>
        prev.map((p) => (p.id === property.id ? { ...p, featured: !p.featured } : p)),
      );
      toast.success(property.featured ? "Unmarked from featured" : "Marked as featured");
    } catch {
      toast.error("Failed to toggle featured status");
    }
  }

  async function handleDeleteProperty(id: string) {
    if (!confirm("Are you sure you want to permanently delete this listing?")) return;
    try {
      await deleteProperty({ data: { id } });
      setProperties((prev) => prev.filter((p) => p.id !== id));
      toast.success("Property deleted");
    } catch {
      toast.error("Failed to delete property");
    }
  }

  async function handleStatusChange(id: string, status: "pending" | "contacted" | "archived") {
    try {
      await updateInquiryStatus({ data: { id, status } });
      setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, status } : inq)));
      toast.success(`Inquiry status updated to ${status}`);
    } catch {
      toast.error("Could not update inquiry status");
    }
  }

  async function handleDeleteInquiry(id: string) {
    if (!confirm("Are you sure you want to delete this tour inquiry?")) return;
    try {
      await deleteInquiry({ data: { id } });
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      toast.success("Inquiry removed");
    } catch {
      toast.error("Failed to delete inquiry");
    }
  }

  function handleOpenCreatePayment() {
    setEditingPaymentId(null);
    setPaymentForm(initialPaymentForm);
    setPaymentModalOpen(true);
  }

  function handleOpenEditPayment(method: PaymentMethod) {
    setEditingPaymentId(method.id);
    setPaymentForm({
      name: method.name,
      account_name: method.account_name,
      account_number: method.account_number,
      instructions: method.instructions,
      qr_code_url: method.qr_code_url || "",
      is_active: method.is_active,
      display_order: method.display_order,
    });
    setPaymentModalOpen(true);
  }

  async function handleSavePaymentMethod(e: React.FormEvent) {
    e.preventDefault();
    setSavingPayment(true);
    try {
      if (editingPaymentId) {
        await updatePaymentMethod({
          id: editingPaymentId,
          data: paymentForm,
        });
        toast.success("Payment method updated successfully");
      } else {
        await createPaymentMethod(paymentForm);
        toast.success("Payment method added");
      }
      setPaymentModalOpen(false);
      loadData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save payment method";
      toast.error(msg);
    } finally {
      setSavingPayment(false);
    }
  }

  async function handleTogglePaymentActive(method: PaymentMethod) {
    try {
      await updatePaymentMethod({
        id: method.id,
        data: { is_active: !method.is_active },
      });
      setPaymentMethods((prev) =>
        prev.map((m) => (m.id === method.id ? { ...m, is_active: !m.is_active } : m)),
      );
      toast.success(method.is_active ? "Payment method paused" : "Payment method activated");
    } catch {
      toast.error("Failed to toggle payment method");
    }
  }

  async function handleDeletePaymentMethod(id: string) {
    if (!confirm("Are you sure you want to delete this payment method?")) return;
    try {
      await deletePaymentMethod({ id });
      setPaymentMethods((prev) => prev.filter((m) => m.id !== id));
      toast.success("Payment method deleted");
    } catch {
      toast.error("Failed to delete payment method");
    }
  }

  const totalListings = properties.length;
  const avgPrice = totalListings
    ? Math.round(properties.reduce((acc, p) => acc + p.price, 0) / totalListings)
    : 0;
  const pendingInquiries = inquiries.filter((i) => i.status === "pending").length;
  const featuredCount = properties.filter((p) => p.featured).length;

  const filteredProperties = properties.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.address.toLowerCase().includes(q)
    );
  });

  // 1. Loading state
  if (authLoading) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden font-body text-ink">
        <GlassBackdrop />
        <SiteHeader />
        <div className="relative z-20 mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <RefreshCw className="size-8 animate-spin text-brand" />
            <p className="text-sm font-semibold text-ink/70">Checking administrator authorization...</p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Not logged in state
  if (!user) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden font-body text-ink">
        <GlassBackdrop />
        <SiteHeader />
        <main className="relative z-20 mx-auto max-w-lg px-6 py-20 text-center">
          <div className="rounded-3xl border border-white/60 bg-white/60 p-8 shadow-2xl shadow-sky-900/10 backdrop-blur-2xl">
            <div className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-amber-500/15 text-amber-600">
              <Lock className="size-7" />
            </div>
            <h1 className="font-display text-2xl font-bold">Admin Sign In Required</h1>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              The AetherHomes management portal is restricted to authorized administrators. Please sign in with your admin credentials to continue.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/auth"
                className="gradient-brand inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 hover:opacity-95"
              >
                Sign In / Register
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-2xl border border-white/80 bg-white/70 px-5 py-3 text-sm font-semibold text-ink hover:bg-white"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // 3. Logged in but not an admin
  if (!isAdmin) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden font-body text-ink">
        <GlassBackdrop />
        <SiteHeader />
        <main className="relative z-20 mx-auto max-w-lg px-6 py-20 text-center">
          <div className="rounded-3xl border border-rose-500/20 bg-white/70 p-8 shadow-2xl shadow-rose-900/5 backdrop-blur-2xl">
            <div className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-rose-500/15 text-rose-600">
              <ShieldAlert className="size-7" />
            </div>
            <h1 className="font-display text-2xl font-bold">Admin Access Denied</h1>
            <p className="mt-2 text-sm text-ink/70">
              Signed in as <span className="font-semibold text-ink">{user.email}</span>
            </p>
            <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-50/70 p-4 text-left text-xs leading-relaxed text-amber-900">
              <p className="font-semibold mb-1">How to enable admin for this account:</p>
              <p>
                In Supabase Dashboard &rarr; <strong>Authentication &rarr; Users</strong>, click the three dots next to this email &rarr; <strong>Edit User</strong>, and add:
              </p>
              <code className="mt-2 block rounded-lg bg-white/90 p-2 font-mono text-[11px] text-ink">
                &#123; "role": "admin" &#125;
              </code>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push("/auth");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-ink/10 bg-white px-5 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50"
              >
                <LogOut className="size-4" /> Switch Account
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-2xl bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink/90"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-body text-ink">
      <GlassBackdrop />
      <SiteHeader />

      <main className="relative z-20 mx-auto max-w-7xl px-8 pb-24 pt-4">
        {/* Header bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-brand uppercase backdrop-blur-xl">
                <Building className="size-3.5" /> Management Console
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 backdrop-blur-xl">
                <ShieldCheck className="size-3.5" /> Admin: {user.email}
              </span>
            </div>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Admin Portal
            </h1>
            <p className="mt-1 text-sm text-ink/60">
              Manage live MLS properties, agent assignments, and client tour requests
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => loadData()}
              className="flex items-center gap-2 rounded-2xl bg-white/70 px-4 py-2.5 text-sm font-semibold text-ink border border-white/80 hover:bg-white transition-colors"
              title="Refresh data"
            >
              <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>
            <button
              onClick={handleOpenCreate}
              className="flex items-center gap-2 gradient-brand rounded-2xl px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-sky-500/25 hover:opacity-95 transition-opacity"
            >
              <Plus className="size-4" /> Add New Listing
            </button>
          </div>
        </div>

        {/* Overview KPI Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-white/60 bg-white/55 p-6 shadow-xl shadow-sky-900/5 backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-ink/50 uppercase tracking-wider">
                Total Listings
              </p>
              <div className="grid size-9 place-items-center rounded-xl bg-sky-500/15 text-brand">
                <Building className="size-4" />
              </div>
            </div>
            <p className="mt-3 font-display text-3xl font-bold">{totalListings}</p>
            <p className="mt-1 text-xs text-ink/50">Active on site</p>
          </div>

          <div className="rounded-3xl border border-white/60 bg-white/55 p-6 shadow-xl shadow-sky-900/5 backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-ink/50 uppercase tracking-wider">
                Average Price
              </p>
              <div className="grid size-9 place-items-center rounded-xl bg-emerald-500/15 text-emerald-600">
                <DollarSign className="size-4" />
              </div>
            </div>
            <p className="mt-3 font-display text-3xl font-bold">{formatPrice(avgPrice)}</p>
            <p className="mt-1 text-xs text-ink/50">Across all active homes</p>
          </div>

          <div className="rounded-3xl border border-white/60 bg-white/55 p-6 shadow-xl shadow-sky-900/5 backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-ink/50 uppercase tracking-wider">
                Pending Leads
              </p>
              <div className="grid size-9 place-items-center rounded-xl bg-amber-500/15 text-amber-600">
                <Clock className="size-4" />
              </div>
            </div>
            <p className="mt-3 font-display text-3xl font-bold">{pendingInquiries}</p>
            <p className="mt-1 text-xs text-ink/50">Awaiting agent response</p>
          </div>

          <div className="rounded-3xl border border-white/60 bg-white/55 p-6 shadow-xl shadow-sky-900/5 backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-ink/50 uppercase tracking-wider">Featured</p>
              <div className="grid size-9 place-items-center rounded-xl bg-purple-500/15 text-purple-600">
                <Star className="size-4" />
              </div>
            </div>
            <p className="mt-3 font-display text-3xl font-bold">{featuredCount}</p>
            <p className="mt-1 text-xs text-ink/50">Homepage showcase</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-10 flex border-b border-ink/10">
          <button
            onClick={() => setActiveTab("listings")}
            className={`flex items-center gap-2 border-b-2 px-6 py-3 text-sm font-semibold transition-colors ${
              activeTab === "listings"
                ? "border-brand text-brand"
                : "border-transparent text-ink/60 hover:text-ink"
            }`}
          >
            <Building className="size-4" /> Property Listings ({properties.length})
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`flex items-center gap-2 border-b-2 px-6 py-3 text-sm font-semibold transition-colors ${
              activeTab === "inquiries"
                ? "border-brand text-brand"
                : "border-transparent text-ink/60 hover:text-ink"
            }`}
          >
            <Mail className="size-4" /> Tour Inquiries ({inquiries.length})
            {pendingInquiries > 0 && (
              <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white">
                {pendingInquiries}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`flex items-center gap-2 border-b-2 px-6 py-3 text-sm font-semibold transition-colors ${
              activeTab === "payments"
                ? "border-brand text-brand"
                : "border-transparent text-ink/60 hover:text-ink"
            }`}
          >
            <CreditCard className="size-4" /> Payment Methods ({paymentMethods.length})
          </button>
        </div>

        {/* TAB 1: LISTINGS */}
        {activeTab === "listings" && (
          <div className="mt-6">
            {/* Search and filter bar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex w-full max-w-md items-center gap-2 rounded-2xl border border-white/80 bg-white/70 px-4 py-2.5 shadow-sm sm:w-auto">
                <Search className="size-4 text-ink/40" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter listings by title, city, or address..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40"
                />
              </div>
              <p className="text-xs text-ink/50">
                Showing {filteredProperties.length} of {properties.length} listings
              </p>
            </div>

            {/* Properties table */}
            <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/55 shadow-xl shadow-sky-900/5 backdrop-blur-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-ink/10 bg-white/50 text-xs font-semibold text-ink/50 uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Property</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Specs</th>
                      <th className="px-6 py-4">Type & Status</th>
                      <th className="px-6 py-4">Agent</th>
                      <th className="px-6 py-4 text-center">Featured</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/5">
                    {filteredProperties.map((p) => (
                      <tr key={p.id} className="hover:bg-white/40 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={imageFor(p.image_key)}
                              alt={p.title}
                              className="size-12 rounded-xl object-cover border border-white/80 shadow-sm"
                            />
                            <div>
                              <p className="font-semibold text-ink">{p.title}</p>
                              <p className="text-xs text-ink/50">
                                {p.address}, {p.city}, {p.state} {p.zip}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-display font-bold text-ink">
                          {formatPrice(p.price)}
                        </td>
                        <td className="px-6 py-4 text-xs text-ink/70">
                          {p.beds} bd · {p.baths} ba · {p.sqft.toLocaleString()} sqft
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex rounded-full bg-white/80 px-2.5 py-1 text-xs font-semibold text-ink border border-white">
                            {p.property_type}
                          </span>
                          <span className="ml-1.5 inline-flex rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">
                            {p.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs">
                          <p className="font-medium text-ink">{p.agent_name}</p>
                          <p className="text-ink/40">{p.agent_title}</p>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleToggleFeatured(p)}
                            title={p.featured ? "Remove featured" : "Set as featured"}
                            className={`rounded-xl p-1.5 transition-colors ${
                              p.featured
                                ? "bg-amber-500/15 text-amber-500"
                                : "text-ink/25 hover:text-amber-500 hover:bg-amber-500/10"
                            }`}
                          >
                            <Star className={`size-4 ${p.featured ? "fill-amber-500" : ""}`} />
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              href={`/property/${p.id}`}
                              target="_blank"
                              className="rounded-xl p-2 text-ink/60 hover:bg-white hover:text-ink transition-colors"
                              title="View on site"
                            >
                              <ExternalLink className="size-4" />
                            </Link>
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="rounded-xl p-2 text-brand hover:bg-sky-50 transition-colors"
                              title="Edit listing"
                            >
                              <Edit className="size-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProperty(p.id)}
                              className="rounded-xl p-2 text-rose-500 hover:bg-rose-50 transition-colors"
                              title="Delete listing"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredProperties.length === 0 && !loading && (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center text-sm text-ink/50">
                          No properties match your filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INQUIRIES */}
        {activeTab === "inquiries" && (
          <div className="mt-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex gap-2">
                {["all", "pending", "contacted", "archived"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setInquiryStatusFilter(st)}
                    className={`rounded-2xl px-4 py-2 text-xs font-semibold capitalize transition-all ${
                      inquiryStatusFilter === st
                        ? "bg-ink text-white shadow-md shadow-ink/10"
                        : "bg-white/70 text-ink/60 hover:bg-white border border-white/80"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
              <p className="text-xs text-ink/50">{inquiries.length} inquiries found</p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/55 shadow-xl shadow-sky-900/5 backdrop-blur-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-ink/10 bg-white/50 text-xs font-semibold text-ink/50 uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Client</th>
                      <th className="px-6 py-4">Property Inquired</th>
                      <th className="px-6 py-4">Preferred Date</th>
                      <th className="px-6 py-4">Message</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/5">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-white/40 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-ink">{inq.name}</p>
                          <p className="text-xs text-brand">{inq.email}</p>
                          {inq.phone && <p className="text-xs text-ink/45">{inq.phone}</p>}
                        </td>
                        <td className="px-6 py-4">
                          {inq.properties ? (
                            <div>
                              <p className="font-medium text-ink">{inq.properties.title}</p>
                              <p className="text-xs text-ink/50">
                                {inq.properties.city} · {formatPrice(inq.properties.price)}
                              </p>
                            </div>
                          ) : (
                            <span className="text-xs text-ink/40">General inquiry</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-xs text-ink/70">
                          {inq.preferred_date ? (
                            <span className="flex items-center gap-1">
                              <Calendar className="size-3 text-brand" /> {inq.preferred_date}
                            </span>
                          ) : (
                            <span className="text-ink/40">Not specified</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-xs text-ink/70 max-w-xs truncate">
                          {inq.message || "—"}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                              inq.status === "pending"
                                ? "bg-amber-500/15 text-amber-700"
                                : inq.status === "contacted"
                                  ? "bg-emerald-500/15 text-emerald-700"
                                  : "bg-ink/10 text-ink/60"
                            }`}
                          >
                            {inq.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {inq.status !== "contacted" && (
                              <button
                                onClick={() => handleStatusChange(inq.id, "contacted")}
                                className="rounded-xl border border-emerald-500/20 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                                title="Mark contacted"
                              >
                                Contacted
                              </button>
                            )}
                            {inq.status !== "archived" && (
                              <button
                                onClick={() => handleStatusChange(inq.id, "archived")}
                                className="rounded-xl border border-ink/10 bg-white/70 px-2.5 py-1 text-xs font-semibold text-ink/60 hover:bg-white"
                                title="Archive inquiry"
                              >
                                Archive
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="rounded-xl p-1.5 text-rose-500 hover:bg-rose-50 transition-colors"
                              title="Delete inquiry"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {inquiries.length === 0 && !loading && (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-sm text-ink/50">
                          No tour inquiries recorded.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PAYMENT METHODS */}
        {activeTab === "payments" && (
          <div className="mt-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-bold text-ink">
                  Payment Channels & Escrow Methods
                </h3>
                <p className="text-xs text-ink/50 mt-0.5">
                  Configure the payment options, accounts, and QR codes shown to clients on the Tour Reservation Payment page.
                </p>
              </div>
              <button
                onClick={handleOpenCreatePayment}
                className="flex items-center gap-2 gradient-brand rounded-2xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 hover:opacity-95 transition-opacity"
              >
                <Plus className="size-4" /> Add Payment Method
              </button>
            </div>

            {/* Payment Methods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods.map((pm) => (
                <div
                  key={pm.id}
                  className={`rounded-3xl border p-6 backdrop-blur-2xl transition-all ${
                    pm.is_active
                      ? "border-white/80 bg-white/70 shadow-xl shadow-sky-900/5"
                      : "border-ink/10 bg-white/40 opacity-75"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="grid size-11 place-items-center rounded-2xl bg-sky-500/10 text-brand font-bold text-sm">
                        {pm.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-bold text-base text-ink">{pm.name}</h4>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              pm.is_active
                                ? "bg-emerald-500/15 text-emerald-700"
                                : "bg-ink/10 text-ink/50"
                            }`}
                          >
                            {pm.is_active ? "Active" : "Paused"}
                          </span>
                        </div>
                        {pm.account_name && (
                          <p className="text-xs text-ink/60 mt-0.5">
                            Account: <strong>{pm.account_name}</strong>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleTogglePaymentActive(pm)}
                        className={`rounded-xl px-2.5 py-1 text-xs font-semibold transition-colors ${
                          pm.is_active
                            ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                            : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        }`}
                        title={pm.is_active ? "Pause this method" : "Activate this method"}
                      >
                        {pm.is_active ? "Pause" : "Enable"}
                      </button>
                      <button
                        onClick={() => handleOpenEditPayment(pm)}
                        className="rounded-xl p-1.5 text-brand hover:bg-sky-50 transition-colors"
                        title="Edit method"
                      >
                        <Edit className="size-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePaymentMethod(pm.id)}
                        className="rounded-xl p-1.5 text-rose-500 hover:bg-rose-50 transition-colors"
                        title="Delete method"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-white/80 p-3.5 border border-ink/5 text-xs space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-ink/40">
                      Account / Address
                    </p>
                    <p className="font-mono font-semibold text-ink break-all">
                      {pm.account_number}
                    </p>
                  </div>

                  {pm.instructions && (
                    <p className="mt-3 text-xs text-ink/60 line-clamp-2 leading-relaxed">
                      {pm.instructions}
                    </p>
                  )}

                  {pm.qr_code_url && (
                    <div className="mt-3 flex items-center gap-2 text-xs font-medium text-brand">
                      <QrCode className="size-3.5" /> Includes Scan-to-Pay QR Code
                    </div>
                  )}
                </div>
              ))}

              {paymentMethods.length === 0 && !loading && (
                <div className="col-span-2 rounded-3xl border border-white/60 bg-white/55 p-12 text-center text-sm text-ink/50">
                  No payment methods configured. Click &quot;Add Payment Method&quot; to configure your first option.
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* CREATE / EDIT PROPERTY MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/80 bg-white p-8 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-6 top-6 grid size-8 place-items-center rounded-full bg-ink/5 text-ink/60 hover:bg-ink/10"
            >
              <X className="size-4" />
            </button>

            <h2 className="font-display text-2xl font-bold">
              {editingId ? "Edit Property Listing" : "Create New Property Listing"}
            </h2>
            <p className="mt-1 text-xs text-ink/50">
              Fill in all the MLS listing details below to publish live to the site.
            </p>

            <form onSubmit={handleSaveProperty} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider mb-1">
                    Title *
                  </label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. The Halsey Loft"
                    className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider mb-1">
                    Price ($) *
                  </label>
                  <input
                    required
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider mb-1">
                  Address *
                </label>
                <input
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="e.g. 1204 NE Halsey St"
                  className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider mb-1">
                    City *
                  </label>
                  <input
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider mb-1">
                    State *
                  </label>
                  <input
                    required
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider mb-1">
                    ZIP
                  </label>
                  <input
                    value={form.zip}
                    onChange={(e) => setForm({ ...form, zip: e.target.value })}
                    className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider mb-1">
                    Beds
                  </label>
                  <input
                    type="number"
                    value={form.beds}
                    onChange={(e) => setForm({ ...form, beds: Number(e.target.value) })}
                    className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider mb-1">
                    Baths
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={form.baths}
                    onChange={(e) => setForm({ ...form, baths: Number(e.target.value) })}
                    className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider mb-1">
                    Square Feet
                  </label>
                  <input
                    type="number"
                    value={form.sqft}
                    onChange={(e) => setForm({ ...form, sqft: Number(e.target.value) })}
                    className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider mb-1">
                    Property Type
                  </label>
                  <select
                    value={form.property_type}
                    onChange={(e) => setForm({ ...form, property_type: e.target.value })}
                    className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
                  >
                    <option value="House">House</option>
                    <option value="Condo">Condo</option>
                    <option value="Duplex">Duplex</option>
                    <option value="Cottage">Cottage</option>
                    <option value="Townhouse">Townhouse</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider mb-1">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
                  >
                    <option value="For sale">For sale</option>
                    <option value="New">New</option>
                    <option value="Price drop">Price drop</option>
                    <option value="Open house">Open house</option>
                  </select>
                </div>
              </div>

              <ImageUploader
                value={form.image_key}
                onChange={(image_key) => setForm({ ...form, image_key })}
                disabled={saving}
              />

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="size-5 rounded-lg text-brand"
                />
                <label
                  htmlFor="featured-check"
                  className="text-sm font-semibold text-ink cursor-pointer"
                >
                  Feature on Homepage
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe architectural features, daylight, updates, and neighborhood feel..."
                  className="w-full resize-none rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-ink/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-2xl border border-ink/10 px-5 py-2.5 text-sm font-semibold text-ink/70 hover:bg-ink/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="gradient-brand rounded-2xl px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 hover:opacity-95 disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingId ? "Update Listing" : "Create Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE / EDIT PAYMENT METHOD MODAL */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-white/80 bg-white p-8 shadow-2xl">
            <button
              onClick={() => setPaymentModalOpen(false)}
              className="absolute right-6 top-6 grid size-8 place-items-center rounded-full bg-ink/5 text-ink/60 hover:bg-ink/10"
            >
              <X className="size-4" />
            </button>

            <h2 className="font-display text-2xl font-bold">
              {editingPaymentId ? "Edit Payment Method" : "Add Payment Method"}
            </h2>
            <p className="mt-1 text-xs text-ink/50">
              Provide the account details and instructions clients will see when completing a tour verification.
            </p>

            <form onSubmit={handleSavePaymentMethod} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider mb-1">
                  Method Name *
                </label>
                <input
                  required
                  value={paymentForm.name}
                  onChange={(e) => setPaymentForm({ ...paymentForm, name: e.target.value })}
                  placeholder="e.g. Zelle, Bank Wire / ACH, Cash App, Bitcoin"
                  className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider mb-1">
                  Account Name / Beneficiary
                </label>
                <input
                  value={paymentForm.account_name}
                  onChange={(e) => setPaymentForm({ ...paymentForm, account_name: e.target.value })}
                  placeholder="e.g. AetherHomes Realty Escrow LLC"
                  className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider mb-1">
                  Account Number / ID / Address / Tag *
                </label>
                <input
                  required
                  value={paymentForm.account_number}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, account_number: e.target.value })
                  }
                  placeholder="e.g. payments@aetherhomes.com or Routing: 121000... Acct: 8839..."
                  className="w-full font-mono rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider mb-1">
                  Instructions for Client
                </label>
                <textarea
                  rows={2}
                  value={paymentForm.instructions}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, instructions: e.target.value })
                  }
                  placeholder="e.g. Please put your Tour Reference ID in the memo or transfer note..."
                  className="w-full resize-none rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
                />
              </div>

              {/* QR Code Upload using Cloudinary ImageUploader */}
              <div>
                <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider mb-1">
                  Scan-to-Pay QR Code (Optional)
                </label>
                <ImageUploader
                  value={paymentForm.qr_code_url}
                  onChange={(url) => setPaymentForm({ ...paymentForm, qr_code_url: url })}
                  disabled={savingPayment}
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="active-payment-check"
                  checked={paymentForm.is_active}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, is_active: e.target.checked })
                  }
                  className="size-5 rounded-lg text-brand"
                />
                <label
                  htmlFor="active-payment-check"
                  className="text-sm font-semibold text-ink cursor-pointer"
                >
                  Active & visible to clients on payment page
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-ink/10">
                <button
                  type="button"
                  onClick={() => setPaymentModalOpen(false)}
                  className="rounded-2xl border border-ink/10 px-5 py-2.5 text-sm font-semibold text-ink/70 hover:bg-ink/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingPayment}
                  className="gradient-brand rounded-2xl px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 hover:opacity-95 disabled:opacity-50"
                >
                  {savingPayment
                    ? "Saving..."
                    : editingPaymentId
                      ? "Update Method"
                      : "Add Method"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
