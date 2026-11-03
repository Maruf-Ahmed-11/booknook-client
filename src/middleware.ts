import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export default async function middleware(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const user = session?.user
    if (!user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: ['/add-book', '/my-books', '/my-borrows', '/books/:id'],
}