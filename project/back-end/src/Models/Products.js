const mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    Product: { type: String },
    Description: { type: String },
    Price: { type : Number},
    Quantity: { type : Number}   
});

module.exports = mongoose.model("Products", ProductSchema);
