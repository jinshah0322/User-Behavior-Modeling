const Category = require("../models/categoryModel")

exports.getAllCategory = async(req,res)=>{
    const categories = await Category.find()
    res.send({categories,count:categories.length,success:true,status:200})
}

exports.updateCategory = async(req,res)=>{
    const {name} = req.body
    const id = req.params.id
    const lowerName = name.toLowerCase()
    const category = await Category.findById({_id:id})
    if(category){
        category.name = lowerName
        await category.save()
        res.send({msg:"Category updated successfully",success:true,status:200})
    } else{
        res.send({msg:"Category not found",success:false,status:404})
    }
}

exports.addCategory = async(req,res)=>{
    const {name,description} = req.body
    const lowerName = name.toLowerCase()
    const existingCategory = await Category.findOne({name:lowerName})
    if(existingCategory){
        res.send({msg:"Category already exists",success:false,status:403})
    } else{
        const category = new Category({
            name:lowerName,
            description:description
        })
        await category.save()
        res.send({msg:"Category added successfully",success:true,status:200})
    }
}

exports.deleteCategory = async(req,res)=>{
    const {name} = req.body
    const lowerName = name.toLowerCase()
    const category = await Category.deleteOne({name:lowerName})
    res.send({msg:"Category deleted successfully",success:true,status:200})

}