const router = require('express').Router();
const cartauthcontroller =require("../controllers/cartController")

router.post("/addtocart/:id",cartauthcontroller.addtoCart),
router.get("/find/:id", cartauthcontroller.fetchuserCart),
router.delete("/delete/:id", cartauthcontroller.removeProductfromCart),
router.delete("/clearcart/:id",cartauthcontroller.clearUsercart)
router.get("/count/:id",cartauthcontroller.getCartcount)
router.post("deceemnt/:id",cartauthcontroller.decrementProductQty)

module.exports = router