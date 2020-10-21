const Blog = require('../models/blogs')

const initialBlogList = [
    {
        title: 'Boogey Man',
        author: 'El-Munsir Junuub',
        url: 'campalaa.com',
        likes: 900
    },
    {
        title: 'Everything wrong in Florida',
        author: 'Barsaha Jilmez',
        url: 'ewf.com',
        likes: 569
    },
    {
        title: 'Do we exist in a reality?',
        author: 'Charles Divine',
        url: 'dweiar.com',
        likes: 852
    },
    {
        title: 'Castles in the sky',
        author: 'David Campbell',
        url: 'dccits.com',
        likes: 522
    }
]

const userData = {
    username: 'superuser',
    password: '123456',
    name: 'mubi'
}

const getBlogsFromDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogList,
    getBlogsFromDb,
    userData
}