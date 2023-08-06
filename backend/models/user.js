const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    createdAt:{
        type:Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date



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


module.exports = mongoose.model("User", userSchema)