const express = require('express');
const {PrismaClient} = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();
const authenticateToken = require('../middleware');




router.post('/addtocart',authenticateToken,async(req,res)=>{

    const {serviceId,quantity}= req.body;

    const userId = req.user.id;
    const user = req.user;

    if (!serviceId||!quantity) {
        return res.status(400).json({
            message:' ServiceId & quantity are required.'
        })
    }

    try{
     
      let cart = await prisma.cart.findFirst({
        where:{ userId
            

        }
      })

      if (!cart) {
        cart = await prisma.cart.create({
            data:{
                userId:parseInt(user.id)

            }
        })
      }

         // Check if the service is already in the cart
         const existingCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                serviceId: parseInt(serviceId),
            },
        });

      if  (existingCartItem) {
        await prisma.cartItem.update({
            where:{id:existingCartItem.id},
            data:{quantity:existingCartItem.quantity+parseInt(quantity)}
        })
      } else {

        await prisma.cartItem.create({
            data:{
                cartId:cart.id,
                serviceId: parseInt(serviceId),
                quantity: parseInt(quantity)
            }
        })

      }

      res.status(200).json({ message: 'Item added to cart successfully.' });

    }
    catch(error){
        console.error('error adding to the cart', error);
        res.status(500).json({message: 'Internal server error.'})

    }

})


router.get('/totalamount', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id; // Assuming `authenticateToken` adds `user` to the request object

        // Fetch the user's cart along with its items
        const cart = await prisma.cart.findFirst({
            where: { userId },
            include: {
                items: {
                    include: { service: true } // Include the service relation in cart items
                }
            }
            
        });
        
        const Id = cart.items.serviceId


        const service = await prisma.service.findFirst({
         where:{Id}

        })

        console.log("Price:",service.Price)
        



        console.log('cart:',cart);

        if (!cart|| cart.items.length === 0) {
            return res.status(200).json({ totalAmount: 0 });
        }

        // Calculate the total amount
        const totalAmount = cart.items.reduce((sum, item) => {
            console.log("item.quantity:",item.quantity)
            console.log("price:",item.service.Price)
            return sum + item.quantity * item.service.Price; // Assuming `price` is a field in `cartItem`
        }, 0);

        res.status(200).json({ totalAmount });
    } catch (error) {
        console.error('Error fetching total amount:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.get('/getcart', authenticateToken, async (req, res) => {
    try {
        // Assuming user ID is available in the token
        const userId = req.user.id;
    
        // Fetch cart items for the authenticated user
        const cartItems = await prisma.cart.findMany({
          where: {
            userId: userId,
          },
          include: {
            items: {
                include:{ service: true }
            } // Include related service details like title and price
          },
        });
    
        // Check if the cart is empty
        if (cartItems.length === 0) {
          return res.status(404).json({ message: 'Your cart is empty' });
        }
    
        res.status(200).json({ cartItems });
      } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
});



router.post('/removefromcart', authenticateToken, async (req, res) => {
    try {
        const { itemId } = req.body;

        if (!itemId) {
            return res.status(400).json({ message: 'ItemId is required.' });
        }

        // Check if the cart item exists
        const cartItem = await prisma.cartItem.findUnique({
            where: { id: parseInt(itemId) }
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found.' });
        }

        // Delete the cart item
        await prisma.cartItem.delete({
            where: { id: parseInt(itemId) }
        });

        res.status(200).json({ message: 'Item removed from cart successfully.' });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;


