const router = require("express").Router();
const productcontroller = require("../controllers/productcontroller");
const {verifyAdmin,verifyVendor} =require("../middleware/verifyToken")

router.post("/",productcontroller.createProduct)
router.get("/getproduct/:id",productcontroller.product)
router.get('/allproducts',productcontroller.getallProduct)
router.get('/Petscategory/:id',productcontroller.categoryProducts)
router.get('/search/:key',productcontroller.search)
router.delete('/:id',productcontroller.deleteProductasshop)
router.get('/vendor/:id',productcontroller.getVendorProducts)
router.post('/animalshop/:id',verifyVendor,productcontroller.UpdateFoodId)
router.get('/randomproduct',productcontroller.gatRandomProductbycode)
router.get('/:category/:code',productcontroller.getRandomByCategoryandCode)
router.post("/update/:id",productcontroller.EditProduct)

    
module.exports = router