const task = require('../Models/task');
const { ObjectId } = require('mongoose').Types;

var getTask = (req, res) => {
    // Viết logic
    task.find({})
        .then((Tasks) => {
            res.json(Tasks);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        });
}

var addTask = (req, res) => {
    let id = req.body.data;
    const name = req.body.name;
 
    const newTask = new task({
        taskId: id,
        active: true,
        taskName: name
    });

    newTask.save()
    res.send("Add succcesfully");
}

var deleteTask = async (req, res) => {

    const taskId = req.body.id;
    const objectId = new ObjectId(taskId);
    try {
      const result = await task.deleteOne({ _id: objectId });      
      res.send('delete successfully');
    } catch (error) {
      console.log(error);
      res.status(500).send('delete failed');
    }
  };

module.exports = {
    getTask, addTask,deleteTask
}