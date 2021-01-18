require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const ckoutRouter = require('express').Router();

const ROCKET_DOMAIN = process.env.ROCKET_DOMAIN || 'http://localhost:3000';

const { calculateOrderAmount } = require('./utilities');

ckoutRouter.post('/create-checkout-session', async (req, res, next) => {
  console.log(process.env.STRIPE_SECRET_KEY);
  const checkOutObjArray = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: checkOutObjArray,
      mode: 'payment',
      success_url: `${ROCKET_DOMAIN}/shoppingcart/success`,
      cancel_url: `${ROCKET_DOMAIN}/shoppingcart`,
    });
    console.log('session', session);
    res.send({ id: session.id });
  } catch (error) {
    next(error);
  }
});

ckoutRouter.post(`/create-payment-intent`, async (req, res, next) => {
  const cart = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: await calculateOrderAmount(cart),
      currency: 'usd',
    });

    res.send({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = ckoutRouter;
