const express = require('express')
const app = express()
const auth = require('./utils/auth')
const loginRouter = require('./controller/login')
require('express-async-errors')
const cors = require('cors')
const config = require('./utils/config')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogRouter = require('./controller/blogs')
const userRouter = require('./controller/users')

let mongoUrl = config.MONGODB_URI

if (process.env.NODE_ENV == 'test') {
    mongoUrl = config.TEST_MONGODB_URI
}

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(()=>{
    console.log('connected to mongodb')
})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use(auth)
app.use('/api/blogs', blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app