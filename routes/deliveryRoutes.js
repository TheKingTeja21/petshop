const  deliveryController=require('../controllers/deliveryController');
const router=require('express').Router();
router.post('/create',deliveryController.createDelivery);
module.exports = router