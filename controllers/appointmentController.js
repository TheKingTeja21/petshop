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
 acceptAppointment : async (req,res) => {
  const appointment_id = req.query
    try {
      const appointment = await Appointment.findById(appointment_id);
      if (!appointment) {
        throw new Error('Appointment not found');
      }
  
      await appointment.acceptAppointment();
  
      console.log(`Appointment accepted at: ${appointment.acceptanceTime}`);
      console.log(`Appointment expires at: ${appointment.expiryTime}`);
    } catch (error) {
      console.error('Error accepting appointment:', error);
    }
  };

};
