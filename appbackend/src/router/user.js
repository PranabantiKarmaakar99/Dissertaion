
const express = require('express');
const JWT_USER_PASS = require('../config');
const jwt = require('jsonwebtoken');
const {PrismaClient} = require('@prisma/client');


const prisma = new PrismaClient();

 const router = express.Router();

router.post('/signup',async(req,res)=>{

    const {username,password} = req.body;

    const user = await prisma.user.create({
        data:{
            username,
            password
        }
    })

    await prisma.cart.create({
        data:{
            userId:user.id
           
        }

    })

   

    return res.status(200).json({
        message:"Signed up"
    })
    
})

router.post('/signin',async(req,res)=>{

    const {username,password} = req.body;


    try{
    
        const user = prisma.user.findUnique({
            where:{
                username,
                password
                
            }
        })

       

        if (!user ) {
            return res.status(403).json({ message: 'Invalid username or password!' });
        }

        if (user) {
            const token = jwt.sign({
                id:user.id,
                username: user.username

            }, JWT_USER_PASS);

            return res.status(200).json(
                {token, message: 'Signin is sucessful!'}
            )
        }

    }
    catch(error){
        console.error('error while signing in',error);
        res.status(500).json({message:'error while signing in'})
    }



    return res.status(200).json({
        message:"Signed in"
    })
    
})


module.exports = router;