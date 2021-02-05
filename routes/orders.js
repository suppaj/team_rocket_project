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
    console.log("THIS IS THE CART", cart);
    console.log("CART LENGTH", cart.length);
    if (cart.length > 1) {
      console.log("TRUE");

      Object.entries(cart).map((key, index) => {
        const { prod_id, price, quantity } = key[1];
        console.log("KEY TEST", key[0], "this is key 1", key[1]);
        console.log("Key Prod ID", key[1].prod_id);
        console.log("THIS IS MY KEY", key);
        db_generateSale(order_id, prod_id, quantity, price);
        console.log("DONE CREATING SALES");
      });
    } else {
      console.log("ONLY ONE ITEM IN CART");
      const { prod_id, price, quantity } = cart;
      db_generateSale(order_id, prod_id, quantity, price);
      console.log("DONE CREATING SALE");
    }
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = apiRouter;
