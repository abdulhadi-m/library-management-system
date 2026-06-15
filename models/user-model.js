const mongoose = require('mongoose');

// Capital S in Schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    surname: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    issuedBooks: {
        type: mongoose.Schema.ObjectId,
        ref: "Book",
        required: false
    },
    issuedDate: {
        type: String,
        required: false,
    },returnDate: {
        type: String,
        required: false,
    },
    subscriptionType: {
        type: String,
        required: true,
    },
    subscriptionDate: {
        type: String,
        required: true,
    },
   
}, {timestamps: true})
module.exports = mongoose.model("User", userSchema)