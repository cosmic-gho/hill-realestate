globalThis.__nitro_main__ = import.meta.url;
import { ct as HookableCore, ft as HTTPError, lt as H3Core, st as FastResponse, ut as defineLazyEventHandler } from "./_chunks/vendor.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs").then((n) => n.n)) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"ae-hLVBrSrDdpIw3Xl0dJPRkupPepQ\"",
		"mtime": "2026-09-03T04:01:43.189Z",
		"size": 174,
		"path": "../public/robots.txt"
	},
	"/assets/admin-DeYtc-Ts.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76f3-o5+0FaoGsF3vOMKmfGMm1M/3Yfk\"",
		"mtime": "2026-09-03T09:40:55.612Z",
		"size": 30451,
		"path": "../public/assets/admin-DeYtc-Ts.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-09-03T04:01:43.188Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/arrow-right-CgbZ286r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a0-Or0RfcLY5w1//0FNUJoJTYdSBEU\"",
		"mtime": "2026-09-03T09:40:55.612Z",
		"size": 160,
		"path": "../public/assets/arrow-right-CgbZ286r.js"
	},
	"/assets/auth-CTSXW4Ay.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a3a-yQMI7V0UpQ4p3k97vv6HCWfI0Co\"",
		"mtime": "2026-09-03T09:40:55.612Z",
		"size": 6714,
		"path": "../public/assets/auth-CTSXW4Ay.js"
	},
	"/assets/dollar-sign-Dk_WiP3E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d6-kXzDkgx4YOdOd7XrNKI6BZ0R9xw\"",
		"mtime": "2026-09-03T09:40:55.613Z",
		"size": 214,
		"path": "../public/assets/dollar-sign-Dk_WiP3E.js"
	},
	"/assets/jsx-runtime-BkSabwWG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c1-VkW1xFbt56H2FC99QIi6PTzaFIo\"",
		"mtime": "2026-09-03T09:40:55.613Z",
		"size": 961,
		"path": "../public/assets/jsx-runtime-BkSabwWG.js"
	},
	"/assets/hero-home-v1GFjS8Y.jpg": {
		"type": "image/jpeg",
		"etag": "\"50e43-hTqkTAybwri1okCDe9Jx048KLSg\"",
		"mtime": "2026-09-03T09:40:55.620Z",
		"size": 331331,
		"path": "../public/assets/hero-home-v1GFjS8Y.jpg"
	},
	"/assets/link-BsZlpI4w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85ea-Eberq04BzhKsE3BUziSWb73PHLU\"",
		"mtime": "2026-09-03T09:40:55.614Z",
		"size": 34282,
		"path": "../public/assets/link-BsZlpI4w.js"
	},
	"/assets/mail-B0bhbSgT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"169-fX+1bKHTXFnqz5xMolSKYapt9iM\"",
		"mtime": "2026-09-03T09:40:55.614Z",
		"size": 361,
		"path": "../public/assets/mail-B0bhbSgT.js"
	},
	"/assets/property-card-DMwPjx-D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"53c-YQqYKfFmzSy4cD1lBVGQQtbuo0g\"",
		"mtime": "2026-09-03T09:40:55.615Z",
		"size": 1340,
		"path": "../public/assets/property-card-DMwPjx-D.js"
	},
	"/assets/properties.functions-DulbIJdQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9ba9-wGbgUyfigsG5nplEGoHimP4S3a8\"",
		"mtime": "2026-09-03T09:40:55.615Z",
		"size": 39849,
		"path": "../public/assets/properties.functions-DulbIJdQ.js"
	},
	"/assets/property._id-BNPFehuj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"116-3e3dvSsoyf1g8bC6GyNf/R0MCj8\"",
		"mtime": "2026-09-03T09:40:55.616Z",
		"size": 278,
		"path": "../public/assets/property._id-BNPFehuj.js"
	},
	"/assets/property._id-Bv4vEKaw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3880-GlzwrlO5uStYtLsWfwrlhwMxk7Y\"",
		"mtime": "2026-09-03T09:40:55.616Z",
		"size": 14464,
		"path": "../public/assets/property._id-Bv4vEKaw.js"
	},
	"/assets/property._id-C9srjIwP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c7-ig3KUSu5wRzOI9da9aP8Q6vgGB8\"",
		"mtime": "2026-09-03T09:40:55.616Z",
		"size": 455,
		"path": "../public/assets/property._id-C9srjIwP.js"
	},
	"/assets/room-bedroom-ifI2uuXR.jpg": {
		"type": "image/jpeg",
		"etag": "\"1290d-ThsE8GDs3B3jA6AfeoKyx7tmjbo\"",
		"mtime": "2026-09-03T09:40:55.620Z",
		"size": 76045,
		"path": "../public/assets/room-bedroom-ifI2uuXR.jpg"
	},
	"/assets/room-kitchen-CvgXiOhC.jpg": {
		"type": "image/jpeg",
		"etag": "\"e5cc-v7ohTdKUgn9jxvEm5LBA3/yVAr8\"",
		"mtime": "2026-09-03T09:40:55.621Z",
		"size": 58828,
		"path": "../public/assets/room-kitchen-CvgXiOhC.jpg"
	},
	"/assets/routes-DqxV2_2P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1518-k11LA2M1masxVhEvIsmEtgtPPGI\"",
		"mtime": "2026-09-03T09:40:55.617Z",
		"size": 5400,
		"path": "../public/assets/routes-DqxV2_2P.js"
	},
	"/assets/saved-DLLdFp3Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1750-AvjDquhK8511QanzHAWcMsofkcI\"",
		"mtime": "2026-09-03T09:40:55.617Z",
		"size": 5968,
		"path": "../public/assets/saved-DLLdFp3Q.js"
	},
	"/assets/search-ggABxz1-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2413-lcKxtGfjg1+H1KDHDIYcC06Ix0U\"",
		"mtime": "2026-09-03T09:40:55.618Z",
		"size": 9235,
		"path": "../public/assets/search-ggABxz1-.js"
	},
	"/assets/room-living-Bqs_mXYm.jpg": {
		"type": "image/jpeg",
		"etag": "\"1416f-xpCR1MOkHWEMjiTaW1k40DxTRNY\"",
		"mtime": "2026-09-03T09:40:55.621Z",
		"size": 82287,
		"path": "../public/assets/room-living-Bqs_mXYm.jpg"
	},
	"/assets/site-footer-Dc95WCcq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7191-KagHqfTIiMZPwy+ca+o2FgrytTk\"",
		"mtime": "2026-09-03T09:40:55.619Z",
		"size": 29073,
		"path": "../public/assets/site-footer-Dc95WCcq.js"
	},
	"/assets/trash-2-DN8Z3Jyo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"143-jnXYqJLUalW1soiE6mzqmHwiRDA\"",
		"mtime": "2026-09-03T09:40:55.619Z",
		"size": 323,
		"path": "../public/assets/trash-2-DN8Z3Jyo.js"
	},
	"/assets/styles-DszNEmUY.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1917e-lzGZUKNyJb3gCY+DjZcpLr2MmG4\"",
		"mtime": "2026-09-03T09:40:55.622Z",
		"size": 102782,
		"path": "../public/assets/styles-DszNEmUY.css"
	},
	"/assets/index-C9O8fF_w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"86ef6-ojtvuKr/VaSNyE2mHWlotHNZN/4\"",
		"mtime": "2026-09-03T09:40:55.612Z",
		"size": 552694,
		"path": "../public/assets/index-C9O8fF_w.js"
	},
	"/assets/useSuspenseQuery-D3wcVoNb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ff4-qtk89TZSeLGVd85vGdBGtdvZ3ho\"",
		"mtime": "2026-09-03T09:40:55.619Z",
		"size": 8180,
		"path": "../public/assets/useSuspenseQuery-D3wcVoNb.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_jiti@_960e384c700a4141e2ef0b66e74e7ef2/node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_P0S_uc = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_P0S_uc
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_jiti@_960e384c700a4141e2ef0b66e74e7ef2/node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_jiti@_960e384c700a4141e2ef0b66e74e7ef2/node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_jiti@_960e384c700a4141e2ef0b66e74e7ef2/node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_jiti@_960e384c700a4141e2ef0b66e74e7ef2/node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
