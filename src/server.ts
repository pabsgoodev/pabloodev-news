import express from 'express'
import dotenv from 'dotenv'
import cors from "cors"



dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static("src/public"))
app.use("/api")
app.use(cors()) // Habilitar CORS para todas as rotas

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})