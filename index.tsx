
import type { Serve } from "bun";
import { chain, html } from "./src/middleware/middleware";
import { handleHome, handleStatic, handleFavicon } from "./src/handlers/handlers";

let serverOptions: Serve = {
	port: 8080,
	async fetch(req) {
		const path = new URL(req.url).pathname;
		if (path.startsWith("/static/")) return await handleStatic(path);
		if (path == "/favicon.ico") return await handleFavicon(path)
	  	if (path === "/") return await chain(req, handleHome, html)
	  	return new Response("404!");
	},
}

Bun.serve(serverOptions);