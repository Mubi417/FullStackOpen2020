const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {type: String, unique: true},
    author: String,
    url: {type: String, unique: true},
    likes: Number,
    user: {ref: 'User', type: mongoose.Schema.Types.ObjectId}
})

blogSchema.set('toJSON', {
    transform: (document, retObj) => {
        retObj.id = retObj._id.toString()
        delete retObj._id
        delete retObj.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)
