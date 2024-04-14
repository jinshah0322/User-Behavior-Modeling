const express = require("express")
const router = express.Router()

const {createOrder,getAllOrders,paymentVerification} = require("../Controller/orderController")

router.route("/").post(createOrder).get(getAllOrders)
router.route("/paymentVerification").post(paymentVerification)

module.exports = router