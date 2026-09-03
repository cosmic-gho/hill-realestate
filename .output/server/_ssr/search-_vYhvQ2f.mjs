import { o as __toESM } from "../_runtime.mjs";
import { H as objectType, I as useSuspenseQuery, U as stringType, V as numberType, at as require_react, et as Link, p as RotateCcw, rt as require_jsx_runtime, tt as useNavigate, v as MapPin } from "../_chunks/vendor.mjs";
import { c as Route$1, i as imageFor, l as listQuery, r as formatPrice } from "./router-CT30szsA.mjs";
import { n as SiteFooter, r as SiteHeader, t as GlassBackdrop } from "./site-footer-BxX4WSCR.mjs";
import { t as PropertyCard } from "./property-card-ejsAm16R.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-_vYhvQ2f.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
objectType({
	q: stringType().optional(),
	beds: numberType().optional(),
	baths: numberType().optional(),
	minPrice: numberType().optional(),
	maxPrice: numberType().optional(),
	type: stringType().optional(),
	status: stringType().optional()
});
function SearchPage() {
	const search = Route$1.useSearch();
	const navigate = useNavigate({ from: "/search" });
	const { data: results } = useSuspenseQuery(listQuery(search));
	const [selectedPinId, setSelectedPinId] = (0, import_react.useState)(null);
	const update = (patch) => navigate({ search: (prev) => ({
		...prev,
		...patch
	}) });
	const resetFilters = () => navigate({ search: {} });
	const activeFiltersCount = Object.keys(search).filter((k) => search[k] !== void 0).length;
	const selectedProperty = results.find((p) => p.id === selectedPinId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen w-full overflow-hidden font-body text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassBackdrop, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative z-20 mx-auto max-w-7xl px-8 pb-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-display text-3xl font-bold tracking-tight sm:text-4xl",
							children: [
								results.length,
								" home",
								results.length === 1 ? "" : "s",
								" available"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-ink/55",
							children: search.q ? `Matching “${search.q}”` : "Across the Pacific Northwest"
						})] }), activeFiltersCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: resetFilters,
							className: "flex items-center gap-1.5 rounded-2xl border border-white/80 bg-white/70 px-4 py-2 text-xs font-semibold text-ink/70 hover:bg-white hover:text-ink transition-colors shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }),
								" Reset ",
								activeFiltersCount,
								" filters"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-2.5 rounded-3xl border border-white/60 bg-white/45 p-4 shadow-xl shadow-sky-900/10 backdrop-blur-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-[200px] flex-1 items-center gap-2.5 rounded-2xl bg-white/75 px-4 py-2.5 border border-white/80",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-brand font-bold",
									children: "⌕"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: search.q ?? "",
									onChange: (e) => update({ q: e.target.value || void 0 }),
									className: "w-full bg-transparent text-sm outline-none placeholder:text-ink/40",
									placeholder: "City, neighborhood, or ZIP",
									"aria-label": "City, neighborhood, or ZIP"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								"aria-label": "Min price",
								value: search.minPrice ?? "",
								onChange: (e) => update({ minPrice: e.target.value ? Number(e.target.value) : void 0 }),
								className: "rounded-2xl bg-white/75 px-3.5 py-2.5 text-xs font-semibold text-ink/70 outline-none border border-white/80 hover:bg-white",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Min Price"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "400000",
										children: "$400k+"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "600000",
										children: "$600k+"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "800000",
										children: "$800k+"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "1000000",
										children: "$1M+"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								"aria-label": "Max price",
								value: search.maxPrice ?? "",
								onChange: (e) => update({ maxPrice: e.target.value ? Number(e.target.value) : void 0 }),
								className: "rounded-2xl bg-white/75 px-3.5 py-2.5 text-xs font-semibold text-ink/70 outline-none border border-white/80 hover:bg-white",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Max Price"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "650000",
										children: "Up to $650k"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "850000",
										children: "Up to $850k"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "1100000",
										children: "Up to $1.1M"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "1500000",
										children: "Up to $1.5M"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								"aria-label": "Minimum beds",
								value: search.beds ?? "",
								onChange: (e) => update({ beds: e.target.value ? Number(e.target.value) : void 0 }),
								className: "rounded-2xl bg-white/75 px-3.5 py-2.5 text-xs font-semibold text-ink/70 outline-none border border-white/80 hover:bg-white",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Beds: Any"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "1",
										children: "1+ beds"
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								"aria-label": "Minimum baths",
								value: search.baths ?? "",
								onChange: (e) => update({ baths: e.target.value ? Number(e.target.value) : void 0 }),
								className: "rounded-2xl bg-white/75 px-3.5 py-2.5 text-xs font-semibold text-ink/70 outline-none border border-white/80 hover:bg-white",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Baths: Any"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "1",
										children: "1+ baths"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "2",
										children: "2+ baths"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "3",
										children: "3+ baths"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								"aria-label": "Property type",
								value: search.type ?? "",
								onChange: (e) => update({ type: e.target.value || void 0 }),
								className: "rounded-2xl bg-white/75 px-3.5 py-2.5 text-xs font-semibold text-ink/70 outline-none border border-white/80 hover:bg-white",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Type: All"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "House",
										children: "House"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Condo",
										children: "Condo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Duplex",
										children: "Duplex"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Cottage",
										children: "Cottage"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Townhouse",
										children: "Townhouse"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								"aria-label": "Listing status",
								value: search.status ?? "",
								onChange: (e) => update({ status: e.target.value || void 0 }),
								className: "rounded-2xl bg-white/75 px-3.5 py-2.5 text-xs font-semibold text-ink/70 outline-none border border-white/80 hover:bg-white",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Status: All"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "For sale",
										children: "For sale"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "New",
										children: "New"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Price drop",
										children: "Price drop"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Open house",
										children: "Open house"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.15fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-[600px] overflow-hidden rounded-3xl border border-white/60 bg-white/40 shadow-xl shadow-sky-900/10 backdrop-blur-2xl lg:sticky lg:top-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,rgba(14,165,233,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.14)_1px,transparent_1px)] bg-[size:44px_44px]" }),
								results.map((p, i) => {
									const isSelected = selectedPinId === p.id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setSelectedPinId(isSelected ? null : p.id),
										className: `absolute rounded-2xl px-3 py-1.5 font-display text-xs font-bold shadow-lg backdrop-blur transition-all duration-200 ${isSelected ? "bg-brand text-white ring-4 ring-sky-400/40 scale-110 z-30" : "bg-ink/85 text-primary-foreground hover:bg-brand hover:scale-105 z-10"}`,
										style: {
											top: `${14 + i * 11 % 72}%`,
											left: `${10 + i * 23 % 75}%`
										},
										children: formatPrice(p.price)
									}, p.id);
								}),
								selectedProperty && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute bottom-16 left-6 right-6 z-20 overflow-hidden rounded-3xl border border-white/80 bg-white/95 p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-200",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: imageFor(selectedProperty.image_key),
											alt: selectedProperty.title,
											className: "size-20 rounded-2xl object-cover"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-baseline justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-display text-lg font-bold text-ink",
														children: formatPrice(selectedProperty.price)
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold text-brand",
														children: selectedProperty.status
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-semibold text-ink/80 mt-0.5",
													children: selectedProperty.title
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[11px] text-ink/50",
													children: [
														selectedProperty.address,
														", ",
														selectedProperty.city
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-2 flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-[11px] text-ink/60",
														children: [
															selectedProperty.beds,
															" bd · ",
															selectedProperty.baths,
															" ba ·",
															" ",
															selectedProperty.sqft,
															" sqft"
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/property/$id",
														params: { id: selectedProperty.id },
														className: "text-xs font-semibold text-brand hover:underline",
														children: "View details →"
													})]
												})
											]
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-3.5 py-1 text-xs font-medium text-ink/60 backdrop-blur-xl shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3 text-brand" }), " Interactive map pins"]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 gap-6 sm:grid-cols-2",
							children: [results.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `transition-all duration-200 rounded-3xl ${selectedPinId === p.id ? "ring-2 ring-brand scale-[1.01]" : ""}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyCard, { property: p })
							}, p.id)), results.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-full rounded-3xl border border-white/60 bg-white/50 p-12 text-center text-sm text-ink/60 backdrop-blur-2xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-lg font-bold text-ink mb-1",
										children: "No matching homes found"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "max-w-sm mx-auto",
										children: "Try broadening your price range, beds, or clearing filter criteria to view more listings."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: resetFilters,
										className: "mt-5 rounded-2xl bg-ink px-5 py-2.5 text-xs font-semibold text-white",
										children: "Clear all filters"
									})
								]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { SearchPage as component };
