const Product = require("../models/productModel")
const Category = require("../models/categoryModel")
const User = require("../models/userModel")
const mongoose = require("mongoose")

exports.createProduct = async (req, res) => {
    try {
        const currentCategory = await Category.findOne({ name: req.body.category.toLowerCase() })
        const { title, description, price, brand, quantity, image, category } = req.body
        const body = { title, description, price, category: currentCategory._id, brand, quantity, image }
        const product = await Product.create(body)
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
        const categoryName = category?.name?.charAt(0).toUpperCase() + category?.name?.slice(1)
        for (let i = 0; i < product.ratings.length; i++) {
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
        res.send({ msg: "Product deleted successfully", success: true, status: 200 })
    } catch (error) {
        res.send({ msg: error.message, success: false, status: 500 });
    }
};

exports.addRating = async (req, res) => {
    try {
        const { productId } = req.params;
        const { star, comment, userId } = req.body;
        const product = await Product.findById(productId);
        if (!product) {
            return res.send({ msg: 'Product not found', success: false, status: 404 });
        }
        product?.ratings?.push({ star, comment, postedby: userId });
        const totalRatings = product?.ratings?.length;
        const sumRatings = product?.ratings?.reduce((total, rating) => total + rating.star, 0);
        const newTotalRating = sumRatings / totalRatings;
        product.totalrating = newTotalRating?.toFixed(2)
        await product.save()
        res.send({ msg: "Rating added successfully", success: true, status: 200 })
    } catch (error) {
        res.send({ msg: error.message, success: false, status: 500 });
    }
}

exports.productsByCategory = async (req, res) => {
    try {
        const { category } = req.params
        const products = await Product.find({ category: category }).limit(4)
        if (!products) {
            return res.send({ msg: "No products found", success: false, status: 404 })
        }
        res.send({ products, success: true, status: 200 })
    }
    catch (error) {
        res.send({ msg: error.message, success: false, status: 500 })
    }
}

exports.fetchProducts = async (req, res) => {
    const { search, category, skip , limit, sort } = req.body;
    try {
        let filter = {};
        if (search) {
            filter.title = { $regex: search, $options: "i" };
        }
        if (category) {
            if(category !== "all"){
                filter.category = new mongoose.Types.ObjectId(category);
            } else{
                delete filter.category;
            }
        }

        const sortOptions = {};
        if (sort) {
            if(sort === "asc") sortOptions.price = 1;
            else sortOptions.price = -1;
        }

        const totalProducts = await Product.countDocuments(filter);
        const products = await Product.find(filter)
            .sort(sortOptions)
            .limit(limit)
            .skip(skip)

        res.send({
            products,
            totalProducts,
            success: true,
            status: 200
        });
    } catch (error) {
        res.status(500).send({ message: error.message, success: false, status: 500 });
    }
};
