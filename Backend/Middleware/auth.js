const isLogin = async(req,res,next)=>{
    try{
        if(!(req.session.user)){
            res.send({ msg: "Please Login", success: false, status: 401 })
        } else{
            next()
        }
    } catch(error){
        console.log(error.message);
    }
}

const isLogout = async(req,res,next)=>{
    try{
        if((req.session.user)){
            res.redirect('/dashboard') //set this in frontend
        }
        next()
    } catch(error){
        console.log(error.message);
    }
}

module.exports= {
    isLogin,isLogout
}