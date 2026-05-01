import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'; // 
import apiRoutes from './apiRoutes';

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json());

const publicPath = path.join(process.cwd(), 'src', 'public');

app.use(express.static(publicPath));

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  try {
    res.sendFile(path.join(publicPath, 'index.html'));
  } catch (error) {
    res.status(500).send("Erro ao carregar o index.html");
  }
});

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
}

export default app;