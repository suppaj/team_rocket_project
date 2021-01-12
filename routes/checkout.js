const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const apiRouter = require("express").Router();

const ROCKET_DOMAIN = 'http://localhost:3000/checkout';


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
    console.log(session);
    res.send({ id: session.id});
    } catch (error) {
        next(error)
    }
});

module.exports = apiRouter;