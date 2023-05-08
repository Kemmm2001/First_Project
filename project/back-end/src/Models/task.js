const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    taskId: {type: Number},
    active: {type : Boolean},
    taskName: {type: String}
})

module.exports = mongoose.model("Tasks",taskSchema);