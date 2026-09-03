import { o as __toESM } from "../_runtime.mjs";
import { N as toast, S as Lock, at as require_react, c as Shield, i as UserCheck, j as ArrowRight, rt as require_jsx_runtime, tt as useNavigate, y as Mail } from "../_chunks/vendor.mjs";
import { t as supabase } from "./client-BxFLMV5X.mjs";
import { i as useAuth, n as SiteFooter, r as SiteHeader, t as GlassBackdrop } from "./site-footer-BxX4WSCR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-DydM80zC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen w-full overflow-hidden font-body text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassBackdrop, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "relative z-20 mx-auto max-w-md px-6 py-20 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-white/60 bg-white/60 p-8 shadow-2xl shadow-sky-900/10 backdrop-blur-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mb-4 grid size-12 place-items-center rounded-2xl bg-brand/10 text-brand",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "size-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-2xl font-bold",
							children: "You are already signed in"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-ink/60",
							children: user.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-col gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => navigate({ to: "/saved" }),
									className: "gradient-brand rounded-2xl px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-sky-500/25 hover:opacity-95",
									children: "View Saved Homes"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => navigate({ to: "/admin" }),
									className: "rounded-2xl border border-white/80 bg-white/70 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-white",
									children: "Go to Admin Panel"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => supabase.auth.signOut(),
									className: "text-xs font-semibold text-ink/50 hover:text-ink pt-2",
									children: "Sign out of this account"
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
	async function handleSubmit(e) {
		e.preventDefault();
		if (!email || !password) {
			toast.error("Please enter both email and password.");
			return;
		}
		setLoading(true);
		try {
			if (mode === "signin") {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
				toast.success("Welcome back!");
				navigate({ to: "/" });
			} else {
				const { error } = await supabase.auth.signUp({
					email,
					password
				});
				if (error) throw error;
				toast.success("Account created successfully! You are now signed in.");
				navigate({ to: "/" });
			}
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Authentication failed. Please check your credentials.");
		} finally {
			setLoading(false);
		}
	}
	function fillDemoUser(role) {
		if (role === "admin") {
			setEmail("admin@aetherhomes.com");
			setPassword("Admin@123456");
		} else {
			setEmail("buyer@example.com");
			setPassword("Buyer@123456");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen w-full overflow-hidden font-body text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassBackdrop, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "relative z-20 mx-auto max-w-lg px-6 py-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-white/60 bg-white/55 p-8 shadow-2xl shadow-sky-900/10 backdrop-blur-2xl sm:p-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-3.5 py-1 text-xs font-semibold tracking-wider text-brand uppercase backdrop-blur-xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-3.5" }), " Secure Access"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-4 font-display text-3xl font-bold tracking-tight",
									children: mode === "signin" ? "Welcome back" : "Create your account"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-ink/60",
									children: mode === "signin" ? "Sign in to view saved homes and tour appointments" : "Sign up to unlock favorite tracking, alerts, and agent tours"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex rounded-2xl bg-white/60 p-1 backdrop-blur-xl border border-white/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMode("signin"),
								className: `flex-1 rounded-xl py-2 text-sm font-semibold transition-all ${mode === "signin" ? "bg-white text-ink shadow-sm" : "text-ink/60 hover:text-ink"}`,
								children: "Sign In"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMode("signup"),
								className: `flex-1 rounded-xl py-2 text-sm font-semibold transition-all ${mode === "signup" ? "bg-white text-ink shadow-sm" : "text-ink/60 hover:text-ink"}`,
								children: "Register"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSubmit,
							className: "mt-6 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold tracking-wider text-ink/70 uppercase mb-1.5",
									children: "Email Address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 rounded-2xl bg-white/75 px-4 py-3 border border-white/80 focus-within:border-brand",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4 text-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										required: true,
										value: email,
										onChange: (e) => setEmail(e.target.value),
										placeholder: "name@example.com",
										className: "w-full bg-transparent text-sm outline-none placeholder:text-ink/40 text-ink"
									})]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold tracking-wider text-ink/70 uppercase mb-1.5",
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 rounded-2xl bg-white/75 px-4 py-3 border border-white/80 focus-within:border-brand",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4 text-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "password",
										required: true,
										value: password,
										onChange: (e) => setPassword(e.target.value),
										placeholder: "••••••••••••",
										minLength: 6,
										className: "w-full bg-transparent text-sm outline-none placeholder:text-ink/40 text-ink"
									})]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: loading,
									className: "mt-2 flex w-full items-center justify-center gap-2 gradient-brand rounded-2xl py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-sky-500/30 hover:opacity-95 disabled:opacity-50 transition-opacity",
									children: loading ? "Processing..." : mode === "signin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Sign In ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Create Free Account ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })] })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 border-t border-ink/10 pt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-center text-xs font-semibold text-ink/50 uppercase tracking-wider mb-3",
								children: "Quick Test Credentials"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => fillDemoUser("admin"),
									className: "rounded-xl border border-white/80 bg-white/60 px-3 py-2 text-xs font-medium text-ink hover:bg-white transition-colors",
									children: "Fill Admin Demo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => fillDemoUser("buyer"),
									className: "rounded-xl border border-white/80 bg-white/60 px-3 py-2 text-xs font-medium text-ink hover:bg-white transition-colors",
									children: "Fill Buyer Demo"
								})]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { AuthPage as component };
