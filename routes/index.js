const apiRouter = require("express").Router();

const { getAllProducts, getAllTypes } = require("../db/index");

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

apiRouter.get("/products/types", async (req, res, next) => {
  try {
    const types = await getAllTypes();
    res.send(types);
  } catch (error) {
    throw error;
  }
});

module.exports = apiRouter;
