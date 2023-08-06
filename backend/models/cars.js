const mongoose=require("mongoose")

const testDriveSchema = new mongoose.Schema({
    
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    customer: {
      email: {
        type: String,
        required: true,
      },
      fullName: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      dateOfBirth: {
        type: Date,
        required: true,
      },
      drivingLicense: {
        type: String,
        required: true,
      }
    }
  })
  
const carsSchema = new mongoose.Schema ({
    title :{type:String,
        required: [true, "please enter title"],
        trim:true,
        maxlength:[100, "title can not exceed 100 characters"]
    },
    price :{
        type:Number,
        required: [true, "please enter price"],
        maxlength:[10, "price can not exceed 10 characters"], 
        default:0.0
    },
    description :{
        type:String,
        required: [true, "please enter description"],
    },
    status :{
        type:String,
        required: [true, "please enter status"],
        default:"N/A"
    },
    stockNo :{
        type:Number,
        required: [true, "please enter stock No"],
        default:0.0
    },
    vinNo :{
        type:String,
        required: [true, "please enter vin No"],
        default:0.0
    },
    chassisNo :{
        type:String,
        required: [true, "please enter chassis No"],
        default:0.0
    },
    numberPlate :{
        type:String,
        default: "N/A"
    },
    make :{
        type:String,
        required: [true, "please enter make"]
    },
    model :{
        type:String,
        default: "N/A"
    },
    year :{
        type:Number,
        required: [true, "please enter year"],
        default:0
    },
    kilometers :{
        type:Number,
        required: [true, "please enter kilometers"],
        default:0
    },
    body :{
        type:String,
        default: "N/A"
    },
    transmission :{
        type:String,
        required: [true, "please enter transmission"],
        default: "N/A"
    },
    doors :{
        type:Number,
        default:0
    },
    seats :{
        type:Number,
        default:0
    },
    color :{
        type:String,
        default: "N/A"
    },
    fuelType :{
        type:String,
        required: [true, "please enter fuel type"],
        default: "N/A"
    },
    engineSize :{
        type:String,
        required: [true, "please enter engine size"],
        default:0
    },
    wofExpire: { 
        type:Date,
        default: Date.now,
    },
    regoExpire: { 
        type:Date,
        default: Date.now
        
    },
    numberOfOwners: { 
        type:Number,
        default:0
    },
    cylinders: { 
        type:Number,
        default:0
    },
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
    features: [{ type: String }],
    
    testdrives: [testDriveSchema],
    
    createdAt: { 
        type:Date,
        default: Date.now
    }
})


module.exports = mongoose.model("car", carsSchema)