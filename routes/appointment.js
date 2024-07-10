const router = require('express').Router()
const appointmentController = require('../controllers/appointmentController')
router.post("/create",appointmentController.createAppointment)
router.post("/accept",appointmentController.acceptAppointment)
module.exports = router