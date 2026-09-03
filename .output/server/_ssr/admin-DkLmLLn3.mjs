import { o as __toESM } from "../_runtime.mjs";
import { E as Clock, N as toast, S as Lock, T as DollarSign, a as Trash2, at as require_react, b as LogOut, et as Link, f as Search, h as Plus, k as Building, l as ShieldCheck, m as RefreshCw, n as X, o as Star, rt as require_jsx_runtime, s as SquarePen, tt as useNavigate, u as ShieldAlert, w as ExternalLink, y as Mail } from "../_chunks/vendor.mjs";
import { _ as updateInquiryStatus, d as createProperty, f as deleteInquiry, h as listProperties, i as imageFor, m as listInquiries, p as deleteProperty, r as formatPrice, v as updateProperty } from "./router-CT30szsA.mjs";
import { t as supabase } from "./client-BxFLMV5X.mjs";
import { i as useAuth, n as SiteFooter, r as SiteHeader, t as GlassBackdrop } from "./site-footer-BxX4WSCR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DkLmLLn3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var initialForm = {
	title: "",
	price: 65e4,
	address: "",
	city: "Portland",
	state: "OR",
	zip: "97201",
	beds: 3,
	baths: 2,
	sqft: 1850,
	property_type: "House",
	status: "For sale",
	description: "",
	image_key: "living",
	agent_name: "Mara Ellison",
	agent_title: "AetherHomes Broker",
	featured: false
};
function AdminPage() {
	const { user, loading: authLoading, isAdmin } = useAuth();
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = (0, import_react.useState)("listings");
	const [properties, setProperties] = (0, import_react.useState)([]);
	const [inquiries, setInquiries] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [modalOpen, setModalOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(initialForm);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [inquiryStatusFilter, setInquiryStatusFilter] = (0, import_react.useState)("all");
	const loadData = (0, import_react.useCallback)(async () => {
		setLoading(true);
		try {
			const [props, inqs] = await Promise.all([listProperties({ data: {} }), listInquiries({ data: { status: inquiryStatusFilter === "all" ? void 0 : inquiryStatusFilter } })]);
			setProperties(props);
			setInquiries(inqs);
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Failed to load admin data";
			toast.error(msg);
		} finally {
			setLoading(false);
		}
	}, [inquiryStatusFilter]);
	(0, import_react.useEffect)(() => {
		if (isAdmin) loadData();
	}, [isAdmin, loadData]);
	function handleOpenCreate() {
		setEditingId(null);
		setForm(initialForm);
		setModalOpen(true);
	}
	function handleOpenEdit(property) {
		setEditingId(property.id);
		setForm({
			id: property.id,
			title: property.title,
			price: property.price,
			address: property.address,
			city: property.city,
			state: property.state,
			zip: property.zip,
			beds: property.beds,
			baths: Number(property.baths),
			sqft: property.sqft,
			property_type: property.property_type,
			status: property.status,
			description: property.description,
			image_key: property.image_key,
			agent_name: property.agent_name,
			agent_title: property.agent_title,
			featured: property.featured
		});
		setModalOpen(true);
	}
	async function handleSaveProperty(e) {
		e.preventDefault();
		setSaving(true);
		try {
			if (editingId) {
				await updateProperty({ data: {
					id: editingId,
					data: {
						title: form.title,
						price: form.price,
						address: form.address,
						city: form.city,
						state: form.state,
						zip: form.zip,
						beds: form.beds,
						baths: form.baths,
						sqft: form.sqft,
						property_type: form.property_type,
						status: form.status,
						description: form.description,
						image_key: form.image_key,
						agent_name: form.agent_name,
						agent_title: form.agent_title,
						featured: form.featured
					}
				} });
				toast.success("Property updated successfully");
			} else {
				await createProperty({ data: {
					title: form.title,
					price: form.price,
					address: form.address,
					city: form.city,
					state: form.state,
					zip: form.zip,
					beds: form.beds,
					baths: form.baths,
					sqft: form.sqft,
					property_type: form.property_type,
					status: form.status,
					description: form.description,
					image_key: form.image_key,
					agent_name: form.agent_name,
					agent_title: form.agent_title,
					featured: form.featured
				} });
				toast.success("Listing created successfully");
			}
			setModalOpen(false);
			loadData();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save property");
		} finally {
			setSaving(false);
		}
	}
	async function handleToggleFeatured(property) {
		try {
			await updateProperty({ data: {
				id: property.id,
				data: { featured: !property.featured }
			} });
			setProperties((prev) => prev.map((p) => p.id === property.id ? {
				...p,
				featured: !p.featured
			} : p));
			toast.success(property.featured ? "Unmarked from featured" : "Marked as featured");
		} catch {
			toast.error("Failed to toggle featured status");
		}
	}
	async function handleDeleteProperty(id) {
		if (!confirm("Are you sure you want to permanently delete this listing?")) return;
		try {
			await deleteProperty({ data: { id } });
			setProperties((prev) => prev.filter((p) => p.id !== id));
			toast.success("Property deleted");
		} catch {
			toast.error("Failed to delete property");
		}
	}
	async function handleInquiryStatus(id, status) {
		try {
			await updateInquiryStatus({ data: {
				id,
				status
			} });
			setInquiries((prev) => prev.map((inq) => inq.id === id ? {
				...inq,
				status
			} : inq));
			toast.success(`Inquiry marked as ${status}`);
		} catch {
			toast.error("Failed to update inquiry status");
		}
	}
	async function handleDeleteInquiry(id) {
		if (!confirm("Are you sure you want to delete this inquiry?")) return;
		try {
			await deleteInquiry({ data: { id } });
			setInquiries((prev) => prev.filter((inq) => inq.id !== id));
			toast.success("Inquiry deleted");
		} catch {
			toast.error("Failed to delete inquiry");
		}
	}
	const totalListings = properties.length;
	const avgPrice = totalListings > 0 ? Math.round(properties.reduce((acc, p) => acc + p.price, 0) / totalListings) : 0;
	const pendingInquiriesCount = inquiries.filter((i) => i.status === "pending").length;
	const filteredProperties = properties.filter((p) => {
		const q = searchQuery.toLowerCase();
		return p.title.toLowerCase().includes(q) || p.city.toLowerCase().includes(q) || p.address.toLowerCase().includes(q);
	});
	if (authLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen w-full overflow-hidden font-body text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassBackdrop, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-20 mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-3 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-8 animate-spin text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-ink/70",
						children: "Checking administrator authorization..."
					})]
				})
			})
		]
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen w-full overflow-hidden font-body text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassBackdrop, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "relative z-20 mx-auto max-w-lg px-6 py-20 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-white/60 bg-white/60 p-8 shadow-2xl shadow-sky-900/10 backdrop-blur-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-amber-500/15 text-amber-600",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-7" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-2xl font-bold",
							children: "Admin Sign In Required"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-ink/65",
							children: "The AetherHomes management portal is restricted to authorized administrators. Please sign in with your admin credentials to continue."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-col sm:flex-row justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								className: "gradient-brand inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 hover:opacity-95",
								children: "Sign In / Register"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "inline-flex items-center justify-center rounded-2xl border border-white/80 bg-white/70 px-5 py-3 text-sm font-semibold text-ink hover:bg-white",
								children: "Back to Home"
							})]
						})
					]
				})
			})
		]
	});
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen w-full overflow-hidden font-body text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassBackdrop, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "relative z-20 mx-auto max-w-lg px-6 py-20 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-rose-500/20 bg-white/70 p-8 shadow-2xl shadow-rose-900/5 backdrop-blur-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-rose-500/15 text-rose-600",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-7" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-2xl font-bold",
							children: "Admin Access Denied"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-ink/70",
							children: ["Signed in as ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-ink",
								children: user.email
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-2xl border border-amber-500/20 bg-amber-50/70 p-4 text-left text-xs leading-relaxed text-amber-900",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold mb-1",
									children: "How to enable admin for this account:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"In Supabase Dashboard → ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Authentication → Users" }),
									", click the three dots next to this email → ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Edit User" }),
									", and add:"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									className: "mt-2 block rounded-lg bg-white/90 p-2 font-mono text-[11px] text-ink",
									children: "{ \"role\": \"admin\" }"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-col sm:flex-row justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: async () => {
									await supabase.auth.signOut();
									navigate({ to: "/auth" });
								},
								className: "inline-flex items-center justify-center gap-2 rounded-2xl border border-ink/10 bg-white px-5 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), " Switch Account"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "inline-flex items-center justify-center rounded-2xl bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink/90",
								children: "Back to Home"
							})]
						})
					]
				})
			})
		]
	});
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-brand uppercase backdrop-blur-xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-3.5" }), " Management Console"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 backdrop-blur-xl",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }),
										" Admin: ",
										user.email
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl",
								children: "Admin Portal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-ink/60",
								children: "Manage live MLS properties, agent assignments, and client tour requests"
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => loadData(),
								className: "flex items-center gap-2 rounded-2xl bg-white/70 px-4 py-2.5 text-sm font-semibold text-ink border border-white/80 hover:bg-white transition-colors",
								title: "Refresh data",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `size-4 ${loading ? "animate-spin" : ""}` }), " Refresh"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleOpenCreate,
								className: "flex items-center gap-2 gradient-brand rounded-2xl px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-sky-500/25 hover:opacity-95 transition-opacity",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add New Listing"]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl border border-white/60 bg-white/55 p-6 shadow-xl shadow-sky-900/5 backdrop-blur-2xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-semibold text-ink/50 uppercase tracking-wider",
											children: "Total Listings"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid size-9 place-items-center rounded-xl bg-sky-500/15 text-brand",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-4" })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 font-display text-3xl font-bold",
										children: totalListings
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-ink/50",
										children: "Active on site"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl border border-white/60 bg-white/55 p-6 shadow-xl shadow-sky-900/5 backdrop-blur-2xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-semibold text-ink/50 uppercase tracking-wider",
											children: "Average Price"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid size-9 place-items-center rounded-xl bg-emerald-500/15 text-emerald-600",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "size-4" })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 font-display text-3xl font-bold",
										children: formatPrice(avgPrice)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-ink/50",
										children: "Across all active homes"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl border border-white/60 bg-white/55 p-6 shadow-xl shadow-sky-900/5 backdrop-blur-2xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-semibold text-ink/50 uppercase tracking-wider",
											children: "Featured Homes"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid size-9 place-items-center rounded-xl bg-amber-500/15 text-amber-600",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4" })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 font-display text-3xl font-bold",
										children: properties.filter((p) => p.featured).length
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-ink/50",
										children: "Showcased on homepage"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl border border-white/60 bg-white/55 p-6 shadow-xl shadow-sky-900/5 backdrop-blur-2xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-semibold text-ink/50 uppercase tracking-wider",
											children: "New Inquiries"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid size-9 place-items-center rounded-xl bg-purple-500/15 text-purple-600",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 font-display text-3xl font-bold",
										children: pendingInquiriesCount
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-ink/50",
										children: "Awaiting contact"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 flex items-center justify-between border-b border-ink/10 pb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setActiveTab("listings"),
									className: `rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all ${activeTab === "listings" ? "bg-ink text-white shadow-md" : "bg-white/60 text-ink/70 hover:bg-white"}`,
									children: [
										"Property Listings (",
										properties.length,
										")"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setActiveTab("inquiries"),
									className: `relative rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all ${activeTab === "inquiries" ? "bg-ink text-white shadow-md" : "bg-white/60 text-ink/70 hover:bg-white"}`,
									children: [
										"Tour Inquiries (",
										inquiries.length,
										")",
										pendingInquiriesCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-2 rounded-full bg-rose-500 px-2 py-0.5 text-xs text-white",
											children: pendingInquiriesCount
										})
									]
								})]
							}),
							activeTab === "listings" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-64",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-2.5 size-4 text-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Search listings...",
									value: searchQuery,
									onChange: (e) => setSearchQuery(e.target.value),
									className: "w-full rounded-2xl border border-white/70 bg-white/70 pl-9 pr-4 py-2 text-sm outline-none focus:border-brand"
								})]
							}),
							activeTab === "inquiries" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-2",
								children: [
									"all",
									"pending",
									"contacted",
									"archived"
								].map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setInquiryStatusFilter(st),
									className: `rounded-xl px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${inquiryStatusFilter === st ? "bg-brand text-white shadow-sm" : "bg-white/60 text-ink/60 hover:bg-white"}`,
									children: st
								}, st))
							})
						]
					}),
					activeTab === "listings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 overflow-hidden rounded-3xl border border-white/60 bg-white/55 shadow-xl shadow-sky-900/5 backdrop-blur-2xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "border-b border-ink/10 bg-white/40 text-xs font-semibold text-ink/60 uppercase tracking-wider",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-6 py-4",
											children: "Property"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-6 py-4",
											children: "Price"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-6 py-4",
											children: "Specs"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-6 py-4",
											children: "Type & Status"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-6 py-4",
											children: "Featured"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-6 py-4 text-right",
											children: "Actions"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
									className: "divide-y divide-ink/5",
									children: [filteredProperties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-white/40 transition-colors",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-6 py-4",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: imageFor(p.image_key),
														alt: p.title,
														className: "size-14 rounded-xl object-cover shadow-sm border border-white/80"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-semibold text-ink",
														children: p.title
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-xs text-ink/50",
														children: [
															p.address,
															", ",
															p.city,
															", ",
															p.state,
															" ",
															p.zip
														]
													})] })]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-6 py-4 font-display font-bold text-ink",
												children: formatPrice(p.price)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "px-6 py-4 text-xs text-ink/70",
												children: [
													p.beds,
													" bd · ",
													p.baths,
													" ba · ",
													p.sqft.toLocaleString(),
													" sqft"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-6 py-4",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex rounded-full bg-sky-500/10 px-2.5 py-1 text-xs font-medium text-brand",
													children: [
														p.property_type,
														" · ",
														p.status
													]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-6 py-4",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleToggleFeatured(p),
													className: `grid size-8 place-items-center rounded-xl transition-colors ${p.featured ? "bg-amber-100 text-amber-600 hover:bg-amber-200" : "bg-white/60 text-ink/30 hover:text-amber-500"}`,
													title: "Toggle Featured",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `size-4 ${p.featured ? "fill-amber-500" : ""}` })
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-6 py-4 text-right",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-end gap-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
															to: "/property/$id",
															params: { id: p.id },
															className: "grid size-8 place-items-center rounded-xl bg-white/70 text-ink/70 hover:bg-white hover:text-ink transition-colors",
															title: "View public page",
															target: "_blank",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" })
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => handleOpenEdit(p),
															className: "grid size-8 place-items-center rounded-xl bg-sky-50 text-brand hover:bg-sky-100 transition-colors",
															title: "Edit listing",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "size-4" })
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => handleDeleteProperty(p.id),
															className: "grid size-8 place-items-center rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors",
															title: "Delete listing",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
														})
													]
												})
											})
										]
									}, p.id)), filteredProperties.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										colSpan: 6,
										className: "px-6 py-12 text-center text-ink/50",
										children: "No listings match your search."
									}) })]
								})]
							})
						})
					}),
					activeTab === "inquiries" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-4",
						children: [inquiries.map((inq) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-white/60 bg-white/55 p-6 shadow-xl shadow-sky-900/5 backdrop-blur-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-start justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `grid size-10 place-items-center rounded-2xl text-sm font-bold ${inq.status === "pending" ? "bg-purple-100 text-purple-700" : inq.status === "contacted" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`,
											children: inq.name[0]?.toUpperCase() || "L"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-base font-bold text-ink",
											children: inq.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3 text-xs text-ink/60 mt-0.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3 text-ink/40" }),
														" ",
														inq.email
													]
												}),
												inq.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· ", inq.phone] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1 text-ink/40",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }),
														" ",
														new Date(inq.created_at).toLocaleDateString()
													]
												})
											]
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${inq.status === "pending" ? "bg-amber-100 text-amber-700" : inq.status === "contacted" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`,
												children: inq.status
											}),
											inq.status !== "contacted" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => handleInquiryStatus(inq.id, "contacted"),
												className: "rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors",
												children: "Mark Contacted"
											}),
											inq.status !== "archived" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => handleInquiryStatus(inq.id, "archived"),
												className: "rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors",
												children: "Archive"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => handleDeleteInquiry(inq.id),
												className: "grid size-8 place-items-center rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors",
												title: "Delete inquiry",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
											})
										]
									})]
								}),
								inq.properties && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex items-center justify-between rounded-2xl bg-white/70 px-4 py-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-ink/60",
										children: [
											"Inquired Property:",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-ink",
												children: inq.properties.title
											}),
											" (",
											formatPrice(inq.properties.price),
											")"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/property/$id",
										params: { id: inq.properties.id },
										target: "_blank",
										className: "font-semibold text-brand hover:underline flex items-center gap-1",
										children: ["View property ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
									})]
								}),
								inq.message && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 text-sm text-ink/75 bg-white/40 rounded-2xl p-3.5 border border-white/60",
									children: [
										"“",
										inq.message,
										"”"
									]
								})
							]
						}, inq.id)), inquiries.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-3xl border border-white/60 bg-white/50 p-12 text-center text-ink/50 backdrop-blur-2xl",
							children: "No inquiries found in this view."
						})]
					}),
					modalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/30 backdrop-blur-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/80 bg-white/95 p-8 shadow-2xl backdrop-blur-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setModalOpen(false),
									className: "absolute right-6 top-6 grid size-8 place-items-center rounded-full bg-ink/5 text-ink/60 hover:bg-ink/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl font-bold",
									children: editingId ? "Edit Property Listing" : "Add New Property"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-ink/60",
									children: "All changes sync directly to the live Supabase database"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handleSaveProperty,
									className: "mt-6 space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-1",
											children: "Property Title"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											required: true,
											type: "text",
											value: form.title,
											onChange: (e) => setForm({
												...form,
												title: e.target.value
											}),
											placeholder: "e.g. Modern Pearl District Loft",
											className: "w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-1",
												children: "Price ($)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												required: true,
												type: "number",
												value: form.price,
												onChange: (e) => setForm({
													...form,
													price: Number(e.target.value)
												}),
												className: "w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-1",
												children: "Property Type"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: form.property_type,
												onChange: (e) => setForm({
													...form,
													property_type: e.target.value
												}),
												className: "w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand",
												children: [
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
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 gap-4 sm:grid-cols-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "sm:col-span-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-1",
													children: "Street Address"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													required: true,
													type: "text",
													value: form.address,
													onChange: (e) => setForm({
														...form,
														address: e.target.value
													}),
													placeholder: "123 NW Pine St",
													className: "w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-1",
												children: "City"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												required: true,
												type: "text",
												value: form.city,
												onChange: (e) => setForm({
													...form,
													city: e.target.value
												}),
												className: "w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 gap-4 sm:grid-cols-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-1",
													children: "State"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													required: true,
													type: "text",
													value: form.state,
													onChange: (e) => setForm({
														...form,
														state: e.target.value
													}),
													className: "w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-1",
													children: "ZIP"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: form.zip,
													onChange: (e) => setForm({
														...form,
														zip: e.target.value
													}),
													className: "w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-1",
													children: "Beds"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													value: form.beds,
													onChange: (e) => setForm({
														...form,
														beds: Number(e.target.value)
													}),
													className: "w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-1",
													children: "Baths"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													step: "0.5",
													value: form.baths,
													onChange: (e) => setForm({
														...form,
														baths: Number(e.target.value)
													}),
													className: "w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
												})] })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 gap-4 sm:grid-cols-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-1",
													children: "Sq Ft"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													value: form.sqft,
													onChange: (e) => setForm({
														...form,
														sqft: Number(e.target.value)
													}),
													className: "w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-1",
													children: "Status"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													value: form.status,
													onChange: (e) => setForm({
														...form,
														status: e.target.value
													}),
													className: "w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand",
													children: [
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
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "Pending",
															children: "Pending"
														})
													]
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-1",
													children: "Image Preset"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													value: form.image_key,
													onChange: (e) => setForm({
														...form,
														image_key: e.target.value
													}),
													className: "w-full rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "living",
															children: "Living Room (Bright)"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "kitchen",
															children: "Kitchen (Quartz Island)"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "bedroom",
															children: "Bedroom (Warm Light)"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "hero",
															children: "Hero Exterior (Modern)"
														})
													]
												})] })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-1",
											children: "Description"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											rows: 3,
											value: form.description,
											onChange: (e) => setForm({
												...form,
												description: e.target.value
											}),
											placeholder: "Describe interior details, recent renovations, neighborhood amenities...",
											className: "w-full resize-none rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3 pt-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												id: "featured",
												checked: form.featured,
												onChange: (e) => setForm({
													...form,
													featured: e.target.checked
												}),
												className: "size-4 rounded border-ink/20 text-brand focus:ring-brand"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "featured",
												className: "text-sm font-medium text-ink cursor-pointer",
												children: "Feature this home on the homepage showcase"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-end gap-3 pt-4 border-t border-ink/10",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setModalOpen(false),
												className: "rounded-2xl border border-ink/10 px-5 py-2.5 text-sm font-semibold text-ink/70 hover:bg-ink/5",
												children: "Cancel"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "submit",
												disabled: saving,
												className: "gradient-brand rounded-2xl px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-sky-500/25 hover:opacity-95 disabled:opacity-50",
												children: saving ? "Saving..." : editingId ? "Save Changes" : "Create Listing"
											})]
										})
									]
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { AdminPage as component };
