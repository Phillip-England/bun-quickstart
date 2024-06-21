import ReactDOMServer from "react-dom/server";
import { ViewHome } from "../views/views";
import type { CustomContext } from "../middleware/middleware";


export async function handleHome(req: Request, ctx: CustomContext): Promise<Response> {
    const url = new URL(req.url)
    const params = new URLSearchParams(url.search)
    let loginErr = params.get('loginErr') || ""
    let email = params.get('email') || ""
	const body = ReactDOMServer.renderToString(<ViewHome email={email} loginErr={loginErr} />);
	return new Response(body, {
		headers: ctx.headers
	});
}