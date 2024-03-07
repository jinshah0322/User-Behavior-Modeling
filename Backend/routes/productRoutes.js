const express = require("express")
const router = express.Router()
const {createProduct,getAllProducts,getProductByID,updateProductById,deleteProductById,addRating} = require("../Controller/productController")

router.route("/").post(createProduct).get(getAllProducts)
router.route("/:id").get(getProductByID).put(updateProductById).delete(deleteProductById)
router.route("/:productId/ratings").post(addRating)

module.exports = router