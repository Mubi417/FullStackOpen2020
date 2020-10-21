const dummy = (blogs) => {
    console.log(blogs)
    return 1
}

const totalLikes = (blogs) => {
    const likesAdder = (total, likes) => {
        return total + likes
    }

    return blogs.map((blog) => blog.likes).reduce(likesAdder, 0)
}

const favoriteBlog = (blogs) => {
    const blogHighestLikeFinder = (currentHighest, presentBlog) => {
        //will be false on first attempt cause initial array is undefined
        if (currentHighest.likes >= presentBlog.likes) {
            return currentHighest
        }

        return presentBlog
    }

    let blogWithHighestLike =  blogs.reduce(blogHighestLikeFinder, {})   

    return {    
        title: blogWithHighestLike.title,
        author: blogWithHighestLike.author,
        likes: blogWithHighestLike.likes,
    }
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}