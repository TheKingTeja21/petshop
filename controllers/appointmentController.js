const Appointment = require("../models/appointment");

module.exports = {

  createAppointment: async (req, res) => {
    try {
      const newAppointment = new Appointment(req.body);
      

      const savedAppointment = await newAppointment.save();
      
      res.status(200).json({ message: "Appointment created successfully", appointment: savedAppointment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

};
