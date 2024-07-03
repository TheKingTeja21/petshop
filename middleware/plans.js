const User = require('../models/User');
const Plan = require('../models/Plan');

const checkPlan = (requiredPlanName) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id).populate('plan'); // Assuming req.user._id contains the authenticated user's ID
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (!user.plan) {
        return res.status(403).json({ message: 'No plan assigned to user' });
      }

      if (user.plan.name !== requiredPlanName) {
        return res.status(403).json({ message: `Access restricted to ${requiredPlanName} plan users` });
      }

      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
};

module.exports = checkPlan;
