const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    MobileNo:{
        type: String,
        required: true,
        unique: true
    },
    designation:{
        type: String,
        required: true
    },
    Gender:{
        type: String,
        required: true
    },
    course:{
        type: [String],
        required: true,
    },
    image:{
        type: String,
    }
}) 

module.exports = mongoose.model('Empolyee',employeeSchema)
