const router = require('express').Router()
const ControllerUser = require('../controllers/controllerUser')
const ControllerFood = require('../controllers/controllerFood')

// router.get('/', (req, res) => res.send('Hello World!'))
router.post('/signup', ControllerUser.signup)
router.post('/signin', ControllerUser.signin)

router.post('/foods')
router.get('/foods')
router.delete('/foods/:id')


module.exports = router