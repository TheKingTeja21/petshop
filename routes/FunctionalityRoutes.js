const express = require("express");
const router = express.Router();
const checkAccess = require("../middleware/checkAccess");
const { verifyToken } = require('../middleware/verifyToken');

router.get('/crossing', verifyToken, checkAccess(['crossing']), (req, res) => {
  res.send("Access to crossing functionality");
});

router.get('/brooding', verifyToken, checkAccess(['brooding']), (req, res) => {
  res.send("Access to brooding functionality");
});

router.get('/order', verifyToken, checkAccess(['order']), (req, res) => {
  res.send("Access to Order functionality");
});

module.exports = router;
