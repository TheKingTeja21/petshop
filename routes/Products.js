const router = require("express").Router();
const productcontroller = require("../controllers/productcontroller");
const {verifyAdmin,verifyVendor} =require("../middleware/verifyToken")


router.post("/",productcontroller.createProduct)
router.get("/getproduct/:id",productcontroller.product)
router.get('/allproducts',productcontroller.getallProduct)
router.get('/search/:key',productcontroller.search)
router.delete('/:id',verifyVendor,productcontroller.deleteProductasshop)
router.get('/vendor/:id',productcontroller.getVendorProducts)
router.post('/animalshop/:id',productcontroller.UpdateFoodId)
router.post('/tags/:id',verifyVendor,productcontroller.addFoodtags)
router.get('/randomproduct',productcontroller.gatRandomProductbycode)
router.post('/addproductTag',verifyVendor,productcontroller.addProductType)
router.get('/:category/:code',productcontroller.getRandomByCategoryandCode)
router.patch('/:id',verifyVendor,productcontroller.productAvailable)

    
module.exports = router