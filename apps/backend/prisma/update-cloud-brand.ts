import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const rest = await prisma.restaurant.updateMany({
    where: { id: 'demo-restaurant' },
    data: { name: 'Rahul_Restro' },
  });
  console.log('Updated restaurant:', rest);

  const user = await prisma.user.updateMany({
    where: { email: 'owner@demo.local' },
    data: {
      email: 'rp524917@gmail.com',
      name: 'Rahul',
      passwordHash: '$2b$12$qmC1mEALOcbgtO0G7DASZuVk4NKs9161ykiQVo7S8NTbmflG0xAC2',
      pinHash: '$2b$12$zV3Fh61bzZdrJMLuuDAJ4.o0uMoyU96YD6siYqSRS17OBaEFKJPNe',
    },
  });
  console.log('Updated user:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
