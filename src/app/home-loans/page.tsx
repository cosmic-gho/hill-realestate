"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LoanComparison } from "@/components/loan-comparison";
import { PreApprovalWizard } from "@/components/pre-approval-wizard";
import Link from "next/link";
import {
    Sparkles,
    ShieldCheck,
    Award,
    CheckCircle2,
    TrendingDown,
    Calculator,
    Percent,
    Clock,
    Users,
    Star,
    ChevronDown,
    ArrowRight,
    FileText,
    BadgeCheck,
    Building,
} from "lucide-react";

export default function HomeLoansPage() {
    const [wizardOpen, setWizardOpen] = useState(false);

    return (
        <div className="min-h-screen w-full bg-gray-50/60 font-body text-ink">
            <SiteHeader />

            {/* Pre-Approval Modal */}
            <PreApprovalWizard isOpen={wizardOpen} onClose={() => setWizardOpen(false)} />

            {/* Hero Header Section */}
            <section className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-blue-950 pt-28 pb-20 text-white">
                <div className="mx-auto max-w-[1280px] px-4 lg:px-6">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-blue-300 backdrop-blur-md">
                            <Sparkles className="size-3.5 text-blue-400" />
                            Zillow Home Loans™ — Official Financing Partner
                        </div>
                        <h1
                            className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
                            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                            Financing your home starts here.
                        </h1>
                        <p className="mt-4 text-lg text-gray-300 max-w-2xl leading-relaxed">
                            Competitive rates, digital pre-approval in under 3 minutes, and dedicated loan officers to guide you from offer to closing.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <button
                                type="button"
                                onClick={() => setWizardOpen(true)}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006AFF] px-7 py-3.5 text-sm font-bold text-white shadow-xl hover:bg-[#0052cc] transition-colors"
                            >
                                Get Pre-Approved <ArrowRight className="size-4" />
                            </button>
                            <a
                                href="#loan-comparison"
                                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-7 py-3.5 text-sm font-bold text-white hover:bg-white/20 transition-colors"
                            >
                                Compare Loan Rates
                            </a>
                        </div>
                    </div>

                    {/* Live Mortgage Rates Ticker */}
                    <div className="mt-12 border-t border-white/10 pt-8">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                Today&apos;s Estimated Mortgage Rates
                            </p>
                            <span className="text-[11px] text-gray-400">Updated today • NMLS #10287</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {[
                                { name: "30-Yr Fixed", rate: "6.50%", apr: "6.62% APR", badge: "Popular" },
                                { name: "15-Yr Fixed", rate: "5.75%", apr: "5.88% APR", badge: "Low Rate" },
                                { name: "FHA 30-Yr", rate: "6.12%", apr: "6.95% APR", badge: "3.5% Down" },
                                { name: "VA 30-Yr", rate: "5.88%", apr: "6.15% APR", badge: "$0 Down" },
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md hover:bg-white/10 transition-all cursor-pointer"
                                    onClick={() => setWizardOpen(true)}
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs font-semibold text-gray-300">{item.name}</p>
                                        <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-300">
                                            {item.badge}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-2xl font-bold text-white">{item.rate}</p>
                                    <p className="text-[11px] text-gray-400 mt-0.5">{item.apr}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Hub */}
            <main className="mx-auto max-w-[1280px] px-4 py-12 lg:px-6 space-y-16">
                {/* Interactive Loan Comparison Component */}
                <section id="loan-comparison">
                    <LoanComparison onOpenWizard={() => setWizardOpen(true)} />
                </section>

                {/* 4-Step Loan Process Timeline */}
                <section className="rounded-3xl border border-gray-200 bg-white p-6 lg:p-8 zillow-shadow-lg space-y-8">
                    <div className="text-center max-w-2xl mx-auto">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#006AFF]">
                            <Clock className="size-3.5" /> How Zillow Home Loans Works
                        </span>
                        <h2 className="mt-1 text-2xl font-bold text-gray-900 lg:text-3xl">
                            Simple 4-step path to your mortgage
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            From instant digital pre-approval to locking your rate and closing on schedule.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                step: "01",
                                title: "Apply Online",
                                desc: "Complete our 3-minute digital application without impacting your credit score.",
                                icon: FileText,
                            },
                            {
                                step: "02",
                                title: "Get Pre-Approved",
                                desc: "Receive an official pre-approval letter to attach to purchase offers.",
                                icon: BadgeCheck,
                            },
                            {
                                step: "03",
                                title: "Lock Your Rate",
                                desc: "Protect yourself against market rate increases while you shop for homes.",
                                icon: ShieldCheck,
                            },
                            {
                                step: "04",
                                title: "Close On Time",
                                desc: "Work with your dedicated loan officer for a smooth on-time closing.",
                                icon: Building,
                            },
                        ].map((s) => {
                            const Icon = s.icon;
                            return (
                                <div key={s.step} className="rounded-2xl bg-gray-50 p-6 border border-gray-100 relative group hover:bg-blue-50/50 hover:border-blue-200 transition-all">
                                    <span className="font-mono text-3xl font-extrabold text-gray-300 group-hover:text-[#006AFF]">
                                        {s.step}
                                    </span>
                                    <div className="mt-3 grid size-10 place-items-center rounded-xl bg-white text-[#006AFF] zillow-shadow">
                                        <Icon className="size-5" />
                                    </div>
                                    <h3 className="mt-4 font-bold text-gray-900 text-base">{s.title}</h3>
                                    <p className="mt-1 text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Borrower Tools Grid */}
                <section className="space-y-6">
                    <div>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#006AFF]">
                            <Calculator className="size-3.5" /> Mortgage Calculators & Tools
                        </span>
                        <h2 className="mt-1 text-2xl font-bold text-gray-900 lg:text-3xl">
                            Tools to empower your financial decisions
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                title: "Refinance Calculator",
                                desc: "See how much you could save each month by refinancing at lower rates.",
                                linkText: "Calculate Refinance Savings",
                                href: "/plan#buyability-calc",
                            },
                            {
                                title: "Affordability Estimator",
                                desc: "Calculate your true home buying power using your income & debts.",
                                linkText: "Try BuyAbility™ Tool",
                                href: "/plan",
                            },
                            {
                                title: "Amortization Schedule",
                                desc: "View line-by-line principal vs. interest breakdown over 30 years.",
                                linkText: "View Schedule",
                                href: "/plan#buyability-calc",
                            },
                            {
                                title: "Down Payment Assistance",
                                desc: "Find state & local grants offering up to $15,000 for first-time buyers.",
                                linkText: "Check Assistance Eligibility",
                                href: "/plan",
                            },
                        ].map((tool, idx) => (
                            <div key={idx} className="rounded-2xl border border-gray-200 bg-white p-6 zillow-shadow flex flex-col justify-between hover:border-blue-300 transition-all">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-base">{tool.title}</h3>
                                    <p className="mt-2 text-xs text-gray-500 leading-relaxed">{tool.desc}</p>
                                </div>
                                <Link
                                    href={tool.href}
                                    className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-[#006AFF] hover:underline"
                                >
                                    {tool.linkText} <ArrowRight className="size-3.5" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Trust Badges & Customer Reviews */}
                <section className="rounded-3xl bg-gradient-to-r from-blue-900 via-gray-900 to-blue-950 p-8 lg:p-12 text-white zillow-shadow-xl">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
                        <div className="lg:col-span-6 space-y-4">
                            <div className="flex items-center gap-1 text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="size-5 fill-amber-400" />
                                ))}
                                <span className="ml-2 font-bold text-white text-sm">4.9 / 5.0 Rating</span>
                            </div>

                            <h2 className="text-3xl font-bold lg:text-4xl">
                                Trusted by thousands of home buyers nationwide
                            </h2>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Zillow Home Loans offers transparent pricing, zero hidden fees, and dedicated loan officers with an average rating of 4.9 stars.
                            </p>

                            <div className="pt-2 flex items-center gap-6">
                                <div>
                                    <p className="text-2xl font-bold text-white">12,000+</p>
                                    <p className="text-xs text-gray-400">Verified Reviews</p>
                                </div>
                                <div className="h-8 w-px bg-white/20" />
                                <div>
                                    <p className="text-2xl font-bold text-white">NMLS #10287</p>
                                    <p className="text-xs text-gray-400">Equal Housing Lender</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial Quote Card */}
                        <div className="lg:col-span-6 rounded-2xl bg-white/10 p-6 backdrop-blur-md border border-white/15 space-y-4">
                            <p className="text-sm italic text-gray-200 leading-relaxed">
                                &ldquo;Getting pre-approved with Zillow Home Loans was seamless. The interest rate was lower than traditional banks, and my loan officer locked our rate within an hour. Highly recommend!&rdquo;
                            </p>
                            <div className="flex items-center gap-3 pt-2">
                                <div className="grid size-10 place-items-center rounded-full bg-blue-500 font-bold text-white text-xs">
                                    DR
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">David & Rebecca Ross</p>
                                    <p className="text-xs text-gray-400">Purchased in Portland, OR</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mortgage FAQs */}
                <section className="rounded-3xl border border-gray-200 bg-white p-6 lg:p-8 zillow-shadow-lg space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">
                            Home loan questions answered
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Clear answers to help you navigate home financing.
                        </p>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {[
                            {
                                q: "How quickly can I get a pre-approval letter?",
                                a: "Our digital pre-approval tool issues verified pre-approval letters in under 3 minutes upon submitting basic income and credit details.",
                            },
                            {
                                q: "What credit score is required for Zillow Home Loans?",
                                a: "For Conventional loans, a credit score of 620+ is standard. FHA loans allow scores as low as 580 with a 3.5% down payment.",
                            },
                            {
                                q: "What is the difference between interest rate and APR?",
                                a: "The interest rate is the annual cost of borrowing the principal loan amount. The Annual Percentage Rate (APR) includes the interest rate plus lender fees, discount points, and broker costs.",
                            },
                            {
                                q: "Can I lock my mortgage rate while house hunting?",
                                a: "Yes! With our Rate Lock Assurance program, you can lock in current low interest rates for up to 90 days while you look for your dream home.",
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

                {/* Bottom CTA Banner */}
                <section className="rounded-3xl bg-gradient-to-r from-[#006AFF] to-blue-700 p-8 lg:p-12 text-white zillow-shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-3xl font-bold">
                            Ready to lock in your mortgage rate?
                        </h2>
                        <p className="mt-3 text-blue-100 text-base">
                            Get an instant digital pre-approval letter or speak with a licensed Zillow Home Loans specialist.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
                        <button
                            type="button"
                            onClick={() => setWizardOpen(true)}
                            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#006AFF] shadow-lg hover:bg-blue-50 transition-colors"
                        >
                            Get Pre-Approved Now
                        </button>
                        <Link
                            href="/plan"
                            className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-md px-7 py-3.5 text-sm font-bold text-white hover:bg-white/20 transition-colors"
                        >
                            Try BuyAbility™ Tool
                        </Link>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}
