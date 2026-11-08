import { findUrlByShortCode } from "../../lib/db";

export async function GET(request, { params }) {
  const { shortCode } = await params;
  const originalUrl = await findUrlByShortCode(shortCode);

  if (!originalUrl) {
    return new Response("Short URL not found.", { status: 404 });
  }

  return new Response(null, {
    status: 307,
    headers: {
      Location: originalUrl,
      "Cache-Control": "no-store",
    },
  });
}
