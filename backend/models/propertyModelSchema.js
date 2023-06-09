const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    propertyid: Number,
    currentOwner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        min: 6,
    },
    desc: {
        type: String,
        required: true,
        min: 50,
    },
    image: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    metadata: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["beach", "mountain", "village", "city"],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    sqmeters: {
        type: Number,
        required: true,
        min: 15
    },
    price: {
        type: Number,
        required: true
    },
    rooms: {
        type: Number,
        required: true,
        min: 1
    },
    ForSale: Boolean
}, {timestamps: true})

module.exports = mongoose.model("property", propertySchema);