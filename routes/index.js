const apiRouter = require("express").Router();
const passport = require("passport");
const { getAllProducts } = require("../db/index");

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

apiRouter.use("/customers", require("./customers"));
apiRouter.use("/login", require("./customers"));
apiRouter.use("/register", require("./customers"));
apiRouter.use("/google", require("./passport"));
apiRouter.use("/google/callback", require("./passport"));

module.exports = apiRouter;
