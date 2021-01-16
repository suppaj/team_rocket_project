const apiRouter = require("express").Router();

const {
  db_addCartItem,
  db_patchCartItem,
  db_deleteCartItem,
} = require("../db/index");

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.post(`/cart/:cart_id/:prod_id`, async (req, res, next) => {
  const { cart_id, prod_id } = req.params;
  const { price, cart_quantity } = req.body;
  try {
    const cart = await db_addCartItem(cart_id, prod_id, cart_quantity, price);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

apiRouter.patch(`/cart/:cart_id/:prod_id`, async (req, res, next) => {
  const { cart_id, prod_id } = req.params;
  const { cart_quantity } = req.body;
  try {
    const messageObj = await db_patchCartItem(cart_id, prod_id, cart_quantity);
    res.send(messageObj);
  } catch (error) {
    next(error);
  }
});

apiRouter.delete(`/cart/:cart_id/:prod_id`, async (req, res, next) => {
  const { cart_id, prod_id } = req.params;
  try {
    const messageObj = await db_deleteCartItem(cart_id, prod_id);
    res.send(messageObj);
  } catch (error) {
    next(error);
  }
});

apiRouter.use("/customers", require("./customers"));
apiRouter.use("/login", require("./customers"));
apiRouter.use("/register", require("./customers"));
apiRouter.use("/admin", require("./admin"));
apiRouter.use("/products", require("./products"));
const usersRouter = require('./checkout');
apiRouter.use('/checkout', usersRouter);


module.exports = apiRouter;
