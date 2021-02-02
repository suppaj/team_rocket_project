const apiRouter = require('express').Router();

const { 
    db_createOrderId, 
    db_addOrderItems, 
} = require('../db');

apiRouter.post(`/:cust_id/createorderId`, async (req, res, next)=>{
    const { cust_id } = req.params;
    try {
        const order_id = await db_createOrderId(cust_id)
        res.send({order_id});
    } catch (error) { 
        throw error
    };
  })
  
  apiRouter.post(`/:cust_id/:order_id`, async (req, res, next)=>{
    const { order_id } = req.params;
    const cart = req.body;
    try {
        await db_addOrderItems(cart, order_id);
        res.sendStatus(200);
    } catch (error) {
        next(error)
    }
  })

module.exports = apiRouter;