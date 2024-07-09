const router = require('express').Router()
const appointmentController = require('../controllers/appointmentController')
router.post("/create",appointmentController.payment)
module.exports = router