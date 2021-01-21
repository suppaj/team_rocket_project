const express = require("express");
const apiRouter = express.Router();

const {
  db_getAllCustomers,
  db_deleteRelationProductById,
  db_getCustomerById,
  db_getCustomerByEmail,
  db_getOrderHistoryByCustomerId,
  db_getOrderDetailsbyOrderId,
} = require("../db/index");

apiRouter.get("/customers/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await db_getCustomerById(id);
    res.send({ message: "This is your user", customer });
  } catch (error) {
    throw error;
  }
});

apiRouter.get("/customers_email", async (req, res) => {
  const { cust_email } = req.body;

  try {
    const customer = await db_getCustomerByEmail(cust_email);
    res.send({ customer });
  } catch (error) {
    throw error;
  }
});

apiRouter.get("/customers_history/:customerId", async (req, res) => {
  const { customerId } = req.params;
  try {
    const orders = await db_getOrderHistoryByCustomerId(customerId);
    console.log(orders);
    res.send({ orders });
  } catch (error) {
    throw error;
  }
});

apiRouter.get("/customers_orders/:orderId", async (req, res) => {
  const { orderId } = req.params;
  try {
    const details = await db_getOrderDetailsbyOrderId(orderId);
    console.log(details);
    res.send({ details });
  } catch (error) {
    throw error;
  }
});

apiRouter.get("/view_customers", async (req, res) => {
  try {
    const customers = await db_getAllCustomers();
    res.send({ customers });
  } catch (error) {
    throw error;
  }
});
module.exports = apiRouter;
