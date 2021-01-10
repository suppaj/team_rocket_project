const express = require("express");
const apiRouter = express.Router();

const {
  createCustomer,
  getCustomerById,
  getAllCustomers,
} = require("../db/index");

apiRouter.get("/", async (req, res) => {
  try {
    const customers = await getAllCustomers();
    res.send({ customers });
  } catch (error) {
    throw error;
  }
});

apiRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await getCustomerById(id);
    res.send({ message: "This is your user", customer });
  } catch (error) {
    throw error;
  }
});

module.exports = apiRouter;
