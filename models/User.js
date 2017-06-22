const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String,
    username: String,
    gender: String,
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
})

UserSchema.statics.create = (userProps) => {
    const user = new User(userProps)
    return user.save()
}

UserSchema.statics.getTasksByUserId = (_id) => {
    return User.findOne({_id}, {tasks: 1, _id: 0}).populate('tasks')
}





const User = mongoose.model('User', UserSchema)


module.exports = User


