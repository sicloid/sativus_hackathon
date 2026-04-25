import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const coupons = [
    { code: 'HOSGELDIN5', discountPercent: 5, description: 'İlk Siparişe Özel Hoş Geldin İndirimi' },
    { code: 'MERHABA10', discountPercent: 10, description: 'PetVerse Dünyasına Merhaba İndirimi' },
    { code: 'PATI20', discountPercent: 20, description: 'Sevimli Dostlarımız İçin Büyük İndirim' },
  ]

  for (const c of coupons) {
    await prisma.coupon.upsert({
      where: { code: c.code },
      update: {},
      create: {
        code: c.code,
        discountPercent: c.discountPercent,
        description: c.description,
        isActive: true,
      },
    })
  }

  console.log('Kuponlar başarıyla tanımlandı.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
