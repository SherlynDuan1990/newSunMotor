const User = require('../models/user');
const sendEmail = require('../utils/sendEmail');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Enquiry = require('../models/enquiry');

exports.createEnquiry = catchAsyncErrors(async (req, res, next) => {
    const { email, phone, fullName, message } = req.body;

    // Create a new enquiry
    const enquiry = await Enquiry.create({
        email,
        phone,
        fullName,
        message,
    });

    try {
        // Fetch the admin user details
        const adminUser = await User.findOne({ role: 'admin' });

        if (!adminUser) {
            return next(new ErrorHandler('Admin user not found', 404));
        }

        // Send email to admin with enquiry details
        await sendEmail({
            email: adminUser.email, // Use the admin's email
            subject: 'New Enquiry',
            message: `
                New enquiry received:
                Admin Email: ${adminUser.email}
                Customer Email: ${email}
                Phone: ${phone}
                Full Name: ${fullName}
                Message: ${message}
            `,
        });

        // Send email to the customer with enquiry details
        await sendEmail({
            email: email, // Customer's email
            subject: 'Enquiry Received',
            message: `
                Thank you for your enquiry. We have received the following details:

                Admin Email: ${adminUser.email}
                Your Email: ${email}
                Phone: ${phone}
                Full Name: ${fullName}
                Message: ${message}

                We will get back to you as soon as possible.
            `,
        });

        res.status(201).json({
            success: true,
            message: 'Enquiry created successfully',
            enquiry,
        });
    } catch (error) {
        // Handle any errors that occur while sending the email
        console.error(error);
        return next(new ErrorHandler('Enquiry created, but email notifications could not be sent', 500));
    }
});
