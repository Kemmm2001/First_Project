const mongoose = require("mongoose")

var cateSchema = new mongoose.Schema({
    cate_id: { type: Number },
    cate_name: {type: String}
})

module.exports = mongoose.model("category",cateSchema);