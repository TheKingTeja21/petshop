const User = require('../models/User');

const checkPlan = (requiredPlan) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id; // Assuming user ID is stored in req.user.id after token verification
      const user = await User.findById(userId).populate('plan');

      if (!user || !user.plan) {
        return res.status(403).json({ message: 'No plan found for user' });
      }

      const userPlan = user.plan.name.toLowerCase();
      const requiredPlanLower = requiredPlan.toLowerCase();

      const planHierarchy = {
        silver: 1,
        gold: 2,
        premium: 3
      };

      if (planHierarchy[userPlan] >= planHierarchy[requiredPlanLower]) {
        next();
      } else {
        return res.status(403).json({ message: 'Insufficient plan privileges' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  };
};

module.exports = checkPlan;
