const router = require("express").Router();
const authcontroller = require("../controllers/aurthController");

router.post("/register",authcontroller.createuser),
router.post("/login",authcontroller.signIn)
module.exports = router