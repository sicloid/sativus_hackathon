import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Fetching the user checks the token validity and refreshes if needed.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect specific routes
  if (!user) {
    // Only redirect if it's the protected /hekim route, NOT /hekim-login itself
    if (request.nextUrl.pathname.startsWith('/hekim') && !request.nextUrl.pathname.startsWith('/hekim-login')) {
      const url = request.nextUrl.clone()
      url.pathname = '/hekim-login'
      return NextResponse.redirect(url)
    }

    const isMemberProtectedRoute = 
      request.nextUrl.pathname.startsWith('/pet-karne') || 
      request.nextUrl.pathname.startsWith('/receteler') || 
      request.nextUrl.pathname.startsWith('/faturalar')

    if (isMemberProtectedRoute) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  // Redirect logged-in users away from the login pages
  if (user) {
    if (request.nextUrl.pathname === '/login') {
      const url = request.nextUrl.clone()
      url.pathname = '/hastane'
      return NextResponse.redirect(url)
    }
    if (request.nextUrl.pathname === '/hekim-login') {
      const url = request.nextUrl.clone()
      url.pathname = '/hekim'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
