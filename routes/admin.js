const express = require("express");
const apiRouter = express.Router();

const {
  db_getAllCustomers,
  db_getCustomerById,
  db_getCustomerByEmail,
  db_getOrderHistoryByCustomerId,
  db_getOrderDetailsbyOrderId,
  db_getSalesData,
  db_getSalesDatabyProductID,
  db_getSalesDatabyMonth,
  db_getTopSalesDatabyMonth,
  db_getAllProductsAdmin,
  db_updateProduct,
  db_joinTopSales,
  db_getTotalSales,
  db_countActiveProducts,
  db_countInactiveProducts,
  db_getSalesForecast,
  db_getLastSixMonths,
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

apiRouter.get("/active_products", async (req, res) => {
  try {
    const active = await db_countActiveProducts();
    res.send({ active });
  } catch (error) {
    throw error;
  }
});
apiRouter.get("/inactive_products", async (req, res) => {
  try {
    const inactive = await db_countInactiveProducts();
    res.send({ inactive });
  } catch (error) {
    throw error;
  }
});

apiRouter.post("/update_product", async (req, res) => {
  const { prod_id, attributes } = req.body;

  try {
    const product = await db_updateProduct(prod_id, attributes);
    res.send({ message: "Update complete!", product });
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

apiRouter.get("/view_products", async (req, res) => {
  try {
    const products = await db_getAllProductsAdmin();
    res.send({ products });
  } catch (error) {
    throw error;
  }
});

apiRouter.get("/view_sales", async (req, res) => {
  try {
    const sales = await db_getSalesData();
    res.send({ sales });
  } catch (error) {
    throw error;
  }
});

apiRouter.get("/product_sales/:prodID", async (req, res) => {
  const { prodID } = req.params;

  try {
    const productSales = await db_getSalesDatabyProductID(prodID);
    res.send({ productSales });
  } catch (error) {
    throw error;
  }
});

apiRouter.get("/product_sales/:month/:year", async (req, res) => {
  const { month, year } = req.params;

  try {
    const monthlySales = await db_getSalesDatabyMonth(month, year);
    res.send({ monthlySales });
  } catch (error) {
    throw error;
  }
});

apiRouter.get("/top_sales/:month/:year", async (req, res) => {
  const { month, year } = req.params;

  try {
    const topMonthlySales = await db_joinTopSales(month, year);
    res.send({ topMonthlySales });
  } catch (error) {
    throw error;
  }
});

apiRouter.get("/total_sales/:month/:year", async (req, res) => {
  const { month, year } = req.params;

  try {
    const totalSales = await db_getTotalSales(month, year);
    res.send({ totalSales });
  } catch (error) {
    throw error;
  }
});

apiRouter.get("/forecast_sales/:month/:year", async (req, res) => {
  const { month, year } = req.params;

  try {
    const forecast = await db_getSalesForecast(month, year);
    res.send({ forecast });
  } catch (error) {
    throw error;
  }
});

apiRouter.get("/historical_view/:month/:year", async (req, res) => {
  const { month, year } = req.params;

  try {
    const historic = await db_getLastSixMonths(month, year);
    res.send({ historic });
  } catch (error) {
    throw error;
  }
});

module.exports = apiRouter;
