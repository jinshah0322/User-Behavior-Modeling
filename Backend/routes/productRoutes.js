const express = require("express")
const router = express.Router()
const {createProduct,getAllProducts,getProductByID,updateProductById,deleteProductById,addRating,productsByCategory,fetchProducts} = require("../Controller/productController")

router.route("/").post(createProduct).get(getAllProducts)
router.route("/:id").get(getProductByID).put(updateProductById).delete(deleteProductById)
router.route("/:productId/ratings").post(addRating)
router.route("/category/:category").get(productsByCategory)
router.route("/fetchProducts").post(fetchProducts)
module.exports = router