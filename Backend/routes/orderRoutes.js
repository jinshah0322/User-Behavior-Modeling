const express = require("express")
const router = express.Router()

const {createOrder,paymentVerification,getOrderByUserId,getOrderDetailsByOrderId} = require("../Controller/orderController")

router.route("/").post(createOrder)
router.route("/:id").get(getOrderByUserId)
router.route("/orderDetails/:id").get(getOrderDetailsByOrderId)
router.route("/paymentVerification").post(paymentVerification)

module.exports = router