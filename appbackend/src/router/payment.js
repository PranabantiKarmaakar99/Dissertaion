const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware');
//var expressCheckoutElement = elements.create('expressCheckout');

const stripe = require('stripe')('sk_test_tR3PYbcVNZZ796tH88S4VQ2u');

router.post('/create-payment-intent',authenticateToken, async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount in smallest currency unit
      currency: 'inr',
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router