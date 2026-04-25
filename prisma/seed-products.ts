/**
 * PetVerse — 50 Ürün Seed Script
 * Çalıştır: npx ts-node --project tsconfig.json prisma/seed-products.ts
 * ya da: npx tsx prisma/seed-products.ts
 */
import { config } from 'dotenv'
import fs from 'fs'
config({ path: fs.existsSync('.env.local') ? '.env.local' : '.env' })

import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const products = [
  // ─── MAMA (12 ürün) ─────────────────────────────────────────────────────────
  {
    name: 'Royal Canin Medium Adult',
    description: 'Orta ırk yetişkin köpekler için özel formüllü günlük mama. Sindirim ve eklem sağlığını destekler.',
    price: 649.90, category: 'Mama', stockQuantity: 85,
    imageUrl: 'https://images.unsplash.com/photo-1589924691995-400dc9eee74c?w=400&q=80',
  },
  {
    name: 'Purina Pro Plan Kedi Somonlu',
    description: 'Yetişkin kediler için gerçek somonla zenginleştirilmiş yüksek proteinli mama.',
    price: 489.00, category: 'Mama', stockQuantity: 120,
    imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&q=80',
  },
  {
    name: 'Hill\'s Science Diet Tavuklu',
    description: 'Veteriner tavsiyeli, doğal içeriklerle üretilmiş köpek maması. Bağışıklık sistemini güçlendirir.',
    price: 729.50, category: 'Mama', stockQuantity: 60,
    imageUrl: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&q=80',
  },
  {
    name: 'Acana Wilderness Kuzu Etli',
    description: 'Tahılsız, yüksek et içerikli premium köpek maması. Biyolojik ihtiyaçlara uygun formül.',
    price: 895.00, category: 'Mama', stockQuantity: 45,
    imageUrl: 'https://images.unsplash.com/photo-1589924691995-400dc9eee74c?w=400&q=80',
  },
  {
    name: 'Whiskas Yaşlı Kedi Maması',
    description: '7+ yaş kediler için özel geliştirilmiş, eklem ve böbrek sağlığını destekleyen mama.',
    price: 275.00, category: 'Mama', stockQuantity: 200,
    imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&q=80',
  },
  {
    name: 'Orijen Cat & Kitten',
    description: 'Her yaş kedi için biologically appropriate formül. %90 hayvansal protein içerir.',
    price: 1120.00, category: 'Mama', stockQuantity: 30,
    imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&q=80',
  },
  {
    name: 'Pedigree Küçük Irk Köpek',
    description: 'Küçük ırk köpekler için özel büyüklükte kibble. Diş sağlığı destekleyici.',
    price: 189.90, category: 'Mama', stockQuantity: 150,
    imageUrl: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&q=80',
  },
  {
    name: 'Brit Premium Cat Hindili',
    description: 'Hindili ve tavuklu, tahılsız yetişkin kedi maması. Tüy sağlığını destekler.',
    price: 345.00, category: 'Mama', stockQuantity: 90,
    imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&q=80',
  },
  {
    name: 'Eukanuba Large Breed Puppy',
    description: 'Büyük ırk köpek yavruları için DHA içerikli mama. Sağlıklı büyümeyi destekler.',
    price: 560.00, category: 'Mama', stockQuantity: 55,
    imageUrl: 'https://images.unsplash.com/photo-1589924691995-400dc9eee74c?w=400&q=80',
  },
  {
    name: 'Iams Hairball Control Kedi',
    description: 'Uzun tüylü kediler için tüy yumağı önleyici özel mama formülü.',
    price: 415.00, category: 'Mama', stockQuantity: 75,
    imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&q=80',
  },
  {
    name: 'Pro Plan Veterinary Renal',
    description: 'Böbrek hastalığı olan kediler için veteriner diyeti mama. Düşük fosfor içerikli.',
    price: 780.00, category: 'Mama', stockQuantity: 25,
    imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&q=80',
  },
  {
    name: 'Monge Natural Superpremium',
    description: 'İtalyan yapımı, doğal içeriklerle hazırlanmış küçük ırk köpek maması.',
    price: 520.00, category: 'Mama', stockQuantity: 40,
    imageUrl: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&q=80',
  },

  // ─── SAĞLIK (10 ürün) ────────────────────────────────────────────────────────
  {
    name: 'Frontline Plus Kene & Pire Damlası',
    description: 'Köpekler için kene, pire ve bit önleyici aylık spot-on damla. 3\'lü paket.',
    price: 320.00, category: 'Sağlık', stockQuantity: 100,
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&q=80',
  },
  {
    name: 'Beaphar Vitamin C Kemirgenler',
    description: 'Kobay, chinchilla ve diğer kemirgenler için suda çözünür C vitamini takviyesi.',
    price: 89.90, category: 'Sağlık', stockQuantity: 180,
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&q=80',
  },
  {
    name: 'Drontal Kedi Kurtluk Tableti',
    description: 'Kedilerde iç parazitlere karşı etkili, veteriner onaylı iç parazit ilacı.',
    price: 145.00, category: 'Sağlık', stockQuantity: 90,
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&q=80',
  },
  {
    name: 'Nutrapet Eklem Desteği',
    description: 'Köpekler için glukozamin ve kondroitin içeren eklem ve kemik sağlığı takviyesi.',
    price: 265.00, category: 'Sağlık', stockQuantity: 65,
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&q=80',
  },
  {
    name: 'Adaptil Sakinleştirici Tasma',
    description: 'Köpeklerde stres ve anksiyeteyi azaltan feromonlu sakinleştirici tasma.',
    price: 389.00, category: 'Sağlık', stockQuantity: 45,
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&q=80',
  },
  {
    name: 'Feliway Kedi Sakinleştirici Sprey',
    description: 'Taşınma, veteriner ziyareti gibi stres yaratan durumlarda kullanılan kedi sprey.',
    price: 245.00, category: 'Sağlık', stockQuantity: 70,
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&q=80',
  },
  {
    name: 'Pet-Eye Göz Damlası',
    description: 'Köpek ve kediler için göz temizliği ve hafif enfeksiyonlarda kullanılan steril damla.',
    price: 75.00, category: 'Sağlık', stockQuantity: 200,
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&q=80',
  },
  {
    name: 'Omega 3 Balık Yağı Kapsül',
    description: 'Köpek ve kediler için tüy parlaklığı ve deri sağlığını destekleyen balık yağı.',
    price: 159.00, category: 'Sağlık', stockQuantity: 110,
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&q=80',
  },
  {
    name: 'Dentastix Diş Temizleme Çubuğu',
    description: 'Her gün tüketilebilen, diş taşı ve plak önleyici köpek ödül çubuğu.',
    price: 129.90, category: 'Sağlık', stockQuantity: 150,
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&q=80',
  },
  {
    name: 'ProBiotic Sindirim Desteği',
    description: 'Kedi ve köpekler için sindirim sistemini dengeleyen probiyotik takviye.',
    price: 195.00, category: 'Sağlık', stockQuantity: 80,
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&q=80',
  },

  // ─── AKSESUAR (10 ürün) ──────────────────────────────────────────────────────
  {
    name: 'Ruffwear Front Range Tasma',
    description: 'Aktif köpekler için dayanıklı, yansıtıcı bantlı göğüs tasması. XS-XL beden.',
    price: 425.00, category: 'Aksesuar', stockQuantity: 55,
    imageUrl: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&q=80',
  },
  {
    name: 'Catit Pirinç Şelaleli Suluk',
    description: 'Filtreli, sessiz çalışan kedi su çeşmesi. Taze akan su ile hidrasyon sağlar.',
    price: 349.00, category: 'Aksesuar', stockQuantity: 40,
    imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&q=80',
  },
  {
    name: 'Kong Classic Rubber Oyuncak',
    description: 'İçine mama doldurulabilen dayanıklı kauçuk köpek oyuncağı. Zihinsel uyarım sağlar.',
    price: 185.00, category: 'Aksesuar', stockQuantity: 90,
    imageUrl: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&q=80',
  },
  {
    name: 'Trixie Kedi Tırmalama Kalesi',
    description: '5 katlı, peluş kaplı kedi tırmalama ve dinlenme kulesi. 145 cm yükseklik.',
    price: 899.00, category: 'Aksesuar', stockQuantity: 20,
    imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&q=80',
  },
  {
    name: 'Kuranda Elevated Köpek Yatağı',
    description: 'Çift katmanlı örgü yüzey, paslanmaz çelik çerçeve, ortopedik köpek yatağı.',
    price: 650.00, category: 'Aksesuar', stockQuantity: 30,
    imageUrl: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&q=80',
  },
  {
    name: 'Rogz Köpek Kimlikleri',
    description: 'Renkli, kişiselleştirilebilir köpek kimlik kolye seti. Kaybolma durumunda iletişim bilgisi.',
    price: 65.00, category: 'Aksesuar', stockQuantity: 250,
    imageUrl: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&q=80',
  },
  {
    name: 'Savic Kedi Kapalı Tuvalet',
    description: 'Kötü koku önleyici filtreli, kapalı tasarımlı kedi tuvalet kabini.',
    price: 475.00, category: 'Aksesuar', stockQuantity: 35,
    imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&q=80',
  },
  {
    name: 'Hunter Reflektif Köpek Yeleği',
    description: 'Gece yürüyüşleri için 360° yansıtıcı bantlı güvenlik yeleği.',
    price: 285.00, category: 'Aksesuar', stockQuantity: 60,
    imageUrl: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&q=80',
  },
  {
    name: 'Pet Selfie Stick Klipsi',
    description: 'Telefona takılan, köpek dikkatini çeken sesli klips. Mükemmel anı yakala!',
    price: 49.90, category: 'Aksesuar', stockQuantity: 300,
    imageUrl: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&q=80',
  },
  {
    name: 'Moderna Plastik Taşıma Kafesi',
    description: 'Havalandırmalı, kilitleme mekanizmalı köpek/kedi taşıma kafesi. Kabin uyumlu.',
    price: 520.00, category: 'Aksesuar', stockQuantity: 25,
    imageUrl: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&q=80',
  },

  // ─── OYUNCAK (10 ürün) ───────────────────────────────────────────────────────
  {
    name: 'Chuckit Ultra Topu',
    description: 'Köpekler için ultra dayanıklı kauçuk top. Her hava koşulunda kullanılabilir.',
    price: 95.00, category: 'Oyuncak', stockQuantity: 120,
    imageUrl: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&q=80',
  },
  {
    name: 'Petstages Crinkle & Squeak',
    description: 'Hem çıtırdayan hem de ses çıkaran peluş köpek oyuncağı seti. 3\'lü paket.',
    price: 145.00, category: 'Oyuncak', stockQuantity: 85,
    imageUrl: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&q=80',
  },
  {
    name: 'Da Bird Kedi Tüy Değneği',
    description: 'Gerçek tüy ve interaktif çubuk tasarımlı, kedilerin doğal içgüdüsünü uyaran oyuncak.',
    price: 89.00, category: 'Oyuncak', stockQuantity: 100,
    imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&q=80',
  },
  {
    name: 'Outward Hound Puzzle Oyuncak',
    description: 'Zeka geliştiren, mama gizli, 3 zorluk seviyeli köpek bulmaca oyuncağı.',
    price: 275.00, category: 'Oyuncak', stockQuantity: 50,
    imageUrl: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&q=80',
  },
  {
    name: 'Fur Missile Lober Makinesi',
    description: 'Otomatik top atan köpek oyun makinesi. 3 mesafe ayarı, güvenli sensör sistemi.',
    price: 1250.00, category: 'Oyuncak', stockQuantity: 15,
    imageUrl: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&q=80',
  },
  {
    name: 'Yeowww Kedi Nanesi Bananası',
    description: '100% organik kedi nanesi dolgulu, dayanıklı brüksel kumaştan yapılmış kedi oyuncağı.',
    price: 65.00, category: 'Oyuncak', stockQuantity: 175,
    imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&q=80',
  },
  {
    name: 'Tuffy Ocean Köpek Oyuncağı',
    description: 'Aşırı çiğneyen köpekler için 7 katlı dayanıklı kumaştan yapılmış ahtapot oyuncak.',
    price: 195.00, category: 'Oyuncak', stockQuantity: 60,
    imageUrl: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&q=80',
  },
  {
    name: 'Interactive Laser Kedi Oyunu',
    description: 'Otomatik dönen, farklı desenlerde lazer ışınlı kedi egzersiz oyuncağı.',
    price: 155.00, category: 'Oyuncak', stockQuantity: 80,
    imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&q=80',
  },
  {
    name: 'Barkworthies Antler Çiğneme',
    description: 'Doğal geyik boynuzu çiğneme oyuncağı. Diş sağlığını destekler, uzun süre dayanır.',
    price: 245.00, category: 'Oyuncak', stockQuantity: 45,
    imageUrl: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&q=80',
  },
  {
    name: 'Hagen Catit Senses 2.0',
    description: 'Kedi duyularını uyaran modüler oyun sistemi: tünel, top yolu, çim bahçe.',
    price: 380.00, category: 'Oyuncak', stockQuantity: 30,
    imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&q=80',
  },

  // ─── BAKIM (8 ürün) ──────────────────────────────────────────────────────────
  {
    name: 'Furminator Uzun Tüy Tarağı',
    description: 'Köpek ve kedilerde deri altı ölü tüyleri %90 azaltan profesyonel tımar aleti.',
    price: 450.00, category: 'Bakım', stockQuantity: 55,
    imageUrl: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&q=80',
  },
  {
    name: 'Tropiclean Berry & Coconut Şampuan',
    description: 'Hindistan cevizi ve böğürtlen özlü, hypoallergenic köpek şampuanı. 473ml.',
    price: 185.00, category: 'Bakım', stockQuantity: 90,
    imageUrl: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&q=80',
  },
  {
    name: 'Pet Paw Balm Pençe Koruyucu',
    description: 'Sıcak asfalt ve kış tuzuna karşı koruyucu organik pençe balmı.',
    price: 99.00, category: 'Bakım', stockQuantity: 140,
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&q=80',
  },
  {
    name: 'Andis ProClip Ultra Clipper',
    description: 'Profesyonel kalitede, titreşimsiz köpek tıraş makinesi. 5 farklı bıçak eki.',
    price: 890.00, category: 'Bakım', stockQuantity: 20,
    imageUrl: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&q=80',
  },
  {
    name: 'Biogance Dry Şampuan Köpek',
    description: 'Su gerektirmeden kullanılan kuru köpek şampuanı. Yolculuk için ideal.',
    price: 125.00, category: 'Bakım', stockQuantity: 110,
    imageUrl: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&q=80',
  },
  {
    name: 'Millers Forge Tırnak Makası',
    description: 'Veteriner tavsiyeli, titanyum kaplı güvenlik kilidli kedi ve köpek tırnak makası.',
    price: 115.00, category: 'Bakım', stockQuantity: 95,
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&q=80',
  },
  {
    name: 'Chris Christensen Ice on Ice',
    description: 'Uzun tüylü köpekler için düğüm açıcı, parlaklık veren tımar spreyi. 473ml.',
    price: 285.00, category: 'Bakım', stockQuantity: 40,
    imageUrl: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&q=80',
  },
  {
    name: 'Burt\'s Bees Kedi Islak Mendil',
    description: 'Elma özlü, alkol içermeyen, hassas ciltler için kedi temizleme mendili. 50\'li.',
    price: 75.00, category: 'Bakım', stockQuantity: 200,
    imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&q=80',
  },
]

async function main() {
  console.log('🌱 50 ürün seed ediliyor...')

  // Önce mevcut ürünleri kontrol et
  const existingCount = await prisma.product.count()
  if (existingCount > 0) {
    console.log(`⚠️  Veritabanında zaten ${existingCount} ürün var.`)
    console.log('   Mevcut ürünleri silip yeniden eklemek ister misiniz?')
    console.log('   Eğer isterseniz bu script\'i düzenleyip deleteMany\'yi kaldırın.')
    // Güvenli: sadece yeni ürünleri ekle, mevcut silinmesin
  }

  const result = await prisma.product.createMany({
    data: products,
    skipDuplicates: true,
  })

  const totalAfter = await prisma.product.count()
  console.log(`✅ ${result.count} yeni ürün eklendi.`)
  console.log(`📦 Veritabanındaki toplam ürün sayısı: ${totalAfter}`)
  console.log('\nKategoriler:')
  const cats = ['Mama', 'Sağlık', 'Aksesuar', 'Oyuncak', 'Bakım']
  for (const cat of cats) {
    const c = await prisma.product.count({ where: { category: cat } })
    console.log(`  ${cat}: ${c} ürün`)
  }
}

main()
  .catch((e) => { console.error('❌ Hata:', e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect(); await pool.end() })
