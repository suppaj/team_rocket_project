const apiRouter = require("express").Router();
const { requireUser } = require("./utilities");
const {
  db_createOrderId,
  db_addOrderItems,
  db_generateSale,
} = require("../db");

apiRouter.post(
  `/:cust_id/createorderId`,
  requireUser,
  async (req, res, next) => {
    const { cust_id } = req.params;
    try {
      const order_id = await db_createOrderId(cust_id);
      res.send({ order_id });
    } catch (error) {
      throw error;
    }
  }
);

apiRouter.post(`/:cust_id/:order_id`, requireUser, async (req, res, next) => {
  const { order_id } = req.params;
  const cart = req.body;
  try {
    await db_addOrderItems(cart, order_id);
    if (cart.length > 1) {
      Object.entries(cart).map((key, index) => {
        const { prod_id, price, cart_quantity } = key[1];
        db_generateSale(order_id, prod_id, cart_quantity, price);
        console.log("DONE CREATING SALES");
      });
    } else {
      const { prod_id, price, cart_quantity } = cart[0];
      db_generateSale(order_id, prod_id, cart_quantity, price);
    }
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = apiRouter;
