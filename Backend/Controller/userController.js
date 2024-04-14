const User = require("../models/userModel")
const bcryptjs = require("bcryptjs")
const sendEmail = require("../helper/sendEmail")
const { response } = require("express")

exports.getAllUsers = async(req,res)=>{
    const users = await User.find()
    res.send({ users, count: users.length, success: true })
}

exports.registerUser = async (req, res) => {
    try {
        const { name, email, phonenumber, password, city, state, streetAddress, postalcode, country } = req.body;
        const existingUserEmail = await User.findOne({ email: email });
        const existingUserNumber = await User.findOne({ phonenumber: phonenumber });
        if(!existingUserEmail){
            if(!existingUserNumber){
                if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
                    if(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(phonenumber)){
                        if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/.test(password)){
                            const salt = await bcryptjs.genSalt(10);    
                            const hashedPassword = await bcryptjs.hash(password, salt)
                            const user = new User({
                                name:name,
                                email:email,
                                password:hashedPassword,
                                phonenumber:phonenumber,
                                state:state,
                                city:city,
                                streetAddress:streetAddress,
                                postalcode:postalcode,
                                country:country
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
                                subject: "Welcome to our E-Commerce website ",
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
};

exports.loginUser = async(req,res)=>{
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
        res.send({ msg: "User not found", success: false, status: 404 })
    } else {
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            res.send({ msg: "Incorrect Password", success: false, status: 401 })
        } else {
            res.send({ user, name: user.name, success: true, status: 200 })
        }
    }
}

exports.profile = async(req,res)=>{
    try{
        const currentId = req.params.id
        const user = await User.findOne({_id:currentId})
        res.send({user:user,success:true,status:200})
    } catch(error){
        console.log(error.message)
    }
}

exports.forgotPassword = async(req,res)=>{
    try{
        const email = req.body.email
        const user = await User.findOne({email:email})
        const characters = process.env.PASSWORD_GENERATOR_STRING;
        if(user){
            let generatedPassword = '';
            for (let i = 0; i < 15; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                generatedPassword += characters.charAt(randomIndex);
            }
            const salt = await bcryptjs.genSalt(10);    
            const hashedPassword = await bcryptjs.hash(generatedPassword, salt)
            const html = `
            <h2>Password Recovery Instructions</h2>
            <p>Dear ${user.name},</p>
            <p>We received a request to recover your account password. If you did not initiate this request, please disregard this email.</p>
            <p>Your new temporary password is <b>${generatedPassword}</b> you can change this later after loging in.Please dont share this to other for you safety purpose.If you have any questions or did not request a password reset, please contact our support team at <a href="mailto:jinshah0322@gmail.com">jinshah0322@gmail.com</a>.</p>
            <p>Best regards,<br>Jinay Shah</p>
            `
            const data = {
                to: email,
                text: `Recover Password`,
                subject: "Password Recovery Instructions",
                html: html
            }
            await User.updateOne({email:email},{$set:{password:hashedPassword}})
            sendEmail(data)
            res.send({message:"Check your email address",success:true,status:200})
        } else{
            res.send({message:"user not found",success:false,status:404})
        }
    }catch(error){
        console.log(error.message);
    }
}

exports.changePassword = async(req,res)=>{
    try{
        const {oldPassword,newPassword,_id} = req.body
        console.log(req.body);
        const currentId = _id
        const user = await User.findOne({_id:currentId})
        const validPassword = await bcryptjs.compare(oldPassword, user.password)
        if (!validPassword) {
            res.send({ message: "Old Password is incorrect", success: false,status:401})
        } else {
            if(await bcryptjs.compare(newPassword, user.password)){
                res.send({ message: "Password same as previous", success: false,staus:403})
            } else{
                if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/.test(newPassword)){
                    const salt = await bcryptjs.genSalt(10);    
                    const hashedPassword = await bcryptjs.hash(newPassword, salt)
                    const html = `
                    <h2>Password Recovery Instructions</h2>
                    <p>Dear ${user.name},</p>
                    <p>We received a request to change your account password. If you did not initiate this request, please or if you have any questions or did not request a password change, please contact our support team at <a href="mailto:jinshah0322@gmail.com">jinshah0322@gmail.com</a>.</p>
                    <p>As per your request we have successfully changed your password you can verify it by again loging in.</p>
                    <p>Best regards,<br>Jinay Shah</p>
                    `
                    const data = {
                        to: user.email,
                        text: `Change Password`,
                        subject: "Password Reset Instructions",
                        html: html
                    }
                    await User.updateOne({_id:currentId},{$set:{password:hashedPassword}})
                    sendEmail(data)
                    res.send({message: "Password changed successfully", success: true,staus:200})
                } else{
                    res.send({message:'Enter strong password',success:false,status:403})
                }
            }
        }
    }catch(error){
        console.log(error.message);
    }
}

exports.deleteaccount = async(req,res)=>{
    try{
        const user = await User.findOne({_id:req.params.id})
        const userId = user._id
        const name = user.name
        const email = user.email
        const html = `
                    <h2>Delete Account </h2>
                    <p>Dear ${name},</p>
                    <p>We have successfully deleted your account. If this request was not initiated by you or if you have any concerns, please contact our support team at <a href="mailto:jinshah0322@gmail.com">jinshah0322@gmail.com</a>.</p>
                    <p>If you did not request this action, please reach out to us immediately.</p>
                    <p>Best regards,<br>Jinay Shah</p>
                    `;
        const data = {
            to: email,
            text: `Delete Account`,
            subject: "Deleted Account",
            html: html
        }

        await User.deleteOne({_id:userId})
        sendEmail(data)
        res.send({msg:"user deleted successfully",success:true,status:200})
    } catch(error){
        console.log(error.message);
    }
}

exports.editProfile = async(req,res)=>{
    try{
        const {name, email, phonenumber, password, city, streetAddress, postalcode, country,state} = req.body
        const userId = req.params.id
        const user = await User.findOne({_id:userId})        
        if(name){
            var nameupdate = User.updateOne({_id:userId},{name:name})
        }
        if(phonenumber && phonenumber !== user.phonenumber){
            if(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(phonenumber)){
                const allNumber = await User.find({phonenumber:phonenumber})
                if(allNumber.length == 0){
                    var numberupdate = User.updateOne({_id:userId},{phonenumber:phonenumber})
                } else{
                    res.send({msg:'User with same phone number Number already exist',success:false,status:409})
                }
            } else{
                res.send({msg:'Enter Valid phone number',success:false,status:422})
            }
        }
        if(email && email!==user.email){
            if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
                const allEmail = await User.find({email:email})
                if(allEmail.length == 0){
                    var emailupdate = User.updateOne({_id:userId},{email:email})
                } else{
                    res.send({msg:'User with same email address already exist',success:false,status:409})
                }   
            } else{
                res.send({msg:'Enter Valid email address',success:false,status:422})
            }
        }
        await nameupdate
        await numberupdate
        await emailupdate
        const oldEmail = user.email
        await User.updateOne({email:oldEmail},{name,email,phonenumber,password, city, streetAddress, postalcode, country,state})
        const html = `
                <h2>Your Profile has been Updated </h2>
                <p>Dear ${user?.name},</p>
                <p>We want to inform you that your profile on our application has been successfully updated. Your changes have been saved, and your profile now reflects the updated information.If you have any further updates or need assistance, feel free to log in to your account and make the necessary changes. If you have any questions, please contact our support team at <a href="mailto:jinshah0322@gmail.com">jinshah0322@gmail.com</a></p>
                <p>Best regards,<br>[Jinay Shah]</p>
            `
        var data = {
            to: email,
            text: `Hey ${user?.name}`,
            subject: "Your Profile has been Updated",
            html: html
        }
        sendEmail(data)
        data = {
            to: oldEmail,
            text: `Hey ${user?.name}`,
            subject: "Your Profile has been Updated",
            html: html
        }
        sendEmail(data)
        res.send({ msg:"Profile edited successfully",success:true,status:200});
    }catch(error){
        console.log(error);
    }
}

exports.blockUser = async (req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,{isBlocked:true},{new:true,runValidators:true})
        if(!user){
            res.send({msg:"User not found",success:false,status:404})
        }
        res.send({msg:`User with id: ${req.params.id} blocked successfully`,success:true,status:200})
    } catch(error){
        console.log(error.message);
    }
}

exports.unblockUser = async (req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,{isBlocked:false},{new:true,runValidators:true})
        if(!user){
            res.send({msg:"User not found",success:false,status:404})   
        }
        res.status(200).send({msg:`User with id: ${req.params.id} unblocked successfully`,success:true})
    } catch(error){
        console.log(error.message);
    }
}