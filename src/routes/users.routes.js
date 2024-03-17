const { Router } = require('express')
const UserController = require('../controllers/UserController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const userRouter = Router()
const userController = new UserController()

userRouter.post('/', userController.create)

userRouter.use(ensureAuthenticated)
userRouter.get('/', userController.listUser)
userRouter.put('/:id', userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)

module.exports = userRouter
