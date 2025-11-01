import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get("accessToken")?.value
    const authRoutes = ["/signIn", "/signUp"]
    const protectedRoutes = ["/dashboard"]
    const isProtectedRoutes = protectedRoutes.some(route => pathname.startsWith(route))
    const isAuthRoute = authRoutes.some(route => route == pathname)
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    if (isProtectedRoutes && !token) {
        return NextResponse.redirect(new URL("/signIn", request.url))

    }

    return NextResponse.next()
}
export const config = {
    matcher: ['/signIn', "/signUp", "/dashboard/:path*"],
}