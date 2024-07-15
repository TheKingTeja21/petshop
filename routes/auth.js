const router = require("express").Router();
const authcontroller = require("../controllers/aurthController");

router.post("/register",authcontroller.register),
router.post("/login",authcontroller.signin)
module.exports = router