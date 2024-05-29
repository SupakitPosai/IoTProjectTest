import { getCookie } from 'cookies-next';
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
      const currentUser = request.cookies.get('token')?.value
    // const currentUser = await getCookie('token');
console.log('currentUser :>> ', process.env.URL_API);
    if (currentUser && !request.nextUrl.pathname.startsWith('/')) {
        return Response.redirect(new URL('/', request.url))
    }
   

    if (!currentUser && !request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/register')) {
        return Response.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}