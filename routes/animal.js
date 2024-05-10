const router = require('express').Router()
const animalController = require('../controllers/animalController')
const animalsRouter = require('../controllers/animalController')

router.post("/",animalController.addanima)
router.get("/getall",animalController.getallanmals)
module.exports = router