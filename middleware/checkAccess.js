const User = require('../models/User');

const checkAccess = (requiredFunctionalities) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).populate('plan');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if user is an employee
      if (user.userType === 'Employee') {
        return next();
      }

      // Check if user's plan allows the required functionalities
      const userFunctionalities = user.functionalities || [];
      const hasAccess = requiredFunctionalities.every(func => userFunctionalities.includes(func));

      if (!hasAccess) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
};

module.exports = checkAccess;
