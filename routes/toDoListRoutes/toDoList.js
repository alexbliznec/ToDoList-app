const Cookies = require('cookies');
const pug = require('pug');
const config = require('config');
const path = require('path');
const Task = require('../../models/Task');
const User = require('../../models/User');
const sessionStore = require('../../libs/sessionStore');
const mongoose = require('../../libs/mongoose');

async function getUserFromCookie (ctx) { //достаем польщователя по куке
    const cookies = await new Cookies(ctx.request, {});
    const sid = cookies.get('koa:sess');
    const session = await sessionStore.get(sid);
    const user = await User.findById(session.passport.user);
    return user;
}

function makeTask(data){

    return {
        taskName: data.taskName,
        beginDate: data.beginDate,
        taskID: data.taskID,
        taskDescription: data.taskDescription,
        completed: data.completed
    };
}

module.exports = {
    allTasksPage: async (ctx) => {
        try{
            //const user = await getUserFromCookie(ctx);
            const user = await User.findById({_id: ctx.session.passport.user});
            console.log(`+++++++++++++++++`);
            console.log(user);
            const tasks = await Task.find({user});
            console.log(`----------------------`);
            console.log(tasks);
            ctx.body = pug.renderFile(path.join(config.get('root.templates'), '/home.pug'), {
                tasks,
                makeTask,
                user
            });
        }catch (err) {console.log(err)};

        
    },
    modalWindow: async (ctx) => {
        try {
            const task = await Task.findOne({taskID: ctx.params.taskID});
            console.log(task);
             ctx.body = task;
        }catch (err) {console.log(err)};

    },
    addTask: async (ctx) => {
        try {
            const user = await getUserFromCookie(ctx);
            const task = await Task.create({
                _id: new mongoose.Types.ObjectId(),
                taskName: ctx.request.body.taskName,
                user: user._id
            });
            ctx.body = task;
        }catch (err) {console.log(err)};
    },
    addTaskDescription: async (ctx) =>{
        try {
            const task = await Task.findOne({taskID: ctx.params.taskID});
            task.taskDescription = ctx.request.body.taskDescription;
            task.save();
            ctx.body = task;
        }catch (err) {console.log(err)};

    },
    updateTask: async (ctx) => {
        try {
            const updatedTask = await Task.findOneAndUpdate(
                {taskID: ctx.params.taskID},
                {taskName: ctx.request.body.editTaskName, 
                taskDescription: ctx.request.body.taskDescription}, 
                {new: true}
            );
            ctx.body = updatedTask;
        }catch (err) {console.log(err)};

    },
    deleteTask: async (ctx) => {
        try {
            const deletedTask = await Task.findOneAndDelete({taskID: ctx.params.taskID});
            ctx.body = deletedTask;
            console.log(`задача ${ctx.params.taskID} должна быть удалена!`);
        }catch (err) {console.log(err)};

    },
    completeTask: async (ctx) => {
        try {
            const task = await Task.findOneAndUpdate({taskID: ctx.params.taskID}, {completed: true});
            ctx.body = task;
        }catch (err) {console.log(err)};

    }
}