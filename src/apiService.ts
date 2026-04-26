import axios from "axios";
import dotenv from "dotenv";
import e from "express";

dotenv.config();

const API_KEY = process.env.API_KEY;

type result<T, E> = readonly [T, null] | readonly [null, E] 

export async function getData() {
    try{
    const res = await axios.get("https://gnews.io/api/v4/top-headlines", {
        params: {
            token: API_KEY,
            lang: "pt",
            country: "br",
        }
    });

    return [res.data.articles, null] as const;
} catch (error) {
    return [null, new Error("Erro ao buscar manchetes")] as const;
}
}

export async function searchData(query?: string, category?: string){
    try {
    const res = await axios.get("https://gnews.io/api/v4/search",{
        params: {
            token: API_KEY,
            q: query,
            category: category,
            lang: "pt",
        }
    })
    return [res.data.articles, null] as const;

} catch (error) {
    return [null, new Error("Erro ao buscar manchetes")] as const;
    }
}