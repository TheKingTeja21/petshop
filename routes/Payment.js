const { json } = require('express');

const stripe = require('stripe')('sk_test_51OussWSImtxXqJxGyArBQaPEubeZVeqfP8zdwdcnqruXKnLLQcqHNTctmV2SVpxNT128TdgU7Md0lm5Sxn7nReEy00rcCkSpy8');


const router =require("express").Router();

router.post('/payment-sheet', async (req, res) => {
    // Use an existing Customer ID if this is a returning customer.
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2023-10-16'}
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency:'INR',
      customer: customer.id,
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter
      // is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
      });
    });
    router.post("/stripe", async (req, res) => {
      // Get the signature from the headers
      const sig = req.headers["stripe-signature"];
      let event;
      try {
        // Check if the event is sent from Stripe or a third party
        // And parse the event
        event = await stripe.webhooks.constructEvent(
          req.body,
          sig,
          process.env.endpointSecret
        );
      } catch (err) {
        // Handle what happens if the event is not from Stripe
        console.log(err);
        return res.status(400).json({ message: err.message });
      }
      // Event when a payment is initiated
      if (event.type === "payment_intent.created") {
        console.log(`${event.data.object.metadata.name} initated payment!`);
      }
      // Event when a payment is succeeded
      if (event.type === "payment_intent.succeeded") {
        console.log(`${event.data.object.metadata.name} succeeded payment!`);
        // fulfilment
      }
      res.json({ ok: true });
    });

module.exports = router