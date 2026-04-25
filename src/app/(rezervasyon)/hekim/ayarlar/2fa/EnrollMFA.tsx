'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useRouter } from 'next/navigation'

export default function EnrollMFA() {
  const [factorId, setFactorId] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    // Component mount olduğunda MFA başlat
    const initMFA = async () => {
      setLoading(true)
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
      })
      if (error) {
        setError(error.message)
      } else if (data) {
        setFactorId(data.id)
        setQrCode(data.totp.qr_code)
      }
      setLoading(false)
    }
    
    initMFA()
  }, [])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

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
      setSuccess('2 Aşamalı Doğrulama (2FA) başarıyla aktif edildi!')
      setTimeout(() => {
        router.push('/hekim/ayarlar')
        router.refresh()
      }, 2000)
    }
    setLoading(false)
  }

  return (
    <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 mt-4 rounded-2xl mb-8">
      <h2 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">2FA Kurulumu</h2>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 font-bold">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 font-bold">
          {success}
        </div>
      )}

      {qrCode ? (
        <div className="flex flex-col items-center">
          <p className="mb-4 text-center font-medium">
            1. Google Authenticator veya benzeri bir uygulamayı açın.<br />
            2. Aşağıdaki QR kodunu okutun.
          </p>
          <div className="border-4 border-black p-4 bg-white mb-6">
            <img src={qrCode} alt="2FA QR Code" width={250} height={250} />
          </div>
          
          <form onSubmit={handleVerify} className="w-full max-w-md flex flex-col gap-4">
            <label htmlFor="verifyCode" className="font-bold uppercase text-sm text-gray-600 text-center">
              Uygulamada Görünen 6 Haneli Kodu Girin
            </label>
            <Input 
              id="verifyCode"
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
              placeholder="123456"
              className="text-center text-2xl tracking-widest"
              maxLength={6}
              required
            />
            <Button type="submit" disabled={loading || verifyCode.length < 6} className="w-full mt-2 py-3">
              {loading ? 'Doğrulanıyor...' : 'Doğrula ve Etkinleştir'}
            </Button>
          </form>
        </div>
      ) : (
        <div className="text-center py-8">
          {loading ? 'QR Kod oluşturuluyor...' : 'Hazırlanıyor...'}
        </div>
      )}
    </div>
  )
}
