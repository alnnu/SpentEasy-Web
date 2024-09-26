import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const jwt = request.cookies.get("next-auth.session-token");
    if (!jwt) {
        request.nextUrl.pathname = "/signin";
        return NextResponse.redirect(request.nextUrl.href);
    }
    return null
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/", "/transaction", "/categories", "/accounts", "/setting"],
}