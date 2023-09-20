const mongoose = require('mongoose');

// Schema for contracts
const contractSchema = new mongoose.Schema({
  carDetails: {
    vinNumber: String,
    engineNumber: String,
    plateNumber: String,
    price: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set the default value to the current timestamp
  },
});

// Schema for customers
const customerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: String,
  dateOfBirth: Date,
  driverLicense: String,
  contract: contractSchema, // Embed contract details
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
