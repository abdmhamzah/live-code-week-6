require('dotenv').config()
var jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {

    try {
        const token = req.headers.token
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.UserId = decoded.UserId
            next()
        } else {
            res.status(404).json({
                messege: 'Token not Found'
            })
        }
    } catch (err) {
        res.status(400).json({
            messege: 'Invalid Token'
        })
    }
}

module.exports = authentication