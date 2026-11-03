import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const protectedRoutes = ["/add-book", "/my-borrows"];
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

    if (isProtectedRoute) {
        // Check for the BetterAuth session cookie directly instead of fetching the API
        // This prevents the Next.js dev server from deadlocking and hanging on refresh
        const hasSession = request.cookies.getAll().some(cookie =>
            cookie.name.includes("better-auth.session_token")
        );

        if (!hasSession) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/add-book", "/my-borrows"],
};