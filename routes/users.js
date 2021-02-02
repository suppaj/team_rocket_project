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
db_updateUserShipping,
db_updateUserBilling,
} = require('../db')

const {
  requireUser
} = require('./utilities');

apiRouter.get(`/:cust_id/ship`, requireUser, async (req, res, next)=>{
  const { cust_id } = req.params;
  try {
    const results = await db_getUserShipInfo(cust_id);
    res.send(results);
  } catch (error) { 
    next(error)
  }
})

apiRouter.post(`/:cust_id/ship`, requireUser, async (req, res, next)=>{
  const { cust_id } = req.params;
  const shipInfo = req.body
  try {
    await db_recordShipping(cust_id, shipInfo);
    res.sendStatus(200);
  } catch (error) {
    next(error)
  }
});

apiRouter.post(`/:cust_id/bill`,  requireUser, async (req, res, next)=>{
  const { cust_id } = req.params;
  const billInfo = req.body
  try {
    await db_recordBilling(cust_id, billInfo);
    res.sendStatus(200);
  } catch (error) {
    next(error)
  }
});

apiRouter.get(`/:cust_id/history`, requireUser, async (req, res, next)=>{
  const { cust_id } = req.params;
  try {
    const order_history = await db_getUserOrderHistory(cust_id)
    res.send(order_history);
  } catch (error) {
    next(error)
  }
})

apiRouter.get(`/:cust_id/profile`, requireUser, async (req, res, next)=> {
  const { cust_id } = req.params;
  try {
    const userProfile = await db_getUserProfile(cust_id)
    res.send(userProfile);
  } catch (error) {
    next(error);
  }
})

apiRouter.patch(`/:cust_id/update/contact`, requireUser, async (req, res, next)=>{
  const { cust_id } = req.params;
  const user = req.body;
  if (user.custID !== req.user.custID) {
    next({
      name: 'UnauthorizedUser',
      message: 'You cannot edit an account that is not your own.'
    });
  }
  try {
    if (user.emailChange) {
    const _user = await db_getCustomerByEmail(user.cust_email);
    
    if (_user) {
      res.send({
        name: "UserExistsError",
        message: "An account with that email address already exists!",
      });
    }} 
    const results = await db_updateUserContact(cust_id, user);
    res.send(results) 

  } catch (error) {
    next(error)
  }
})

apiRouter.patch(`/:cust_id/update/shipping`, requireUser, async (req, res, next)=>{
  const { cust_id } = req.params;
  const user = req.body;
  try {
    const results = await db_updateUserShipping(cust_id, user);
    res.send(results);
  } catch (error) {
    next(error)
  }
})

apiRouter.patch(`/:cust_id/update/billing`, requireUser, async (req, res, next)=>{
  const { cust_id } = req.params;
  const user = req.body;
  try {
    const results = await db_updateUserBilling(cust_id, user);
    res.send(results);
  } catch (error) {
    next(error)
  }
})

module.exports = apiRouter;