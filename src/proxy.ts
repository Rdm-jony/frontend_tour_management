import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get("accessToken")?.value
    const authRoutes = ["/signIn", "/signUp"]
    const isAuthRoute = authRoutes.some(route => route == pathname)
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
}
export const config = {
    matcher: ['/signIn', "/signUp"],
}