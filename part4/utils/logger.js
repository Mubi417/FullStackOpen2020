const info = (...info) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...info)
    }
}

const error = (...error) => {
    console.log(...error)
}

module.exports = {info, error}
