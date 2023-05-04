const mongoose = require('mongoose');

try {
    mongoose.connect('mongodb://localhost:27017/First_DataBase', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connection mongodb sucessful")
} catch (error) {
    console.log("Connection mongodb fail")
}