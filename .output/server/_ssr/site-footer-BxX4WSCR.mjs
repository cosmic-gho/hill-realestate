import { o as __toESM } from "../_runtime.mjs";
import { A as Bookmark, N as toast, _ as Menu, at as require_react, b as LogOut, c as Shield, et as Link, n as X, r as User, rt as require_jsx_runtime, x as LogIn } from "../_chunks/vendor.mjs";
import { t as supabase } from "./client-BxFLMV5X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-footer-BxX4WSCR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GlassBackdrop() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute inset-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0",
					style: { background: "radial-gradient(1200px 700px at 15% -10%, rgba(56,189,248,0.35), transparent 60%), radial-gradient(1000px 700px at 100% 0%, rgba(14,165,233,0.28), transparent 55%), linear-gradient(180deg, #eef4fb 0%, #f7fafc 60%, #eef3f8 100%)" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "anim-drift absolute -top-40 -left-24 h-[620px] w-[620px] rounded-full bg-sky-300/40 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "anim-drift2 absolute top-10 right-[-160px] h-[560px] w-[560px] rounded-full bg-cyan-300/40 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-[-220px] left-1/3 h-[520px] w-[520px] rounded-full bg-sky-200/50 blur-3xl" })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute top-[-8%] left-[58%] h-[150%] w-[420px] rotate-[16deg] rounded-[40px] border border-white/60 bg-white/25 shadow-2xl shadow-sky-900/10 backdrop-blur-2xl" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute top-[-4%] left-[46%] h-[150%] w-[180px] rotate-[16deg] rounded-[40px] border border-white/50 bg-white/15 backdrop-blur-xl" })
	] });
}
function isUserAdmin(user) {
	if (!user) return false;
	const metaRole = user.user_metadata?.role;
	const appRole = user.app_metadata?.role;
	const isAdm = user.user_metadata?.is_admin;
	return metaRole === "admin" || appRole === "admin" || isAdm === true;
}
function useAuth() {
	const [user, setUser] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let active = true;
		supabase.auth.getSession().then(({ data }) => {
			if (!active) return;
			setUser(data.session?.user ?? null);
			setLoading(false);
		});
		const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user ?? null);
		});
		return () => {
			active = false;
			sub.subscription.unsubscribe();
		};
	}, []);
	return {
		user,
		loading,
		isAdmin: isUserAdmin(user)
	};
}
function SiteHeader() {
	const { user, isAdmin } = useAuth();
	const [mobileMenuOpen, setMobileMenuOpen] = (0, import_react.useState)(false);
	async function handleSignOut() {
		await supabase.auth.signOut();
		toast.success("Signed out successfully");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "relative z-30 mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex items-center gap-2 font-display text-xl tracking-tight",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "gradient-brand grid size-9 place-items-center rounded-xl text-primary-foreground shadow-lg shadow-sky-500/30",
					children: "A"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-bold text-ink",
					children: ["Aether", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-brand",
						children: "Homes"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "hidden items-center gap-8 text-sm font-medium text-ink/75 md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/search",
						search: {},
						className: "transition-colors hover:text-ink font-semibold",
						children: "Buy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/search",
						search: { type: "Condo" },
						className: "transition-colors hover:text-ink font-semibold",
						children: "Condos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/search",
						search: { status: "New" },
						className: "transition-colors hover:text-ink font-semibold",
						children: "New Listings"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/saved",
						className: "transition-colors hover:text-ink font-semibold flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-3.5 text-brand" }), " Saved"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin",
						className: `transition-colors hover:text-ink font-semibold flex items-center gap-1.5 rounded-full px-3 py-1 text-xs ${isAdmin ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-700" : "bg-sky-500/10 text-brand"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-3" }), " Admin"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden items-center gap-3 md:flex",
				children: [user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5 rounded-2xl border border-white/70 bg-white/60 px-3 py-1.5 text-xs font-semibold text-ink/80 backdrop-blur-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-3 text-brand" }),
							user.email?.split("@")[0],
							isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 rounded-md bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700",
								children: "ADMIN"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleSignOut,
						className: "flex items-center gap-1 rounded-2xl px-3 py-2 text-xs font-semibold text-ink/70 hover:bg-white/60 transition-colors",
						title: "Sign out",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-3.5" }), " Sign out"]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/auth",
					className: "flex items-center gap-1.5 rounded-2xl px-4 py-2 text-sm font-semibold text-ink/80 hover:bg-white/60 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "size-4" }), " Sign in"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/saved",
					className: "flex items-center gap-1.5 rounded-2xl bg-ink px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-ink/20 hover:bg-ink/90 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-3.5" }), " Saved homes"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setMobileMenuOpen(!mobileMenuOpen),
				className: "grid size-10 place-items-center rounded-2xl border border-white/60 bg-white/60 text-ink md:hidden shadow-sm",
				"aria-label": "Toggle menu",
				children: mobileMenuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
			}),
			mobileMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute left-6 right-6 top-20 z-40 rounded-3xl border border-white/80 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl md:hidden animate-in fade-in zoom-in-95 duration-150",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex flex-col gap-3 font-semibold text-ink",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/search",
							search: {},
							onClick: () => setMobileMenuOpen(false),
							className: "rounded-2xl p-3 hover:bg-ink/5",
							children: "Buy Homes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/search",
							search: { type: "Condo" },
							onClick: () => setMobileMenuOpen(false),
							className: "rounded-2xl p-3 hover:bg-ink/5",
							children: "Condos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/saved",
							onClick: () => setMobileMenuOpen(false),
							className: "flex items-center gap-2 rounded-2xl p-3 hover:bg-ink/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-4 text-brand" }), " Saved Homes"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin",
							onClick: () => setMobileMenuOpen(false),
							className: "flex items-center gap-2 rounded-2xl p-3 text-brand hover:bg-brand/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4" }), " Admin Portal"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 border-t border-ink/10 pt-4 flex flex-col gap-2",
					children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							handleSignOut();
							setMobileMenuOpen(false);
						},
						className: "flex items-center justify-center gap-2 rounded-2xl border border-ink/10 bg-white p-3 text-sm font-semibold text-rose-600",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }),
							" Sign Out (",
							user.email,
							")"
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/auth",
						onClick: () => setMobileMenuOpen(false),
						className: "flex items-center justify-center gap-2 gradient-brand rounded-2xl p-3 text-sm font-semibold text-white shadow-md shadow-sky-500/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "size-4" }), " Sign In / Register"]
					})
				})]
			})
		]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "relative z-20 border-t border-white/50 bg-white/30 backdrop-blur-xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-8 py-8 sm:flex-row",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "font-display text-lg font-bold tracking-tight",
					children: ["Aether", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-brand",
						children: "Homes"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-ink/45",
					children: "© 2026 AetherHomes Inc."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-5 text-xs font-medium text-ink/60",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/search",
							search: {},
							className: "hover:text-ink",
							children: "Browse"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/saved",
							className: "hover:text-ink",
							children: "Saved"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							className: "hover:text-ink",
							children: "Sign in"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { useAuth as i, SiteFooter as n, SiteHeader as r, GlassBackdrop as t };
