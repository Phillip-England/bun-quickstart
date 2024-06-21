import ReactDOMServer from "react-dom/server"
import { ViewAdminHome, ViewCFAList } from "../views/views"
import type { CustomContext } from "../middleware/middleware"
import { getAllCFA } from "../models/cfa"
import { db } from "../database/database"


export class HandleAdmin {

    static async Home(req: Request, ctx: CustomContext): Promise<Response> {
        const url = new URL(req.url)
        const params = new URLSearchParams(url.search)
        let formErr = params.get('formErr') || ""
        let name = params.get('name') || ""
        let number = params.get('number') || ""
        const body = ReactDOMServer.renderToString(<ViewAdminHome name={name} number={number} formErr={formErr} />);
        return new Response(body, {
            headers: ctx.headers
        });
    }


    static async CFAList(req: Request, ctx: CustomContext): Promise<Response> {
        const cfas = getAllCFA(db)
        const body = ReactDOMServer.renderToString(<ViewCFAList cfaLocations={cfas} />)
        return new Response(body, {
            headers: ctx.headers,
        })
    }

}

