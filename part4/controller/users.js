const usersRouter = require('express').Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', {title: 1, author: 1, likes: 1, url: 1})
    res.json(users)
})

usersRouter.post('/', async (req, res) => {
    const body = req.body
    if (!body.username || !body.password || !body.name) {
        return res.status(400).json({error: 'please input the right parameters'})
    } else if (body.password.length <= 3) {
        return res.status(400).json({error: 'please your password length must be greater than three'})
    }

    const passwordHash = await bcrypt.hash(body.password, 10)

    const userData = new User ({
        name: body.name,
        username: body.username,
        passwordHash
    })

    const savedUser = await userData.save()

    res.status(201).json(savedUser)
})

module.exports = usersRouter