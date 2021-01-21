const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

const { JWT_SECRET } = process.env;

const {
  db_createCustomer,
  db_getCustomerByEmail,
  _getUserCart,
  db_getCustomerCart,
} = require("../db/index");

apiRouter.post("/login", async (req, res, next) => {
  const { cust_email, cust_pwd } = req.body;
  const cartArray = [];

  if (!cust_email || !cust_pwd) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a cust_email and cust_pwd",
    });
  }

  try {
    const user = await db_getCustomerByEmail(cust_email);
    let cart = await db_getCustomerCart(cust_email);

    if (!cart) {
      cart = "A user cart has not been created!";
    }

    if (user && user.cust_pwd == cust_pwd) {
      const token = jwt.sign(
        {
          siteAdmin: user.isadmin,
          firstName: user.first_name,
          lastName: user.last_name,
          custID: user.cust_id,
          custEmail: user.cust_email,
          cartID: cart.cart_id,
          cart: cartArray,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );

      res.send({
        firstName: user.first_name,
        lastName: user.last_name,
        custID: user.cust_id,
        siteAdmin: user.isadmin,
        custEmail: user.cust_email,
        token,
        cartID: cart.cart_id,
        cart: cartArray,
      });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Please verify your email and password",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

apiRouter.post("/register", async (req, res, next) => {
  const { first_name, last_name, cust_email, cust_pwd, isAdmin } = req.body;

  try {
    const _user = await db_getCustomerByEmail(cust_email);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "An account with that email address already exists!",
      });
    }

    const user = await db_createCustomer({
      first_name,
      last_name,
      cust_email,
      cust_pwd,
      isAdmin,
    });

    const token = jwt.sign(
      {
        id: user.id,
        cust_email,
        firstName: user.first_name,
      },
      process.env.JWT_SECRET,

      {
        expiresIn: "1w",
      }
    );

    res.send({
      firstName: first_name,
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = apiRouter;
