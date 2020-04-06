const { Food } = require('../models')

const authorization = (req, res, next) => {
    const id = req.params.id
    Food.findOne({
        where: {
            id: id
        }
    })
        .then(food => {
            if (!food) {
                res.status(404).json({
                    messege: 'Food not found'
                })
            } else {
                if (food.UserId == req.UserId) {
                    next()
                } else {
                    res.status(400).json({
                        messege: 'Get your own Bruh'
                    })
                }
            }
        })
        .catch(err => {
            res.status(500).json({
                messege: 'Server Error'
            })
        })
}