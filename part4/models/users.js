const mongoose = require('mongoose')
const uniqueValidators = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {type: String, minlength: 3, unique: true},
    name: {type: String, minlength: 3},
    passwordHash: String,
    blogs: [
        {
            ref: 'Blog',
            type: mongoose.Schema.Types.ObjectId
        },
    ]
})

userSchema.set('toJSON', {
    transform: (doc, retObj) => {
        retObj.id = retObj._id.toString()
        delete retObj._id
        delete retObj.__v
        delete retObj.passwordHash
    }
})

mongoose.plugin(uniqueValidators)

module.exports = mongoose.model('User', userSchema)