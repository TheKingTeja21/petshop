const router= require("express").Router()
const Accessorie= require("../controllers/accesssories")

router.post("/create",Accessorie.createAccessories)
router.get("/getall",Accessorie.getallAccessories)
router.get("/accoriess",Accessorie.Accessorie)
router.get("/search/:key",Accessorie.search)
router.delete("/delete/:id",Accessorie.deleteProductById)
router.get('/availble/:id',Accessorie.productAvailable)

module.exports =router