
const express = require('express');
const userRouter = require('./router/user');
const cors = require('cors');
const bodyParser = require('body-parser');
const serviceRouter = require('./router/service');
const cartRouter = require('./router/cart');
const paymentRouter = require('./router/payment');



const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1/user',userRouter);
app.use('/api/v1/service',serviceRouter);
app.use('/api/v1/cart',cartRouter);
app.use('/api/v1/payment',paymentRouter);

app.listen(3001, (req,res)=>{
    console.log('listening at port 3001!')
})

