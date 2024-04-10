const {verifyAndAAuthorization} = require("../middleware/verifyToken")
const router = require("express").Router();
const userauth = require("../controllers/userController");


router.delete('/',verifyAndAAuthorization,userauth.deleteUser)
router.get('/',verifyAndAAuthorization,userauth.getUser)
router.put('/update',verifyAndAAuthorization,userauth.updateUser)
router.put('/imagechange/:id',userauth.changeProfile)

module.exports = router