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
      
        if (!Breed.length && !Rate.length) {
          return res.status(400).json("No fields to update");
        }
      
        try {
          const existingBroding = await Broding.findById(id);
          if (!existingBroding) {
            return res.status(404).json({ message: "Broding not found" });
          }
      
          if (Breed.length) {
            existingBroding.Breed.push(...Breed);
          }
          if (Rate.length) {
            existingBroding.Rate.push(...Rate);
          }
      
          const updatedBroding = await existingBroding.save();
          res.status(200).json(updatedBroding);
        } catch (error) {
          res.status(500).json(error.message);
        }
      },
      
    getBrodingRate: async (req, res) => {
        const { id } = req.query;
        try {
            const existingBroding = await Broding.findById(id ); // Select only Breed and Rate fields
            if (!existingBroding) {
                return res.status(404).json({ message: "Broding not found" });
            }
    
            res.status(200).json({
                success: true,
                data: {
                    breeds: existingBroding.Breed,
                    rates: existingBroding.Rate
                }
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    deleteBroding: async (req, res) => {
        const { Breed } = req.query;
        try {
            const broding = await Broding.findOne({ Breed: { $in: Breed } });
            if (!broding) {
                return res.status(404).json({ message: "Broding not found" });
            }
    
            // Find the index of the breed to be removed
            const index = broding.Breed.indexOf(Breed);
            if (index === -1) {
                return res.status(404).json({ message: "Breed not found in Broding" });
            }
    
            // Update the document by pulling the specific breed and rate
            await Broding.updateOne(
                { _id: broding._id },
                {
                    $pull: { Breed: Breed },
                    $pull: { Rate: broding.Rate[index] }
                }
            );
    
            res.status(200).json({ success: true, message: "Broding updated successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    AddBrodingRate: async (req, res) => {
        const { id, Breed, Rate } = req.body;
        try {
            const existingBroding = await Broding.findById(id);
            if (!existingBroding) {
                return res.status(404).json({ message: "Broding not found" });
            }
    
            // Create a map for existing breeds and rates for easier management
            const breedMap = new Map(existingBroding.Breed.map((breed, index) => [breed, existingBroding.Rate[index]]));
    
            // Determine the starting index for inserting new data
            const startIndex = existingBroding.Breed.length;
    
            // Insert Breed at the specified index
            Breed.forEach((breed, index) => {
                const insertIndex = startIndex + index;
                breedMap.set(breed, Rate[index] || null); // Use Rate[index] or null if Rate array is shorter
            });
    
            // Split the map back into separate arrays
            existingBroding.Breed = Array.from(breedMap.keys());
            existingBroding.Rate = Array.from(breedMap.values());
    
            const updatedBroding = await existingBroding.save();
            res.status(200).json(updatedBroding);
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    const editBreed = async (req, res) => {
      const id = req.params.id; // Get ID from the request parameters
      const { breedName, newRate } = req.body; // Get breed name and new rate from the request body
    
      try {
        // Find the Broding document by ID
        const existingBroding = await Broding.findById(id);
        if (!existingBroding) {
          return res.status(404).json({ message: "Broding document not found" });
        }
    
        // Find the index of the breed in the Breed array
        const breedIndex = existingBroding.Breed.findIndex(
          (item) => item.name === breedName // Adjust this if breed name is a different property
        );
    
        // Check if the breed exists
        if (breedIndex === -1) {
          return res.status(404).json({ message: "Breed not found" });
        }
    
        // Update the rate at the found index
        existingBroding.Rate[breedIndex] = newRate;
    
        // Save the updated document
        const updatedBroding = await existingBroding.save();
    
        res.status(200).json(updatedBroding);
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    }
       
}