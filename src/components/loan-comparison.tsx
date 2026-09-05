"use client";

import { useState } from "react";
import {
    DollarSign,
    Percent,
    Calculator,
    CheckCircle2,
    Sparkles,
    ArrowRight,
    TrendingDown,
    Info,
    ShieldCheck,
} from "lucide-react";
import { formatPrice } from "@/lib/property-images";

interface LoanType {
    id: string;
    name: string;
    badge: string;
    rate: number;
    apr: number;
    termYears: number;
    minDownPercent: number;
    description: string;
    highlights: string[];
}

const LOAN_TYPES: LoanType[] = [
    {
        id: "30fixed",
        name: "30-Year Fixed",
        badge: "Most Popular",
        rate: 6.50,
        apr: 6.62,
        termYears: 30,
        minDownPercent: 5,
        description: "Lowest monthly payment with a fixed interest rate that never changes over 30 years.",
        highlights: ["Predictable monthly payments", "Lower monthly cost", "Easiest to budget long-term"],
    },
    {
        id: "15fixed",
        name: "15-Year Fixed",
        badge: "Lowest Interest",
        rate: 5.75,
        apr: 5.88,
        termYears: 15,
        minDownPercent: 10,
        description: "Pay off your home in half the time and save tens of thousands in lifetime interest.",
        highlights: ["Build equity 2x faster", "Lower interest rate", "Save up to $180k+ in interest"],
    },
    {
        id: "fha",
        name: "FHA 30-Year",
        badge: "Flexible Credit",
        rate: 6.12,
        apr: 6.95,
        termYears: 30,
        minDownPercent: 3.5,
        description: "Government-backed loan ideal for first-time buyers with credit scores starting at 580.",
        highlights: ["Only 3.5% down payment", "Flexible credit qualification", "Competitive fixed rates"],
    },
    {
        id: "va",
        name: "VA 30-Year",
        badge: "$0 Down Payment",
        rate: 5.88,
        apr: 6.15,
        termYears: 30,
        minDownPercent: 0,
        description: "Exclusive zero-down mortgage for eligible military service members, veterans, and spouses.",
        highlights: ["0% down payment required", "No monthly mortgage insurance (PMI)", "Reduced closing costs"],
    },
    {
        id: "jumbo",
        name: "Jumbo Loan",
        badge: "Luxury & High Value",
        rate: 6.75,
        apr: 6.88,
        termYears: 30,
        minDownPercent: 15,
        description: "Financing for luxury properties exceeding conforming loan limits (over $766,550).",
        highlights: ["Higher loan limits up to $3M+", "Fixed or adjustable terms", "Customized terms for luxury homes"],
    },
];

export function LoanComparison({ onOpenWizard }: { onOpenWizard?: () => void }) {
    const [selectedLoanId, setSelectedLoanId] = useState("30fixed");
    const [homePrice, setHomePrice] = useState(550000);
    const [downPaymentPercent, setDownPaymentPercent] = useState(20);

    const selectedLoan = LOAN_TYPES.find((l) => l.id === selectedLoanId) || LOAN_TYPES[0];

    // Effective Down Payment
    const effectiveDownPercent = Math.max(selectedLoan.minDownPercent, downPaymentPercent);
    const downPaymentDollars = Math.round((homePrice * effectiveDownPercent) / 100);
    const loanAmount = Math.max(0, homePrice - downPaymentDollars);

    // Calculate Monthly P&I
    const monthlyRate = selectedLoan.rate / 100 / 12;
    const numberOfPayments = selectedLoan.termYears * 12;

    let monthlyPAndI = 0;
    if (monthlyRate > 0 && numberOfPayments > 0 && loanAmount > 0) {
        monthlyPAndI = Math.round(
            (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
        );
    }

    // Property Tax (~1.15%) + Homeowners Insurance (~$110/mo) + PMI (if down < 20% & not VA)
    const monthlyTax = Math.round((homePrice * 0.0115) / 12);
    const monthlyInsurance = 110;
    const needsPmi = effectiveDownPercent < 20 && selectedLoan.id !== "va";
    const monthlyPmi = needsPmi ? Math.round((loanAmount * 0.0055) / 12) : 0;

    const totalMonthlyPayment = monthlyPAndI + monthlyTax + monthlyInsurance + monthlyPmi;

    // Total Interest Paid over lifetime
    const totalLifetimePayment = monthlyPAndI * numberOfPayments;
    const totalLifetimeInterest = Math.max(0, totalLifetimePayment - loanAmount);

    // Baseline Comparison (vs 30Fixed if on 15Fixed)
    const baseline30Interest = Math.round(
        ((loanAmount * (0.065 / 12 * Math.pow(1 + 0.065 / 12, 360))) /
            (Math.pow(1 + 0.065 / 12, 360) - 1)) * 360 - loanAmount
    );
    const interestSavingsVs30 = Math.max(0, baseline30Interest - totalLifetimeInterest);

    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 lg:p-8 zillow-shadow-lg">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#006AFF]">
                        <Sparkles className="size-3.5" /> Compare Loan Options & Rates
                    </div>
                    <h2 className="mt-2 text-2xl font-bold text-gray-900 lg:text-3xl">
                        Find the right loan for your budget
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Compare monthly payments, interest rates, and down payment requirements.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onOpenWizard}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#006AFF] px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-[#0052cc] transition-colors"
                >
                    Get Customized Rate Quote <ArrowRight className="size-4" />
                </button>
            </div>

            {/* Loan Type Tabs */}
            <div className="mt-6 flex flex-wrap gap-2 border-b border-gray-100 pb-4">
                {LOAN_TYPES.map((loan) => (
                    <button
                        key={loan.id}
                        type="button"
                        onClick={() => {
                            setSelectedLoanId(loan.id);
                            if (downPaymentPercent < loan.minDownPercent) {
                                setDownPaymentPercent(loan.minDownPercent);
                            }
                        }}
                        className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all ${selectedLoanId === loan.id
                                ? "bg-[#006AFF] text-white shadow-md"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        <span>{loan.name}</span>
                        <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${selectedLoanId === loan.id
                                    ? "bg-white/20 text-white"
                                    : "bg-gray-200 text-gray-700"
                                }`}
                        >
                            {loan.rate.toFixed(2)}%
                        </span>
                    </button>
                ))}
            </div>

            {/* Main Interactive Calculator Area */}
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Left Inputs (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Target Home Price Slider */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                                Target Home Price
                            </label>
                            <span className="text-lg font-extrabold text-gray-900">
                                {formatPrice(homePrice)}
                            </span>
                        </div>
                        <input
                            type="range"
                            min={150000}
                            max={1500000}
                            step={10000}
                            value={homePrice}
                            onChange={(e) => setHomePrice(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#006AFF]"
                        />
                        <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                            <span>$150k</span>
                            <span>$750k</span>
                            <span>$1.5M+</span>
                        </div>
                    </div>

                    {/* Down Payment Slider */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                                Down Payment ({effectiveDownPercent}%)
                            </label>
                            <span className="text-base font-bold text-gray-900">
                                {formatPrice(downPaymentDollars)}
                            </span>
                        </div>
                        <input
                            type="range"
                            min={selectedLoan.minDownPercent}
                            max={50}
                            step={1}
                            value={effectiveDownPercent}
                            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#006AFF]"
                        />
                        <p className="text-[11px] text-gray-400 mt-1">
                            Min required for {selectedLoan.name}: <span className="font-bold text-gray-700">{selectedLoan.minDownPercent}%</span>
                        </p>
                    </div>

                    {/* Selected Loan Details & Highlights Card */}
                    <div className="rounded-2xl bg-blue-50/50 p-5 border border-blue-100 space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-gray-900 text-base">
                                {selectedLoan.name} Overview
                            </h3>
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-[#006AFF]">
                                {selectedLoan.badge}
                            </span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            {selectedLoan.description}
                        </p>
                        <div className="space-y-1.5 pt-1">
                            {selectedLoan.highlights.map((h, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs font-semibold text-gray-800">
                                    <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                                    <span>{h}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Scorecard Results (5 cols) */}
                <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950 p-6 text-white zillow-shadow-xl flex flex-col justify-between">
                    <div>
                        <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                    Est. Monthly Payment
                                </p>
                                <p className="text-4xl font-extrabold text-white mt-1">
                                    {formatPrice(totalMonthlyPayment)}
                                    <span className="text-sm font-normal text-gray-300">/mo</span>
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-400">Rate / APR</p>
                                <p className="text-lg font-bold text-blue-300">
                                    {selectedLoan.rate.toFixed(2)}% <span className="text-xs font-normal text-gray-300">({selectedLoan.apr}% APR)</span>
                                </p>
                            </div>
                        </div>

                        {/* Stacked Payment Breakdown */}
                        <div className="mt-5 space-y-3">
                            <div className="flex h-3 overflow-hidden rounded-full bg-white/10">
                                <div
                                    style={{ width: `${(monthlyPAndI / totalMonthlyPayment) * 100}%` }}
                                    className="bg-[#006AFF]"
                                    title="Principal & Interest"
                                />
                                <div
                                    style={{ width: `${(monthlyTax / totalMonthlyPayment) * 100}%` }}
                                    className="bg-cyan-400"
                                    title="Property Tax"
                                />
                                <div
                                    style={{ width: `${(monthlyInsurance / totalMonthlyPayment) * 100}%` }}
                                    className="bg-amber-400"
                                    title="Home Insurance"
                                />
                                {monthlyPmi > 0 && (
                                    <div
                                        style={{ width: `${(monthlyPmi / totalMonthlyPayment) * 100}%` }}
                                        className="bg-rose-400"
                                        title="PMI"
                                    />
                                )}
                            </div>

                            <div className="space-y-1.5 text-xs text-gray-300">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-1.5">
                                        <span className="size-2 rounded-full bg-[#006AFF]" /> Principal & Interest
                                    </span>
                                    <span className="font-bold text-white">{formatPrice(monthlyPAndI)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-1.5">
                                        <span className="size-2 rounded-full bg-cyan-400" /> Est. Property Taxes
                                    </span>
                                    <span className="font-bold text-white">{formatPrice(monthlyTax)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-1.5">
                                        <span className="size-2 rounded-full bg-amber-400" /> Home Insurance
                                    </span>
                                    <span className="font-bold text-white">{formatPrice(monthlyInsurance)}</span>
                                </div>
                                {monthlyPmi > 0 && (
                                    <div className="flex items-center justify-between text-rose-300">
                                        <span className="flex items-center gap-1.5">
                                            <span className="size-2 rounded-full bg-rose-400" /> PMI (Down &lt; 20%)
                                        </span>
                                        <span className="font-bold">{formatPrice(monthlyPmi)}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Interest & Savings summary */}
                        <div className="mt-6 border-t border-white/10 pt-4 space-y-2 text-xs">
                            <div className="flex justify-between text-gray-300">
                                <span>Total Loan Amount:</span>
                                <span className="font-bold text-white">{formatPrice(loanAmount)}</span>
                            </div>
                            <div className="flex justify-between text-gray-300">
                                <span>Total Lifetime Interest:</span>
                                <span className="font-bold text-white">{formatPrice(totalLifetimeInterest)}</span>
                            </div>

                            {selectedLoan.id === "15fixed" && interestSavingsVs30 > 0 && (
                                <div className="mt-3 rounded-xl bg-emerald-500/20 p-3 border border-emerald-400/30 flex items-center gap-2.5 text-emerald-300">
                                    <TrendingDown className="size-5 shrink-0 text-emerald-400" />
                                    <div>
                                        <p className="font-bold">Save {formatPrice(interestSavingsVs30)} in interest!</p>
                                        <p className="text-[11px] text-emerald-300/80">Compared to a 30-Year Fixed loan</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onOpenWizard}
                        className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-[#006AFF] py-3 text-xs font-bold text-white shadow-lg hover:bg-[#0052cc] transition-colors"
                    >
                        Apply for {selectedLoan.name} <ArrowRight className="size-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
