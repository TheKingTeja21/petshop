const Vaccination = require('../models/vaccinationModel');

   const createVaccination= async (req, res) => {
        const { date, vaccinationProof, age, gender, userId } = req.body;

        if (!date || !vaccinationProof || !age || !gender || !userId) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newVaccination = new Vaccination({
            date,
            vaccinationProof,
            age,
            gender,
            userId
        });
        try {   
            await newVaccination.save();
            res.status(201).json({ message: 'Vaccination record created successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
module.exports = {createVaccination};
