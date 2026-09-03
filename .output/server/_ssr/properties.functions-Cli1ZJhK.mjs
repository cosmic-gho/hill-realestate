import { B as enumType, H as objectType, P as createClient, U as stringType, V as numberType, z as booleanType } from "../_chunks/vendor.mjs";
import { a as TSS_SERVER_FUNCTION, i as createServerFn } from "./server-DDztfiG9.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/properties.functions-Cli1ZJhK.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function publicClient() {
	const key = processModule.env["SUPABASE_PUBLISHABLE_KEY"] || processModule.env["VITE_SUPABASE_PUBLISHABLE_KEY"] || "";
	const url = processModule.env["SUPABASE_URL"] || processModule.env["VITE_SUPABASE_URL"] || "";
	return createClient(url, key, {
		auth: {
			storage: void 0,
			persistSession: false,
			autoRefreshToken: false
		},
		global: { fetch: (input, init) => {
			const h = new Headers(init?.headers);
			if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
			if (key) h.set("apikey", key);
			return fetch(input, {
				...init,
				headers: h
			});
		} }
	});
}
var listProperties_createServerFn_handler = createServerRpc({
	id: "ed6df5044164a9803ede2dfb54f17246335822b32afc99e183988e70f39e2f4c",
	name: "listProperties",
	filename: "src/lib/properties.functions.ts"
}, (opts) => listProperties.__executeServer(opts));
var listProperties = createServerFn({ method: "GET" }).validator((input) => objectType({
	q: stringType().optional(),
	beds: numberType().optional(),
	baths: numberType().optional(),
	minPrice: numberType().optional(),
	maxPrice: numberType().optional(),
	type: stringType().optional(),
	status: stringType().optional(),
	featuredOnly: booleanType().optional()
}).parse(input ?? {})).handler(listProperties_createServerFn_handler, async ({ data }) => {
	let query = publicClient().from("properties").select("*").order("created_at", { ascending: false });
	if (data.featuredOnly) query = query.eq("featured", true);
	if (data.beds) query = query.gte("beds", data.beds);
	if (data.baths) query = query.gte("baths", data.baths);
	if (data.minPrice) query = query.gte("price", data.minPrice);
	if (data.maxPrice) query = query.lte("price", data.maxPrice);
	if (data.type && data.type !== "all") query = query.eq("property_type", data.type);
	if (data.status && data.status !== "all") query = query.eq("status", data.status);
	if (data.q) {
		const term = `%${data.q}%`;
		query = query.or(`city.ilike.${term},address.ilike.${term},zip.ilike.${term},title.ilike.${term}`);
	}
	const { data: rows, error } = await query;
	if (error) throw new Error(error.message);
	return rows ?? [];
});
var getProperty_createServerFn_handler = createServerRpc({
	id: "c249c6ef51360b10b73dada911a835ce4ef664d107a3f8cb7e960c2188e39b79",
	name: "getProperty",
	filename: "src/lib/properties.functions.ts"
}, (opts) => getProperty.__executeServer(opts));
var getProperty = createServerFn({ method: "GET" }).validator((input) => objectType({ id: stringType() }).parse(input)).handler(getProperty_createServerFn_handler, async ({ data }) => {
	const { data: row, error } = await publicClient().from("properties").select("*").eq("id", data.id).maybeSingle();
	if (error) throw new Error(error.message);
	return row;
});
var createProperty_createServerFn_handler = createServerRpc({
	id: "619526cbde28e94a562fc50dceb0e32525822dc6afcee34179675bfe73a44eb5",
	name: "createProperty",
	filename: "src/lib/properties.functions.ts"
}, (opts) => createProperty.__executeServer(opts));
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
}).parse(input)).handler(createProperty_createServerFn_handler, async ({ data }) => {
	const { data: created, error } = await publicClient().from("properties").insert(data).select().single();
	if (error) throw new Error(error.message);
	return created;
});
var updateProperty_createServerFn_handler = createServerRpc({
	id: "9df3dd3cbd2f1730624b2df425a61ed753eaa0ab538af16f0f692e1fce63fcd3",
	name: "updateProperty",
	filename: "src/lib/properties.functions.ts"
}, (opts) => updateProperty.__executeServer(opts));
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
}).parse(input)).handler(updateProperty_createServerFn_handler, async ({ data }) => {
	const { data: updated, error } = await publicClient().from("properties").update(data.data).eq("id", data.id).select().single();
	if (error) throw new Error(error.message);
	return updated;
});
var deleteProperty_createServerFn_handler = createServerRpc({
	id: "c99808efb321bc30567e74ff512f26d3b4722dbb401173cb2130f52a674941ce",
	name: "deleteProperty",
	filename: "src/lib/properties.functions.ts"
}, (opts) => deleteProperty.__executeServer(opts));
var deleteProperty = createServerFn({ method: "POST" }).validator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteProperty_createServerFn_handler, async ({ data }) => {
	const { error } = await publicClient().from("properties").delete().eq("id", data.id);
	if (error) throw new Error(error.message);
	return { success: true };
});
var submitInquiry_createServerFn_handler = createServerRpc({
	id: "53f41f5cf200ffc06226bf8ce64e9c6088bd68976e6a7ca768cffa76e88ad21e",
	name: "submitInquiry",
	filename: "src/lib/properties.functions.ts"
}, (opts) => submitInquiry.__executeServer(opts));
var submitInquiry = createServerFn({ method: "POST" }).validator((input) => objectType({
	property_id: stringType().optional(),
	name: stringType().min(1, "Name is required"),
	email: stringType().email("Valid email required"),
	phone: stringType().optional().default(""),
	message: stringType().default(""),
	preferred_date: stringType().optional()
}).parse(input)).handler(submitInquiry_createServerFn_handler, async ({ data }) => {
	const { data: inquiry, error } = await publicClient().from("tour_inquiries").insert({
		property_id: data.property_id || null,
		name: data.name,
		email: data.email,
		phone: data.phone,
		message: data.message,
		preferred_date: data.preferred_date || null
	}).select().single();
	if (error) throw new Error(error.message);
	return inquiry;
});
var listInquiries_createServerFn_handler = createServerRpc({
	id: "0bbdabb14a6d07168f2fbd648a5246ffdd5da05bdb05ee04662d9cc565f9926e",
	name: "listInquiries",
	filename: "src/lib/properties.functions.ts"
}, (opts) => listInquiries.__executeServer(opts));
var listInquiries = createServerFn({ method: "GET" }).validator((input) => objectType({ status: stringType().optional() }).parse(input ?? {})).handler(listInquiries_createServerFn_handler, async ({ data }) => {
	let query = publicClient().from("tour_inquiries").select("*, properties(id, title, address, price, city)").order("created_at", { ascending: false });
	if (data.status && data.status !== "all") query = query.eq("status", data.status);
	const { data: rows, error } = await query;
	if (error) throw new Error(error.message);
	return rows ?? [];
});
var updateInquiryStatus_createServerFn_handler = createServerRpc({
	id: "821a70f3826f6ea0dd942d6d8f89b9cc5743cf6946316bcbcd8bfc68b637d8c7",
	name: "updateInquiryStatus",
	filename: "src/lib/properties.functions.ts"
}, (opts) => updateInquiryStatus.__executeServer(opts));
var updateInquiryStatus = createServerFn({ method: "POST" }).validator((input) => objectType({
	id: stringType(),
	status: enumType([
		"pending",
		"contacted",
		"archived"
	])
}).parse(input)).handler(updateInquiryStatus_createServerFn_handler, async ({ data }) => {
	const { data: updated, error } = await publicClient().from("tour_inquiries").update({ status: data.status }).eq("id", data.id).select().single();
	if (error) throw new Error(error.message);
	return updated;
});
var deleteInquiry_createServerFn_handler = createServerRpc({
	id: "09b72bc94e2be51793d6f47942cba4909edfb598a4bb897026c48a6ddd160a52",
	name: "deleteInquiry",
	filename: "src/lib/properties.functions.ts"
}, (opts) => deleteInquiry.__executeServer(opts));
var deleteInquiry = createServerFn({ method: "POST" }).validator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteInquiry_createServerFn_handler, async ({ data }) => {
	const { error } = await publicClient().from("tour_inquiries").delete().eq("id", data.id);
	if (error) throw new Error(error.message);
	return { success: true };
});
//#endregion
export { createProperty_createServerFn_handler, deleteInquiry_createServerFn_handler, deleteProperty_createServerFn_handler, getProperty_createServerFn_handler, listInquiries_createServerFn_handler, listProperties_createServerFn_handler, submitInquiry_createServerFn_handler, updateInquiryStatus_createServerFn_handler, updateProperty_createServerFn_handler };
