const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.method === 'GET') {
        return next()
    }
    if (!req.headers.authorization) {
        return res.status(401).json({error: 'unauthorized, missing or invalid token'})
    }

    const token = req.headers.authorization.split(' ')[1]
    const tokenData = jwt.verify(token, process.env.SECRET_KEY)
    if (!token || !tokenData) {
        return res.status(401).json({error: 'unauthorized, missing or invalid token'})
    }

    req.userId = tokenData.id
    next()
}