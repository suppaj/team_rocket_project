const { db_getItemPrice } = require("../../db/index");

function requireUser(req, res, next) {
  console.log('require user ran', req.user)
  if (!req.user) {
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action"
    });
  }

  next();
}

function requireAdmin(req, res,next) {
  if (!req.user.isAdmin) {
    next({
      name: 'MissingAdminCreds',
      message: 'You must be an admin to perform this action'
    });
  }
  next();
}

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
  requireUser
};
