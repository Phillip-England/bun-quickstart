import { db } from "../database/database";
import { parseForm } from "../http/http";
import type { CustomContext } from "../middleware/middleware";
import { createCFA } from "../models/cfa";
import type { CFA } from "../models/cfa";


export async function handleNewLocation(req: Request, ctx: CustomContext): Promise<Response> {
    
    
    const fail = async (name: string, number: string, err: string, ctx: CustomContext): Promise<Response> => {
        let redirectStr = `/admin?name=${name}&number${number}&formErr=${err}`
        ctx.headers.append("Location", redirectStr)
        return new Response(err, {
            status: 302,
            headers: ctx.headers
        })
    }

    const success = async (ctx: CustomContext): Promise<Response> => {
        let redirectStr = `/admin`
        ctx.headers.append("Location", redirectStr)
        return new Response('new cfa location created', {
            status: 302,
            headers: ctx.headers
        })
    }

    let data = await req.text()
    let name = parseForm(data, "name")
    let number = parseForm(data, "number")
    let cfa: CFA = {
        name: name,
        number: number,
    }
    let id = createCFA(db, cfa)
    cfa.id = id
    console.log(cfa)
    return success(ctx)
}