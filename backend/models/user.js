const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const philosophySchema = new mongoose.Schema({
    strands: [{
        title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
    }],
    images :[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
    }],
});

const userSchema = new mongoose.Schema ({
    name:{
        type:String,
        required: [true, "please enter your name"],
        maxLength: [30, "Your name can not exceed 30 charactors"]
    }, 
    email:{
        type:String,
        required: [true, "please enter your email"],
        unique:true,
        validate: [validator.isEmail, "Please enter valid email address"]
    }, 
    position:{
        type:String,
    },
    phone:{
        type:String,
    },

    password:{
        type:String,
        required: [true, "please enter your password"],
        minlength: [6, "Your password must be longer than 6 characters"],
        select:false
    },
    role:{
        type:String,
        default:"user"
    },
   
    address:{
        type:String,
    },
    bankAccount:{
        type:String,
    },
    
    aboutUs:{
        type:String,
    },


    createdAt:{
        type:Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    philosophy: [philosophySchema],



})

//encrypt password before saving user
userSchema.pre("save", async function(next){
    if (!this.isModified("password")){
        next()
    }

    this.password= await bcrypt.hash(this.password, 10)
})
//compare user password
userSchema.methods.comparePassword= async function (enteredPassword){
    return await bcrypt.compare (enteredPassword, this.password)
}

//return JWT token
userSchema.methods.getJwtToken= function (){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
        expiresIn :process.env.JWT_EXPIRES_TIME
    });
}

//generata password reset token
userSchema.methods.getResetPasswordToken= function(){
    //generatea token
    const resetToken= crypto.randomBytes(20).toString("hex");

    //hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    //set token expire time
    this.resetPasswordExpire= Date.now()+ 30*60*1000

    return resetToken
}


module.exports = mongoose.model("User", userSchema)