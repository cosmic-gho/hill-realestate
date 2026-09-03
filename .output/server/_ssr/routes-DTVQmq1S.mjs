import { o as __toESM } from "../_runtime.mjs";
import { I as useSuspenseQuery, at as require_react, et as Link, rt as require_jsx_runtime, tt as useNavigate } from "../_chunks/vendor.mjs";
import { o as hero_home_default, u as featuredQuery } from "./router-CT30szsA.mjs";
import { n as SiteFooter, r as SiteHeader, t as GlassBackdrop } from "./site-footer-BxX4WSCR.mjs";
import { t as PropertyCard } from "./property-card-ejsAm16R.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DTVQmq1S.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var quickFilters = [
	{
		label: "Condos",
		search: { type: "Condo" }
	},
	{
		label: "New build",
		search: { q: "Cedar" }
	},
	{
		label: "Waterfront",
		search: { q: "Harborview" }
	},
	{
		label: "Under $650k",
		search: { maxPrice: 65e4 }
	}
];
function Index() {
	const { data: featured } = useSuspenseQuery(featuredQuery);
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)("");
	const [maxPrice, setMaxPrice] = (0, import_react.useState)("");
	const [beds, setBeds] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen w-full overflow-hidden font-body text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassBackdrop, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative z-20 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-8 pt-10 pb-24 lg:grid-cols-[1.05fr_1fr] lg:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-brand uppercase backdrop-blur-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-accent-cyan" }),
							" ",
							featured.length * 800,
							" live listings in Portland"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-6 font-display text-5xl leading-[1.02] font-bold tracking-tight sm:text-6xl",
						children: [
							"Find the home that",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gradient-brand bg-clip-text text-transparent",
								children: "moves"
							}),
							" with you."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-md text-lg leading-relaxed text-ink/60",
						children: "Search, save, and tour verified homes across the Pacific Northwest — with live listing data."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							navigate({
								to: "/search",
								search: {
									...q ? { q } : {},
									...maxPrice ? { maxPrice: Number(maxPrice) } : {},
									...beds ? { beds: Number(beds) } : {}
								}
							});
						},
						className: "mt-8 flex flex-col gap-3 rounded-3xl border border-white/60 bg-white/45 p-4 shadow-xl shadow-sky-900/10 backdrop-blur-2xl sm:flex-row sm:items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-1 items-center gap-3 rounded-2xl bg-white/70 px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-brand",
									children: "⌕"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: q,
									onChange: (e) => setQ(e.target.value),
									className: "w-full bg-transparent text-sm outline-none placeholder:text-ink/40",
									placeholder: "City, neighborhood, or ZIP",
									"aria-label": "City, neighborhood, or ZIP"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: maxPrice,
								onChange: (e) => setMaxPrice(e.target.value),
								"aria-label": "Max price",
								className: "rounded-2xl bg-white/70 px-4 py-3 text-sm font-medium text-ink/60 outline-none",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Any price"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "600000",
										children: "Up to $600k"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "800000",
										children: "Up to $800k"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "1200000",
										children: "Up to $1.2M"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: beds,
								onChange: (e) => setBeds(e.target.value),
								"aria-label": "Minimum beds",
								className: "rounded-2xl bg-white/70 px-4 py-3 text-sm font-medium text-ink/60 outline-none",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Any beds"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "2",
										children: "2+ beds"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "3",
										children: "3+ beds"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "4",
										children: "4+ beds"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "gradient-brand rounded-2xl px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-sky-500/30 hover:opacity-95",
								children: "Search"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap gap-2 text-xs font-medium text-ink/50",
						children: quickFilters.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/search",
							search: f.search,
							className: "rounded-full border border-white/60 bg-white/40 px-3 py-1.5 backdrop-blur-xl hover:text-ink",
							children: f.label
						}, f.label))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-4 -z-10 rotate-[-6deg] rounded-[36px] border border-white/50 bg-white/20 backdrop-blur-xl" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: hero_home_default,
							alt: "Modern Pacific Northwest home with floor-to-ceiling windows among evergreens",
							width: 1088,
							height: 1200,
							className: "relative aspect-[9/10] w-full rotate-[2deg] rounded-[30px] border border-white/60 object-cover shadow-2xl shadow-sky-900/15"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl border border-white/60 bg-white/70 px-4 py-3 shadow-xl shadow-sky-900/10 backdrop-blur-xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gradient-brand grid size-10 place-items-center rounded-xl text-primary-foreground",
								children: "$"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg leading-none font-bold",
								children: "$812,000"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-ink/50",
								children: "3 bd · 2 ba · 2,140 sqft"
							})] })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative z-20 mx-auto max-w-7xl px-8 pb-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex items-end justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-bold tracking-tight",
						children: "Featured this week"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-ink/55",
						children: "Hand-picked homes trending in the metro"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/search",
						search: {},
						className: "text-sm font-semibold text-brand hover:text-ink",
						children: "View all →"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-6 md:grid-cols-3",
					children: featured.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyCard, { property: p }, p.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { Index as component };
