require('dotenv/config')
require('express-async-errors')

const cors = require('cors')
const express = require('express')
const routes = require('./src/routes')
const cookieParser = require('cookie-parser')

const AppError = require('./src/utils/AppError')
const sqlConnection = require('./src/database')

sqlConnection()

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173/',
      'http://localhost:3333/',
    ],
    credentials: true,
  }),
)

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
