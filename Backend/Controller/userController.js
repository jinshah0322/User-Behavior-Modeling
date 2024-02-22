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
const registerUser = async (req, res) => {
    try {
        const { name, email, phonenumber, password, city, address, region, postalcode, country } = req.body;
        
        // Check if user with the same email or phone number already exists
        const existingUser = await User.findOne({ $or: [{ email: email }, { phonenumber: phonenumber }] });

        if (existingUser) {
            return res.status(409).send({ msg: "User already exists", success: false });
        }

        // Validate email format
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            return res.status(400).send({ msg: "Enter Valid Email", success: false });
        }

        // Validate phone number format
        if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(phonenumber)) {
            return res.status(400).send({ msg: "Enter Valid Number", success: false });
        }

        // Validate password format
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/.test(password)) {
            return res.status(400).send({ msg: "Enter Valid Password", success: false });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const user = new User({
            name,
            email,
            phonenumber,
            country,
            address,
            city,
            region,
            postalcode,
            password: hashedPassword,
        });

        // Attempt to save the user
        try {
            const savedUser = await user.save();
            // Send welcome email or any other post-registration actions
            // sendEmail(data);

            return res.status(200).send({ user: savedUser, success: true });
        } catch (saveError) {
            console.error("Error saving user:", saveError);
            return res.status(500).send({ msg: "Internal server error", success: false });
        }
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).send({ msg: "Internal server error", success: false });
    }
};

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

const profile = async(req,res)=>{
    try{
        const currentId = req.session.user._id
        const user = await User.findOne({_id:currentId})
        res.send({user:user,success:true,status:200})
    } catch(error){
        console.log(error.message)
    }
}

const forgotPassword = async(req,res)=>{
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

const changePassword = async(req,res)=>{
    try{
        const currentId = req.session.user._id
        const user = await User.findOne({_id:currentId})
        const {oldPassword,newPassword} = req.body
        const validPassword = await bcryptjs.compare(oldPassword, user.password)
        if (!validPassword) {
            res.send({ message: "Old Password is incorrect", success: false,status:401})
        } else {
            if(await bcryptjs.compare(newPassword, user.password)){
                res.render({ message: "Password same as previous", success: false,staus:403})
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

const deleteaccount = async(req,res)=>{
    try{
        const userId = req.session.user._id
        const name = req.session.user.name
        const email = req.session.user.email
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
        req.session.destroy()
        res.send({msg:"user deleted successfully",success:true,status:200})
    } catch(error){
        console.log(error.message);
    }
}

const editProfile = async(req,res)=>{
    try{
        const {name,email,phonenumber,address} = req.body
        const userId = req.session.user._id
        const user = await User.findOne({_id:userId})
        if(name == ''){
            res.send({msg:'name can not be empty',success:false,status:204})
        }
        if(name){
            var nameupdate = User.updateOne({_id:userId},{name:name})
        }
        if(address && address!=""){
            var addressupdate = User.updateOne({_id:userId},{address:address})
        } else{
            res.send({msg:"Address cant be empty",success:false,status:204})
        }
        if(phonenumber){
            if(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(phonenumber)){
                const allNumber = await User.find({phonenumber:phonenumber})
                if(allNumber.length == 0){
                    var numberupdate = User.updateOne({_id:userId},{phonenumber:phonenumber})
                } else{
                    res.send({msg:'User with same phonenumber Number already exist',success:false,status:409})
                }
            } else{
                res.send({msg:'Enter Valid moile number',success:false,status:422})
            }
        }
        if(email){
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
        await addressupdate
        const oldEmail = user.email
        const updatedUser = await User.updateOne({email:oldEmail},{name,email,phonenumber})
        const html = `
                <h2>Your Profile has been Updatedn </h2>
                <p>Dear ${name},</p>
                <p>We want to inform you that your profile on our application has been successfully updated. Your changes have been saved, and your profile now reflects the updated information.If you have any further updates or need assistance, feel free to log in to your account and make the necessary changes. If you have any questions, please contact our support team at <a href="mailto:jinshah0322@gmail.com">jinshah0322@gmail.com</a></p>
                <p>Best regards,<br>[Jinay Shah]</p>
            `
        var data = {
            to: email,
            text: `Hey ${name}`,
            subject: "Your Profile has been Updated",
            html: html
        }
        sendEmail(data)
        data = {
            to: oldEmail,
            text: `Hey ${name}`,
            subject: "Your Profile has been Updated",
            html: html
        }
        sendEmail(data)
        res.send({ msg:"Profil edited successfully",success:true,status:200});
    }catch(error){
        console.log(error);
    }
}

const blockUser = async (req,res)=>{
    try{
        isAdmin = req.session.user.isAdmin
        if(isAdmin){
            const user = await User.findByIdAndUpdate(req.params.id,{isBlocked:true},{new:true,runValidators:true})
            if(!user){
                res.send({msg:"User not found",success:false,status:404})
            }
            res.send({msg:`User with id: ${req.params.id} blocked successfully`,success:true,status:200})
        } else{
            res.send({ msg: "You are not authorized to access", success: false, status: 401 })
        }
    } catch(error){
        console.log(error.message);
    }
}

const unblockUser = async (req,res)=>{
    try{
        isAdmin = req.session.user.isAdmin
        if(isAdmin){
            const user = await User.findByIdAndUpdate(req.params.id,{isBlocked:false},{new:true,runValidators:true})
            if(!user){
                res.send({msg:"User not found",success:false,status:404})   
            }
            res.status(200).send({msg:`User with id: ${req.params.id} unblocked successfully`,success:true})
        } else{
            res.send({ msg: "You are not authorized to access", success: false, status: 401 })
        }
    } catch(error){
        console.log(error.message);
    }
}



module.exports = {
    getAllUsers,
    registerUser,
    loginUser,
    logoutUser,
    profile,
    forgotPassword,
    changePassword,
    deleteaccount,
    editProfile,
    blockUser,
    unblockUser
}