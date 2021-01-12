const apiRouter = require("express").Router();

const { getAllProducts,
  db_addCartItem,
  db_patchCartItem,
  db_deleteCartItem
 } = require("../db/index");

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.get("/products", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    throw error;
  }
});

apiRouter.post(`/cart/:cart_id/:prod_id`, async (req, res, next) => {
  const { cart_id, prod_id } = req.params;
  const { price, cart_quantity } = req.body;
  try {
    const cart = await db_addCartItem(cart_id, prod_id, cart_quantity, price);
    res.send(cart);
  } catch (error) {
    next(error)
  }
})

apiRouter.patch(`/cart/:cart_id/:prod_id`, async (req, res, next) => {
  const { cart_id, prod_id } = req.params;
  const {cart_quantity} = req.body;
  try {
    const messageObj = await db_patchCartItem(cart_id, prod_id, cart_quantity);
    res.send(messageObj);
  } catch (error) {
    next(error)
  }
})

apiRouter.delete(`/cart/:cart_id/:prod_id`, async (req, res, next) => {
  const { cart_id, prod_id } = req.params;
  try {
    const messageObj = await db_deleteCartItem(cart_id, prod_id);
    res.send(messageObj);
  } catch (error) {
    next(error)
  }
})

module.exports = apiRouter;
