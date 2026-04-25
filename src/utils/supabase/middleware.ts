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
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
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

  const pathname = request.nextUrl.pathname
  const role = user?.user_metadata?.role as string | undefined

  // ─── GİRİŞ YAPMAMIŞ KULLANICILAR İÇİN KORUMA ───
  if (!user) {
    // Admin paneli → login'e yönlendir
    if (pathname.startsWith('/admin')) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    // Hekim paneli → hekim login'e yönlendir
    if (pathname.startsWith('/hekim') && !pathname.startsWith('/care-login')) {
      const url = request.nextUrl.clone()
      url.pathname = '/care-login'
      return NextResponse.redirect(url)
    }

    // Care korumalı rotalar → hasta login'e yönlendir
    const isCareProtectedRoute = 
      pathname.startsWith('/pet-karne') || 
      pathname.startsWith('/receteler') || 
      pathname.startsWith('/faturalar') ||
      pathname.startsWith('/hastane/profil')
      
    if (isCareProtectedRoute) {
      const url = request.nextUrl.clone()
      url.pathname = '/care-login'
      return NextResponse.redirect(url)
    }

    // Mağaza korumalı rotalar → mağaza login'e yönlendir
    const isStoreProtectedRoute = 
      (pathname.startsWith('/profil') && !pathname.startsWith('/hastane/profil')) ||
      pathname.startsWith('/odeme')

    if (isStoreProtectedRoute) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  // ─── GİRİŞ YAPMIŞ KULLANICILAR İÇİN ROL KONTROLÜ ───
  if (user) {
    // Admin paneli: sadece admin erişebilir
    if (pathname.startsWith('/admin')) {
      if (role !== 'admin') {
        const url = request.nextUrl.clone()
        url.pathname = '/urunler'
        return NextResponse.redirect(url)
      }
    }

    // Giriş sayfalarından uzaklaştır (zaten giriş yapmış)
    // NOT: admin kullanıcı da /login'e geldiğinde /urunler'e gider,
    // /admin'e ulaşmak için "Yönetici Girişi" sekmesini kullanmalıdır.
    if (pathname === '/login') {
      const url = request.nextUrl.clone()
      url.pathname = '/urunler'
      return NextResponse.redirect(url)
    }
    if (pathname === '/care-login') {
      const url = request.nextUrl.clone()
      // Hekim veya admin → hekim paneli, değilse hasta profiline
      url.pathname = (role === 'vet' || role === 'admin') ? '/hekim' : '/hastane/profil'
      return NextResponse.redirect(url)
    }

    // Hekim paneline sadece vet/admin erişebilir
    if (pathname.startsWith('/hekim') && !pathname.startsWith('/care-login')) {
      if (role !== 'vet' && role !== 'admin') {
        const url = request.nextUrl.clone()
        url.pathname = '/care-login'
        return NextResponse.redirect(url)
      }
    }

    // Hasta paneline hekim erişemez (kendi paneli var)
    if (pathname.startsWith('/hastane/profil') || pathname.startsWith('/pet-karne')) {
      if (role === 'vet') {
        const url = request.nextUrl.clone()
        url.pathname = '/hekim'
        return NextResponse.redirect(url)
      }
    }
  }

  return supabaseResponse
}
