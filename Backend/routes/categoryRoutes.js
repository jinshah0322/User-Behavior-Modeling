const express = require("express")
const router = express.Router()

const {getAllCategory,addCategory,deleteCategory,updateCategory} = require("../Controller/categoryController")

router.route("/").get(getAllCategory).post(addCategory).delete(deleteCategory)
router.route("/:id").put(updateCategory)

module.exports = router