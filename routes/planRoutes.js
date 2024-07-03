const { assignPlanToUser, createPlans, getAllPlans, getPlanDetails } = require('../controllers/plansController');
const { verifyToken, verifyAndAAuthorization, verifyAdmin } = require('../middleware/verifyToken');
const express = require('express');
const router = express.Router();
router.post('/create', verifyAdmin, createPlans);
router.put('/assignPlan', verifyAndAAuthorization, assignPlanToUser);
router.get('/getPlans', verifyToken, getAllPlans);
router.get('/getPlanDetails', verifyToken, getPlanDetails)

// Protected route example
router.get('/protected-basic', verifyToken, checkPlan('Basic'), (req, res) => {
    res.status(200).json({ message: 'Access granted to Basic plan users' });
  });
  
  router.get('/protected-gold', verifyToken, checkPlan('Gold'), (req, res) => {
    res.status(200).json({ message: 'Access granted to Gold plan users' });
  });
  
  router.get('/protected-premium', verifyToken, checkPlan('Premium'), (req, res) => {
    res.status(200).json({ message: 'Access granted to Premium plan users' });
  });
module.exports = router;