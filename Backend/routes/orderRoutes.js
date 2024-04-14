const express = require("express")
const router = express.Router()

const {createOrder,paymentVerification,getOrderByUserId,getOrderDetailsByOrderId,getAllOrder} = require("../Controller/orderController")

router.route("/").post(createOrder).get(getAllOrder)
router.route("/:id").get(getOrderByUserId)
router.route("/orderDetails/:id").get(getOrderDetailsByOrderId)
router.route("/paymentVerification").post(paymentVerification)

module.exports = router