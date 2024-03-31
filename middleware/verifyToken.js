const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const authHeader = req.body.authHeader;
  if (authHeader) {
    jwt.verify(authHeader, process.env.SECRET_KEY_jWT, async (error, user) => {
      if (error) {
        res.status(403).json(error);
      }
      req.user = user;
      console.log(user);
      next();
    });
  }
};
const verifyAndAAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user.usertype === "Client" ||
      req.user.usertype === "Vendor" ||
      req.user.usertype === "Driver" ||
      req.user.usertype === "Admin"
    ) {
      next();
    } else {
      res.status(403).json({ status: "false", message: "user not authorized" });
    }
  });
};
const verifyVendor = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.usertype === "Vendor" || req.user.usertype === "Admin") {
      next();
    } else {
      res.status(403).json({ status: "false", message: "user not authorized" });
    }
  });
};
const verifyDriver = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user.usertype === "Vendor" ||
      req.user.usertype === "Driver" ||
      req.user.usertype === "Admin"
    ) {
      next();
    } else {
      res.status(403).json({ status: "false", message: "user not authorized" });
    }
  });
};
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.usertype === "Admin") {
      next();
    } else {
      res.status(403).json({ status: "false", message: "user not authorized" });
    }
  });
};
module.exports = {
  verifyToken,
  verifyAndAAuthorization,
  verifyVendor,
  verifyDriver,
  verifyAdmin,
};
