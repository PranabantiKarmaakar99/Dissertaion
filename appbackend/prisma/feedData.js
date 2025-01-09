
const xlsx = require('xlsx');
const { PrismaClient } = require('@prisma/client');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  try {
    // const workbook = xlsx.readFile('path/to/Service_dataset.xlsx');
    // //     const filePath = path.resolve(__dirname, 'asset', 'Service_dataset.xlsx');
    // const sheetName = workbook.SheetNames[0];
    // const worksheet = workbook.Sheets[sheetName];
   

    const filePath = path.resolve(__dirname, 'asset', 'Service_dataset.xlsx');
     const workbook = xlsx.readFile(filePath);
     const sheetName = workbook.SheetNames[0]; // Use the first sheet
const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet);

    for (const row of data) {
      const { Id, Title, Specification, Price, Category,RoomType } = row;

      await prisma.service.create({
        data: {
          Id,
          Title,
          Specification,
          Price: parseInt(Price), // Ensure integer for Prisma
          Category,
          RoomType
        },
      });
    }
    console.log('Data successfully inserted!');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
