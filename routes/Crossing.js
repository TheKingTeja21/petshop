const Router = require("express").Router();
const {
  verifyAndAAuthorization,
  verifyVendor,
} = require("../middleware/verifyToken");
const Crossingcoontrooler = require("../controllers/Crossing");

Router.post(
  "/",
  verifyAndAAuthorization,
  Crossingcoontrooler.createCrossingpeet
);
Router.get("/getall", Crossingcoontrooler.getallCrossingpets);
Router.put(
  "/changeimge",
  verifyAndAAuthorization,Crossingcoontrooler.changeimage
);
Router.get(
  "/getbyId/:id",
  Crossingcoontrooler.getCrossingPetasByID
);
Router.post("/update/:id", Crossingcoontrooler.updateCrossing)

module.exports = Router;
