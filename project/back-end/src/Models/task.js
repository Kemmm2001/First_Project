const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({ 
    taskName: {type: String},
    completed: {type : Boolean},
    task_date:{type: Date}
})

module.exports = mongoose.model("Tasks",taskSchema);