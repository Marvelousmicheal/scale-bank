import { NextResponse, type NextRequest } from "next/server"

const ACCESS_TOKEN_COOKIE = "scale9_access_token"
const ROLE_COOKIE = "scale9_role"

export function proxy(request: NextRequest) {
  if (process.env.SCALE9_AUTH_REQUIRED === "false") return NextResponse.next()

  const isLogin = request.nextUrl.pathname === "/login"
  const isPublic = request.nextUrl.pathname.startsWith("/pay/") || request.nextUrl.pathname.startsWith("/checkout/") || request.nextUrl.pathname.startsWith("/login/")
  const role = request.cookies.get(ROLE_COOKIE)?.value
  const isAuthenticated = request.cookies.has(ACCESS_TOKEN_COOKIE) && (role === "ADMIN" || role === "SUPER_ADMIN")

  if (!isAuthenticated && !isLogin && !isPublic) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("next", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthenticated && isLogin) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|image).*)"],
}
