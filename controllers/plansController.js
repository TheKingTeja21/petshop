const Plan = require("../models/plans");
const User = require("../models/User");

const createPlans = async (req, res) => {
  try {
    const { name, price, allowedFunctionalities } = req.body;
    const newPlan = new Plan({ name, price, allowedFunctionalities });
    await newPlan.save();
    res.status(201).json({ message: 'Plan created successfully', plan: newPlan });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllPlans = async (req, res) => {
  const plans = await Plan.find();
  if (!plans) {
    return res.status(200).json({ message: 'No plans are available' });
  }
  return res.json(plans);
};

const assignPlanToUser = async (req, res) => {
  try {
    const { userId, planName, selectedFunctionalities } = req.body;

    const plan = await Plan.findOne({ name: planName });
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    if (selectedFunctionalities.length > plan.allowedFunctionalities) {
      return res.status(400).json({ message: `You can select up to ${plan.allowedFunctionalities} functionalities` });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.plan = plan._id;
    user.functionalities = selectedFunctionalities;
    await user.save();

    res.status(200).json({ message: 'Plan assigned and functionalities selected successfully', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPlanDetails = async (req, res) => {
  const planid = req.query.planid; // Assuming the query parameter is `planid`
  if (!planid) {
    return res.status(400).json({ message: "Please select a plan" });
  }

  const plan = await Plan.findById(planid);
  if (!plan) {
    return res.status(200).json({ message: 'Plan not found' });
  }

  return res.json(plan);
};

module.exports = { assignPlanToUser, createPlans, getAllPlans, getPlanDetails };
