const apiRouter = require("express").Router();

const {
  getAllProducts,
  getProductById,
  db_getAllTypes,
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

module.exports = apiRouter;
