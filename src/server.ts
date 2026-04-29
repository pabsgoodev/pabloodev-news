import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'; // <--- Faltava essa importação!
import apiRoutes from './apiRoutes';

dotenv.config();

const app = express();

// Configurações básicas (CORS sempre antes das rotas)
app.use(cors()); 
app.use(express.json());

// Definindo o caminho da pasta public de forma segura
const publicPath = path.join(process.cwd(), 'src', 'public');

// Servindo arquivos estáticos (CSS, JS, Imagens)
app.use(express.static(publicPath));

// Rotas da API
app.use("/api", apiRoutes);

// Rota raiz para o HTML
app.get("/", (req, res) => {
  try {
    res.sendFile(path.join(publicPath, 'index.html'));
  } catch (error) {
    res.status(500).send("Erro ao carregar o index.html");
  }
});

// A Vercel vai ignorar o app.listen, mas é bom deixar para o seu dev local
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
}

export default app;