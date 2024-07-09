
const stripe = require('stripe')('publishable'); // Replace with your Stripe secret key
module.exports = {
createpayment:async (req, res) => {
    const { amount } = req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'INR',
      });
  
      res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}