require('dotenv/config')
require('express-async-errors')
const express = require('express')

const AppError = require('./src/utils/AppError')
const sqlConnection = require('./src/database')
const routes = require('./src/routes')

sqlConnection()

const app = express()

app.use(express.json())
app.use(routes)

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }
  console.error(error)
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT)
})
