import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function proxy(req) {
    const role = req.nextauth.token?.role
    if (role !== 'ADMIN' && role !== 'RECRUITER') {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    },
  }
)

export const config = {
  matcher: ['/admin/:path*'],
}
