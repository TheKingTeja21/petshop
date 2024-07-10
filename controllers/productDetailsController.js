const Product = require('../models/Product');

let paymentStatus = {};

module.exports = {
    getProductDetails: async (req, res) => {
        const { id } = req.params; 
        const { userId } = req.body;

        try {
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            const hasPaid = paymentStatus[userId] && paymentStatus[userId][id];

            if (hasPaid) {
                return res.status(200).json({ product });
            } else {
              
                return res.status(200).json({
                    category: product.category,
                    Breed_name: product.Breed_name,
                    Gender: product.Gender,
                    available: product.available,
                    imageurl: product.imageurl,
                    petParentsMatingVideo:product.petParentsMatingVideo||null,
                    petQuality: product.quality,
                    age:product.age,
                    Breed_Leanage: product.Breed_Leanage,
                    vaccination: product.vaccination,
                    price: product.price,
                    location: product.location
                });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    makePayment: async (req, res) => {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ message: 'User ID and Product ID are required' });
        }

        if (!paymentStatus[userId]) {
            paymentStatus[userId] = {};
        }
        paymentStatus[userId][productId] = true;

        res.status(200).json({ message: 'Payment successful' });
    }
};
