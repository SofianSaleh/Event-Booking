const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization")
    if (!authHeader) {
        req.isAuth = false
        return next()
    }
    const token = authHeader.split(' ')
    if (!token || token === '') {
        req.isAuth = false
        return next()
    }
    let decodedToken
    try {
        decodedToken = 
    } catch (err) {
        req.isAuth = false
        return next()
    }
}