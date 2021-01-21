const apiRouter = require('express').Router();

const {
  db_addCartItem,
  db_patchCartItem,
  db_deleteCartItem,
} = require('../db/index');

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.use('/orders', require('./orders'));
apiRouter.use('/customers', require('./customers'));
apiRouter.use('/customers_email/:email', require('./customers'));
apiRouter.use('/login', require('./customers'));
apiRouter.use('/register', require('./customers'));
apiRouter.use('/users', require('./users'));
apiRouter.use('/admin', require('./admin'));
apiRouter.use('/products', require('./products'));
apiRouter.use('/checkout', require('./checkout'));
apiRouter.use('/cart', require('./cart'));


module.exports = apiRouter;
