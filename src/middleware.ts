import { jwtDecode } from 'jwt-decode'
import { getToken } from "next-auth/jwt"
import { NextResponse, type MiddlewareConfig, type NextRequest } from "next/server"

const publicRoutes = [
  { path: "/sign-in", whenAuthenticated: 'redirect'},
  { path: "/sign-up", whenAuthenticated: 'redirect'},
  { path: "/", whenAuthenticated: "redirect" },
  { path: "/forgot-password", whenAuthenticated: 'redirect' },
  { path: "/reset-password", whenAuthenticated: 'redirect' },

] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED = '/sign-in'

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|images|icons|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}


export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  console.log("🛑 Middleware executado - Token:", token)

  const path = request.nextUrl.pathname
  const publicRoute = publicRoutes.find(route => route.path === path)
  const authToken = request.cookies.get('next-auth.session-token') 
  ?? request.cookies.get('__Secure-next-auth.session-token')

  if(!authToken && publicRoute){
    return NextResponse.next()
  }

  if(!authToken && !publicRoute){
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED

    return NextResponse.redirect(redirectUrl)
  }

  if(authToken && publicRoute && publicRoute.whenAuthenticated == 'redirect'){

    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/'

    return NextResponse.redirect(redirectUrl)
  }

  if (authToken && !publicRoute) {
    // verificar se o token está expirado
    //se sim ir para login 
    return NextResponse.next()
  }

  return NextResponse.next()
}