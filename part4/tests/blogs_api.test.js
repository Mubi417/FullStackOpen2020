const supertest = require('supertest')
const app = require('../app')
const helper = require('./api_test_helper')
const Blog = require('../models/blogs')
const User = require('../models/users')
const mongoose = require('mongoose')

const api = supertest(app)
var auth

beforeAll(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await api.post('/api/users').send(helper.userData)
    const result = await api.post('/api/login').send(helper.userData)
    auth = result.body.token
    for (const blog of helper.initialBlogList) {
        await api.post('/api/blogs').send(blog)
            .set('Authorization', `Bearer ${auth}`)
    }
})

describe('Testing My API', () => {
    test('getting blogs works', async () => {
        await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    })

    test('confirm presence of id', async () => {
        const results = await helper.getBlogsFromDb()
        results.forEach(blog => expect(blog.id).toBeDefined())
    })

    test('confirm blog is added', async () => {
        const newBlog = {
            title: 'Papa Joe',
            author: 'Alan Smith',
            url: 'pjkss.com',
            likes: 520
        }
        await api.post('/api/blogs').send(newBlog)
            .set('Authorization', `Bearer ${auth}`)
            .expect(201).expect('Content-Type', /application\/json/)

        const blogs = await helper.getBlogsFromDb()

        expect(blogs).toHaveLength(helper.initialBlogList.length+1)
    })

    test('confirm blog is not added if no authorization', async () => {
        const newBlog = {
            title: 'Papa Joe',
            author: 'Alan Smith',
            url: 'pjkss.com',
            likes: 520
        }
        await api.post('/api/blogs').send(newBlog)
            .expect(401).expect('Content-Type', /application\/json/)

        const blogs = await helper.getBlogsFromDb()

        expect(blogs).toHaveLength(helper.initialBlogList.length)
    })

    test('confirm blog likes default to 0 if ommitted', async () => {
        const newBlog = {
            title: 'Papa Joe',
            author: 'Alan Smith',
            url: 'pjkss.com',
        }

        await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

        const blogs = await helper.getBlogsFromDb()

        expect(blogs[blogs.length-1].likes).toBe(0)
    })

    test('confirm blog does not accept without title and url', async () => {
        const newBlog = {
            author: 'Alan Smith'
        }

        await api.post('/api/blogs').send(newBlog).expect(400)
    })
})

describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.getBlogsFromDb
        const blogToDelete = blogsAtStart[0]
  
        await api.delete(`/api/notes/${blogToDelete.id}`).set('Authorization', `Bearer ${auth}`).expect(204)
  
        const blogsAtEnd = await helper.getBlogsFromDb
  
        expect(blogsAtEnd).toHaveLength(helper.initialBlogList.length - 1)
  
        const contents = blogsAtEnd.map(r => r.content)
  
        expect(contents).not.toContain(blogToDelete.content)
    })
})

afterAll(() => {
    mongoose.connection.close()
})

