"use client";

import { useState, useMemo } from "react";
import {
    DollarSign,
    Percent,
    TrendingUp,
    ShieldCheck,
    Info,
    HelpCircle,
    Sparkles,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";
import { formatPrice } from "@/lib/property-images";

interface BuyabilityCalculatorProps {
    onBudgetChange?: (maxBudget: number) => void;
}

export function BuyabilityCalculator({ onBudgetChange }: BuyabilityCalculatorProps) {
    // User Inputs
    const [annualIncome, setAnnualIncome] = useState(120000);
    const [monthlyDebt, setMonthlyDebt] = useState(600);
    const [downPayment, setDownPayment] = useState(60000);
    const [creditScoreBand, setCreditScoreBand] = useState<"740+" | "670-739" | "580-669">("740+");
    const [interestRate, setInterestRate] = useState(6.5);
    const [loanTermYears, setLoanTermYears] = useState(30);

    // Credit score interest rate adjustment & factor
    const creditFactor = creditScoreBand === "740+" ? 1.0 : creditScoreBand === "670-739" ? 0.92 : 0.82;

    // Real-time Financial Calculations
    const monthlyGrossIncome = Math.max(1, Math.round(annualIncome / 12));

    // Safe DTI limit: 36% to max 43% total debt
    const maxAllowableMonthlyTotalDebt = monthlyGrossIncome * 0.36;
    const maxMonthlyHousingPayment = Math.max(0, Math.round(maxAllowableMonthlyTotalDebt - monthlyDebt));

    // Estimate Tax + Insurance as % of payment (~22% of total housing payment)
    const estimatedPAndI = Math.max(0, Math.round(maxMonthlyHousingPayment * 0.78));
    const estimatedTax = Math.round(maxMonthlyHousingPayment * 0.15);
    const estimatedInsurance = Math.round(maxMonthlyHousingPayment * 0.07);

    // Calculate Loan Amount supported by estimatedPAndI
    const r = interestRate / 100 / 12;
    const n = loanTermYears * 12;

    let maxLoanAmount = 0;
    if (r > 0 && n > 0 && estimatedPAndI > 0) {
        maxLoanAmount = Math.round(
            (estimatedPAndI * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n))
        );
    }

    // Total Home Purchase Power (Loan + Down Payment) adjusted by Credit Score
    const rawMaxPrice = Math.round((maxLoanAmount + downPayment) * creditFactor);
    const maxHomePrice = Math.max(100000, Math.round(rawMaxPrice / 5000) * 5000);
    const minHomePrice = Math.max(80000, Math.round((maxHomePrice * 0.82) / 5000) * 5000);

    // Debt-to-Income (DTI) Ratio
    const currentDti = Math.round(((monthlyDebt + maxMonthlyHousingPayment) / monthlyGrossIncome) * 100);

    // Notify parent on load & updates
    useMemo(() => {
        if (onBudgetChange) {
            onBudgetChange(maxHomePrice);
        }
    }, [maxHomePrice, onBudgetChange]);

    // Qualification status
    const qualificationStatus = useMemo(() => {
        if (currentDti <= 36 && creditScoreBand !== "580-669") {
            return { label: "High Likelihood", color: "bg-emerald-500 text-white", border: "border-emerald-200" };
        } else if (currentDti <= 43) {
            return { label: "Moderate Likelihood", color: "bg-amber-500 text-white", border: "border-amber-200" };
        } else {
            return { label: "Needs Preparation", color: "bg-rose-500 text-white", border: "border-rose-200" };
        }
    }, [currentDti, creditScoreBand]);

    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 lg:p-8 zillow-shadow-lg">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#006AFF]">
                        <Sparkles className="size-3.5" />
                        BuyAbility™ Personal Budget Calculator
                    </div>
                    <h2 className="mt-2 text-2xl font-bold text-gray-900 lg:text-3xl">
                        Calculate your true buying power
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Real-time home loan estimate based on your income, debts, and savings.
                    </p>
                </div>

                {/* Qualification badge */}
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                            Approval Odds
                        </p>
                        <span
                            className={`inline-block mt-1 rounded-full px-3 py-1 text-xs font-bold ${qualificationStatus.color}`}
                        >
                            {qualificationStatus.label}
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Grid: Inputs Left, Scorecard Right */}
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Left Column: Form Controls (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Annual Household Income */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                                Annual Household Income
                            </label>
                            <span className="text-base font-bold text-gray-900">
                                {formatPrice(annualIncome)}/yr
                            </span>
                        </div>
                        <input
                            type="range"
                            min={30000}
                            max={400000}
                            step={5000}
                            value={annualIncome}
                            onChange={(e) => setAnnualIncome(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#006AFF]"
                        />
                        <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                            <span>$30k</span>
                            <span>$200k</span>
                            <span>$400k+</span>
                        </div>
                    </div>

                    {/* Monthly Debts */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                                Monthly Debt Payments
                            </label>
                            <span className="text-base font-bold text-gray-900">
                                {formatPrice(monthlyDebt)}/mo
                            </span>
                        </div>
                        <p className="text-xs text-gray-400 mb-2">
                            Car loans, student loans, credit cards, child support
                        </p>
                        <input
                            type="range"
                            min={0}
                            max={4000}
                            step={50}
                            value={monthlyDebt}
                            onChange={(e) => setMonthlyDebt(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#006AFF]"
                        />
                    </div>

                    {/* Saved Down Payment */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                                Down Payment Saved
                            </label>
                            <span className="text-base font-bold text-gray-900">
                                {formatPrice(downPayment)}
                            </span>
                        </div>
                        <input
                            type="range"
                            min={5000}
                            max={250000}
                            step={5000}
                            value={downPayment}
                            onChange={(e) => setDownPayment(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#006AFF]"
                        />
                    </div>

                    {/* Credit Score & Interest Rate Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        {/* Credit Score Band */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                                Credit Score Tier
                            </label>
                            <div className="flex rounded-xl bg-gray-100 p-1">
                                {(["740+", "670-739", "580-669"] as const).map((band) => (
                                    <button
                                        key={band}
                                        type="button"
                                        onClick={() => setCreditScoreBand(band)}
                                        className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${creditScoreBand === band
                                                ? "bg-white text-[#006AFF] shadow-sm"
                                                : "text-gray-600 hover:text-gray-900"
                                            }`}
                                    >
                                        {band}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Interest Rate */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                                Est. Interest Rate ({interestRate}%)
                            </label>
                            <div className="flex items-center rounded-xl border border-gray-200 bg-white px-3 py-1.5">
                                <Percent className="size-4 text-gray-400 mr-2" />
                                <input
                                    type="number"
                                    step="0.1"
                                    min={3.0}
                                    max={12.0}
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                    className="w-full bg-transparent text-sm font-bold text-gray-900 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Scorecard & Results (5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-gradient-to-br from-blue-50 via-sky-50 to-white p-6 border border-blue-100 zillow-shadow">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-blue-900/60">
                            Your Estimated BuyAbility™ Range
                        </p>
                        <div className="mt-2">
                            <p className="text-4xl font-extrabold text-gray-900 lg:text-5xl">
                                {formatPrice(maxHomePrice)}
                            </p>
                            <p className="mt-1 text-xs font-medium text-gray-600">
                                Recommended target: <span className="font-bold text-gray-900">{formatPrice(minHomePrice)} – {formatPrice(maxHomePrice)}</span>
                            </p>
                        </div>

                        {/* Estimated Monthly Payment Breakdown */}
                        <div className="mt-6 border-t border-blue-100 pt-5">
                            <div className="flex items-baseline justify-between mb-3">
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                                    Est. Max Monthly Payment
                                </span>
                                <span className="text-2xl font-bold text-[#006AFF]">
                                    {formatPrice(maxMonthlyHousingPayment)}/mo
                                </span>
                            </div>

                            {/* Stacked Payment Bar */}
                            <div className="flex h-3 overflow-hidden rounded-full bg-gray-200">
                                <div
                                    style={{ width: "75%" }}
                                    className="bg-[#006AFF]"
                                    title="Principal & Interest"
                                />
                                <div
                                    style={{ width: "17%" }}
                                    className="bg-cyan-500"
                                    title="Property Tax"
                                />
                                <div
                                    style={{ width: "8%" }}
                                    className="bg-amber-400"
                                    title="Home Insurance"
                                />
                            </div>

                            <div className="mt-3 space-y-1.5 text-xs text-gray-600 font-medium">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-1.5">
                                        <span className="size-2 rounded-full bg-[#006AFF]" /> Principal & Interest
                                    </span>
                                    <span className="font-bold text-gray-900">{formatPrice(estimatedPAndI)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-1.5">
                                        <span className="size-2 rounded-full bg-cyan-500" /> Est. Property Taxes
                                    </span>
                                    <span className="font-bold text-gray-900">{formatPrice(estimatedTax)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-1.5">
                                        <span className="size-2 rounded-full bg-amber-400" /> Homeowners Insurance
                                    </span>
                                    <span className="font-bold text-gray-900">{formatPrice(estimatedInsurance)}</span>
                                </div>
                            </div>
                        </div>

                        {/* DTI Gauge */}
                        <div className="mt-6 border-t border-blue-100 pt-4 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-gray-700">Debt-to-Income (DTI) Ratio</p>
                                <p className="text-xs text-gray-500">Lenders prefer under 36%</p>
                            </div>
                            <div className="text-right">
                                <span className={`text-lg font-bold ${currentDti <= 36 ? "text-emerald-600" : "text-amber-600"}`}>
                                    {currentDti}%
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action CTA */}
                    <div className="mt-6 pt-4 border-t border-blue-100">
                        <a
                            href="#matching-homes"
                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#006AFF] py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#0052cc] transition-colors"
                        >
                            View Homes in Budget ({formatPrice(maxHomePrice)}) <ArrowRight className="size-4" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
