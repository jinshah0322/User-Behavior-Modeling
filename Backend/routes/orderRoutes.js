const express = require("express")
const router = express.Router()

const {createOrder,paymentVerification,getOrderByUserId} = require("../Controller/orderController")

router.route("/").post(createOrder)
router.route("/:id").get(getOrderByUserId)
router.route("/paymentVerification").post(paymentVerification)

module.exports = router