export const decorateResponse = async (body: string, status: number): Promise<Response> => {
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, OPTIONS, DELETE, UPDATE',
		'Access-Control-Allow-Headers': '*',
		'Access-Control-Max-Age': '86400',
		'Content-type': 'application/json',
	};

	return new Response(body, { headers, status });
};
