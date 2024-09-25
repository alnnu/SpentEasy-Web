import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(
    req: NextRequest
): Promise<NextResponse | null> {
    // const jwt = req.cookies.get("next-auth.session-token");
    //
    // const { pathname } = req.nextUrl;
    // const routesToBlock = ["/", "/transaction", "/categories", "/accounts", "/setting"]
    // if (!pathname.endsWith("/") &&  pathname !== "/signin") {
    //     if (!jwt) {
    //         req.nextUrl.pathname = "/signin";
    //         return NextResponse.redirect(req.nextUrl.href);
    //     }
    // }
    //
    // if (pathname.startsWith("/signin")) {
    //     if (jwt) {
    //         req.nextUrl.pathname = "/";
    //         return NextResponse.redirect(req.nextUrl.href);
    //     }
    // }

    return null; // Return null to indicate no redirection
}