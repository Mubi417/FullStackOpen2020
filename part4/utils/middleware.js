const logger = require('../utils/logger')
const requestLogger = (req, res, next) => {
    logger.info('Method:', req.method)
    logger.info('Path:  ', req.path)
    logger.info('Body:  ', req.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(400).end()
}

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message})
    } else if (error.name === 'JsonWebTokenError') {
        return  res.status(400).send({ error: 'unauthorized, missing or invalid token'})
    }

    next(error)
}

module.exports = {requestLogger, unknownEndpoint, errorHandler}