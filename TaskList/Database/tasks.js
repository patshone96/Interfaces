const mongoose = require('mongoose')

mongoose.Promise = global.Promise; 

mongoose.connect('mongodb://localhost:27017/tasks', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Schema

let taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true},
    }
    );


//Model

let Task = mongoose.model('tasks', taskSchema);

module.exports={
    Task:Task
}

