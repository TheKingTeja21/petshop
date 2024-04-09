const Router = require("express").Router();
const {
  verifyAndAAuthorization,
  verifyVendor,
} = require("../middleware/verifyToken");
const Crossingcoontrooler = require("../controllers/Crossing");

Router.post(
  "/",
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
Router.post("/update/:id", Crossingcoontrooler.updateCrossing);
Router.delete('/delete/:id', Crossingcoontrooler.deleteCrossing);

module.exports = Router;
