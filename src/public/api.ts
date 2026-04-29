type News = {
  id: string
  title: string
  description: string
  content: string
  url: string
  image: string
  publishedAt: string
  lang: string
  source: {
    id: string
    name: string
    url: string
    country: string
  }
}

const container = document.getElementById("newsContainer") as HTMLDivElement
const input = document.getElementById("searchInput") as HTMLInputElement
const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement

async function fetchNews(q?: string, category?: string) {
    try {
        container.innerHTML = "<p>Buscando notícias...</p>"

        const url = new URL("http://localhost:3000/api/news")

        if (q) url.searchParams.append("q", q)
        if (category) url.searchParams.append("category", category)

        const res = await fetch(url.toString())
        if (!res.ok) {
            throw new Error("Erro ao buscar notícias")
        }
        
        const news: News[] = await res.json()

        renderNews(news)
    } catch (error) {
        console.error("Erro ao buscar notícias:", error)
        container.innerHTML = "<p>Erro ao buscar notícias</p>"
    }
}

function renderNews(news: News[]) {
  container.innerHTML = "";

  if (!news.length) {
    container.innerHTML = "<p class='no-results'>Nenhuma notícia encontrada</p>";
    return;
  }

  news.forEach(n => {
    const card = document.createElement("article");
    card.className = "news-card"; // Usando classe em vez de style inline

    card.innerHTML = `
      ${n.image ? `<div class="card-image"><img src="${n.image}" alt="${n.title}" /></div>` : ""}
      <div class="card-content">
        <span class="source-tag">${n.source.name}</span>
        <h3>${n.title}</h3>
        <p>${n.description || ""}</p>
        <div class="card-footer">
            <a href="${n.url}" target="_blank">Ler mais</a>
            <small>${new Date(n.publishedAt).toLocaleDateString('pt-BR')}</small>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

searchBtn.addEventListener("click", () => {
  fetchNews(input.value)
})

;(window as any).filterCategory = (category: string) => {
  fetchNews(undefined, category)
}

fetchNews()