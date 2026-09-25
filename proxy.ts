import { NextResponse, type NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { SITE_GATE_COOKIE, isGateEnabled, isGateExempt, gateCookieMatches } from '@/lib/site-gate'

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Gratis alternatief voor Vercel Password Protection: de hele publieke site achter
  // één gedeeld wachtwoord, behalve de jobboard-feeds, de admin-login en statische assets.
  if (isGateEnabled() && !isGateExempt(pathname)) {
    const cookie = req.cookies.get(SITE_GATE_COOKIE)?.value
    if (!gateCookieMatches(cookie)) {
      const url = new URL('/site-gate', req.url)
      url.searchParams.set('next', pathname + req.nextUrl.search)
      return NextResponse.redirect(url)
    }
  }

  if (pathname.startsWith('/admin')) {
    const token = await getToken({ req })
    const role = token?.role
    if (role !== 'ADMIN' && role !== 'RECRUITER') {
      const url = new URL('/login', req.url)
      url.searchParams.set('callbackUrl', pathname + req.nextUrl.search)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
