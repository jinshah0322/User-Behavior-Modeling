const Product = require("../models/productModel")
const Category = require("../models/categoryModel")
const User = require("../models/userModel")

exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        await product.save()
        res.send({ msg: "Product created successfully", product, success: true, status: 200 })
    } catch (error) {
        res.status({ msg: error.message, success: false, status: 400 })
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.send({ products, success: true, status: 200 })
    } catch (error) {
        res.send({ msg: error.message, success: false, status: 500 });
    }
};

exports.getProductByID = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        const category = await Category.findById(product.category)
        const categoryName = category.name.charAt(0).toUpperCase() + category.name.slice(1)
        for(let i=0;i<product.ratings.length;i++){
            const user = await User.findById(product.ratings[i].postedby)
            product.ratings[i].name = user?.name
        }
        if (!product) {
            return res.send({ msg: 'Product not found', success: false, status: 404 });
        }
        res.send({ product, categoryName, success: true, status: 200 })
    } catch (error) {
        res.send({ msg: error.message, success: false, status: 500 });
    }
}

exports.updateProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.send({ msg: 'Product not found', success: false, status: 404 });
        }
        res.send({ msg: "Product Updated successfully", product, success: true, status: 200 })
    } catch (error) {
        res.send({ msg: error.message, success: false, status: 500 });
    }
};

exports.deleteProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.send({ msg: 'Product not found', success: false, status: 404 });
        }
        res.send({msg:"Product deleted successfully",success:true,status:200})
    } catch (error) {
        res.send({ msg: error.message, success: false, status: 500 });
    }
};

exports.addRating = async (req,res)=>{
    try{
        const { productId } = req.params;
        const { star, comment, userId } = req.body;
        const product = await Product.findById(productId);
        if (!product) {
            return res.send({ msg: 'Product not found',success:false,status:404 });
        }
        product.ratings.push({ star, comment, postedby: userId });
        const totalRatings = product.ratings.length;
        const sumRatings = product.ratings.reduce((total, rating) => total + rating.star, 0);
        const newTotalRating = sumRatings / totalRatings;
        product.totalrating = newTotalRating.toFixed(2)
        await product.save()
        res.send({msg:"Rating added successfully",success:true,status:200})
    } catch (error) {
        res.send({ msg: error.message, success: false, status: 500 });
    }
}