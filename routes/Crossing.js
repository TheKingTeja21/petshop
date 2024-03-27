const Router= require("express").Router()
const Crossingcoontrooler= require("../controllers/Crossing")
Router.post('/',Crossingcoontrooler.createCrossingpeet)
Router.get("/getall",Crossingcoontrooler.getallCrossingpets)
Router.put("/changeimge",Crossingcoontrooler.changeimage)


module.exports = Router