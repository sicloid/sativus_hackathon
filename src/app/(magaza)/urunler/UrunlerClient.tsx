'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ProductCard, { Product } from '@/components/ProductCard'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useToast } from '@/context/ToastContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { X, Sparkles, Calendar, Tag } from 'lucide-react'

// Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const CATEGORIES = ['Tümü', 'Kedi', 'Köpek', 'Kuş', 'Balık', 'Kemirgen', 'Mama', 'Aksesuar', 'Sağlık', 'Oyuncak', 'Bakım']
const SORT_OPTIONS = [
  { label: 'En Yeniler', value: 'newest' },
  { label: 'Fiyat: Düşükten Yükseğe', value: 'price_asc' },
  { label: 'Fiyat: Yüksekten Düşüğe', value: 'price_desc' },
]

const CAMPAIGNS = [
  {
    id: 1,
    title: 'Bahar İndirimleri Başladı!',
    description: 'Tüm kedi ve köpek mamalarında %20 net indirim fırsatını kaçırmayın.',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1200&q=80',
    color: 'bg-[var(--brutal-yellow)]',
    details: 'Baharın gelmesiyle birlikte patili dostlarımızın beslenme ihtiyaçlarını daha uygun fiyatlarla karşılıyoruz. Kampanya 31 Mayıs tarihine kadar tüm markalarda geçerlidir.'
  },
  {
    id: 2,
    title: 'Yeni Üyelere Özel Fırsat',
    description: 'İlk alışverişinizde geçerli 100 TL indirim kuponu tanımlandı.',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1200&q=80',
    color: 'bg-[var(--brutal-blue)]',
    details: 'PetVerse ailesine katılan her yeni üyemize teşekkür etmek istiyoruz. Minimum 500 TL üzeri alışverişlerde geçerli "HOSGELDIN100" kodunu ödeme sayfasında kullanabilirsiniz.'
  },
  {
    id: 3,
    title: 'Oyuncaklarda 3 Al 2 Öde',
    description: 'Eğlence dolu anlar için tüm interaktif oyuncaklarda büyük kampanya.',
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=1200&q=80',
    color: 'bg-[var(--brutal-green)]',
    details: 'Kediniz ve köpeğiniz için en eğlenceli oyuncakları seçin, 3 ürün eklediğinizde en düşük fiyatlı olan bizden hediye!'
  }
]

interface UrunlerClientProps {
  initialProducts: Product[]
}

export default function UrunlerClient({ initialProducts }: UrunlerClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const { showToast } = useToast()

  // URL State
  const currentCategory = searchParams.get('kategori') || 'Tümü'
  const currentSort = searchParams.get('sirala') || 'newest'
  const currentSearch = searchParams.get('ara') || ''

  // Campaign Modal State
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null)

  const updateFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === 'Tümü' || value === '') {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })
    router.push(`/urunler?${params.toString()}`)
  }

  const handleAddToCart = (productId: string) => {
    const product = initialProducts.find(p => p.id === productId)
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url
      })
      showToast('Ürün sepete eklendi!')
    }
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Campaign Slider */}
      {!currentSearch && (
        <section className="brutal-border brutal-shadow overflow-hidden bg-white">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            className="h-[300px] md:h-[400px]"
          >
            {CAMPAIGNS.map(campaign => (
              <SwiperSlide key={campaign.id}>
                <div 
                  className="relative h-full w-full flex items-center cursor-pointer group"
                  onClick={() => setSelectedCampaign(campaign)}
                >
                  <img 
                    src={campaign.image} 
                    alt={campaign.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-center px-8 md:px-16 space-y-4">
                    <motion.div 
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      className={`${campaign.color} inline-block px-4 py-2 brutal-border font-black uppercase text-xs md:text-sm`}
                    >
                      Bahar İndirimleri ve Kampanyalar
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter max-w-2xl">
                      {campaign.title}
                    </h2>
                    <p className="text-white/90 font-bold text-sm md:text-lg max-w-xl">
                      {campaign.description}
                    </p>
                    <button className="bg-white text-black px-6 py-3 brutal-border font-black uppercase text-sm w-fit brutal-shadow-hover transition-all">
                      Detayları Gör
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

      {/* Filters & Sorting */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sticky top-24 z-40 bg-[var(--brutal-yellow)] brutal-border p-4 brutal-shadow">
        {/* Categories Tab */}
        <div className="flex-1 overflow-x-auto w-full">
          <div className="flex gap-2 pb-1">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => updateFilters({ kategori: category })}
                className={`px-4 py-2 font-black uppercase text-xs whitespace-nowrap brutal-border transition-all ${
                  currentCategory === category
                    ? 'bg-black text-white brutal-shadow'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-between md:justify-end">
          <label className="font-black uppercase text-xs">Sırala:</label>
          <select
            value={currentSort}
            onChange={(e) => updateFilters({ sirala: e.target.value })}
            className="p-2 brutal-border font-bold outline-none bg-white cursor-pointer min-w-[160px]"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Header */}
      {currentSearch && (
        <div className="bg-black text-white brutal-border p-4 flex justify-between items-center">
          <h2 className="text-xl font-black uppercase">
            🔍 "{currentSearch}" Araması İçin {initialProducts.length} Sonuç
          </h2>
          <button 
            onClick={() => updateFilters({ ara: null })}
            className="bg-white text-black px-3 py-1 text-xs font-black uppercase brutal-border hover:bg-[var(--brutal-red)] hover:text-white"
          >
            Aramayı Kapat
          </button>
        </div>
      )}

      {/* Product Grid Area */}
      <section className="bg-yellow-50/50 brutal-border p-4 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {initialProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {initialProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onToggleFavorite={(id) => toggleFavorite(initialProducts.find(p => p.id === id)!)}
                isFavorite={isFavorite(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[var(--brutal-yellow)] brutal-border brutal-shadow p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-3xl font-black uppercase mb-4">Aradığınız kriterlere uygun ürün bulunamadı.</h2>
            <p className="text-xl font-bold mb-8">Farklı bir arama terimi deneyebilir veya filtreleri sıfırlayabilirsiniz.</p>
            <button
              onClick={() => updateFilters({ ara: null, kategori: null, sirala: null })}
              className="px-8 py-4 bg-black text-white font-black uppercase brutal-border brutal-shadow brutal-shadow-hover hover:bg-white hover:text-black transition-all"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </section>

      {/* Campaign Modal */}
      <AnimatePresence>
        {selectedCampaign && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCampaign(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative bg-white brutal-border brutal-shadow w-full max-w-2xl overflow-hidden"
            >
              <button 
                onClick={() => setSelectedCampaign(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black text-white brutal-border hover:bg-[var(--brutal-red)] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="h-48 sm:h-64 relative">
                <img src={selectedCampaign.image} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className={`${selectedCampaign.color} px-3 py-1 brutal-border font-black uppercase text-xs mb-2 inline-block`}>
                    Aktif Kampanya
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter">
                    {selectedCampaign.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 brutal-border flex items-center gap-3">
                    <Sparkles className="text-[var(--brutal-yellow)] w-6 h-6" />
                    <div>
                      <p className="text-[10px] font-black uppercase text-gray-500">İndirim Oranı</p>
                      <p className="font-black text-lg">%20'ye Varan</p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 brutal-border flex items-center gap-3">
                    <Calendar className="text-[var(--brutal-blue)] w-6 h-6" />
                    <div>
                      <p className="text-[10px] font-black uppercase text-gray-500">Son Tarih</p>
                      <p className="font-black text-lg">31 Mayıs 2024</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-black uppercase flex items-center gap-2">
                    <Tag className="w-4 h-4" /> Kampanya Detayları
                  </h4>
                  <p className="font-bold text-gray-700 leading-relaxed">
                    {selectedCampaign.details}
                  </p>
                </div>

                <button 
                  onClick={() => setSelectedCampaign(null)}
                  className="w-full py-4 bg-black text-white font-black uppercase tracking-widest hover:bg-[var(--brutal-green)] transition-colors brutal-border"
                >
                  Alışverişe Devam Et
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
