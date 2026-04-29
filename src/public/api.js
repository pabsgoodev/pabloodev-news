"use strict";
const container = document.getElementById("newsContainer");
const input = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
async function fetchNews(q, category) {
    try {
        container.innerHTML = "<p>Buscando notícias...</p>";
        const url = new URL("http://localhost:3000/api/news");
        if (q)
            url.searchParams.append("q", q);
        if (category)
            url.searchParams.append("category", category);
        const res = await fetch(url.toString());
        if (!res.ok) {
            throw new Error("Erro ao buscar notícias");
        }
        const news = await res.json();
        renderNews(news);
    }
    catch (error) {
        console.error("Erro ao buscar notícias:", error);
        container.innerHTML = "<p>Erro ao buscar notícias</p>";
    }
}
function renderNews(news) {
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
    fetchNews(input.value);
});
window.filterCategory = (category) => {
    fetchNews(undefined, category);
};
fetchNews();
