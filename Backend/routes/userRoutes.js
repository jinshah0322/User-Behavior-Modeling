const express = require("express")
const router = express.Router()

const {getAllUsers,loginUser,registerUser,logoutUser} = require("../Controller/userController")

const {isLogin,isLogout} = require("../Middleware/auth")

router.route("/").get(isLogin,getAllUsers)
router.route("/login").post(isLogout,loginUser)
router.route("/register").post(isLogout,registerUser)
router.route("/logout").get(isLogin,logoutUser)

module.exports = router