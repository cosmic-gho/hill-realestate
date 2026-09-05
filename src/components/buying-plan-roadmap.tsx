"use client";

import { useState } from "react";
import {
    CheckCircle,
    Circle,
    Calculator,
    PiggyBank,
    FileCheck,
    Search,
    Users,
    ChevronRight,
    Sparkles,
} from "lucide-react";
import Link from "next/link";

interface Step {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    icon: any;
    actionText: string;
    actionHref?: string;
    onClickAction?: () => void;
    statusBadge?: string;
}

export function BuyingPlanRoadmap({ maxBudget }: { maxBudget: number }) {
    const [completedSteps, setCompletedSteps] = useState<number[]>([1]); // Step 1 completed by default
    const [modalOpen, setModalOpen] = useState(false);

    const toggleStep = (id: number) => {
        if (completedSteps.includes(id)) {
            setCompletedSteps(completedSteps.filter((s) => s !== id));
        } else {
            setCompletedSteps([...completedSteps, id]);
        }
    };

    const steps: Step[] = [
        {
            id: 1,
            title: "1. Calculate your BuyAbility™ Budget",
            subtitle: "Personalized financial estimate",
            description:
                "Determine your maximum home purchase price based on income, debt, down payment, and credit score.",
            icon: Calculator,
            actionText: "Recalculate Budget",
            actionHref: "#buyability-calc",
            statusBadge: "Calculated",
        },
        {
            id: 2,
            title: "2. Build Down Payment & Closing Reserves",
            subtitle: "Target: 5% - 20% down payment + ~3% closing costs",
            description:
                "Save towards your upfront expenses. A larger down payment eliminates private mortgage insurance (PMI).",
            icon: PiggyBank,
            actionText: "View Savings Tips",
            actionHref: "#faq-section",
        },
        {
            id: 3,
            title: "3. Get Pre-Approved by a Lender",
            subtitle: "Lock in live interest rates & proof of funds",
            description:
                "A pre-approval letter gives sellers confidence in your offer and secures your loan rate.",
            icon: FileCheck,
            actionText: "Request Pre-Approval",
            onClickAction: () => setModalOpen(true),
        },
        {
            id: 4,
            title: "4. Shop Homes within Your Budget",
            subtitle: "Filter verified MLS listings",
            description:
                `Browse homes priced up to $${maxBudget.toLocaleString()} matching your preferred locations and specs.`,
            icon: Search,
            actionText: "Browse Homes in Budget",
            actionHref: `/search?maxPrice=${maxBudget}`,
        },
        {
            id: 5,
            title: "5. Partner with a Local Agent & Tour Homes",
            subtitle: "Expert negotiation & private tours",
            description:
                "Connect with a top-rated local real estate agent to tour properties and draft winning purchase offers.",
            icon: Users,
            actionText: "Find a Premier Agent",
            actionHref: "/search",
        },
    ];

    const progressPercent = Math.round((completedSteps.length / steps.length) * 100);

    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 lg:p-8 zillow-shadow-lg">
            {/* Header & Progress Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">
                        Your 5-Step Home Buying Checklist
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Track your milestones on your path to homeownership.
                    </p>
                </div>

                {/* Progress Tracker */}
                <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-3 border border-gray-200 min-w-[220px]">
                    <div className="relative grid size-12 place-items-center rounded-full bg-blue-100 font-bold text-[#006AFF]">
                        {progressPercent}%
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-900">
                            {completedSteps.length} of {steps.length} Steps Done
                        </p>
                        <p className="text-[11px] text-gray-500">
                            {completedSteps.length === 5
                                ? "Ready to make an offer!"
                                : "Keep making progress"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Steps List */}
            <div className="mt-8 space-y-4">
                {steps.map((step) => {
                    const isDone = completedSteps.includes(step.id);
                    const Icon = step.icon;

                    return (
                        <div
                            key={step.id}
                            className={`group flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-2xl border p-5 transition-all ${isDone
                                    ? "border-emerald-200 bg-emerald-50/40"
                                    : "border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50/20"
                                }`}
                        >
                            {/* Left: Checkbox + Content */}
                            <div className="flex items-start gap-4">
                                <button
                                    type="button"
                                    onClick={() => toggleStep(step.id)}
                                    className="mt-0.5 shrink-0 text-gray-400 hover:text-[#006AFF] transition-colors"
                                    aria-label={`Mark step ${step.id} as complete`}
                                >
                                    {isDone ? (
                                        <CheckCircle className="size-6 text-emerald-600 fill-emerald-100" />
                                    ) : (
                                        <Circle className="size-6 text-gray-300 group-hover:text-blue-400" />
                                    )}
                                </button>

                                <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3
                                            className={`font-bold text-gray-900 ${isDone ? "line-through text-gray-600" : ""
                                                }`}
                                        >
                                            {step.title}
                                        </h3>
                                        {step.statusBadge && (
                                            <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-[#006AFF]">
                                                {step.statusBadge}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs font-semibold text-gray-500 mt-0.5">
                                        {step.subtitle}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1 max-w-2xl">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            {/* Right: Action Button */}
                            <div className="pl-10 lg:pl-0 shrink-0">
                                {step.onClickAction ? (
                                    <button
                                        type="button"
                                        onClick={step.onClickAction}
                                        className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-bold text-gray-800 hover:bg-gray-50 hover:border-gray-400 transition-all zillow-shadow"
                                    >
                                        {step.actionText} <ChevronRight className="size-3.5" />
                                    </button>
                                ) : (
                                    <Link
                                        href={step.actionHref || "#"}
                                        className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-bold text-gray-800 hover:bg-[#006AFF] hover:text-white hover:border-[#006AFF] transition-all zillow-shadow"
                                    >
                                        {step.actionText} <ChevronRight className="size-3.5" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pre-approval Dialog Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="w-full max-w-md rounded-3xl bg-white p-6 zillow-shadow-xl border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="grid size-10 place-items-center rounded-2xl bg-blue-50 text-[#006AFF]">
                                <Sparkles className="size-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">
                                    Get Pre-Approved for a Loan
                                </h3>
                                <p className="text-xs text-gray-500">
                                    AetherHomes Lenders Network
                                </p>
                            </div>
                        </div>

                        <p className="mt-4 text-sm text-gray-600">
                            Lock in your mortgage interest rate and get an official pre-approval letter in under 3 minutes.
                        </p>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setModalOpen(false);
                                if (!completedSteps.includes(3)) setCompletedSteps([...completedSteps, 3]);
                            }}
                            className="mt-4 space-y-3"
                        >
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Mara Ellison"
                                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm outline-none focus:border-[#006AFF]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    required
                                    type="email"
                                    placeholder="mara@example.com"
                                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm outline-none focus:border-[#006AFF]"
                                />
                            </div>

                            <div className="mt-6 flex gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="flex-1 rounded-xl border border-gray-200 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 rounded-xl bg-[#006AFF] py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#0052cc]"
                                >
                                    Submit Pre-Approval
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
