const Appointment = require("../models/appointment");

module.exports = {
  createAppointment: async (req, res) => {
    try {
      const {
        ownerName,
        category,
        petBreed,
        age,
        media,
        aadharNo,
        phoneNo,
        currentAddress,
        fromDate,
        toDate,
        howManyDays,
      } = req.body;

      const newAppointment = new Appointment({
        ownerName,
        category,
        petBreed,
        age,
        media,
        aadharNo,
        phoneNo,
        currentAddress,
        fromDate,
        toDate,
        howManyDays,
      });

      await newAppointment.save();
      res.status(201).json({ message: 'Appointment created successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },


  acceptAppointment: async (req, res) => {
    const { appointment_id } = req.query;
    try {
      const appointment = await Appointment.findById(appointment_id);
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }

      await appointment.acceptAppointment();

      res.status(200).json({
        message: "Appointment accepted successfully",
        acceptanceTime: appointment.acceptanceTime,
        expiryTime: appointment.expiryTime
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  rejectAppointment: async (req, res) => {
    const { appointment_id } = req.query;
    const { reason } = req.body;
    try {
      const appointment = await Appointment.findById(appointment_id);
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }

      await appointment.rejectAppointment(reason);
      res.status(200).json({ message: 'Appointment rejected' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAppointmentsByStatus: async (req, res) => {
    const { status } = req.query;
    try {
      const appointments = await Appointment.find({ status });
      res.status(200).json({ appointments });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  editAppointment: async (req, res) => {
    const { appointment_id } = req.query;
    const { howManyDays, intime, outtime } = req.body;
    try {
      const appointment = await Appointment.findById(appointment_id);
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }

      if (howManyDays) appointment.howManyDays = howManyDays;
      if (intime) appointment.intime = intime;
      if (outtime) appointment.outtime = outtime;

      const updatedAppointment = await appointment.save();
      res.status(200).json({ message: "Appointment updated successfully", appointment: updatedAppointment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
