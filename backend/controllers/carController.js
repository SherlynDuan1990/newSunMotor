const Car= require ("../models/cars")
const ErrorHandler=require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const APIFeatures=require("../utils/APIFeatures")
const sendEmail= require("../utils/sendEmail")
const User = require('../models/user'); // Import the User model



//get all cars  => /api/v1/cars
exports.getCars= catchAsyncErrors (async (req, res, next)=>{

    const resPerPage = 6; 
    const carCount = await Car.countDocuments();
    

    const apiFeatures= new APIFeatures(Car.find(), req.query)
                        .search()
                        .filter()
                        .pagination(resPerPage)
    const cars= await apiFeatures.query

    res.status(200).json({
        success:true,
        count: cars.length,
        carCount,
        cars
    })
}),

//get a sigle car /api/v1/car/:id
exports.getSingleCar= catchAsyncErrors (async (req, res, next)=>{
    const car= await Car.findById(req.params.id);
    if (!car) {
        return next(new ErrorHandler("car not found", 404))
    }
    res.status(200).json({
        success:true,
        car
    })
}),

// add a test drive booking to a car  /api/v1/car/:id/testdrive
exports.bookTestdrive = catchAsyncErrors(async (req, res) => {
    const car = await Car.findById(req.params.id);

    const {
        date,
        time,
        email,
        fullName,
        phoneNumber,
        dateOfBirth,
        drivingLicense,
    } = req.body;

    if (!car) {
        return next(new ErrorHandler("car not found", 404));
    }

    // Create a new test drive booking
    const testDrive = {
        date,
        time,
        customer: {
            email,
            fullName,
            phoneNumber,
            dateOfBirth,
            drivingLicense,
        },
    };

    // Add the test drive booking to the car's testdrives array
    car.testdrives.push(testDrive);

    // Get the newly added test drive (the last one in the array)
    const newTestDrive = car.testdrives[car.testdrives.length - 1];

    try {
        // Fetch the admin user details
        const adminUser = await User.findOne({ role: 'admin' });

        if (!adminUser) {
            return next(new ErrorHandler('Admin user not found', 404));
        }

        // Send email with the booking details to the customer
        await sendEmail({
            email: email, // Customer's email address
            subject: "Test Drive Booking Confirmation",
            message: `
                Thank you for booking a test drive with us. Here are the details of your booking:

                Date: ${date}
                Time: ${time}
                Full Name: ${fullName}
                Phone Number: ${phoneNumber}
                Date of Birth: ${dateOfBirth}
                Driving License: ${drivingLicense}

                We look forward to seeing you for the test drive. If you have any questions, please contact us.

                Regards,
                New Sun Motor
            `,
        });

        // Send email with the booking details to the admin
        await sendEmail({
            email: adminUser.email, // Use the admin's email
            subject: "New Test Drive Booking",
            message: `
                A new test drive booking has been made.
                Date: ${date}
                Time: ${time}
                Email: ${email}
                Full Name: ${fullName}
                Phone Number: ${phoneNumber}
                Date of Birth: ${dateOfBirth}
                Driving License: ${drivingLicense}
            `,
        });

        res.status(201).json({
            success: true,
            message: "Test drive booked successfully",
            testDrive: newTestDrive,
        });
    } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Error sending email notifications', 500));
    }
});

//create a new car => /api/v1/admin/car/new
exports.newCar =catchAsyncErrors ( async (req, res, next)=>{
    
    
    const car =  await Car.create(req.body);
    res.status(201).json({
        success:true,
        car
    })
}),

//update cars=> /api/v1/admin/car/:id
exports.updateCar= catchAsyncErrors (async (req, res, next)=>{
    let car= await Car.findById(req.params.id);
    if (!car) {
        return res.status(404).json({
                success:false,
                message: "car not found" })
    }

    car= await Car.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        car
    })

}),

//delete cars=> /api/v1/admin/car/:id
exports.deleteCar= catchAsyncErrors (async (req, res, next)=>{
    let car= await Car.findById(req.params.id);
    if (!car) {
        return res.status(404).json({
            success:false,
            message: "car not found" })
}

    await car.deleteOne();

    res.status(200).json({
        success:true,
        message:"car is deleted"
    })

})
