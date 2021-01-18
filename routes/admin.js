const express = require("express");
const apiRouter = express.Router();

const {
  db_getAllCustomers,
  db_deleteRelationProductById,
  db_getCustomerById,
  db_getCustomerByEmail,
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

apiRouter.delete("/remove_product/:prod_id/:type_id", async (req, res) => {
  const { prod_id, type_id } = req.params;

  try {
    const relationship = await db_deleteRelationProductById(prod_id, type_id);

    res.send({ relationship, message: "Item Removed" });
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
