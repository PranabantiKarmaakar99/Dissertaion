const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all services in a specific category
router.get('/services/category/:category', async (req, res) => {

    console.log('Route hit:', req.params);
  const { category } = req.params;

  try {
    const services = await prisma.service.findMany({
      where: {
        Category: category,
      },
    });

    if (services.length === 0) {
      return res.status(404).json({ message: 'No services found in this category' });
    }

    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/allservice', async (req, res) => {

//   console.log('Route hit:', req.params);
const { category } = req.params;

try {
  const services = await prisma.service.findMany(
    {
      where: category ? { Category: category } : {}, // Apply category filter only if provided
    }
   
  );

  if (services.length === 0) {
    return res.status(404).json({ message: 'No services found in this category' });
  }

  res.status(200).json(services);
} catch (error) {
  console.error('Error fetching services:', error);
  res.status(500).json({ message: 'Internal Server Error' });
}
});

router.get ('/:id',async(req,res)=>{
    const{id} = req.params 
    try{
        const service = await prisma.service.findUnique({
            where:{
                Id:parseInt(id)
            }
        })

       if (!service) {
        res.status(404).json({
            message:'Service not found'
        })
       }

       res.status(200).json(service)
    }
    catch(err) {
        res.status(500).json({message:'Internal Server Error'})
    }
})

module.exports = router;
