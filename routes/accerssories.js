const router= require("express").Router()
const Accessorie= require("../controllers/accesssories")
const {verifyAdmin} =require('../middleware/verifyToken')

router.post("/create",Accessorie.createAccessories)
router.get("/getall",Accessorie.getallAccessories)
router.get("/accoriess",Accessorie.Accessorie)
router.get("/search/:key",Accessorie.search)
router.delete("/delete/:id",verifyAdmin,Accessorie.deleteProductById)
router.get('/availble/:id',verifyAdmin,Accessorie.productAvailable)

module.exports =router