const router = require('express').Router();
const cartauthcontroller =require("../controllers/cartController")

router.post("/addtocart/:id",cartauthcontroller.addtoCart),
router.get("/:id",cartauthcontroller.fetchuserCart),
router.delete("/:id",cartauthcontroller.removeProductfromCart),
router.delete("/clearcart/:id",cartauthcontroller.clearUsercart)
router.get("/count/:id",cartauthcontroller.getCartcount)
router.post("/decrement/:id",cartauthcontroller.decrementProductQty)

module.exports = router