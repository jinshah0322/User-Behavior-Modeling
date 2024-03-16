const express = require("express")
const router = express.Router()

const {getAllUsers,loginUser,registerUser,logoutUser,profile,forgotPassword, changePassword, deleteaccount, editProfile,blockUser,unblockUser} = require("../Controller/userController")

router.route("/").get(getAllUsers)
router.route("/login").post(loginUser)
router.route("/register").post(registerUser)
router.route("/profile").get(profile)
router.route("/forgetpassword").post(forgotPassword)
router.route("/changepassword").post(changePassword)
router.route("/deleteaccount").post(deleteaccount)
router.route("/editProfile").post(editProfile)
router.route("/blockuser/:id").patch( blockUser)
router.route("/unblockuser/:id").patch( unblockUser)
router.route("/logout").get(logoutUser)

module.exports = router