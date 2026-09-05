"use client";

import { useState } from "react";
import {
    Sparkles,
    CheckCircle2,
    X,
    ArrowRight,
    ShieldCheck,
    Building,
    DollarSign,
    User,
    Mail,
    Phone,
} from "lucide-react";
import { formatPrice } from "@/lib/property-images";

interface PreApprovalWizardProps {
    isOpen: boolean;
    onClose: () => void;
}

export function PreApprovalWizard({ isOpen, onClose }: PreApprovalWizardProps) {
    const [step, setStep] = useState(1);
    const [goal, setGoal] = useState<"buy" | "refinance" | "cashout">("buy");
    const [estPrice, setEstPrice] = useState(550000);
    const [income, setIncome] = useState(125000);
    const [creditTier, setCreditTier] = useState("740+");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        if (step < 3) {
            setStep(step + 1);
        } else {
            setIsSubmitted(true);
        }
    };

    const handleReset = () => {
        setStep(1);
        setIsSubmitted(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-xl rounded-3xl bg-white p-6 lg:p-8 zillow-shadow-xl border border-gray-100">
                {/* Close Button */}
                <button
                    type="button"
                    onClick={handleReset}
                    className="absolute right-5 top-5 grid size-8 place-items-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                >
                    <X className="size-4" />
                </button>

                {!isSubmitted ? (
                    <div>
                        {/* Wizard Header */}
                        <div className="flex items-center gap-3">
                            <div className="grid size-10 place-items-center rounded-2xl bg-blue-50 text-[#006AFF]">
                                <Sparkles className="size-5" />
                            </div>
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-[#006AFF]">
                                    Step {step} of 3
                                </span>
                                <h3 className="text-xl font-bold text-gray-900">
                                    {step === 1 && "What is your primary financing goal?"}
                                    {step === 2 && "Estimate your purchase power"}
                                    {step === 3 && "Where should we send your pre-approval letter?"}
                                </h3>
                            </div>
                        </div>

                        {/* Step Progress Bar */}
                        <div className="mt-4 flex h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                            <div
                                style={{ width: `${(step / 3) * 100}%` }}
                                className="bg-[#006AFF] transition-all duration-300"
                            />
                        </div>

                        <form onSubmit={handleNextStep} className="mt-6 space-y-5">
                            {/* STEP 1: Goal selection */}
                            {step === 1 && (
                                <div className="space-y-3">
                                    {[
                                        {
                                            id: "buy",
                                            title: "Buying a New Home",
                                            desc: "Get pre-approved to make strong offers on active listings.",
                                        },
                                        {
                                            id: "refinance",
                                            title: "Refinancing Existing Mortgage",
                                            desc: "Lower your monthly rate or shorten your loan term.",
                                        },
                                        {
                                            id: "cashout",
                                            title: "Cash-Out Refinance",
                                            desc: "Borrow against your home equity for improvements or cash.",
                                        },
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => setGoal(item.id as any)}
                                            className={`w-full flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${goal === item.id
                                                    ? "border-[#006AFF] bg-blue-50/50 shadow-sm"
                                                    : "border-gray-200 bg-white hover:border-gray-300"
                                                }`}
                                        >
                                            <span
                                                className={`mt-0.5 grid size-5 place-items-center rounded-full border text-xs font-bold ${goal === item.id
                                                        ? "border-[#006AFF] bg-[#006AFF] text-white"
                                                        : "border-gray-300 text-transparent"
                                                    }`}
                                            >
                                                ✓
                                            </span>
                                            <div>
                                                <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* STEP 2: Financial overview */}
                            {step === 2 && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                                            Est. Target Property Value: <span className="text-[#006AFF] font-extrabold">{formatPrice(estPrice)}</span>
                                        </label>
                                        <input
                                            type="range"
                                            min={150000}
                                            max={1500000}
                                            step={10000}
                                            value={estPrice}
                                            onChange={(e) => setEstPrice(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#006AFF]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                                            Annual Household Income: <span className="text-gray-900 font-extrabold">{formatPrice(income)}</span>
                                        </label>
                                        <input
                                            type="range"
                                            min={40000}
                                            max={350000}
                                            step={5000}
                                            value={income}
                                            onChange={(e) => setIncome(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#006AFF]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                                            Est. Credit Score Tier
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {["740+ (Excellent)", "670-739 (Good)", "580-669 (Fair)"].map((tier) => (
                                                <button
                                                    key={tier}
                                                    type="button"
                                                    onClick={() => setCreditTier(tier.split(" ")[0])}
                                                    className={`rounded-xl py-2.5 px-2 text-xs font-bold transition-all border ${creditTier === tier.split(" ")[0]
                                                            ? "border-[#006AFF] bg-[#006AFF] text-white shadow-sm"
                                                            : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
                                                        }`}
                                                >
                                                    {tier}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: Contact information */}
                            {step === 3 && (
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                                            Full Legal Name
                                        </label>
                                        <div className="flex items-center rounded-xl border border-gray-200 px-3 py-2">
                                            <User className="size-4 text-gray-400 mr-2" />
                                            <input
                                                required
                                                type="text"
                                                placeholder="Mara Ellison"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full bg-transparent text-sm outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                                            Email Address
                                        </label>
                                        <div className="flex items-center rounded-xl border border-gray-200 px-3 py-2">
                                            <Mail className="size-4 text-gray-400 mr-2" />
                                            <input
                                                required
                                                type="email"
                                                placeholder="mara@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-transparent text-sm outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                                            Phone Number (Optional)
                                        </label>
                                        <div className="flex items-center rounded-xl border border-gray-200 px-3 py-2">
                                            <Phone className="size-4 text-gray-400 mr-2" />
                                            <input
                                                type="tel"
                                                placeholder="(503) 555-0192"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="w-full bg-transparent text-sm outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Buttons Footer */}
                            <div className="flex gap-3 pt-4 border-t border-gray-100">
                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => setStep(step - 1)}
                                        className="flex-1 rounded-xl border border-gray-200 py-3 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                                    >
                                        Back
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#006AFF] py-3 text-xs font-bold text-white shadow-md hover:bg-[#0052cc] transition-colors"
                                >
                                    {step < 3 ? "Continue" : "Generate Pre-Approval Letter"} <ArrowRight className="size-4" />
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    /* SUCCESS SUBMISSION RESULT */
                    <div className="text-center py-4 space-y-4">
                        <div className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                            <CheckCircle2 className="size-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                            Pre-Approval Letter Generated!
                        </h3>
                        <p className="text-sm text-gray-600 max-w-md mx-auto">
                            Congratulations <span className="font-bold text-gray-900">{name || "Buyer"}</span>! Based on your annual income of {formatPrice(income)}, you qualify for a maximum loan of up to <span className="font-bold text-[#006AFF]">{formatPrice(estPrice)}</span>.
                        </p>

                        <div className="rounded-2xl bg-blue-50/60 p-4 border border-blue-100 text-left text-xs space-y-1.5">
                            <p className="font-bold text-blue-900">Digital Pre-Approval Summary:</p>
                            <p className="text-gray-700">Ref ID: <span className="font-mono text-gray-900">ZH-2026-89410</span></p>
                            <p className="text-gray-700">Estimated Rate Lock: <span className="font-bold text-gray-900">6.50% (30-Yr Fixed)</span></p>
                            <p className="text-gray-700">Valid Through: <span className="font-bold text-gray-900">December 2026</span></p>
                        </div>

                        <button
                            type="button"
                            onClick={handleReset}
                            className="w-full rounded-xl bg-[#006AFF] py-3 text-xs font-bold text-white shadow-md hover:bg-[#0052cc] transition-colors"
                        >
                            Done & Return to Home Loans
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
