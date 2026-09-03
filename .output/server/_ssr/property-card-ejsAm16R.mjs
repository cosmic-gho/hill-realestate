import { et as Link, rt as require_jsx_runtime } from "../_chunks/vendor.mjs";
import { i as imageFor, r as formatPrice } from "./router-CT30szsA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/property-card-ejsAm16R.js
var import_jsx_runtime = require_jsx_runtime();
function PropertyCard({ property }) {
	const isNew = property.status !== "For sale";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/property/$id",
		params: { id: property.id },
		className: "group block overflow-hidden rounded-3xl border border-white/60 bg-white/55 shadow-xl shadow-sky-900/5 backdrop-blur-2xl transition-transform hover:-translate-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: imageFor(property.image_key),
				alt: `${property.title} in ${property.city}, ${property.state}`,
				loading: "lazy",
				width: 800,
				height: 600,
				className: "aspect-[4/3] w-full object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur ${isNew ? "bg-brand/90" : "bg-ink/85"}`,
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
						" sqft"
					]
				})
			]
		})]
	});
}
//#endregion
export { PropertyCard as t };
