"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { GlassBackdrop } from "@/components/glass-backdrop";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ImageUploader } from "@/components/image-uploader";
import { getProperty, getInquiry, type Property, type TourInquiry } from "@/actions/properties";
import { listPaymentMethods, submitPaymentProof, type PaymentMethod } from "@/actions/payments";
import { formatPrice, imageFor } from "@/lib/property-images";
import {
  CreditCard,
  Building,
  CheckCircle2,
  Copy,
  Check,
  Calendar,
  Mail,
  ShieldCheck,
  ArrowLeft,
  QrCode,
  Sparkles,
  HelpCircle,
  FileCheck,
  Loader2,
} from "lucide-react";

function PaymentContent() {
  const searchParams = useSearchParams();
  const inquiryId = searchParams.get("inquiryId");
  const propertyId = searchParams.get("propertyId");

  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState<Property | null>(null);
  const [inquiry, setInquiry] = useState<TourInquiry | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethodId, setSelectedMethodId] = useState<string>("");

  // Copy state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Proof submission form state
  const [senderName, setSenderName] = useState("");
  const [transactionRef, setTransactionRef] = useState("");
  const [proofImageUrl, setProofImageUrl] = useState("");
  const [submittingProof, setSubmittingProof] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function init() {
      setLoading(true);
      try {
        const [methods, inqData, propData] = await Promise.all([
          listPaymentMethods(true),
          inquiryId ? getInquiry(inquiryId) : Promise.resolve(null),
          propertyId ? getProperty({ id: propertyId }) : Promise.resolve(null),
        ]);

        setPaymentMethods(methods);
        if (methods.length > 0) {
          setSelectedMethodId(methods[0].id);
        }

        if (inqData) {
          setInquiry(inqData as TourInquiry);
          if (inqData.name) setSenderName(inqData.name);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((inqData as any).properties && !propData) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setProperty((inqData as any).properties as Property);
          }
        }

        if (propData) {
          setProperty(propData);
        }
      } catch (err) {
        console.error("Failed to load payment data:", err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [inquiryId, propertyId]);

  function handleCopy(text: string, key: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedKey(null), 2000);
    }
  }

  async function handleSubmitProof(e: React.FormEvent) {
    e.preventDefault();
    if (!inquiryId && !propertyId) {
      toast.error("No active booking session found.");
      return;
    }

    const currentMethod = paymentMethods.find((m) => m.id === selectedMethodId);
    setSubmittingProof(true);

    try {
      const res = await submitPaymentProof({
        inquiryId: inquiryId || "manual-booking",
        methodName: currentMethod ? currentMethod.name : "Custom Transfer",
        transactionReference: transactionRef,
        proofImageUrl,
        senderName: senderName || inquiry?.name || "Client",
      });

      if (res.success) {
        setSubmitted(true);
        toast.success("Payment proof submitted successfully!");
      } else {
        toast.error(res.error || "Could not save payment proof");
      }
    } catch {
      toast.error("Failed to submit payment proof");
    } finally {
      setSubmittingProof(false);
    }
  }

  const selectedMethod =
    paymentMethods.find((m) => m.id === selectedMethodId) || paymentMethods[0];

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-body text-ink">
      <GlassBackdrop />
      <SiteHeader />

      <main className="relative z-20 mx-auto max-w-6xl px-6 pb-24 pt-4 sm:px-8">
        {/* Back link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href={property ? `/property/${property.id}` : "/search"}
            className="flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-ink transition-colors"
          >
            <ArrowLeft className="size-3.5" /> Back to {property ? property.title : "Listings"}
          </Link>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-brand">
            <ShieldCheck className="size-3.5" /> Secure Tour Deposit Verification
          </span>
        </div>

        {/* Page Title */}
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Tour Reservation Payment
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink/65">
            Your tour inquiry has been registered. Select a payment option below to finalize your slot reservation and dispatch an assigned broker.
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <Loader2 className="size-8 animate-spin text-brand" />
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
            {/* Left Column: Payment Methods & Proof Submission */}
            <div className="space-y-6">
              {submitted ? (
                /* Success Confirmation State */
                <div className="rounded-3xl border border-emerald-500/30 bg-white/80 p-8 shadow-2xl backdrop-blur-2xl text-center">
                  <div className="mx-auto mb-4 grid size-16 place-items-center rounded-2xl bg-emerald-500/15 text-emerald-600">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-ink">
                    Payment Verification Submitted!
                  </h2>
                  <p className="mt-2 text-sm text-ink/70 leading-relaxed max-w-md mx-auto">
                    Thank you! We have received your payment confirmation. Our concierge and tour dispatch team will verify the transaction and send your private tour access confirmation to{" "}
                    <strong>{inquiry?.email || "your email address"}</strong>.
                  </p>

                  <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                    <Link
                      href="/"
                      className="gradient-brand inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 hover:opacity-95"
                    >
                      Return to Homepage
                    </Link>
                    <Link
                      href="/search"
                      className="inline-flex items-center justify-center rounded-2xl border border-white/80 bg-white/70 px-5 py-3 text-sm font-semibold text-ink hover:bg-white"
                    >
                      Browse More Homes
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  {/* Payment Methods Selection Box */}
                  <div className="rounded-3xl border border-white/60 bg-white/65 p-6 shadow-xl shadow-sky-900/5 backdrop-blur-2xl">
                    <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                      <div>
                        <h2 className="font-display text-lg font-bold text-ink">
                          1. Select Payment Method
                        </h2>
                        <p className="text-xs text-ink/50">
                          Choose how you would like to complete your reservation
                        </p>
                      </div>
                      <CreditCard className="size-5 text-brand" />
                    </div>

                    {/* Method Selector Tabs */}
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {paymentMethods.map((method) => {
                        const isSelected = method.id === selectedMethodId;
                        return (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setSelectedMethodId(method.id)}
                            className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all ${
                              isSelected
                                ? "border-brand bg-sky-50/80 shadow-md shadow-sky-500/10 ring-2 ring-brand/30"
                                : "border-ink/10 bg-white/60 hover:bg-white hover:border-ink/20"
                            }`}
                          >
                            <div
                              className={`grid size-9 shrink-0 place-items-center rounded-xl font-bold text-xs ${
                                isSelected
                                  ? "bg-brand text-white shadow-sm"
                                  : "bg-ink/5 text-ink/70"
                              }`}
                            >
                              {method.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-ink truncate">
                                {method.name}
                              </p>
                              <p className="text-[11px] text-ink/50 truncate">
                                {method.account_name || "Official Account"}
                              </p>
                            </div>
                            {isSelected && (
                              <CheckCircle2 className="size-4 shrink-0 text-brand" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Selected Method Detail Card */}
                    {selectedMethod && (
                      <div className="mt-6 rounded-2xl border border-sky-500/20 bg-gradient-to-br from-sky-50/70 to-white/90 p-5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-brand">
                            Payment Details
                          </span>
                          <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                            Verified Escrow
                          </span>
                        </div>

                        <div className="mt-4 space-y-3">
                          {selectedMethod.account_name && (
                            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white/80 p-3 border border-sky-100">
                              <div>
                                <p className="text-[10px] uppercase font-bold text-ink/50">
                                  Account / Beneficiary Name
                                </p>
                                <p className="text-xs font-semibold text-ink">
                                  {selectedMethod.account_name}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopy(selectedMethod.account_name, "acct_name")
                                }
                                className="flex items-center gap-1 rounded-lg bg-sky-50 px-2 py-1 text-[11px] font-semibold text-brand hover:bg-sky-100 transition-colors"
                              >
                                {copiedKey === "acct_name" ? (
                                  <>
                                    <Check className="size-3 text-emerald-600" /> Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy className="size-3" /> Copy
                                  </>
                                )}
                              </button>
                            </div>
                          )}

                          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white/80 p-3 border border-sky-100">
                            <div className="min-w-0 flex-1">
                              <p className="text-[10px] uppercase font-bold text-ink/50">
                                Account Number / Address / Tag
                              </p>
                              <p className="font-mono text-xs font-bold text-ink break-all">
                                {selectedMethod.account_number}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                handleCopy(selectedMethod.account_number, "acct_num")
                              }
                              className="flex items-center gap-1 rounded-lg bg-sky-50 px-2 py-1 text-[11px] font-semibold text-brand hover:bg-sky-100 transition-colors shrink-0"
                            >
                              {copiedKey === "acct_num" ? (
                                <>
                                  <Check className="size-3 text-emerald-600" /> Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="size-3" /> Copy
                                </>
                              )}
                            </button>
                          </div>

                          {selectedMethod.instructions && (
                            <div className="rounded-xl bg-amber-500/10 p-3 border border-amber-500/20 text-xs text-amber-900">
                              <p className="font-semibold text-[11px] uppercase mb-0.5">
                                Instructions:
                              </p>
                              <p className="leading-relaxed">{selectedMethod.instructions}</p>
                            </div>
                          )}

                          {/* QR Code if provided */}
                          {selectedMethod.qr_code_url && (
                            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-sky-100 text-center">
                              <p className="text-xs font-semibold text-ink/70 mb-2 flex items-center gap-1.5">
                                <QrCode className="size-3.5 text-brand" /> Scan QR Code to Pay
                              </p>
                              <img
                                src={imageFor(selectedMethod.qr_code_url)}
                                alt="Payment QR Code"
                                className="size-44 rounded-xl object-contain border border-ink/10 shadow-sm"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Payment Proof / Confirmation Form */}
                  <div className="rounded-3xl border border-white/60 bg-white/65 p-6 shadow-xl shadow-sky-900/5 backdrop-blur-2xl">
                    <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                      <div>
                        <h2 className="font-display text-lg font-bold text-ink">
                          2. Confirm Your Payment
                        </h2>
                        <p className="text-xs text-ink/50">
                          Provide your transaction reference or receipt to speed up verification
                        </p>
                      </div>
                      <FileCheck className="size-5 text-emerald-600" />
                    </div>

                    <form onSubmit={handleSubmitProof} className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider mb-1">
                            Payer / Sender Name *
                          </label>
                          <input
                            required
                            value={senderName}
                            onChange={(e) => setSenderName(e.target.value)}
                            placeholder="Full name on bank or transfer"
                            className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider mb-1">
                            Transaction Reference / Memo
                          </label>
                          <input
                            value={transactionRef}
                            onChange={(e) => setTransactionRef(e.target.value)}
                            placeholder="e.g. TXN-89218 or Wire Ref"
                            className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
                          />
                        </div>
                      </div>

                      {/* Payment Proof Image Upload */}
                      <ImageUploader
                        value={proofImageUrl}
                        onChange={(url) => setProofImageUrl(url)}
                        disabled={submittingProof}
                      />

                      <button
                        type="submit"
                        disabled={submittingProof}
                        className="w-full gradient-brand rounded-2xl py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {submittingProof ? (
                          <>
                            <Loader2 className="size-4 animate-spin" /> Verifying Submission...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="size-4" /> I Have Completed Payment
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>

            {/* Right Column: Tour Booking Summary Card */}
            <div className="space-y-4">
              <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-xl shadow-sky-900/5 backdrop-blur-2xl">
                <div className="flex items-center justify-between border-b border-ink/10 pb-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-ink/50">
                    Tour Reservation
                  </p>
                  <span className="inline-flex rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                    Pending Verification
                  </span>
                </div>

                {property && (
                  <div className="mt-4">
                    <img
                      src={imageFor(property.image_key)}
                      alt={property.title}
                      className="aspect-[16/10] w-full rounded-2xl object-cover border border-white/80 shadow-md"
                    />
                    <h3 className="mt-3 font-display text-lg font-bold text-ink">
                      {property.title}
                    </h3>
                    <p className="text-xs text-ink/60">
                      {property.address}, {property.city}, {property.state}
                    </p>
                    <p className="mt-2 font-display text-xl font-bold text-ink">
                      {formatPrice(property.price)}
                    </p>
                  </div>
                )}

                <div className="mt-4 space-y-2 border-t border-ink/10 pt-4 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-ink/60 flex items-center gap-1">
                      <Calendar className="size-3.5 text-brand" /> Tour Date:
                    </span>
                    <span className="font-semibold text-ink">
                      {inquiry?.preferred_date || "To be arranged"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-ink/60 flex items-center gap-1">
                      <Mail className="size-3.5 text-brand" /> Confirmation Email:
                    </span>
                    <span className="font-semibold text-ink truncate max-w-[150px]">
                      {inquiry?.email || "Sent to your inbox"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-ink/60 flex items-center gap-1">
                      <Building className="size-3.5 text-brand" /> Broker Rep:
                    </span>
                    <span className="font-semibold text-ink">
                      {property?.agent_name || "Mara Ellison"}
                    </span>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-sky-500/10 p-3.5 text-[11px] text-sky-900 border border-sky-500/20">
                  <div className="flex items-start gap-2">
                    <Sparkles className="size-4 shrink-0 text-brand mt-0.5" />
                    <div>
                      <p className="font-bold">Reservation Guarantee</p>
                      <p className="mt-0.5 text-sky-900/80 leading-relaxed">
                        Verification deposits are 100% credited toward your purchase or fully refundable if you decide not to proceed after your tour.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support info box */}
              <div className="rounded-2xl border border-white/60 bg-white/50 p-4 text-xs text-ink/60 flex items-center gap-3">
                <HelpCircle className="size-5 shrink-0 text-brand" />
                <div>
                  <p className="font-semibold text-ink">Need assistance?</p>
                  <p className="text-[11px]">
                    Contact our VIP concierge desk at <strong>support@hilltopcargo.com</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-body text-ink">
          <Loader2 className="size-8 animate-spin text-brand" />
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
