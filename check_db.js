const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.product.findMany({take: 5}).then(p => {
  console.log(p.map(x => ({ id: x.id, name: x.name, imageUrl: x.imageUrl })));
  prisma.$disconnect();
});
