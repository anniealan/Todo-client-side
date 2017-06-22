const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TaskSchema = Schema({
    title: {
        type: String,
        required: true
    },
    text: String,
    completed: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
})


TaskSchema.statics.add = (taskProps, user_id) =>{
    taskProps.tasks = []
    const task = new Task(taskProps)
    return mongoose.model('User').findById(user_id)
        .then(user=>{
            user.tasks.push(task._id)
            return Promise.all([task.save(), user.save()])
        })
    
}

TaskSchema.statics.delete = (_id, user_id) => {
    return mongoose.model('User').findOne({_id: user_id})
        .then(user=>{
            return Promise.all([Task.remove({_id}), user.tasks.remove(_id)])
        })
}


TaskSchema.statics.edit = (_id, taskProps) => {
    return Task.update({_id}, {$set: taskProps}).exec()
}

const Task = mongoose.model('Task', TaskSchema)

module.exports =  Task
