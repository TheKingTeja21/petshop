const router = require("express").Router();
const productcontroller = require("../controllers/productcontroller");
const productDetailsController = require('../controllers/productDetailsController');
const {verifyAdmin,verifyVendor} =require("../middleware/verifyToken")

router.post("/",productcontroller.createProduct)
router.get("/getproduct/:id",productcontroller.product)
router.get("/getproductByName",productcontroller.getByName)
router.get('/allproducts',productcontroller.getAllProduct)
router.get('/getfilterProduct',productcontroller.getfilterProduct)
router.get('/Petscategory/:id',productcontroller.categoryProducts)
router.get('/search/:key',productcontroller.search)
router.delete('/:id',productcontroller.deleteProductasshop)
router.get('/vendor/:id',productcontroller.getVendorProducts)
router.post('/animalshop/:id',verifyVendor,productcontroller.UpdateFoodId)
router.get('/randomproduct',productcontroller.gatRandomProductbycode)
router.get('/:category/:code',productcontroller.getRandomByCategoryandCode)
router.post("/update/:id",productcontroller.EditProduct)
router.post('/details/:id', productDetailsController.getProductDetails);
router.post('/pay', productDetailsController.makePayment);
router.post('/soldout', productcontroller.SoldoutProduct);
router.get('/available', productcontroller.getProductByAvailability);
router.get('/notAvailable', productcontroller.getProductByNotAvailable);

    
module.exports = router