const { User, Food } = require('../models')

class ControllerFood {

    static getFoods(req, res){
        Food.findAll({
            where: {
                UserId: req.UserId
            }
        })
            .then(foods => {
                res.status(200).json({ foods })
            })
            .catch(err => {
                res.status(500).json({
                    messege: 'Server Error'
                })
            })
    }

    static createFood(req, res){
        const { title, price, ingredients, tag } = req.body
        Food.create({
            title: title,
            price: price,
            ingredients: ingredients,
            tag: tag,
            UserId: req.UserId
        })
            .then(food => {
                if (food) {
                    res.status(200).json({ food })
                } else {
                    res.status(400).json({
                        messege: 'Cant Access another Food'
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    messege: 'Server Error'
                })
            })
    }

    static deleteFood(req, res){
        const id = req.params.id
        Food.destroy({
            where: {
                id: id
            }
        })
            .then(deleted => {
                res.status(200).json({
                    messege: 'Successfully delete food from your menu'
                })
            })
            .catch(err => {
                res.status(500).json({
                    messege: 'Server Error'
                })
            })
    }
}

module.exports = ControllerFood