const User= require ("../models/user")
const ErrorHandler=require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const sendToken= require("../utils/jwtToken")
const sendEmail= require("../utils/sendEmail")
const crypto = require("crypto");

//register a user => /api/v1/admin/register
exports.registerUser = catchAsyncErrors (async (req, res, next)=>{
    const {name, email, password, position, phone, address, bankAccount, aboutUs, role, philosophy}= req.body;
    const user= await User.create({
        name,
        email,
        password,
        position,
        phone,
        address,
        bankAccount,
        aboutUs,
        role,
        philosophy

    })

    sendToken (user, 200, res)
  
})

//login user => /api/v1/admin/login
exports.loginUser = catchAsyncErrors (async (req, res, next)=>{
    const { email, password}= req.body;
    //check if email and password is entered by user
    if (!email || !password) {
        return next (new ErrorHandler ("please enter email and password", 400))
    }

    //finding user in database
    const user =await User.findOne({email}).select("+password")

    if (!user){
        return next (new ErrorHandler ("Invalid email or password", 401))
    }

    //check if password is correct or not
    const isPasswordMatched =await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next (new ErrorHandler ("Invalid email or password", 401))
    }

   sendToken (user, 200, res)
})


        
//log out user => /api/v1/admin/logout
exports.logout =catchAsyncErrors (async (req, res, next)=>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message: "Logged out"
    })
})


//forgot passwor => /api/v1/pasword/forgot
exports.forgotPassword= catchAsyncErrors (async (req, res, next)=>{
    const user= await User.findOne({email: req.body.email});

    if (!user) {
        return next (new ErrorHandler("User not found with this email", 404));
    }

    //get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false })

    //create resset password URL
    const resetUrl =`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message=`You password reset token is as follow:\n\n${resetUrl}\n\n If you have not requested this email, then ignore it.`
    try{

        await sendEmail({
            email: user.email,
            subject: "New Sun Motor Password Recovery",
            message
        })
        
        res.status(200).json({
            success:true,
            message: `Email sent to ${user.email}`
        })



    }catch (error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save ({validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500))
    }
})


//reset password => /api/v1/pasword/reset/:token
exports.resetPassword= catchAsyncErrors (async (req, res, next)=>{
    //Hush url token
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex")
    console.log(resetPasswordToken)

    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now()}
    })

    if(!user) {
        return next(new ErrorHandler("password token is invalid or has been expired ", 400))
    }

    if (req.body.password!== req.body.confirmPassword){
        return next(new ErrorHandler("password does not match ", 400))
    }

    //set up new password
    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();

    sendToken (user, 200, res)

})


//get currently logged in user details => /api/v1/me
exports.getUserProfile= catchAsyncErrors (async (req, res, next)=>{
    const user= await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    })
})

//update/change password =. /api/v1/password/update
exports.updatePassword= catchAsyncErrors (async (req, res, next)=>{
    const user= await User.findById(req.user.id).select("+password");

    //check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword)

    if(! isMatched){
        return next(new ErrorHandler("old password is incorrect ")) 
    }

    user.password= req.body.password;
    await user.save();
    sendToken(user, 200, res)
})


//update user profile =./api/v1/me/update
exports.updateProfile =catchAsyncErrors (async (req, res, next)=>{
    try {
        const { name, email, password, position, phone, address, bankAccount, aboutUs } = req.body;
        
        const user = await User.findOne({  role: 'admin' }); // Find the user by email
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Update the user's profile fields if provided
        if (name) {
            user.name = name;
        }
    
        if (email) {
            user.email = email;
        }
    
        if (password) {
            user.password = password;
        }
    
        if (position) {
            user.position = position;
        }
    
        if (phone) {
            user.phone = phone;
        }
    
        if (address) {
            user.address = address;
        }
    
        if (bankAccount) {
            user.bankAccount = bankAccount;
        }
    
        if (aboutUs) {
            user.aboutUs = aboutUs;
        }
    
        // Save the updated user profile
        await user.save();
    
        res.status(200).json({ success: true, message: 'Profile updated successfully' });
        } catch (error) {
        next(new ErrorHandler(error.message, 500));
        }
    });



// Controller to fetch all philosophy data  =>api/v1/aboutUs
exports.getAboutUs = async (req, res, next) => {
    try {
        const user = await User.findOne({  role: 'admin' }); // Find the user by email
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const philosophy = user.philosophy; 

        res.status(200).json({ success: true, philosophy });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};








