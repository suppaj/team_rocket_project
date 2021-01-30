const apiRouter = require("express").Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const {
  db_getCustomerById
} = require("../db/index");

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  console.log('i ran')
  if (!auth) {
    console.log('no auth')
      next();
  } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
    console.log('I ran too')
      try {
          const { custID } = jwt.verify(token, JWT_SECRET);
        console.log(custID);
          if (custID) {
              req.user = await db_getCustomerById(custID);
              next();
          }
      } catch ({ name, message }) {
          next({ name, message });
      }
  } else {
      next({ 
          name: 'AuthorizationHeaderError',
          message: `Authorization token must start with ${ prefix }`
      });
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }

  next();
});

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.use("/orders", require("./orders"));
apiRouter.use("/customers", require("./customers"));
apiRouter.use("/customers_email", require("./admin"));
apiRouter.use("/customers_history", require("./admin"));
apiRouter.use("/login", require("./customers"));
apiRouter.use("/register", require("./customers"));
apiRouter.use("/users", require("./users"));
apiRouter.use("/admin", require("./admin"));
apiRouter.use("/products", require("./products"));
apiRouter.use("/checkout", require("./checkout"));
apiRouter.use("/cart", require("./cart"));

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;
