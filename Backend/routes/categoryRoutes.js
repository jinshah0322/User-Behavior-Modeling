const express = require("express")
const router = express.Router()

const {getAllCategory,addCategory,deleteCategory} = require("../Controller/categoryController")

router.route("/").get(getAllCategory).post(addCategory).delete(deleteCategory)

module.exports = router