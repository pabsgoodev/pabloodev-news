import express from 'express'
import dotenv from 'dotenv'
import cors from "cors"
import apiRoutes from "./apiRoutes"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static("src/public"))
app.use("/api", apiRoutes)
app.use(cors()) 
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
export default app
