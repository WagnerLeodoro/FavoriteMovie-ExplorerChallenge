const { Router } = require('express')
const UserController = require('../controllers/UserController')

const userRouter = Router()
const userController = new UserController()

userRouter.post('/', userController.create)
userRouter.get('/:id', userController.listUser)
userRouter.put('/:id', userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)

module.exports = userRouter
