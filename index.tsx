
import type { Serve } from "bun";
import { adminAuth, chain, guestAuth, html } from "./src/middleware/middleware";
import { handleFavicon, handleStatic } from "./src/handlers/internal";
import { handleHome } from "./src/handlers/guest";
import { handleLogin } from "./src/handlers/guestForms";
import { handleNewLocation } from "./src/handlers/adminForms";
import { tableCFA } from "./src/models/cfa";
import { db } from "./src/database/database";
import { HandleAdmin } from "./src/handlers/admin";

db.run(tableCFA())


let serverOptions: Serve = {
	port: 8080,
	async fetch(req) {

		const path = new URL(req.url).pathname;
        const method = req.method
        const methodPath = `${method} ${path}`

        // internal routes
		if (path.startsWith("/static/") && method == "GET") return await handleStatic(path);
		if (methodPath == "GET /favicon.ico") return await handleFavicon(path)

        // guest routes
	  	if (methodPath == "GET /") return await chain(req, handleHome, html, guestAuth)
	  	if (methodPath == "POST /") return await chain(req, handleLogin, html, guestAuth)

        // admin routes
        if (methodPath == "GET /admin") return await chain(req, HandleAdmin.Home, html, adminAuth)
        if (methodPath == "POST /admin") return await chain(req, handleNewLocation, html, adminAuth)
        // if (methodPath.includes("GET /admin/cfa/") && path.startsWith("/admin/cfa/") &&  (path.split('/').length - 1 == 3)) return await chain(req, handleViewCFA, html, adminAuth)

        // component routes
        if (methodPath == "GET /c/cfa") return await chain(req, HandleAdmin.CFAList, html, adminAuth)
            
	  	return new Response("404!");

	},
}

Bun.serve(serverOptions);
