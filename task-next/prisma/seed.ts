import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Supprimer toutes les données existantes pour un "fresh start"
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@taskflow.com',
      password: 'password123', // En production, utilisez un hash de mot de passe!
      name: 'Admin',
    },
  });

  await prisma.project.createMany({
    data: [
      { name: 'App Mobile', color: '#3498db', userId: adminUser.id },
      { name: 'API Back', color: '#2ecc71', userId: adminUser.id },
      { name: 'Website Redesign', color: '#f39c12', userId: adminUser.id },
    ],
  });

  console.log('Seed done!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });