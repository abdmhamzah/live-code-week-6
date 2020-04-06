const router = require('express').Router()
const ControllerUser = require('../controllers/controllerUser')
const ControllerFood = require('../controllers/controllerFood')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

// ROUTER SIGNUP DAN SIGNIN
router.post('/signup', ControllerUser.signup)
router.post('/signin', ControllerUser.signin)

// ROUTER FOODS
router.post('/foods', authentication, ControllerFood.createFood)
router.get('/foods', authentication, ControllerFood.getFoods)
router.delete('/foods/:id', authentication, authorization, ControllerFood.deleteFood)


module.exports = router