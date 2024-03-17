const express = require("express")
const router = express.Router()
const {admin} = require("../Controller/adminController")

router.route("/").post(admin)

module.exports = router