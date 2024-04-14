const express = require("express")
const router = express.Router()

const {getAllUsers,loginUser,registerUser,profile,forgotPassword, changePassword, deleteaccount, editProfile,blockUser,unblockUser} = require("../Controller/userController")

router.route("/").get(getAllUsers)
router.route("/login").post(loginUser)
router.route("/register").post(registerUser)
router.route("/profile/:id").get(profile)
router.route("/forgetpassword").post(forgotPassword)
router.route("/changepassword").post(changePassword)
router.route("/deleteaccount/:id").post(deleteaccount)
router.route("/editProfile/:id").put(editProfile)
router.route("/blockuser/:id").patch( blockUser)
router.route("/unblockuser/:id").patch( unblockUser)

module.exports = router