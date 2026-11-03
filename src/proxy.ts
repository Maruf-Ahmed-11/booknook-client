import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Added "default" to the export to satisfy the new proxy convention
export default async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const protectedRoutes = ["/add-book", "/my-borrows"];
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

    if (isProtectedRoute) {
        const response = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
            headers: {
                cookie: request.headers.get("cookie") || "",
            },
        });

        if (!response.ok) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/add-book", "/my-borrows"],
};