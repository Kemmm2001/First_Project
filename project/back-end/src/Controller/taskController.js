const task = require('../Models/task');

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
    const id = req.query.id;
    const name = req.query.name;

    const newTask = new task({
        taskId: id,
        active: true,
        taskName: name
    });

    newTask.save()
    res.send("oke");
}

module.exports = {
    getTask, addTask
}