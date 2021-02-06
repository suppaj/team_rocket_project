const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const {
  db_createCustomer,
  db_getCustomerByEmail,
  db_getCustomerCart,
} = require("../db/index");

apiRouter.post("/login", async (req, res, next) => {
  const { cust_email, cust_pwd } = req.body;
  const cartArray = [];

  try {
    if (!cust_email || !cust_pwd) {
      res.send({
        name: "MissingCredentialsError",
        message: "Verify your email or password",
      });
    } else {
      let cartObj = {};
      const user = await db_getCustomerByEmail(cust_email);
      if (user) {
        cartObj = await db_getCustomerCart(cust_email);
        if (cartObj.cart.length) {
          cartArray.push(...cartObj.cart);
        }
      }

      if (user && user.cust_pwd == cust_pwd) {
        if (user.is_admin) {
          let token = jwt.sign(
            {
              firstName: user.first_name,
              custID: user.cust_id,
              custEmail: user.cust_email,
              cartID: cartObj.cartID,
              cart: cartArray,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );

          res.send({
            token,
            siteAdmin: user.is_admin,
            firstName: user.first_name,
            custID: user.cust_id,
            cartID: cartObj.cartID,
            cart: cartArray,
          });
        } else {
          let token = jwt.sign(
            {
              siteAdmin: user.is_admin,
              firstName: user.first_name,
              lastName: user.last_name,
              custID: user.cust_id,
              custEmail: user.cust_email,
              cartID: cartObj.cartID,
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
            siteAdmin: user.is_admin,
            custEmail: user.cust_email,
            cartID: cartObj.cartID,
            cart: cartArray,
            token,
          });
        }
      } else {
        res.send({
          name: "IncorrectCredentialsError",
          message: "Verify your email or password",
        });
      }
    }
  } catch (error) {
    // console.log(error);
    next(error);
  }
});

apiRouter.post("/register", async (req, res, next) => {
  const {
    first_name,
    last_name,
    cust_email,
    cust_pwd,
    is_admin,
    cart,
  } = req.body;

  try {
    const _user = await db_getCustomerByEmail(cust_email);

    if (_user) {
      res.send({
        name: "UserExistsError",
        message: "An account with that email address already exists!",
      });
    }

    let user = await db_createCustomer({
      first_name,
      last_name,
      cust_email,
      cust_pwd,
      is_admin,
    });

    console.log("INITIATING CUSTOMER LOGIN");
    let cartObj = {};
    const cartArray = [];
    user = await db_getCustomerByEmail(cust_email);
    if (user) {
      cartObj = await db_getCustomerCart(cust_email);
      if (cartObj.cart.length) {
        cartArray.push(...cartObj.cart);
      }
    }

    if (user.is_admin) {
      let token = jwt.sign(
        {
          firstName: user.first_name,
          custID: user.cust_id,
          custEmail: user.cust_email,
          cartID: cartObj.cartID,
          cart: cart ? cart : cartArray,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.send({
        token,
        siteAdmin: user.is_admin,
        firstName: user.first_name,
        custID: user.cust_id,
        cartID: cartObj.cartID,
        cart: cart ? cart : cartArray,
      });
    } else {
      let token = jwt.sign(
        {
          siteAdmin: user.is_admin,
          firstName: user.first_name,
          lastName: user.last_name,
          custID: user.cust_id,
          custEmail: user.cust_email,
          cartID: cartObj.cartID,
          cart: cart ? cart : cartArray,
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
        siteAdmin: user.is_admin,
        custEmail: user.cust_email,
        cartID: cartObj.cartID,
        cart: cart ? cart : cartArray,
        token,
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = apiRouter;
