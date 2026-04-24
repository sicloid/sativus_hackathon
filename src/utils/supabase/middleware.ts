import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables are missing. Skipping auth check.')
    return supabaseResponse
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
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

    const isCareProtectedRoute = 
      request.nextUrl.pathname.startsWith('/pet-karne') || 
      request.nextUrl.pathname.startsWith('/receteler') || 
      request.nextUrl.pathname.startsWith('/faturalar') ||
      request.nextUrl.pathname.startsWith('/hastane/profil')
      
    const isStoreProtectedRoute = 
      request.nextUrl.pathname.startsWith('/profil') && !request.nextUrl.pathname.startsWith('/hastane/profil') ||
      request.nextUrl.pathname.startsWith('/odeme')

    if (isCareProtectedRoute) {
      const url = request.nextUrl.clone()
      url.pathname = '/hasta-login'
      return NextResponse.redirect(url)
    }

    if (isStoreProtectedRoute) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  // Redirect logged-in users away from the login pages
  if (user) {
    if (request.nextUrl.pathname === '/login') {
      const url = request.nextUrl.clone()
      url.pathname = '/urunler'
      return NextResponse.redirect(url)
    }
    if (request.nextUrl.pathname === '/hasta-login') {
      const url = request.nextUrl.clone()
      url.pathname = '/hastane/profil'
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
