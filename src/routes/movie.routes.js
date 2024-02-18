const { Router } = require('express')
const MovieController = require('../controllers/MovieController')

const movieRouter = Router()
const movieController = new MovieController()

movieRouter.get('/', movieController.searchMovie)
movieRouter.get('/:id', movieController.listMovies)
movieRouter.post('/:user_id', movieController.create)
// movieRouter.put('/:id', movieController)
movieRouter.delete('/:id', movieController.deleteMovie)

module.exports = movieRouter
