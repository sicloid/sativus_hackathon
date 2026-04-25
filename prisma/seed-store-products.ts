/**
 * PetVerse — Mağaza Mock Ürünleri Seed Script
 * Çalıştır: npx tsx prisma/seed-store-products.ts
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

const storeProducts = [
  // ─── KÖPEK (10 ürün) ────────────────────────────────────────────────────────
  { name: 'Premium Köpek Maması 15kg', description: 'Yetişkin köpekler için somonlu, tahılsız yüksek proteinli premium kuru mama.', price: 1250, imageUrl: 'https://www.kolaymama.com/cex-premium-puppy-kuzulu-ve-pirincli-yavru-kopek-mamasi-15-kg-kopek-kuru-mamalari-cex-111687-21-B.jpg', category: 'Köpek', stockQuantity: 45 },
  { name: 'Köpek Gezdirme Tasması 5m', description: 'Otomatik sarmallı, stop tuşlu, fosforlu şeritli gezdirme kayışı.', price: 220, imageUrl: 'https://cdn-img.pttavm.com/pimages/592/266/916/3d6c383e-d5ac-472c-bf8a-1f2c32a5d6ff.webp', category: 'Köpek', stockQuantity: 56 },
  { name: 'Köpek Yatağı Ortopedik', description: 'Eklem dostu, hafızalı süngerli, yıkanabilir kılıflı lüks köpek yatağı.', price: 890, imageUrl: 'https://pecpets.com/wp-content/uploads/2025/09/a8f3543e-1baa-4d0d-94a1-949b0c8396f4.jpg', category: 'Köpek', stockQuantity: 15 },
  { name: 'Köpek Oyun Topu Seti', description: 'Dayanıklı kauçuktan üretilmiş, diş temizlemeye yardımcı 3\'lü top seti.', price: 185, imageUrl: 'https://productimages.hepsiburada.net/s/777/424-600/110000791038314.jpg', category: 'Köpek', stockQuantity: 30 },
  { name: 'Köpek Tüy Tarağı', description: 'Ölü tüyleri kolayca toplayan, masaj etkili ergonomik tarak.', price: 145, imageUrl: 'https://cdn03.ciceksepeti.com/cicek/kcm96840103-1/L/evcil-hayvan-bakim-taragi-tuy-kesici-tarak-kedi-kopek-tuy-toparlayici-tuy-ali-kcm96840103-1-0b3205f7741944a88073047f5ed5a6b7.jpg', category: 'Köpek', stockQuantity: 40 },
  { name: 'Köpek Şampuanı Doğal', description: 'Hassas ciltler için uygun, aloe vera özlü doğal içerikli şampuan.', price: 220, imageUrl: 'https://productimages.hepsiburada.net/s/777/960-1280/110000695876312.jpg', category: 'Köpek', stockQuantity: 25 },
  { name: 'Köpek Ödül Maması', description: 'Eğitim için ideal, kuzu etli ve vitamin katkılı yumuşak lokmalar.', price: 95, imageUrl: 'https://cdn.akakce.com/z/pedigree/pedigree-biscrok-200-gr-kopek-biskuvisi.jpg', category: 'Köpek', stockQuantity: 100 },
  { name: 'Köpek Tasması Deri', description: 'Gerçek deriden üretilmiş, dayanıklı metal tokalı şık boyun tasması.', price: 340, imageUrl: 'https://m.media-amazon.com/images/I/71UiRgH3TDL._AC_SX679_.jpg', category: 'Köpek', stockQuantity: 20 },
  { name: 'Köpek Taşıma Çantası', description: 'Hava alan fileli bölmeler, omuz askılı, orta boy köpekler için uygun.', price: 650, imageUrl: 'https://cdn.dsmcdn.com/mnresize/420/620/ty1763/prod/QC_ENRICHMENT/20250921/11/173cfd97-8e12-3391-918d-525625429be5/1_org_zoom.jpg', category: 'Köpek', stockQuantity: 10 },
  { name: 'Köpek Kulübesi Ahşap', description: 'Dış mekana dayanıklı, izolasyonlu, çatılı ahşap köpek evi.', price: 1750, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT9gonycVoY68qF-JPYQv0m8ycR4Wi42RVVUBO9Cd5kw&s=10', category: 'Köpek', stockQuantity: 5 },

  // ─── KEDİ (10 ürün) ─────────────────────────────────────────────────────────
  { name: 'Kedi Kumu İnce Taneli 10L', description: 'Ekstra topaklaşan, parfümlü, tozsuz bentonit kedi kumu.', price: 180, imageUrl: 'https://productimages.hepsiburada.net/s/321/375-375/110000315108452.jpg', category: 'Kedi', stockQuantity: 120 },
  { name: 'Kedi Tırmalama Tahtası', description: 'Kedi nanesi hediyeli, dayanıklı sisal ipli tırmalama platformu.', price: 290, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbx0nO3_fj5TjKxuvkxPOnP4etrzcLvlc2utQwXnSSQy8hqQQNyw&s&ec=121643124', category: 'Kedi', stockQuantity: 34 },
  { name: 'Kedi Evi Ahşap', description: 'İç mekan için şık tasarımlı, minderli ahşap kedi yuvası.', price: 1200, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM7kitZjeSxyvm5sk8spJx-Tjef7h0cnIxHYi2AQLgqK1JA5pOjg&s&ec=121643124', category: 'Kedi', stockQuantity: 8 },
  { name: 'Kedi Oyun Çubuğu', description: 'Tüylü ve zilli, interaktif oyun için ideal kedi oltası.', price: 75, imageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&q=80', category: 'Kedi', stockQuantity: 50 },
  { name: 'Kedi Maması Premium', description: 'Kısırlaştırılmış kediler için tavuklu, düşük yağlı dengeli mama.', price: 320, imageUrl: 'https://images.unsplash.com/photo-1604848698030-c434ba08ece1?w=800&q=80', category: 'Kedi', stockQuantity: 60 },
  { name: 'Kedi Taşıma Kafesi', description: 'Dayanıklı plastik gövde, emniyet kilitli kapı, standart boy.', price: 480, imageUrl: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&q=80', category: 'Kedi', stockQuantity: 15 },
  { name: 'Kedi Tasması Hafif', description: 'Zilli, kopma emniyetli, ayarlanabilir yumuşak kedi tasması.', price: 120, imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=80', category: 'Kedi', stockQuantity: 40 },
  { name: 'Kedi Tüneli Oyuncak', description: 'Hışırtılı kumaş, 3 girişli, katlanabilir eğlenceli oyun tüneli.', price: 210, imageUrl: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=800&q=80', category: 'Kedi', stockQuantity: 25 },
  { name: 'Kedi Mama Kabı Otomatik', description: 'Programlanabilir öğün saatleri, paslanmaz çelik hazneli dijital besleyici.', price: 750, imageUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80', category: 'Kedi', stockQuantity: 12 },
  { name: 'Kedi Yatağı Peluş', description: 'Ekstra yumuşak, sıcak tutan, yuvarlak pofuduk kedi yatağı.', price: 380, imageUrl: 'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?w=800&q=80', category: 'Kedi', stockQuantity: 20 },

  // ... (rest of the products)
  { name: 'Kuş Kafesi Tam Takım', description: 'Muhabbet kuşları ve kanaryalar için uygun, yemlik ve suluk dahil kafes.', price: 450, imageUrl: 'https://images.unsplash.com/photo-1522858547137-f1dcec554f55?w=800&q=80', category: 'Kuş', stockQuantity: 12 },
  { name: 'Muhabbet Kuşu Yemi', description: 'Karışık tohumlu, vitaminli ve enerji veren taze kuş yemi.', price: 85, imageUrl: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&q=80', category: 'Kuş', stockQuantity: 80 },
  { name: 'Kuş Tüneği Ahşap', description: 'Doğal ağaç dalından üretilmiş, tırnak törpülemeye yardımcı tünek.', price: 120, imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&q=80', category: 'Kuş', stockQuantity: 35 },
  { name: 'Kuş Oyuncak Seti', description: 'Renkli boncuklu, aynalı ve zilli 5\'li kuş oyuncağı paketi.', price: 95, imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80', category: 'Kuş', stockQuantity: 45 },
  { name: 'Papağan Kafesi Büyük', description: 'Jako ve Amazon papağanları için uygun, geniş ve dayanıklı metal kafes.', price: 1800, imageUrl: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?w=800&q=80', category: 'Kuş', stockQuantity: 4 },
  { name: 'Kuş Vitamini Damla', description: 'B vitamini ağırlıklı, tüy dökümünü azaltan multivitamin desteği.', price: 110, imageUrl: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=800&q=80', category: 'Kuş', stockQuantity: 60 },
  { name: 'Kuş Yemi Otomatik', description: 'Akıllı yemleme haznesi, kabuk biriktirmeyen dökülme önleyici sistem.', price: 340, imageUrl: 'https://images.unsplash.com/photo-1600618528240-fb9fe964b853?w=800&q=80', category: 'Kuş', stockQuantity: 15 },
  { name: 'Kuş Tüneği Salıncak', description: 'Renkli ahşap halkalı, kafes tavanına asılan eğlenceli salıncak.', price: 75, imageUrl: 'https://images.unsplash.com/photo-1480044965905-02098d419e96?w=800&q=80', category: 'Kuş', stockQuantity: 30 },
  { name: 'Kuş Kafesi Küçük', description: 'Tek kuş için uygun, kolay temizlenebilir alt çekmeceli kafes.', price: 280, imageUrl: 'https://images.unsplash.com/photo-1555000395-66992976503c?w=800&q=80', category: 'Kuş', stockQuantity: 10 },
  { name: 'Kuş Banyosu Plastik', description: 'Kafes kapısına asılan, şeffaf kapaklı banyo havuzu.', price: 65, imageUrl: 'https://images.unsplash.com/photo-1470114756577-bb1b1f5a721c?w=800&q=80', category: 'Kuş', stockQuantity: 25 },

  { name: 'Akvaryum Dış Filtre 1000L/h', description: 'Sessiz çalışan, 3 sepetli, enerji tasarruflu akvaryum dış motoru.', price: 1850, imageUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800&q=80', category: 'Balık', stockQuantity: 8 },
  { name: 'Akvaryum Starter Set 60L', description: 'Cam akvaryum, iç filtre, LED aydınlatma ve ısıtıcı dahil başlangıç seti.', price: 1200, imageUrl: 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=800&q=80', category: 'Balık', stockQuantity: 6 },
  { name: 'Balık Yemi Granül', description: 'Tüm tropikal balıklar için uygun, renk canlandırıcı kaliteli granül yem.', price: 75, imageUrl: 'https://images.unsplash.com/photo-1498100673548-9eb2cfd66462?w=800&q=80', category: 'Balık', stockQuantity: 100 },
  { name: 'LED Akvaryum Lambası', description: 'Su altı bitkileri için uygun spektrumlu, RGB kontrollü akvaryum aydınlatma.', price: 420, imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80', category: 'Balık', stockQuantity: 15 },
  { name: 'Akvaryum Substrat Kumu', description: 'Doğal mineralli, bitki gelişimi için ideal koyu renkli akvaryum kumu.', price: 180, imageUrl: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800&q=80', category: 'Balık', stockQuantity: 50 },
  { name: 'Hava Motoru Sessiz', description: 'Çift çıkışlı, ayarlanabilir hava debili, titreşim önleyici ayaklı motor.', price: 220, imageUrl: 'https://images.unsplash.com/photo-1544551763-47a159f7731d?w=800&q=80', category: 'Balık', stockQuantity: 20 },
  { name: 'Akvaryum Termometre', description: 'Hassas ölçüm yapan, vantuzlu, kolay okunabilir derece.', price: 85, imageUrl: 'https://images.unsplash.com/photo-1520190282173-6e2751f9ed20?w=800&q=80', category: 'Balık', stockQuantity: 40 },
  { name: 'Su Kondisyoneri 500ml', description: 'Musluk suyundaki kloru anında temizleyen, mukoza koruyucu su düzenleyici.', price: 95, imageUrl: 'https://images.unsplash.com/photo-1516683037151-9a17603a899c?w=800&q=80', category: 'Balık', stockQuantity: 30 },
  { name: 'Akvaryum Dekor Taş', description: 'Doğal volkanik kayalar, su değerlerini bozmayan dekoratif taş seti.', price: 145, imageUrl: 'https://images.unsplash.com/photo-1517924161044-8975836437d4?w=800&q=80', category: 'Balık', stockQuantity: 15 },
  { name: 'Balık Ağı Seti', description: 'Yumuşak fileli, paslanmaz saplı 2\'li balık yakalama ağı.', price: 55, imageUrl: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800&q=80', category: 'Balık', stockQuantity: 40 },

  { name: 'Hamster Kafesi Geniş', description: 'Çok katlı, tünelli, çarklı ve suluklu büyük boy hamster kafesi.', price: 380, imageUrl: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800&q=80', category: 'Kemirgen', stockQuantity: 10 },
  { name: 'Hamster Koşu Tekeri', description: 'Sessiz rulmanlı, ayak yaralanmalarını önleyen geniş çaplı tekerlek.', price: 120, imageUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4a?w=800&q=80', category: 'Kemirgen', stockQuantity: 25 },
  { name: 'Tavşan Yemi Granül', description: 'Yüksek lifli, sindirim sistemini destekleyen tavşanlar için pelet yem.', price: 95, imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&q=80', category: 'Kemirgen', stockQuantity: 50 },
  { name: 'Kemirgen Talaş Altlık', description: 'Yüksek emici güce sahip, tozdan arındırılmış çam talaşı.', price: 75, imageUrl: 'https://images.unsplash.com/photo-1544320299-8ad9fca94296?w=800&q=80', category: 'Kemirgen', stockQuantity: 100 },
  { name: 'Tavşan Kafesi', description: 'Geniş tabanlı, kolay açılır tavanlı, metal gövdeli tavşan evi.', price: 650, imageUrl: 'https://images.unsplash.com/photo-1444420045765-4e5b0b7db44b?w=800&q=80', category: 'Kemirgen', stockQuantity: 5 },
  { name: 'Kemirgen Oyun Tüneli', description: 'Hışırtılı, uzayıp kısalabilen plastik esnek oyun tüneli.', price: 110, imageUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&q=80', category: 'Kemirgen', stockQuantity: 20 },
  { name: 'Guinea Pig Yemi', description: 'C vitamini katkılı, meyve ve sebze kurusu karışımlı özel yem.', price: 85, imageUrl: 'https://images.unsplash.com/photo-1533514114760-4389f9ed3aa9?w=800&q=80', category: 'Kemirgen', stockQuantity: 35 },
  { name: 'Kemirgen Su Şişesi', description: 'Damlatmaz bilyalı uçlu, kafese asılan 500ml suluk.', price: 65, imageUrl: 'https://images.unsplash.com/photo-1534833215160-5f082e666a01?w=800&q=80', category: 'Kemirgen', stockQuantity: 30 },
  { name: 'Hamster Evi Ahşap', description: 'Doğal ağaçtan üretilmiş, çatılı şirin hamster yuvası.', price: 195, imageUrl: 'https://images.unsplash.com/photo-1516642898673-eda1916ca456?w=800&q=80', category: 'Kemirgen', stockQuantity: 15 },
  { name: 'Kemirgen Vitamini', description: 'Suya katılan, bağışıklık güçlendirici multivitamin damlası.', price: 110, imageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&q=80', category: 'Kemirgen', stockQuantity: 40 },
]

async function main() {
  console.log('🌱 Mağaza ürünleri güncelleniyor (upsert)...')

  let updated = 0
  let added = 0

  for (const product of storeProducts) {
    const existing = await prisma.product.findFirst({
      where: { name: product.name },
    })
    
    if (existing) {
      await prisma.product.update({
        where: { id: existing.id },
        data: { imageUrl: product.imageUrl }
      })
      updated++
    } else {
      await prisma.product.create({ data: product })
      added++
    }
  }

  console.log(`✅ ${added} yeni ürün eklendi, ${updated} ürün görseli güncellendi.`)
}

main()
  .catch(e => { console.error('❌', e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect(); await pool.end() })
