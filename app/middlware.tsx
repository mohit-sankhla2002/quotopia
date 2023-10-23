import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const userToken = request.cookies.get('next-auth.session-token')?.value;
    if (!userToken) {
        return NextResponse.redirect(new URL('/desired-route', request.url))
    }
    else {
        return NextResponse.redirect(new URL('/desired-route', request.url))
    }
}
export const config = {
    matcher: '/desired-route',
}