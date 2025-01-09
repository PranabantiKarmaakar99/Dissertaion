// const { PrismaClient } = require('@prisma/client');

// // Instantiate the Prisma Client
// const prisma = new PrismaClient();

// // Handle process termination for a clean shutdown
// process.on('SIGINT', async () => {
//   await prisma.$disconnect();
//   console.log('Prisma Client disconnected');
//   process.exit(0);
// });

// module.exports = prisma;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testConnection() {
  const services = await prisma.service.findMany();
  console.log(services);
}

testConnection()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });

   module.exports = prisma;
