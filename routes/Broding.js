const router = require("express").Router();
const broding = require("../controllers/Broding");

router.post("/createbroding", broding.createbroding);
router.get("/getallbroding", broding.getallbroding);
router.post("/updatebrodingdetails", broding.updateBroding);

module.exports = router;
