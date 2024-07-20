const router = require("express").Router();
const broding = require("../controllers/Broding");

router.post("/createbroding", broding.createbroding);
router.get("/getallbroding", broding.getallbroding);
router.put("/updatebrodingdetails", broding.updateBroding);
router.get("/getBreedRate", broding.getBrodingRate);
router.put("/AddBreedRate", broding.AddBrodingRate);
router.delete("/deleteBreed", broding.deleteBroding);
module.exports = router;
