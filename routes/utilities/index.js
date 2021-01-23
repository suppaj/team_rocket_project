const { db_getItemPrice } = require("../../db/index");

async function calculateOrderAmount(cart) {
  let orderTotal = 0;
  for (let item of cart) {
    try {
      const price = await db_getItemPrice(item.prod_id);
      orderTotal += price * item.cart_quantity;
    } catch (error) {
      throw error;
    }
  }

  return orderTotal.toFixed(2);
}

module.exports = {
  calculateOrderAmount,
};
