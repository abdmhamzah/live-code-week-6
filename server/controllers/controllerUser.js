require('dotenv').config()
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class ControllerUser {

    static signup(req, res){
        const { email, password } = req.body
        User.create({
            email: email,
            password: password
        })
            .then(user => {
                res.status(201).json({ user })
            })
            .catch(err => {
                res.status(500).json({
                    messege: 'Server Error'
                })
            })
    }

    static signin(req, res){
        const { email, password } = req.body
        User.findOne({
            where: {
                email: email
            }
        })
            .then(user => {
                if (bcrypt.compareSync(password, user.password)){
                    const token = jwt.sign({
                        UserId: user.id,
                        email: user.email
                    }, process.env.JWT_SECRET)
                    res.status(200).json({ token })
                } else {
                    res.status(400).json({
                        messege: 'Invalid Token'
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    messege: 'Server Error'
                })
            })
    }
}

module.exports = ControllerUser