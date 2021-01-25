const express = require("express");
const apiRouter = express.Router();
const {
db_recordShipping,
db_recordBilling,
db_getUserShipInfo,
db_getUserOrderHistory,
db_getUserProfile,
db_getCustomerByEmail,
db_updateUserContact,
} = require('../db')

apiRouter.get(`/:cust_id/ship`, async (req, res, next)=>{
  const { cust_id } = req.params;
  console.log('hello');
  try {
    const results = await db_getUserShipInfo(cust_id);
    res.send(results);
  } catch (error) { 
    next(error)
  }
})

apiRouter.post(`/:cust_id/ship`, async (req, res, next)=>{
  const { cust_id } = req.params;
  const shipInfo = req.body
  console.log('hitting the ship add route');
  try {
    await db_recordShipping(cust_id, shipInfo);
    res.sendStatus(200);
  } catch (error) {
    next(error)
  }
});

apiRouter.post(`/:cust_id/bill`, async (req, res, next)=>{
  const { cust_id } = req.params;
  const billInfo = req.body
  try {
    await db_recordBilling(cust_id, billInfo);
    res.sendStatus(200);
  } catch (error) {
    next(error)
  }
});

apiRouter.get(`/:cust_id/history`, async (req, res, next)=>{
  const { cust_id } = req.params;
  try {
    const order_history = await db_getUserOrderHistory(cust_id)
    res.send(order_history);
  } catch (error) {
    next(error)
  }
})

apiRouter.get(`/:cust_id/profile`, async (req, res, next)=> {
  const { cust_id } = req.params;
  try {
    const userProfile = await db_getUserProfile(cust_id)
    res.send(userProfile);
  } catch (error) {
    next(error);
  }
})

apiRouter.patch(`/:cust_id/update/contact`, async (req, res, next)=>{
  const { cust_id } = req.params;
  const user = req.body;
  try {
    if (user.emailChange) {
    const _user = await db_getCustomerByEmail(user.cust_email);

    if (_user) {
      res.send({
        name: "UserExistsError",
        message: "An account with that email address already exists!",
      });
    }};

    const results = await db_updateUserContact(cust_id, user);
    res.send(results)
  } catch (error) {
    next(error)
  }
})

module.exports = apiRouter;