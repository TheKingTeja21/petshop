const { assignPlanToUser, createPlans } = require('../controllers/plansController');
const { verifyToken, verifyAndAAuthorization, verifyAdmin } = require('../middleware/verifyToken');
const express = require('express');
const router = express.Router();
router.post('/create', verifyAdmin, createPlans);
router.put('/assignPlan', verifyAndAAuthorization, assignPlanToUser);
module.exports = router;