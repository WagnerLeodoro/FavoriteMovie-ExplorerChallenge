require("dotenv/config")
require("express-async-errors")
const uploadConfig = require("./configs/upload")

const cors = require("cors")
const express = require("express")
const routes = require("./routes")
const cookieParser = require("cookie-parser")

const AppError = require("./utils/AppError")
const sqlConnection = require("./database")

sqlConnection()

const apiUrl = import.meta.env.API_URL

const app = express()
app.use(express.json())
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(cookieParser())

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173/", apiUrl],
    credentials: true,
  }),
)

app.use(routes)

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    })
  }
  console.error(error)
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT)
})
