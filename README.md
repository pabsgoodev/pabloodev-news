## README.md

```md
# 📰 News API App

Aplicação fullstack para consumo de notícias em tempo real usando API externa.  
Backend seguro com validação de dados, tratamento padronizado de erros e arquitetura simples para escalar.

---

## 🚀 Tecnologias

### Backend
- Node.js
- TypeScript
- Express
- Axios

### Segurança / Qualidade
- Zod (validação de dados)
- Pattern `[data, error]` (controle de erros)
- Sanitização básica de inputs
- Estrutura modular

---

## ⚙️ Funcionalidades

- Buscar notícias em tempo real via API externa
- Filtros por categoria (opcional)
- Tratamento de erros padronizado
- Estrutura pronta para autenticação (Bearer Token)

---

## 🔐 Validação com Zod

Exemplo:

```ts
import { z } from 'zod';

export const newsSchema = z.object({
  category: z.string().optional(),
});
````

---

## 🔁 Pattern [data, error]

Evita try/catch espalhado:

```ts
export async function getNews() {
  try {
    const response = await axios.get('API_URL');
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
}
```

Uso:

```ts
const [data, error] = await getNews();

if (error) {
  return res.status(500).json({ error: 'Failed to fetch news' });
}
```

---

## 🌐 Consumo da API

```ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://newsapi.org/v2',
});
```

---

## ▶️ Rodando o projeto

```bash
npm run dev
```

---

## 🔑 Variáveis de ambiente

Crie um `.env`:

```
PORT=3000
API_KEY=sua_chave_aqui
```

---

## 📌 Exemplo de rota

```http
GET /news?category=technology
```

Resposta:

```json
{
  "data": [...],
  "error": null
}
```

---

## 🛡️ Segurança aplicada

* Validação com Zod
* Estrutura preparada para autenticação JWT
* Tratamento de erros centralizado
* Evita crash da aplicação

---

## 📈 Melhorias futuras

* Autenticação completa (JWT)
* Cache com Redis
* Rate limiting
* Frontend com React
* Deploy (Docker)

---

## 👨‍💻 Autor

Pablo

```
```
