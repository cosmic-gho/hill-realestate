import { useState } from "react";
import { Calculator, DollarSign, Percent, Calendar } from "lucide-react";
import { formatPrice } from "@/lib/property-images";

interface MortgageCalculatorProps {
  initialPrice: number;
}

export function MortgageCalculator({ initialPrice }: MortgageCalculatorProps) {
  const [price, setPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);

  // Calculations
  const downPaymentDollars = Math.round((price * downPaymentPercent) / 100);
  const loanAmount = Math.max(0, price - downPaymentDollars);

  // Monthly principal & interest
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  let monthlyPrincipalAndInterest = 0;
  if (monthlyInterestRate > 0 && numberOfPayments > 0 && loanAmount > 0) {
    monthlyPrincipalAndInterest = Math.round(
      (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1),
    );
  }

  // Estimated Property taxes (~1.15% per year)
  const monthlyPropertyTax = Math.round((price * 0.0115) / 12);
  // Estimated Home insurance (~$105/mo)
  const monthlyInsurance = 105;

  const totalMonthlyPayment = monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyInsurance;

  return (
    <div className="mt-10 rounded-3xl border border-white/60 bg-white/55 p-7 shadow-xl shadow-sky-900/5 backdrop-blur-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-2xl bg-sky-500/15 text-brand">
            <Calculator className="size-5" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight">Mortgage Calculator</h2>
            <p className="text-xs text-ink/55">
              Estimate your monthly payment with taxes & insurance
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">
            Est. Monthly Payment
          </p>
          <p className="font-display text-3xl font-bold text-ink">
            {formatPrice(totalMonthlyPayment)}
            <span className="text-sm font-normal text-ink/60">/mo</span>
          </p>
        </div>
      </div>

      {/* Visual breakdown bar */}
      <div className="mt-5">
        <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-ink/10">
          <div
            style={{
              width: `${(monthlyPrincipalAndInterest / totalMonthlyPayment) * 100}%`,
            }}
            className="bg-brand transition-all duration-300"
            title={`Principal & Interest: ${formatPrice(monthlyPrincipalAndInterest)}`}
          />
          <div
            style={{
              width: `${(monthlyPropertyTax / totalMonthlyPayment) * 100}%`,
            }}
            className="bg-accent-cyan transition-all duration-300"
            title={`Property Taxes: ${formatPrice(monthlyPropertyTax)}`}
          />
          <div
            style={{
              width: `${(monthlyInsurance / totalMonthlyPayment) * 100}%`,
            }}
            className="bg-amber-400 transition-all duration-300"
            title={`Home Insurance: ${formatPrice(monthlyInsurance)}`}
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-4 text-xs font-medium text-ink/70">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-brand" />
            Principal & Interest ({formatPrice(monthlyPrincipalAndInterest)})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-accent-cyan" />
            Property Taxes ({formatPrice(monthlyPropertyTax)})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-amber-400" />
            Home Insurance ({formatPrice(monthlyInsurance)})
          </span>
        </div>
      </div>

      {/* Inputs grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1">
            Home Price
          </label>
          <div className="flex items-center rounded-2xl bg-white/70 px-3.5 py-2.5 border border-white/80">
            <DollarSign className="size-4 text-ink/40 mr-1" />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full bg-transparent text-sm font-semibold outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1">
            Down Payment ({downPaymentPercent}%)
          </label>
          <div className="flex items-center rounded-2xl bg-white/70 px-3.5 py-2.5 border border-white/80">
            <span className="text-xs text-ink/40 mr-1">$</span>
            <input
              type="number"
              value={downPaymentDollars}
              onChange={(e) => {
                const dollars = Number(e.target.value);
                setDownPaymentPercent(price > 0 ? Math.round((dollars / price) * 100) : 0);
              }}
              className="w-full bg-transparent text-sm font-semibold outline-none"
            />
            <span className="text-xs font-semibold text-brand ml-1">{downPaymentPercent}%</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1">
            Interest Rate
          </label>
          <div className="flex items-center rounded-2xl bg-white/70 px-3.5 py-2.5 border border-white/80">
            <Percent className="size-4 text-ink/40 mr-1" />
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full bg-transparent text-sm font-semibold outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1">
            Loan Term
          </label>
          <div className="flex rounded-2xl bg-white/70 p-1 border border-white/80">
            <button
              type="button"
              onClick={() => setLoanTermYears(30)}
              className={`flex-1 rounded-xl py-1.5 text-xs font-semibold transition-all ${
                loanTermYears === 30 ? "bg-ink text-white shadow-sm" : "text-ink/60 hover:text-ink"
              }`}
            >
              30 yr
            </button>
            <button
              type="button"
              onClick={() => setLoanTermYears(15)}
              className={`flex-1 rounded-xl py-1.5 text-xs font-semibold transition-all ${
                loanTermYears === 15 ? "bg-ink text-white shadow-sm" : "text-ink/60 hover:text-ink"
              }`}
            >
              15 yr
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
