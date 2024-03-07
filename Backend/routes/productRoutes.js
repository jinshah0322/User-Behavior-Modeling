const express = require("express")
const router = express.Router()
const {createProduct,getAllProducts,getProductByID,updateProductById,deleteProductById} = require("../Controller/productController")

router.route("/").post(createProduct).get(getAllProducts)
router.route("/:id").get(getProductByID).put(updateProductById).delete(deleteProductById)

module.exports = router