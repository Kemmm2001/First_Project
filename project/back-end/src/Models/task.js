const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    taskId: {type: Number},   
    taskName: {type: String},
    completed: {type : Boolean},
    task_date:{type: Date}
})

module.exports = mongoose.model("Tasks",taskSchema);