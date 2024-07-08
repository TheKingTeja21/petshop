const {createVaccination} = require("../controllers/vaccinationController");
const router = require("express").Router();
router.post("/create",createVaccination)
module.exports = router