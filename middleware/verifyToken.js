const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("")[1];
    jwt.verify(token, process.env.SECRET_KEY_jWT, async (error, user) => {
      if (error) {
        res.status(403).json({ message: "Invalid" });
      }
      req.user = user;
      next();
    });
  }
};
const verifyAndAAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user.userType === "Client" ||
      req.user.userType === "Vendor" ||
      req.user.userType === "Driver" ||
      req.user.userType === "Admin"
    ) {
      next();
    } else {
      res.status(403).json({ status: "false", message: "user not authorized" });
    }
  });
};
const verifyVendor = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userType === "Vendor" || req.user.userType === "Admin") {
      next();
    } else {
      res.status(403).json({ status: "false", message: "user not authorized" });
    }
  });
};
const verifyDriver = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user.userType === "Vendor" ||
      req.user.userType === "Driver" ||
      req.user.userType === "Admin"
    ) {
      next();
    } else {
      res.status(403).json({ status: "false", message: "user not authorized" });
    }
  });
};
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userType === "Admin") {
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
