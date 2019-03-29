autoIncrement = require('mongoose-auto-increment');

const mongoose = require('../libs/mongoose');
const mongooseConnection = require('../libs/mongoose');

autoIncrement.initialize(mongooseConnection);

const taskSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    taskName: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
        default: `введите описание задачи`
    },
    beginDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false
    },
    important: {
        type: Boolean,
        default: false
    }

});

taskSchema.plugin(autoIncrement.plugin, {model: 'Task', field: 'taskID', startAt: 1, incrementBy: 1 });
module.exports = mongoose.model('Task', taskSchema);