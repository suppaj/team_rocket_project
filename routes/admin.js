const express = require("express");
const apiRouter = express.Router();

const {
  db_getAllCustomers,
  db_deleteRelationProductById,
  db_getCustomerById,
} = require("../db/index");

const userID = 1;

async function validateUser() {
  try {
    const user_check = await db_getCustomerById(userID);
    if (!user_check.isadmin) {
      console.error({
        name: "NonAdmin",
        message: "You must be an administrator in to perform this action",
      });
    }

    console.log("test of user data", user_check.isadmin);
  } catch {
    throw error;
  }
}

apiRouter.get("/customers/:id", validateUser, async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await db_getCustomerById(id);
    res.send({ message: "This is your user", customer });
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

apiRouter.get("/", async (req, res) => {
  try {
    const customers = await db_getAllCustomers();
    res.send({ customers });
  } catch (error) {
    throw error;
  }
});
module.exports = apiRouter;
