const router =require("express").Router();
const orderauthcontroller =require("../controllers/OrderController")
const {verifyAndAAuthorization} = require("../middleware/verifyToken")

router.get("/user/:id",orderauthcontroller.getUserorders)
router.post('/',orderauthcontroller.OrdercratedOrder)

module.exports = router