const Customer = require('../models/customers');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

exports.getAllCustomers = catchAsyncErrors(async (req, res, next) => {
    try {
        const customers = await Customer.find({}, 'fullName emailAddress phoneNumber');

        res.status(200).json({
            success: true,
            message: 'All customers retrieved successfully',
            customers,
        });
    } catch (error) {
        console.error(error);
        // Use the custom error handler to handle errors
        return next(new ErrorHandler('Failed to retrieve all customers', 500));
    }
});



exports.newCustomer = catchAsyncErrors(async (req, res, next) => {
    const { fullName, emailAddress, phoneNumber, dateOfBirth, driverLicense, contract } = req.body;

    try {
        // Create a new customer
        const customer = await Customer.create({
            fullName,
            emailAddress,
            phoneNumber,
            dateOfBirth,
            driverLicense,
            contract,
        });

        res.status(201).json({
            success: true,
            message: 'Customer created successfully',
            customer,
        });
    } catch (error) {
        console.error(error);
        // Use the custom error handler to handle errors
        return next(new ErrorHandler('Failed to create a new customer', 500));
    }
});


exports.newContract = catchAsyncErrors(async (req, res, next) => {
    const { fullName, emailAddress, phoneNumber, dateOfBirth, driverLicense, contract } = req.body;

    try {
        // Create a new customer
        const customer = await Customer.create({
            fullName,
            emailAddress,
            phoneNumber,
            dateOfBirth,
            driverLicense,
            contract,
        });

        res.status(201).json({
            success: true,
            message: 'Customer created successfully',
            customer,
        });
    } catch (error) {
        console.error(error);
        // Use the custom error handler to handle errors
        return next(new ErrorHandler('Failed to create a new customer', 500));
    }
});
