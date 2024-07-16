const Broding = require("../models/Bording");

module.exports = {
    createbroding: async (req, res) => {
        try {
            const newBroding = new Broding(req.body);
            await newBroding.save();
            res.status(200).json("Success");
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    getallbroding: async (req, res) => {
        try {
            const allBroding = await Broding.find();
            if (!allBroding) {
                return res.status(404).json("Broding not found");
            }
            res.status(200).json(allBroding);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    updateBroding: async (req, res) => {
        const { id } = req.query;
        const { Breed, Rate } = req.body;

        if (!Breed && !Rate) {
            return res.status(400).json("No fields to update");
        }

        try {
            const existingBroding = await Broding.findById(id);
            if (!existingBroding) {
                return res.status(404).json("Broding not found");
            }

            if (Breed) {
                existingBroding.Breed = [...new Set([...existingBroding.Breed, ...Breed])];
            }
            if (Rate) {
                existingBroding.Rate = [...existingBroding.Rate, ...Rate];
            }

            const updatedBroding = await existingBroding.save();
            res.status(200).json(updatedBroding);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
};
