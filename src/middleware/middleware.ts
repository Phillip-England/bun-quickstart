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
	log(req, ctx)
	return res
}

export function log(req: Request, ctx: CustomContext): void {
	console.log(`[${req.method}]-[${new URL(req.url).pathname}]-[${Date.now() - ctx.startTime}ms]`)
}

export async function html(req: Request, ctx: CustomContext): Promise<Response | void> {
	ctx.headers.set("Content-Type", "text/html")
}
