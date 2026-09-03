import { o as __toESM } from "../_runtime.mjs";
import { A as Bookmark, C as Heart, N as toast, a as Trash2, at as require_react, et as Link, j as ArrowRight, rt as require_jsx_runtime, tt as useNavigate } from "../_chunks/vendor.mjs";
import { i as imageFor, r as formatPrice } from "./router-CT30szsA.mjs";
import { t as supabase } from "./client-BxFLMV5X.mjs";
import { i as useAuth, n as SiteFooter, r as SiteHeader, t as GlassBackdrop } from "./site-footer-BxX4WSCR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/saved-Bp_zjT-8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SavedHomesPage() {
	const { user, loading: authLoading } = useAuth();
	const navigate = useNavigate();
	const [properties, setProperties] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (authLoading) return;
		if (!user) {
			setLoading(false);
			return;
		}
		async function fetchSaved() {
			setLoading(true);
			try {
				const { data, error } = await supabase.from("saved_homes").select("id, property_id, properties(*)").eq("user_id", user.id).order("created_at", { ascending: false });
				if (error) throw error;
				const list = (data || []).map((item) => item.properties).filter(Boolean);
				setProperties(list);
			} catch {
				toast.error("Failed to load saved homes");
			} finally {
				setLoading(false);
			}
		}
		fetchSaved();
	}, [user, authLoading]);
	async function handleRemove(propertyId) {
		if (!user) return;
		try {
			const { error } = await supabase.from("saved_homes").delete().eq("user_id", user.id).eq("property_id", propertyId);
			if (error) throw error;
			setProperties((prev) => prev.filter((p) => p.id !== propertyId));
			toast.success("Removed from saved homes");
		} catch {
			toast.error("Could not remove property");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen w-full overflow-hidden font-body text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassBackdrop, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative z-20 mx-auto max-w-7xl px-8 pb-24 pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-3.5 py-1 text-xs font-semibold tracking-wider text-brand uppercase backdrop-blur-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-3.5" }), " Bookmarks"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl",
								children: "Saved Homes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-ink/60",
								children: "Keep track of properties you're considering touring or buying"
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/search",
							search: {},
							className: "flex items-center gap-2 rounded-2xl bg-white/70 px-5 py-2.5 text-sm font-semibold text-ink border border-white/80 hover:bg-white shadow-sm",
							children: ["Explore more listings ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})]
					}),
					!authLoading && !user && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 rounded-3xl border border-white/60 bg-white/50 p-12 text-center backdrop-blur-2xl shadow-xl shadow-sky-900/5 max-w-xl mx-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-brand/10 text-brand",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-7" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-bold",
								children: "Sign in to see your saved homes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-ink/60",
								children: "Create an account or sign in to save your favorite listings and sync them across all your devices."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 flex justify-center gap-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => navigate({ to: "/auth" }),
									className: "gradient-brand rounded-2xl px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-sky-500/25 hover:opacity-95",
									children: "Sign In or Register"
								})
							})
						]
					}),
					(authLoading || loading) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
						children: [
							1,
							2,
							3
						].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-80 animate-pulse rounded-3xl border border-white/60 bg-white/40" }, n))
					}),
					!loading && user && properties.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
						children: properties.map((property) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group relative overflow-hidden rounded-3xl border border-white/60 bg-white/55 shadow-xl shadow-sky-900/5 backdrop-blur-2xl transition-transform hover:-translate-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/property/$id",
								params: { id: property.id },
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: imageFor(property.image_key),
										alt: `${property.title}`,
										className: "aspect-[4/3] w-full object-cover"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute left-3 top-3 rounded-full bg-ink/85 px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur",
										children: property.status
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-baseline justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-display text-xl font-bold",
												children: formatPrice(property.price)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-ink/45",
												children: [
													property.city,
													", ",
													property.state
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm font-medium text-ink/70",
											children: property.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-3 text-xs text-ink/50",
											children: [
												property.beds,
												" bd · ",
												property.baths,
												" ba · ",
												property.sqft.toLocaleString(),
												" ",
												"sqft"
											]
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleRemove(property.id),
								"aria-label": "Remove saved home",
								className: "absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 text-rose-600 shadow-md backdrop-blur hover:bg-rose-50 transition-colors",
								title: "Remove from saved",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})]
						}, property.id))
					}),
					!loading && user && properties.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 rounded-3xl border border-white/60 bg-white/50 p-12 text-center backdrop-blur-2xl shadow-xl shadow-sky-900/5 max-w-xl mx-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-ink/5 text-ink/50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-7" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-bold",
								children: "No saved homes yet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-ink/60",
								children: "Click the \"Save home\" button on any listing to bookmark it and track updates here."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 flex justify-center gap-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/search",
									search: {},
									className: "gradient-brand rounded-2xl px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-sky-500/25 hover:opacity-95",
									children: "Browse Available Homes"
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { SavedHomesPage as component };
