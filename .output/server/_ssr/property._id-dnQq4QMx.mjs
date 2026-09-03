import { o as __toESM } from "../_runtime.mjs";
import { A as Bookmark, D as Check, I as useSuspenseQuery, M as ArrowLeft, N as toast, O as Calculator, T as DollarSign, at as require_react, d as Share2, et as Link, g as Percent, rt as require_jsx_runtime } from "../_chunks/vendor.mjs";
import { a as propertyImages, g as submitInquiry, i as imageFor, n as Route, r as formatPrice, s as propertyQuery } from "./router-CT30szsA.mjs";
import { t as supabase } from "./client-BxFLMV5X.mjs";
import { i as useAuth, n as SiteFooter, r as SiteHeader, t as GlassBackdrop } from "./site-footer-BxX4WSCR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/property._id-dnQq4QMx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MortgageCalculator({ initialPrice }) {
	const [price, setPrice] = (0, import_react.useState)(initialPrice);
	const [downPaymentPercent, setDownPaymentPercent] = (0, import_react.useState)(20);
	const [interestRate, setInterestRate] = (0, import_react.useState)(6.5);
	const [loanTermYears, setLoanTermYears] = (0, import_react.useState)(30);
	const downPaymentDollars = Math.round(price * downPaymentPercent / 100);
	const loanAmount = Math.max(0, price - downPaymentDollars);
	const monthlyInterestRate = interestRate / 100 / 12;
	const numberOfPayments = loanTermYears * 12;
	let monthlyPrincipalAndInterest = 0;
	if (monthlyInterestRate > 0 && numberOfPayments > 0 && loanAmount > 0) monthlyPrincipalAndInterest = Math.round(loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1));
	const monthlyPropertyTax = Math.round(price * .0115 / 12);
	const monthlyInsurance = 105;
	const totalMonthlyPayment = monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyInsurance;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-10 rounded-3xl border border-white/60 bg-white/55 p-7 shadow-xl shadow-sky-900/5 backdrop-blur-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-10 place-items-center rounded-2xl bg-sky-500/15 text-brand",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-bold tracking-tight",
						children: "Mortgage Calculator"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-ink/55",
						children: "Estimate your monthly payment with taxes & insurance"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-wider text-ink/50",
						children: "Est. Monthly Payment"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-3xl font-bold text-ink",
						children: [formatPrice(totalMonthlyPayment), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-normal text-ink/60",
							children: "/mo"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-3.5 w-full overflow-hidden rounded-full bg-ink/10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: { width: `${monthlyPrincipalAndInterest / totalMonthlyPayment * 100}%` },
							className: "bg-brand transition-all duration-300",
							title: `Principal & Interest: ${formatPrice(monthlyPrincipalAndInterest)}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: { width: `${monthlyPropertyTax / totalMonthlyPayment * 100}%` },
							className: "bg-accent-cyan transition-all duration-300",
							title: `Property Taxes: ${formatPrice(monthlyPropertyTax)}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: { width: `${monthlyInsurance / totalMonthlyPayment * 100}%` },
							className: "bg-amber-400 transition-all duration-300",
							title: `Home Insurance: ${formatPrice(monthlyInsurance)}`
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-4 text-xs font-medium text-ink/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-brand" }),
								"Principal & Interest (",
								formatPrice(monthlyPrincipalAndInterest),
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-accent-cyan" }),
								"Property Taxes (",
								formatPrice(monthlyPropertyTax),
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-amber-400" }),
								"Home Insurance (",
								formatPrice(monthlyInsurance),
								")"
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1",
						children: "Home Price"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center rounded-2xl bg-white/70 px-3.5 py-2.5 border border-white/80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "size-4 text-ink/40 mr-1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: price,
							onChange: (e) => setPrice(Number(e.target.value)),
							className: "w-full bg-transparent text-sm font-semibold outline-none"
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1",
						children: [
							"Down Payment (",
							downPaymentPercent,
							"%)"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center rounded-2xl bg-white/70 px-3.5 py-2.5 border border-white/80",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-ink/40 mr-1",
								children: "$"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								value: downPaymentDollars,
								onChange: (e) => {
									const dollars = Number(e.target.value);
									setDownPaymentPercent(price > 0 ? Math.round(dollars / price * 100) : 0);
								},
								className: "w-full bg-transparent text-sm font-semibold outline-none"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-semibold text-brand ml-1",
								children: [downPaymentPercent, "%"]
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1",
						children: "Interest Rate"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center rounded-2xl bg-white/70 px-3.5 py-2.5 border border-white/80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Percent, { className: "size-4 text-ink/40 mr-1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							step: "0.1",
							value: interestRate,
							onChange: (e) => setInterestRate(Number(e.target.value)),
							className: "w-full bg-transparent text-sm font-semibold outline-none"
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1",
						children: "Loan Term"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex rounded-2xl bg-white/70 p-1 border border-white/80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setLoanTermYears(30),
							className: `flex-1 rounded-xl py-1.5 text-xs font-semibold transition-all ${loanTermYears === 30 ? "bg-ink text-white shadow-sm" : "text-ink/60 hover:text-ink"}`,
							children: "30 yr"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setLoanTermYears(15),
							className: `flex-1 rounded-xl py-1.5 text-xs font-semibold transition-all ${loanTermYears === 15 ? "bg-ink text-white shadow-sm" : "text-ink/60 hover:text-ink"}`,
							children: "15 yr"
						})]
					})] })
				]
			})
		]
	});
}
function PropertyPage() {
	const { id } = Route.useParams();
	const { data } = useSuspenseQuery(propertyQuery(id));
	const property = data;
	const { user } = useAuth();
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [active, setActive] = (0, import_react.useState)(property.image_key);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		phone: "",
		preferred_date: "",
		message: ""
	});
	const [submittingInquiry, setSubmittingInquiry] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!user) {
			setSaved(false);
			return;
		}
		supabase.from("saved_homes").select("id").eq("property_id", property.id).maybeSingle().then(({ data: row }) => setSaved(Boolean(row)));
	}, [user, property.id]);
	async function toggleSave() {
		if (!user) {
			toast.error("Please sign in to save homes to your collection");
			return;
		}
		if (saved) {
			await supabase.from("saved_homes").delete().eq("property_id", property.id);
			setSaved(false);
			toast.success("Removed from saved homes");
		} else {
			const { error } = await supabase.from("saved_homes").insert({
				property_id: property.id,
				user_id: user.id
			});
			if (error) {
				toast.error("Could not save this home");
				return;
			}
			setSaved(true);
			toast.success("Saved to your homes");
		}
	}
	async function handleTourSubmit(e) {
		e.preventDefault();
		if (!form.name || !form.email) {
			toast.error("Please enter your name and email.");
			return;
		}
		setSubmittingInquiry(true);
		try {
			await submitInquiry({ data: {
				property_id: property.id,
				name: form.name,
				email: form.email,
				phone: form.phone || "",
				preferred_date: form.preferred_date || void 0,
				message: form.message || `Interested in touring ${property.title}`
			} });
			toast.success(`Tour request submitted to ${property.agent_name}! They will contact you shortly.`);
			setForm({
				name: "",
				email: "",
				phone: "",
				preferred_date: "",
				message: ""
			});
		} catch {
			toast.error("Could not send tour request. Please try again.");
		} finally {
			setSubmittingInquiry(false);
		}
	}
	function handleCopyShare() {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(window.location.href);
			setCopied(true);
			toast.success("Link copied to clipboard!");
			setTimeout(() => setCopied(false), 2e3);
		}
	}
	const gallery = [
		"living",
		"kitchen",
		"bedroom",
		"hero"
	].filter((k) => k in propertyImages);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen w-full overflow-hidden font-body text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassBackdrop, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative z-20 mx-auto max-w-7xl px-8 pb-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/search",
						search: {},
						className: "flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-ink transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Back to search"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleCopyShare,
						className: "flex items-center gap-1.5 rounded-xl border border-white/70 bg-white/60 px-3.5 py-1.5 text-xs font-semibold text-ink/70 hover:bg-white transition-colors",
						children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-emerald-600" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-3.5" }), copied ? "Link Copied" : "Share Listing"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.35fr_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: imageFor(active),
							alt: `${property.title} interior`,
							width: 1088,
							height: 720,
							className: "aspect-[3/2] w-full rounded-[30px] border border-white/60 object-cover shadow-2xl shadow-sky-900/15"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex gap-3",
							children: gallery.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setActive(key),
								className: `overflow-hidden rounded-2xl border transition-opacity ${active === key ? "border-brand ring-2 ring-brand/30" : "border-white/60 opacity-70 hover:opacity-100"}`,
								"aria-label": `View ${key} photo`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: imageFor(key),
									alt: `${property.title} ${key}`,
									loading: "lazy",
									width: 160,
									height: 120,
									className: "h-20 w-28 object-cover"
								})
							}, key))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 rounded-3xl border border-white/60 bg-white/55 p-7 shadow-xl shadow-sky-900/5 backdrop-blur-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-end justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "font-display text-3xl font-bold tracking-tight",
										children: property.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-ink/55",
										children: [
											property.address,
											", ",
											property.city,
											", ",
											property.state,
											" ",
											property.zip
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-3xl font-bold text-ink",
										children: formatPrice(property.price)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 grid grid-cols-3 gap-3",
									children: [
										["Beds", property.beds],
										["Baths", property.baths],
										["Sqft", property.sqft.toLocaleString()]
									].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-white/70 p-4 border border-white/80",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs tracking-[0.15em] text-ink/45 uppercase",
											children: label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-display text-2xl font-bold",
											children: value
										})]
									}, label))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 border-t border-ink/10 pt-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-lg font-bold text-ink",
										children: "About this home"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-[15px] leading-relaxed text-ink/75",
										children: property.description
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-7 flex flex-wrap items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: toggleSave,
										className: "flex items-center gap-2 gradient-brand rounded-2xl px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-sky-500/30 hover:opacity-95 transition-opacity",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: `size-4 ${saved ? "fill-white" : ""}` }), saved ? "Saved to Favorites" : "Save Home"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-2xl border border-white/60 bg-white/50 px-5 py-3 text-sm font-medium text-ink/60 backdrop-blur-xl",
										children: [
											property.property_type,
											" · ",
											property.status
										]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MortgageCalculator, { initialPrice: property.price })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "h-fit rounded-3xl border border-white/60 bg-white/55 p-7 shadow-xl shadow-sky-900/5 backdrop-blur-2xl lg:sticky lg:top-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-[0.15em] text-ink/45 uppercase",
								children: "Listing Agent"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "gradient-brand grid size-12 place-items-center rounded-2xl font-display font-bold text-primary-foreground shadow-md shadow-sky-500/20",
									children: property.agent_name.split(" ").map((n) => n[0]).join("")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-base font-semibold",
									children: property.agent_name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-ink/50",
									children: property.agent_title
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 border-t border-ink/10 pt-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-bold",
									children: "Schedule a Tour"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-ink/60",
									children: "Pick a preferred time and our certified agent will confirm your appointment."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "mt-4 space-y-3",
								onSubmit: handleTourSubmit,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										value: form.name,
										onChange: (e) => setForm({
											...form,
											name: e.target.value
										}),
										placeholder: "Full name *",
										"aria-label": "Your name",
										className: "w-full rounded-2xl bg-white/70 px-4 py-3 text-sm outline-none placeholder:text-ink/40 border border-white/80 focus:border-brand"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										type: "email",
										value: form.email,
										onChange: (e) => setForm({
											...form,
											email: e.target.value
										}),
										placeholder: "Email address *",
										"aria-label": "Your email",
										className: "w-full rounded-2xl bg-white/70 px-4 py-3 text-sm outline-none placeholder:text-ink/40 border border-white/80 focus:border-brand"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "tel",
										value: form.phone,
										onChange: (e) => setForm({
											...form,
											phone: e.target.value
										}),
										placeholder: "Phone number (optional)",
										"aria-label": "Phone number",
										className: "w-full rounded-2xl bg-white/70 px-4 py-3 text-sm outline-none placeholder:text-ink/40 border border-white/80 focus:border-brand"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-semibold text-ink/50 uppercase tracking-wider mb-1",
										children: "Preferred Date"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "date",
										value: form.preferred_date,
										onChange: (e) => setForm({
											...form,
											preferred_date: e.target.value
										}),
										"aria-label": "Preferred date",
										className: "w-full rounded-2xl bg-white/70 px-4 py-2.5 text-sm outline-none text-ink/70 border border-white/80 focus:border-brand"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 3,
										value: form.message,
										onChange: (e) => setForm({
											...form,
											message: e.target.value
										}),
										placeholder: "I'd love to schedule a private walkthrough…",
										"aria-label": "Message",
										className: "w-full resize-none rounded-2xl bg-white/70 px-4 py-3 text-sm outline-none placeholder:text-ink/40 border border-white/80 focus:border-brand"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: submittingInquiry,
										className: "w-full rounded-2xl bg-ink px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-ink/20 hover:bg-ink/90 disabled:opacity-50 transition-opacity",
										children: submittingInquiry ? "Submitting Request..." : "Request a Tour"
									})
								]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { PropertyPage as component };
