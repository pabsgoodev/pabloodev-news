import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

const API_KEY = process.env.API_KEY

type Result<T, E> = readonly [T, null] | readonly [null, E]

export async function getData(): Promise<Result<any[], Error>> {
  try {
    if (!API_KEY) throw new Error("API_KEY não definida")

    const res = await axios.get("https://gnews.io/api/v4/top-headlines", {
      params: {
        token: API_KEY,
        lang: "pt",
        country: "br"
      }
    })

    return [res.data.articles, null] as const
  } catch (error) {
    return [null, new Error("Erro ao buscar manchetes")] as const
  }
}

export async function searchData(
  query?: string,
  category?: string
): Promise<Result<any[], Error>> {
  try {
    if (!API_KEY) throw new Error("API_KEY não definida")

    const res = await axios.get("https://gnews.io/api/v4/search", {
      params: {
        token: API_KEY,
        q: query,
        topic: category, 
        lang: "pt"
      }
    })

    return [res.data.articles, null] as const
  } catch (error) {
    return [null, new Error("Erro ao buscar busca")] as const
  }
}