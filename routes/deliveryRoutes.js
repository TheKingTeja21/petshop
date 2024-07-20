const  deliveryController=require('../controllers/deliveryController');
const router=require('express').Router();
router.post('/create',deliveryController.createDelivery);
router.get('/getAddress',deliveryController.getAddress);
module.exports = router