const blogRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')

blogRouter.get('/', async (request, response) => {
    const blog = await Blog.find({}).populate('user', {name: 1, username: 1})
    response.json(blog)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body
    if (body.title === undefined || body.url === undefined) {
        return response.status(400).json({error: 'please send correct parameters'})
    }
    if (body.likes === undefined) {
        body.likes = 0
    }

    const user = await User.findById(request.userId)
    const blog = new Blog({
        title: body.title,
        url: body.url,
        likes: body.likes,
        author: body.author,
        user: user._id
    })
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(401).json({error: 'No such blog found, check id'})
    }

    if ((blog.user.toString() !== request.userId)) {
        return response.status(401).json({error: 'unauthorized deletion'})
    }
    
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body
    if (body.title === undefined || body.url === undefined) {
        return response.status(400).end()
    }
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0
    }
    const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true, runValidators: true})
    response.json(updatedNote)
})

module.exports = blogRouter