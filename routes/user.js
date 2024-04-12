const {verifyAndAAuthorization} = require("../middleware/verifyToken")
const router = require("express").Router();
const userauth = require("../controllers/userController");


router.delete('/',verifyAndAAuthorization,userauth.deleteUser)
router.get('/:id',verifyAndAAuthorization,userauth.getUser)
router.put('/update',verifyAndAAuthorization,userauth.updateUser)
router.post('/imagechange/:id',userauth.changeProfile)
router.post("/add/:id",userauth.updateAdress)

module.exports = router