import prisma from './src/lib/prisma'
async function main() {
  const products = await prisma.product.findMany({take: 5})
  console.log(products.map(p => p.imageUrl))
}
main()
