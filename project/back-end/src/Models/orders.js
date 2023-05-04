const mongoose = require('mongoose')

var  orderSchema = new mongoose.Schema({
    order_id: {type: Number},
    Order_Name: {type: String},
    Order_Date: {type: Date},
    shipping_address: {type: String}
})

module.exports = mongoose.model("orders",orderSchema);