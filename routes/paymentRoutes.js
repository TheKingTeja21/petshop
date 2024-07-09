const express = require('express');
const router=express.Router();
const paymentController=require('../controllers/paymentController');
router.post('/create-payment-intent',paymentController.createpayment);
module.exports = router