import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { config } from 'dotenv'
import fs from 'fs'

config({ path: fs.existsSync('.env.local') ? '.env.local' : '.env' })

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const PRODUCTS = [
  {
    name: 'Premium Köpek Maması 15kg',
    description: 'Yetişkin köpekler için somonlu, tahılsız yüksek proteinli premium kuru mama. Tüylerin daha parlak olmasını sağlar, sindirim sistemini destekler.',
    price: 1250,
    imageUrl: 'https://images.unsplash.com/photo-1589924691995-ad0029e88a3e?q=80&w=800',
    category: 'Köpek',
    stockQuantity: 45
  },
  {
    name: 'Kedi Kumu İnce Taneli 10L',
    description: 'Ekstra topaklaşan, parfümlü, tozsuz bentonit kedi kumu. Doğal koku önleyici formülü ile evinizi her zaman temiz tutar.',
    price: 180,
    imageUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=800',
    category: 'Kedi',
    stockQuantity: 120
  },
  {
    name: 'Kuş Kafesi Tam Takım',
    description: 'Muhabbet kuşları ve kanaryalar için uygun, yemlik ve suluk dahil kafes. Kolay temizlenir, taşınabilir boyut.',
    price: 450,
    imageUrl: 'https://images.unsplash.com/photo-1520110120835-c96a9ef95692?q=80&w=800',
    category: 'Kuş',
    stockQuantity: 12
  },
  {
    name: 'Akvaryum Dış Filtre 1000L/H',
    description: 'Sessiz çalışan, 3 sepetli, enerji tasarruflu akvaryum dış motoru. 200L\'e kadar akvaryumlar için idealdir.',
    price: 1850,
    imageUrl: 'https://images.unsplash.com/photo-1524704659690-3f8031240121?q=80&w=800',
    category: 'Balık',
    stockQuantity: 8
  },
  {
    name: 'Kedi Tırmalama Tahtası',
    description: 'Kedi nanesi hediyeli, dayanıklı sisal ipli tırmalama platformu. Mobilyalarınızı koruyun, kedinizi mutlu edin.',
    price: 290,
    imageUrl: 'https://images.unsplash.com/photo-1548802223-30b5d4037bc3?q=80&w=800',
    category: 'Kedi',
    stockQuantity: 34
  },
  {
    name: 'Köpek Gezdirme Tasması 5m',
    description: 'Otomatik sarmallı, stop tuşlu, fosforlu şeritli gezdirme kayışı. Gece yürüyüşlerinde güvenlik sağlar.',
    price: 220,
    imageUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=800',
    category: 'Köpek',
    stockQuantity: 56
  }
]

async function main() {
  console.log('🌱 Ürünler seed ediliyor...')
  
  // Mevcut ürünleri temizle
  await prisma.product.deleteMany()
  
  for (const product of PRODUCTS) {
    const created = await prisma.product.create({ data: product })
    console.log(`  ✅ ${created.name} (ID: ${created.id})`)
  }
  
  console.log(`\n🎉 ${PRODUCTS.length} ürün başarıyla eklendi!`)
}

main()
  .catch((e) => {
    console.error('❌ Seed hatası:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
