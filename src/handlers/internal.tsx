

export async function handleStatic(path: string): Promise<Response> {
	let file = await Bun.file("."+path)
	let exists = await file.exists()
	if (!exists) {
		return await notFound();	
	}
	return await new Response(file, {
		headers: {
			"Content-Type": file.type
		}
	
	})
}

export async function handleFavicon(path: string): Promise<Response> {
	let file = await Bun.file("."+path)
	let exists = await file.exists()
	if (!exists) {
		return await notFound();	
	}
	return await new Response(file, {
		headers: {
			"Content-Type": file.type
		}
	
	})
}

export async function notFound(): Promise<Response> {
	return new Response("Not Found", {
		status: 404
	});
}