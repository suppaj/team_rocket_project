const express = require("express");
const apiRouter = express.Router();

const {
  db_clearUserCart,
  db_patchCartItem,
  db_addCartItem,
  db_deleteCartItem,
  db_updateCart,
} = require('../db');

apiRouter.post(`/:cart_id/:prod_id`, async (req, res, next) => {
    const { cart_id, prod_id } = req.params;
    const { price, cart_quantity } = req.body;
    try {
      const cart = await db_addCartItem(cart_id, prod_id, cart_quantity, price);
      res.send(cart);
    } catch (error) {
      next(error);
    }
  });
  
  apiRouter.patch(`/:cart_id/:prod_id`, async (req, res, next) => {
    const { cart_id, prod_id } = req.params;
    const { cart_quantity } = req.body;
    try {
      
      const messageObj = await db_patchCartItem(cart_id, prod_id, cart_quantity);
      res.send(messageObj);
    } catch (error) {
      next(error);
    }
  });
  
  apiRouter.delete(`/:cart_id/:prod_id`, async (req, res, next) => {
    const { cart_id, prod_id } = req.params;
    try {
      const messageObj = await db_deleteCartItem(cart_id, prod_id);
      res.send(messageObj);
    } catch (error) {
      next(error);
    }
  });

  apiRouter.patch(`/:cart_id`, async (req,res,next)=>{
    const { cart_id } = req.params;
    const cart = req.body;
    try {
      const newCart = await db_updateCart(cart_id, cart);
      res.send(newCart)
    } catch (error) {
      next(error)
    }
  });

  apiRouter.delete(`/:cart_id`, async (req, res, next) => {
    const { cart_id } =req.params;
    try {
      const results = await db_clearUserCart(cart_id);
      res.send(results)
    } catch (error) {
      next(error);
    }
  })

module.exports = apiRouter;