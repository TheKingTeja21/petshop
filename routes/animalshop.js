const route= require('express').Router();
const animalshopauth=require('../controllers/animalsshop')
const {verifyAndAAuthorization,verifyAdmin,verifyDriver,verifyVendor} =require('../middleware/verifyToken')

route.post('/',verifyAdmin,animalshopauth.addanimalshop),
route.get('/:id',animalshopauth.getanimalshop),
route.get('/:code',animalshopauth.getRandomanimalshop),
route.delete('/:id',verifyAdmin,animalshopauth.deleteanimalshop),
route.patch('/:id',verifyVendor,animalshopauth.serviceAvalibility)


module.exports =route