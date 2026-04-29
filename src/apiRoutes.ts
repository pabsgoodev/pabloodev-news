import { Router } from "express"
import { getNews } from "./apiController"

const routes = Router()

routes.get("/news", getNews)

export default routes