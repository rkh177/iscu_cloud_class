import { NextResponse } from "next/server";
import { authenticate } from "./lib/auth";
import { authorize } from "./lib/authorization";

function authenticationRequiredResponse() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin"',
      "Cache-Control": "no-store",
    },
  });
}

function forbiddenResponse() {
  return new NextResponse("Forbidden", {
    status: 403,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export function proxy(request) {
  const user = authenticate(request);

  if (!user) {
    return authenticationRequiredResponse();
  }

  if (!authorize(user, "admin:page")) {
    return forbiddenResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
