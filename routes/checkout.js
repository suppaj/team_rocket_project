// require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const jwt = require("jsonwebtoken");
const apiRouter = require('express').Router();
const { JWT_SECRET } = process.env;

const ROCKET_DOMAIN = process.env.ROCKET_DOMAIN || 'http://localhost:3000';

const { 
    calculateOrderAmount,
 } = require('./utilities');

 const {
     db_recordGuestOrder
 } = require('../db');

apiRouter.post('/create-checkout-session', async (req, res, next) => {
  const checkOutObjArray = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: checkOutObjArray,
      mode: 'payment',
      success_url: `${ROCKET_DOMAIN}/shoppingcart/success`,
      cancel_url: `${ROCKET_DOMAIN}/shoppingcart`,
    });
    res.send({ id: session.id });
  } catch (error) {
    next(error);
  }
});

apiRouter.post(`/create-payment-intent`, async (req, res, next) => {
  const {cart, user} = req.body;
  
  try {
    if (!user.custID) {
    user.custID = 1;
    }
    const orderTotal = await calculateOrderAmount(cart)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: (orderTotal*100).toFixed(0),
      currency: 'usd',
    });

    const ckoutToken = jwt.sign(
      {
        custID: user.custID
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    res.send({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      clientSecret: paymentIntent.client_secret,
      ckoutToken
    });
  } catch (error) {
    next(error);
  }
});

apiRouter.post('/guestorder', async (req, res, next) => {
    const { cart , formInfo, ckoutToken } = req.body 
    try {
      const { custID } = jwt.verify(ckoutToken, JWT_SECRET)
      if (custID !== 1 || !custID) {
        res.send({
        name: 'InvalidGuestOrder',
        message: 'Order missing payment intent token'
      })
      } else {
      await db_recordGuestOrder(cart, formInfo)
      res.sendStatus(200); }
    } catch (error) {
        next(error);
    }
});

module.exports = apiRouter;
