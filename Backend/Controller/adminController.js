// {
//     "skip": req.body.skip,
//     "limit": 5,
//     "search": req.body.searchitem,
//     "sort": [
//         {
//             "columnName": req.body.name,
//             "direction": true for ascending and false for descending
//         }
//     ],
//     products:[list of all the products based on the list of categories sent from frontend]
// }

const Category = require("../models/categoryModel")

exports.admin = async (req,res)=>{
    const {skip,limit,search,sort,category} = req.body
    let query = Category.find({}) 
    if(search) {
        query = query.find({name:{$regex:search,$options:'i'}})
    }
    if(category){
        
    }
    if(sort){
        const sortOrder = sort.direction ? 1 : -1
        query = query.sort({[sort.columnName] : sortOrder})
    }
    if(skip){
        query = query.skip(skip)
    }
    if(limit){
        query = query.limit(limit)
    }
    const categories = await query.exec()
    res.send({categories,success:true,status:200})
}