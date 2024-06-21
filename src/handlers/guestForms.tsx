import { parseForm } from "../http/http"
import type { CustomContext } from "../middleware/middleware"
const jwt = require('jsonwebtoken')


export async function handleLogin(req: Request, ctx: CustomContext): Promise<Response> {
    
    const fail = async (err: string, email: string, ctx: CustomContext): Promise<Response> => {
        let redirectStr = `/?email=${email}&loginErr=${err}`
        ctx.headers.append("Location", redirectStr)
        return new Response(null, {
            status: 302,
            headers: ctx.headers
        })
    }

    const success = async (ctx: CustomContext): Promise<Response> => {
        let redirectStr = `/admin`
        ctx.headers.append("Location", redirectStr)
        return new Response(null, {
            status: 302,
            headers: ctx.headers
        })
    }

	let data = await req.text()
    let email = parseForm(data, "email")
    let password = parseForm(data, "password")
    if (email == "" || password == "") {
        return fail("all fields required", email, ctx)
    }
    if (email != Bun.env.ADMIN_EMAIL || password != Bun.env.ADMIN_PASSWORD) {
        return fail('invalid credentails', email, ctx)
    }
    const jwtToken = jwt.sign({data: Bun.env.ADMIN_SESSION_TOKEN}, Bun.env.ADMIN_JWT_SECRET, {
        expiresIn: "1h",
    })
    ctx.headers.append("Set-Cookie", `sessionToken=${jwtToken}; HttpOnly; Path=/; Max-Age=3600`)
    return success(ctx)
}
