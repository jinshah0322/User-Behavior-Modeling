const User = require("../models/userModel")
const bcryptjs = require("bcryptjs")
const sendEmail = require("../helper/sendEmail")

const getAllUsers = async(req,res)=>{
    const users = await User.find()
    isAdmin = req.session.user.isAdmin
    if(isAdmin){
        res.send({ users, count: users.length, success: true })
    } else{
        res.send({ msg: "You are not authorized to access", success: false, status: 401 })
    }
}

const registerUser = async(req,res)=>{
    try{
        const {name,email,mobile,password,age,address} = req.body
        const existingUserEmail = await User.findOne({ email: email });
        const existingUserNumber = await User.findOne({ mobile: mobile });
        if(!existingUserEmail){
            if(!existingUserNumber){
                if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
                    if(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile)){
                        if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/.test(password)){
                            const salt = await bcryptjs.genSalt(10);    
                            const hashedPassword = await bcryptjs.hash(password, salt)
                            const user = new User({
                                name:name,
                                email:email,
                                password:hashedPassword,
                                mobile:mobile,
                                age:age,
                                address:address
                            })
                            const html = `
                                <h2>Welcome to our E commerce website </h2>
                                <p>Dear ${name},</p>
                                <p>Thank you for joining E commerce website! We are excited to have you on board. With our application, you can buy products of your choice, 🎉 Get ready for a world of endless possibilities and unbeatable deals.Stay tuned for exciting updates and offers. If you have any questions, we're here to help. If you have any questions or need assistance, feel free to contact our support team at <a href="mailto:jinshah0322@gmail.com">jinshah0322@gmail.com</a></p>
                                <p>Best regards,<br>[Jinay Shah]</p>
                            `
                            const data = {
                                to: email,
                                text: `Hey ${name}`,
                                subject: "Welcome to our chat application ",
                                html: html
                            }
                            sendEmail(data)
                            await user.save()
                            res.send({ user, success: true, status: 200 })
                        } else{res.send({ msg: "Enter Valid Password", success: false, status: 403 })}
                    } else{res.send({ msg: "Enter Valid Number", success: false, status: 403 })}
                } else{res.send({ msg: "Enter Valid Email", success: false, status: 403 })}
            } else{res.send({ msg: "Phone Number already exists", success: false, status: 403 })}
        } else{res.send({ msg: "User already exists", success: false, status: 403 })}
    } catch(error){
        console.log(error.message);
    }
}

const loginUser = async(req,res)=>{
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
        res.send({ msg: "User not found", success: false, status: 404 })
    } else {
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            res.send({ msg: "Incorrect Password", success: false, status: 401 })
        } else {
            req.session.user = user
            res.send({ user, name: user.name, success: true, status: 200 })
        }
    }
}

const logoutUser = async(req,res)=>{
    try{
        req.session.destroy()
        res.send({ msg: "Log Out Successful", success: true, status: 200 })
    } catch(error){
        console.log(error.message);
    }
}

module.exports = {
    getAllUsers,
    registerUser,
    loginUser,
    logoutUser
}