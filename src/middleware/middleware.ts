import { convertCompilerOptionsFromJson, createTextSpan } from "typescript"
import { getCookie } from "../http/http"
const jwt = require('jsonwebtoken')

export type CustomContext = {
	startTime: number
	headers: Headers
}

type CustomHandler = (req: Request, ctx: CustomContext) => Promise<Response>

type CustomMiddleware = (req: Request, ctx: CustomContext) => Promise<Response | void>

export async function chain(req: Request, handler: CustomHandler, ...middlewares: CustomMiddleware[]): Promise<Response> {
	const ctx: CustomContext = {
		startTime: Date.now(),
		headers: new Headers()
	}
	for (const middleware of middlewares) {
		let res = await middleware(req, ctx)
		if (res) return res
	}
	let res = await handler(req, ctx)
	log(req, res, ctx)
	return res
}

export function log(req: Request, res: Response, ctx: CustomContext): void {
	console.log(`[${res.status}]-[${req.method}]-[${new URL(req.url).pathname}]-[${Date.now() - ctx.startTime}ms]`)
}

export async function html(req: Request, ctx: CustomContext): Promise<Response | void> {
	ctx.headers.set("Content-Type", "text/html")
}

export async function guestAuth(req: Request, ctx: CustomContext): Promise<Response | void> {
    let cookies = req.headers.get('Cookie') || ""
    if (cookies == "") {
        return
    }
    let sessionToken = getCookie(cookies, "sessionToken")
    let [err, decoded] = await jwt.verify(sessionToken, Bun.env.ADMIN_JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
            return [err, null]
        }
        return [null, decoded]
    })
    if (err) {
        // TODO: I need a server 500 page
    }
    let data = decoded.data
    if (data == Bun.env.ADMIN_SESSION_TOKEN) {
        ctx.headers.set('Location', "/admin")
        return new Response('admin already logged in', {
            status: 302,
            headers: ctx.headers,
        })
    }
}

export async function adminAuth(req: Request, ctx: CustomContext): Promise<Response | void> {
    let cookies = req.headers.get('Cookie')
    if (!cookies) {
        ctx.headers.set('Location', "/")
        return new Response('no sessionToken cookie set', {
            status: 302,
            headers: ctx.headers,
        })
    }
    let sessionToken = getCookie(cookies, "sessionToken")
    let [err, decoded] = await jwt.verify(sessionToken, Bun.env.ADMIN_JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
            return [err, null]
        }
        return [null, decoded]
    })
    if (err) {
        // TODO: I need a server 500 page
    }
    let data = decoded.data
    if (data != Bun.env.ADMIN_SESSION_TOKEN) {
        ctx.headers.set('Location', "/")
        return new Response('invalid sessionToken', {
            status: 302,
            headers: ctx.headers,
        })
    }
}
