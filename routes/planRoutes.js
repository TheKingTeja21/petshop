const { assignPlanToUser, createPlans, getAllPlans, getPlanDetails } = require('../controllers/plansController');
const { verifyToken,verifyAndAAuthorization, verifyAdmin } = require('../middleware/verifyToken');
const checkPlan = require('../middleware/checkPlan');
const express = require('express');
const router = express.Router();

router.post('/create', verifyAdmin, createPlans);
router.put('/assignPlan', verifyAndAAuthorization, assignPlanToUser);
router.get('/getPlans', verifyToken, getAllPlans);
router.get('/getPlanDetails', verifyToken, getPlanDetails);

router.get('/protected-silver', verifyToken, checkPlan('silver'), (req, res) => {
  res.status(200).json({ message: 'Access granted to Silver plan users' });
});

router.get('/protected-gold', verifyToken, checkPlan('gold'), (req, res) => {
  res.status(200).json({ message: 'Access granted to Gold plan users' });
});

router.get('/protected-premium', verifyToken, checkPlan('premium'), (req, res) => {
  res.status(200).json({ message: 'Access granted to Premium plan users' });
});

module.exports = router;
