const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const {
  createCustomer,
  getCustomerById,
  getAllCustomers,
  getCustomerByEmail,
} = require("../db/index");

apiRouter.post("/login", async (req, res, next) => {
  const { cust_email, cust_pwd } = req.body;

  if (!cust_email || !cust_pwd) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a cust_email and cust_pwd",
    });
  }

  try {
    const user = await getCustomerByEmail(cust_email);

    if (user && user.cust_pwd == cust_pwd) {
      const token = jwt.sign(
        {
          siteAdmin: user.isadmin,
          cust_email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );

      res.send({
        message: `Thank you for logging in ${cust_email}!`,
        siteAdmin: user.isadmin,
        token,
      });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Please verify your credentials",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

apiRouter.get("/", async (req, res) => {
  try {
    const customers = await getAllCustomers();
    res.send({ customers });
  } catch (error) {
    throw error;
  }
});

apiRouter.post("/register", async (req, res, next) => {
  const { first_name, last_name, cust_email, cust_pwd, isAdmin } = req.body;

  try {
    const _user = await getCustomerByEmail(cust_email);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "An account with that email address already exists!",
      });
    }

    const user = await createCustomer({
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
      },
      process.env.JWT_SECRET,

      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: `Thank you for signing up ${first_name}!`,
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
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
