const router = require('express').Router()
const category = require("../controllers/Catrgorie")
const {verifyAdmin} =require("../middleware/verifyToken")

router.post('/createcategory',verifyAdmin,category.createCategory);
router.patch('/updatecategory',verifyAdmin,category.updateCategory);
router.delete('/deletecategory',verifyAdmin,category.deleteCategory);
router.get('/getall',category.getAllCategory)
router.patch('/patch/:id',verifyAdmin,category.patchimage)
router.get('/random',category.getRandomCategory)
router.get('/getbyid/:id',verifyAdmin,category.getcategorybyId)

module.exports=router   