import { Request, Response } from "express"
import { getData, searchData } from "./apiService"
import z from "zod"

export async function getNews(req: Request, res: Response) {
  const schema = z.object({
    q: z.string().optional(),
    category: z.string().optional()
  })

  const parsed = schema.safeParse(req.query)

  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid query parameters" })
  }

  const { q, category } = parsed.data

  try {
    if (q || category) {
      const [data, error] = await searchData(q, category)

      if (error) {
        return res.status(500).json({ error: error.message })
      }

      return res.json(data)
    }

    const [data, error] = await getData()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.json(data)

  } catch {
    return res.status(500).json({ error: "Failed to fetch news" })
  }
}