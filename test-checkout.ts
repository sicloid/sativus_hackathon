import { prisma } from './src/lib/prisma'

async function main() {
  try {
    console.log("Testing order creation for virtual item...")
    const order = await prisma.order.create({
      data: {
        userId: 'test-user-123',
        totalPrice: 1500,
        tax: 300,
        shippingCost: 0,
        fullName: 'Test User',
        phone: '1234567890',
        address: 'Test Address',
        city: 'Istanbul',
        status: 'CONFIRMED',
        items: {
          create: [{
            productId: null,
            productName: 'Test Muayene Ücreti',
            quantity: 1,
            unitPrice: 1500,
          }]
        }
      }
    })
    console.log("Order created successfully!", order.id)
    
    // Clean up
    await prisma.order.delete({ where: { id: order.id } })
  } catch (e) {
    console.error("Order creation failed!", e)
  }
}
main()
