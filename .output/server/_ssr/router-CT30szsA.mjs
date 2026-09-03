import { o as __toESM } from "../_runtime.mjs";
import { $ as createRootRouteWithContext, B as enumType, F as queryOptions, H as objectType, K as Scripts, L as QueryClient, Q as createFileRoute, R as QueryClientProvider, U as stringType, V as numberType, X as Outlet, Y as createRouter, Z as lazyRouteComponent, at as require_react, et as Link, it as notFound, nt as useRouter, q as HeadContent, rt as require_jsx_runtime, z as booleanType } from "../_chunks/vendor.mjs";
import { a as TSS_SERVER_FUNCTION, i as createServerFn, o as getServerFnById, s as __exportAll } from "./server-DDztfiG9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/properties.functions-D7izw1AJ.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var listProperties = createServerFn({ method: "GET" }).validator((input) => objectType({
	q: stringType().optional(),
	beds: numberType().optional(),
	baths: numberType().optional(),
	minPrice: numberType().optional(),
	maxPrice: numberType().optional(),
	type: stringType().optional(),
	status: stringType().optional(),
	featuredOnly: booleanType().optional()
}).parse(input ?? {})).handler(createSsrRpc("ed6df5044164a9803ede2dfb54f17246335822b32afc99e183988e70f39e2f4c"));
var getProperty = createServerFn({ method: "GET" }).validator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("c249c6ef51360b10b73dada911a835ce4ef664d107a3f8cb7e960c2188e39b79"));
var createProperty = createServerFn({ method: "POST" }).validator((input) => objectType({
	title: stringType().min(1, "Title is required"),
	price: numberType().positive("Price must be positive"),
	address: stringType().min(1, "Address is required"),
	city: stringType().min(1, "City is required"),
	state: stringType().min(1, "State is required"),
	zip: stringType().default(""),
	beds: numberType().min(0).default(1),
	baths: numberType().min(0).default(1),
	sqft: numberType().min(0).default(500),
	property_type: stringType().default("House"),
	status: stringType().default("For sale"),
	description: stringType().default(""),
	image_key: stringType().default("living"),
	agent_name: stringType().default("Mara Ellison"),
	agent_title: stringType().default("AetherHomes Broker"),
	featured: booleanType().default(false)
}).parse(input)).handler(createSsrRpc("619526cbde28e94a562fc50dceb0e32525822dc6afcee34179675bfe73a44eb5"));
var updateProperty = createServerFn({ method: "POST" }).validator((input) => objectType({
	id: stringType(),
	data: objectType({
		title: stringType().optional(),
		price: numberType().optional(),
		address: stringType().optional(),
		city: stringType().optional(),
		state: stringType().optional(),
		zip: stringType().optional(),
		beds: numberType().optional(),
		baths: numberType().optional(),
		sqft: numberType().optional(),
		property_type: stringType().optional(),
		status: stringType().optional(),
		description: stringType().optional(),
		image_key: stringType().optional(),
		agent_name: stringType().optional(),
		agent_title: stringType().optional(),
		featured: booleanType().optional()
	})
}).parse(input)).handler(createSsrRpc("9df3dd3cbd2f1730624b2df425a61ed753eaa0ab538af16f0f692e1fce63fcd3"));
var deleteProperty = createServerFn({ method: "POST" }).validator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("c99808efb321bc30567e74ff512f26d3b4722dbb401173cb2130f52a674941ce"));
var submitInquiry = createServerFn({ method: "POST" }).validator((input) => objectType({
	property_id: stringType().optional(),
	name: stringType().min(1, "Name is required"),
	email: stringType().email("Valid email required"),
	phone: stringType().optional().default(""),
	message: stringType().default(""),
	preferred_date: stringType().optional()
}).parse(input)).handler(createSsrRpc("53f41f5cf200ffc06226bf8ce64e9c6088bd68976e6a7ca768cffa76e88ad21e"));
var listInquiries = createServerFn({ method: "GET" }).validator((input) => objectType({ status: stringType().optional() }).parse(input ?? {})).handler(createSsrRpc("0bbdabb14a6d07168f2fbd648a5246ffdd5da05bdb05ee04662d9cc565f9926e"));
var updateInquiryStatus = createServerFn({ method: "POST" }).validator((input) => objectType({
	id: stringType(),
	status: enumType([
		"pending",
		"contacted",
		"archived"
	])
}).parse(input)).handler(createSsrRpc("821a70f3826f6ea0dd942d6d8f89b9cc5743cf6946316bcbcd8bfc68b637d8c7"));
var deleteInquiry = createServerFn({ method: "POST" }).validator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("09b72bc94e2be51793d6f47942cba4909edfb598a4bb897026c48a6ddd160a52"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-CT30szsA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DszNEmUY.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$6 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Lovable App" },
			{
				name: "description",
				content: "Lovable Generated Project"
			},
			{
				name: "author",
				content: "Lovable"
			},
			{
				property: "og:title",
				content: "Lovable App"
			},
			{
				property: "og:description",
				content: "Lovable Generated Project"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			href: "/favicon.ico",
			type: "image/x-icon"
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$6.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var featuredQuery = queryOptions({
	queryKey: ["properties", "featured"],
	queryFn: () => listProperties({ data: { featuredOnly: true } })
});
var $$splitComponentImporter$5 = () => import("./routes-DTVQmq1S.mjs");
var Route$5 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "AetherHomes — Homes for sale in the Pacific Northwest" },
		{
			name: "description",
			content: "Search, save, and tour verified homes for sale across Portland, Seattle, and the Pacific Northwest."
		},
		{
			property: "og:title",
			content: "AetherHomes — Find the home that moves with you"
		},
		{
			property: "og:description",
			content: "Browse verified listings, filter by price and beds, and save the homes you love."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	loader: ({ context }) => context.queryClient.ensureQueryData(featuredQuery),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./admin-DkLmLLn3.mjs");
var Route$4 = createFileRoute("/admin")({
	head: () => ({ meta: [{ title: "Admin Portal — AetherHomes Management" }, {
		name: "description",
		content: "Manage property listings, leads, and tour bookings."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./auth-DydM80zC.mjs");
var Route$3 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Sign In / Register — AetherHomes" }, {
		name: "description",
		content: "Access your saved homes, tour bookings, and account settings on AetherHomes."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./saved-Bp_zjT-8.mjs");
var Route$2 = createFileRoute("/saved")({
	head: () => ({ meta: [{ title: "Saved Homes — AetherHomes" }, {
		name: "description",
		content: "View and manage your bookmarked Pacific Northwest homes."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var listQuery = (params) => queryOptions({
	queryKey: [
		"properties",
		"list",
		params
	],
	queryFn: () => listProperties({ data: params })
});
var $$splitComponentImporter$1 = () => import("./search-_vYhvQ2f.mjs");
var searchSchema = objectType({
	q: stringType().optional(),
	beds: numberType().optional(),
	baths: numberType().optional(),
	minPrice: numberType().optional(),
	maxPrice: numberType().optional(),
	type: stringType().optional(),
	status: stringType().optional()
});
var Route$1 = createFileRoute("/search")({
	validateSearch: searchSchema,
	head: () => ({ meta: [
		{ title: "Browse Homes for Sale & Rent — AetherHomes" },
		{
			name: "description",
			content: "Filter Pacific Northwest listings by location, price, beds, baths, and property type with interactive map view."
		},
		{
			property: "og:title",
			content: "Browse Homes for Sale — AetherHomes"
		},
		{
			property: "og:description",
			content: "Interactive home search across Portland, Seattle, and beyond."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	loaderDeps: ({ search }) => search,
	loader: ({ context, deps }) => context.queryClient.ensureQueryData(listQuery(deps)),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var propertyQuery = (id) => queryOptions({
	queryKey: ["property", id],
	queryFn: () => getProperty({ data: { id } })
});
var room_living_default = "/assets/room-living-Bqs_mXYm.jpg";
var room_kitchen_default = "/assets/room-kitchen-CvgXiOhC.jpg";
var room_bedroom_default = "/assets/room-bedroom-ifI2uuXR.jpg";
var hero_home_default = "/assets/hero-home-v1GFjS8Y.jpg";
var propertyImages = {
	living: room_living_default,
	kitchen: room_kitchen_default,
	bedroom: room_bedroom_default,
	hero: hero_home_default
};
function imageFor(key) {
	return propertyImages[key ?? "living"] ?? "/assets/room-living-Bqs_mXYm.jpg";
}
function formatPrice(price) {
	return `$${price.toLocaleString("en-US")}`;
}
var $$splitNotFoundComponentImporter = () => import("./property._id-DkFIMN-t.mjs");
var $$splitErrorComponentImporter = () => import("./property._id-C0cHksQZ.mjs");
var $$splitComponentImporter = () => import("./property._id-dnQq4QMx.mjs");
var Route = createFileRoute("/property/$id")({
	loader: async ({ context, params }) => {
		const property = await context.queryClient.ensureQueryData(propertyQuery(params.id));
		if (!property) throw notFound();
		return property;
	},
	head: ({ loaderData }) => ({ meta: loaderData ? [
		{ title: `${loaderData.title} — ${formatPrice(loaderData.price)} in ${loaderData.city}` },
		{
			name: "description",
			content: loaderData.description.slice(0, 155)
		},
		{
			property: "og:title",
			content: `${loaderData.title} — ${formatPrice(loaderData.price)}`
		},
		{
			property: "og:description",
			content: loaderData.description.slice(0, 155)
		},
		{
			property: "og:type",
			content: "article"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] : [] }),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
var rootRouteChildren = {
	IndexRoute: Route$5.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$6
	}),
	AdminRoute: Route$4.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$6
	}),
	AuthRoute: Route$3.update({
		id: "/auth",
		path: "/auth",
		getParentRoute: () => Route$6
	}),
	SavedRoute: Route$2.update({
		id: "/saved",
		path: "/saved",
		getParentRoute: () => Route$6
	}),
	SearchRoute: Route$1.update({
		id: "/search",
		path: "/search",
		getParentRoute: () => Route$6
	}),
	PropertyIdRoute: Route.update({
		id: "/property/$id",
		path: "/property/$id",
		getParentRoute: () => Route$6
	})
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { updateInquiryStatus as _, propertyImages as a, Route$1 as c, createProperty as d, deleteInquiry as f, submitInquiry as g, listProperties as h, imageFor as i, listQuery as l, listInquiries as m, Route as n, hero_home_default as o, deleteProperty as p, formatPrice as r, propertyQuery as s, router_exports as t, featuredQuery as u, updateProperty as v };
