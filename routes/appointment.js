const router = require('express').Router();
const appointmentController = require('../controllers/appointmentController');

router.post("/create", appointmentController.createAppointment);
router.post("/accept", appointmentController.acceptAppointment);
router.post("/edit", appointmentController.editAppointment);
router.put("/reject", appointmentController.rejectAppointment);
router.get("/getall", appointmentController.getAppointmentsByStatus);
router.post("/complete", appointmentController.completeAppointment);

module.exports = router;
