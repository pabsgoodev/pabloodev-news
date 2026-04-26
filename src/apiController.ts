import { Request, Response } from "express";
import { getData, searchData } from "./apiService";
import z from "zod";

export async function getNews(req: Request, res: Response) {
    const registerSchema = z.object({
        q: z.string().optional(),
        category: z.string().optional()
    }) 
    const parsed = registerSchema.safeParse(req.query)

    if (!parsed.success){
        return res.status(400).json({ error: "Invalid query parameters" })
    }

    const {q, category} = parsed.data;
    try {
        if (q || category) {
            const news = await searchData(String(q), String(category))
            return res.json(news)
        }

        const allNews = await getData()
        return res.json(allNews)
        
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch news" })
    }
}