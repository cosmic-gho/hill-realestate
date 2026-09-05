import { listProperties } from "@/actions/properties";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PropertyCard } from "@/components/property-card";
import { BuyabilityCalculator } from "@/components/buyability-calculator";
import { BuyingPlanRoadmap } from "@/components/buying-plan-roadmap";
import Link from "next/link";
import {
    Sparkles,
    Search,
    CheckCircle2,
    HelpCircle,
    ShieldCheck,
    ChevronDown,
    ArrowRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PlanPage() {
    const allProperties = await listProperties();

    return (
        <div className="min-h-screen w-full bg-gray-50/60 font-body text-ink">
            <SiteHeader />

            {/* Hero Header */}
            <section className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-blue-950 pt-28 pb-20 text-white">
                <div className="mx-auto max-w-[1280px] px-4 lg:px-6">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-blue-300 backdrop-blur-md">
                            <Sparkles className="size-3.5 text-blue-400" />
                            Zillow Home Buying Plan & BuyAbility™
                        </div>
                        <h1
                            className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
                            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                            Plan your path to homeownership.
                        </h1>
                        <p className="mt-4 text-lg text-gray-300 max-w-2xl leading-relaxed">
                            Calculate your true home buying power with BuyAbility™, track your 5-step roadmap, and find homes tailored to your personalized budget.
                        </p>
                    </div>

                    {/* Quick Stats Banner */}
                    <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-4xl">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                                Current Mortgage Rate
                            </p>
                            <p className="mt-1 text-2xl font-bold text-white">6.50%</p>
                            <p className="text-[11px] text-emerald-400 mt-0.5">30-Yr Fixed Rate</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                                Median Home Price
                            </p>
                            <p className="mt-1 text-2xl font-bold text-white">$588,000</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">Portland Metro</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                                Recommended DTI
                            </p>
                            <p className="mt-1 text-2xl font-bold text-white">≤ 36%</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">Debt-to-Income</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                                Min Down Payment
                            </p>
                            <p className="mt-1 text-2xl font-bold text-white">3.5%</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">FHA / Conventional</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <main className="mx-auto max-w-[1280px] px-4 py-12 lg:px-6 space-y-16">
                {/* Step 1: Buyability Calculator */}
                <section id="buyability-calc">
                    <BuyabilityCalculator />
                </section>

                {/* Step 2: 5-Step Roadmap */}
                <section id="buying-roadmap">
                    <BuyingPlanRoadmap maxBudget={750000} />
                </section>

                {/* Live Matching Homes Section */}
                <section id="matching-homes" className="space-y-6 pt-4">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#006AFF]">
                                <Search className="size-3.5" /> Verified MLS Listings
                            </div>
                            <h2 className="mt-1 text-2xl font-bold text-gray-900 lg:text-3xl">
                                Homes within your estimated budget
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Explore real active homes in the metro matching your BuyAbility™ target.
                            </p>
                        </div>

                        <Link
                            href="/search"
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#006AFF] hover:underline"
                        >
                            Browse all listings <ArrowRight className="size-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {allProperties.slice(0, 6).map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                </section>

                {/* FAQ Accordion Section */}
                <section id="faq-section" className="rounded-3xl border border-gray-200 bg-white p-6 lg:p-8 zillow-shadow-lg space-y-6">
                    <div>
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#006AFF]">
                            <HelpCircle className="size-3.5" /> Frequently Asked Questions
                        </div>
                        <h2 className="mt-1 text-2xl font-bold text-gray-900 lg:text-3xl">
                            Home buying financial guides
                        </h2>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {[
                            {
                                q: "What is Zillow BuyAbility™ and how is it calculated?",
                                a: "BuyAbility™ estimates your home buying budget using live mortgage interest rates, your annual income, existing monthly debt obligations, and saved down payment. It provides a real-time range to help you shop with confidence.",
                            },
                            {
                                q: "How much down payment do I really need?",
                                a: "While a 20% down payment eliminates Private Mortgage Insurance (PMI), many buyers qualify with as little as 3% to 5% down for Conventional loans or 3.5% for FHA loans.",
                            },
                            {
                                q: "What is Debt-to-Income (DTI) ratio?",
                                a: "Your DTI is the percentage of your gross monthly income that goes toward paying monthly debts (credit cards, loans, car payments, plus estimated housing). Lenders prefer a total DTI of 36% or less.",
                            },
                            {
                                q: "What is the difference between Pre-Qualification and Pre-Approval?",
                                a: "Pre-qualification is an informal estimate based on self-reported finances. Pre-approval involves verified credit and asset documentation, giving sellers official proof that your financing is secured.",
                            },
                        ].map((faq, idx) => (
                            <details key={idx} className="group py-4 text-left font-medium">
                                <summary className="flex cursor-pointer items-center justify-between font-bold text-gray-900 text-base group-open:text-[#006AFF]">
                                    {faq.q}
                                    <ChevronDown className="size-5 transition-transform group-open:rotate-180 text-gray-400 group-open:text-[#006AFF]" />
                                </summary>
                                <p className="mt-3 text-sm text-gray-600 leading-relaxed pl-1">
                                    {faq.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </section>

                {/* Bottom Callout Banner */}
                <section className="rounded-3xl bg-gradient-to-r from-[#006AFF] to-blue-700 p-8 lg:p-12 text-white zillow-shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-3xl font-bold">
                            Ready to take the next step toward homeownership?
                        </h2>
                        <p className="mt-3 text-blue-100 text-base">
                            Get pre-approved with AetherHomes Mortgage or speak with a local expert agent today.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
                        <Link
                            href="/search"
                            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#006AFF] shadow-lg hover:bg-blue-50 transition-colors"
                        >
                            Shop Homes in Budget
                        </Link>
                        <Link
                            href="/auth"
                            className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-md px-7 py-3.5 text-sm font-bold text-white hover:bg-white/20 transition-colors"
                        >
                            Get Pre-Approved
                        </Link>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}
