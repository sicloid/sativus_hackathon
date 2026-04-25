'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useRouter } from 'next/navigation'

export default function VerifyMFA() {
  const [factorId, setFactorId] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    // List factors to find the enrolled TOTP
    const fetchFactors = async () => {
      const { data, error } = await supabase.auth.mfa.listFactors()
      if (error) {
        setError(error.message)
      } else if (data && data.totp && data.totp.length > 0) {
        // En son eklenen TOTP faktörünü kullan
        setFactorId(data.totp[data.totp.length - 1].id)
      } else {
        // TOTP bulunamadıysa giriş sayfasına dön
        router.push('/care-login')
      }
    }
    
    fetchFactors()
  }, [router, supabase.auth.mfa])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!factorId) {
      setError('2FA faktörü bulunamadı.')
      setLoading(false)
      return
    }

    const challenge = await supabase.auth.mfa.challenge({ factorId })
    if (challenge.error) {
      setError(challenge.error.message)
      setLoading(false)
      return
    }

    const verify = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.data.id,
      code: verifyCode,
    })

    if (verify.error) {
      setError(verify.error.message)
    } else {
      // Başarılı! Hekim paneline yönlendir.
      router.push('/hekim')
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 mt-4 rounded-2xl mb-8 mx-auto text-center">
      <h2 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">Güvenlik Kontrolü</h2>
      <p className="mb-6 font-medium text-gray-600">Lütfen kimlik doğrulama uygulamanızdaki (Google Authenticator vb.) 6 haneli kodu girin.</p>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 font-bold text-left">
          {error}
        </div>
      )}

      <form onSubmit={handleVerify} className="flex flex-col gap-4">
        <Input 
          id="verifyCode"
          value={verifyCode}
          onChange={(e) => setVerifyCode(e.target.value)}
          placeholder="123456"
          className="text-center text-3xl tracking-[0.5em] py-4 font-black"
          maxLength={6}
          required
        />
        <Button type="submit" disabled={loading || verifyCode.length < 6} className="w-full mt-4 py-4 text-lg">
          {loading ? 'Doğrulanıyor...' : 'Giriş Yap'}
        </Button>
      </form>
    </div>
  )
}
