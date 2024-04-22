const router =require("express").Router();
const orderauthcontroller =require("../controllers/OrderController")
const {verifyAndAAuthorization,verifyDriver} = require("../middleware/verifyToken");

router.get("/user/:id",orderauthcontroller.getUserorders)
router.post('/',orderauthcontroller.OrdercratedOrder)
router.post("/update/:id",orderauthcontroller.changeOrderstatus)
router.get("/Vendororders/:id",orderauthcontroller.vendorders)

module.exports = router