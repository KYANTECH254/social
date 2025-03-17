import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const publicPaths = [
        "/terms",
        "/privacy-policy",
        "/auth",
        "/auth/account",
        "/auth/finish-setup",
    ];

    const authPaths = [
        "/auth",
        "/auth/account",
        "/auth/finish-setup",
    ];

    const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
    const isAuthPath = authPaths.some(path => pathname.startsWith(path));
    const isApiRoute = pathname.startsWith("/api/session");

    if (isPublicPath || isApiRoute) {
        return NextResponse.next();
    }

    const hasSession = req.cookies.has("accessToken");
    // if (hasSession || isAuthPath) {
    //     return NextResponse.redirect(new URL("/", req.url));
    // } else 
    if (!hasSession) {
        return NextResponse.redirect(new URL("/auth", req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico).*)"
    ],
};
