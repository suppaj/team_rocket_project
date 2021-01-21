require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const apiRouter = require('express').Router();

const ROCKET_DOMAIN = process.env.ROCKET_DOMAIN || 'http://localhost:3000';

const { 
    calculateOrderAmount,
 } = require('./utilities');

 const {
     db_recordGuestOrder
 } = require('../db');

apiRouter.post('/create-checkout-session', async (req, res, next) => {
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

apiRouter.post(`/create-payment-intent`, async (req, res, next) => {
  const cart = req.body;
  console.log('hitting payment route');
  try {
    const orderTotal = await calculateOrderAmount(cart)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: (orderTotal*100).toFixed(0),
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

apiRouter.post('/guestorder', async (req, res, next) => {
    const { cart , formInfo } = req.body
    try {
        await db_recordGuestOrder(cart, formInfo)
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
})

module.exports = apiRouter;
