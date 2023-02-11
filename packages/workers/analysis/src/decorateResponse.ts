export const headers = (contentType?: string) => ({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods":
    "GET, HEAD, POST, PUT, OPTIONS, DELETE, UPDATE",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Max-Age": "86400",
  "Content-type": contentType || "application/json",
});

export const decorateResponse = async (
  body: string,
  status: number,
  contentType?: string
): Promise<Response> => {
  return new Response(body, { headers: headers(contentType), status });
};
