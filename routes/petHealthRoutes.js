const express = require('express');
const router = express.Router();
const petHealthController = require('../controllers/petHealthController');

router.get('/getAll', petHealthController.getAll);
router.get('/getById/:id', petHealthController.getById);
router.post('/create', petHealthController.create);

module.exports = router;
