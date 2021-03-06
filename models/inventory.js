const mongoose = require("mongoose")
const Schema = mongoose.Schema


//How enforce dollars/cents format for price???


//Inventory Blueprint
const inventorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Inventory", inventorySchema)