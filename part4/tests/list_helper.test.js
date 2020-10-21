const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const listWithMultipleBlogs = [
    {   
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {   
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {   
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {   
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
]

test('dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('return total likes', () => {
  
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has only multiple blogs, equals the total likes of that', () => {
        const result = listHelper.totalLikes(listWithMultipleBlogs)
        expect(result).toBe(34)
    })
})

describe('return object with highest like', ()=> {
    test('when list only has one blog, equals the object of that', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual(
            {
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                likes: 5
            }
        )
    })

    test('when list has multiple blogs, return the highest like object', () => {
        const result = listHelper.favoriteBlog(listWithMultipleBlogs)
        expect(result).toEqual(
            {
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                likes: 12
            }
        )
    })

})