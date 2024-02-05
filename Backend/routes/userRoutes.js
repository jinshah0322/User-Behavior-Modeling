const express = require("express")
const router = express.Router()

const {getAllUsers,loginUser,registerUser,logoutUser,profile,forgotPassword, changePassword, deleteaccount, editProfile} = require("../Controller/userController")

const {isLogin,isLogout} = require("../Middleware/auth")

router.route("/").get(isLogin,getAllUsers)
router.route("/login").post(isLogout,loginUser)
router.route("/register").post(isLogout,registerUser)
router.route("/profile").get(isLogin,profile)
router.route("/forgetpassword").post(isLogout,forgotPassword)
router.route("/changepassword").post(isLogin,changePassword)
router.route("/deleteaccount").post(isLogin,deleteaccount)
router.route("/editProfile").post(isLogin,editProfile)
router.route("/logout").get(isLogin,logoutUser)

module.exports = router