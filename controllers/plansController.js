const Plan = require("../models/plans");
const User = require("../models/User");

// Create plans
const createPlans = async (req, res) => {
  try {
    const { name, price } = req.body;
    const newPlan = new Plan({ name, price });
    await newPlan.save();
    res.status(201).json({ message: 'Plan created successfully', plan: newPlan });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Assign a plan to a user
const assignPlanToUser = async (req, res) => {
  try {
    const { userId, planName } = req.body;
    const plan = await Plan.findOne({ name: planName });
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.plan = plan._id;
    await user.save();
    res.status(200).json({ message: 'Plan assigned successfully', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { assignPlanToUser, createPlans };
