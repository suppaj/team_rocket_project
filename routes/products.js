const apiRouter = require("express").Router();

const {
  getAllProducts,
  getProductById,
  db_getAllTypes,
  db_createProductReview,
} = require("../db/index");

apiRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    throw error;
  }
});

apiRouter.get("/types", async (req, res, next) => {
  try {
    const test = await db_getAllTypes();
    res.send(test);
  } catch (error) {
    throw error;
  }
});

apiRouter.get("/:product_id", async (req, res, next) => {
  try {
    const { product_id } = req.params;
    const product = await getProductById(product_id);

    res.send(product);
  } catch (error) {
    throw error;
  }
});

apiRouter.post("/review", async (req, res, next) => {
  const reviewObject = req.body;
  try {
    const review = await db_createProductReview(reviewObject);
    res.send(review);
  } catch (error) {
    throw error;
  }
});

apiRouter.post(`/:cart_id/:prod_id`, async (req, res, next) => {
  const { cart_id, prod_id } = req.params;
  const { price, cart_quantity } = req.body;
  try {
    const cart = await db_addCartItem(cart_id, prod_id, cart_quantity, price);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

module.exports = apiRouter;
