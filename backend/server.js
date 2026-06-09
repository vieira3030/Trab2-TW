// server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios"); // Importa o axios para fazer pedidos externos
const db = require("./models");

const app = express();

app.use(cors()); 
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.json({ message: "Backend do Olheiro Pro Online!" });
});

// --- PONTE PARA A API DE FUTEBOL ---
// Apanha qualquer pedido feito para /api/football/ e envia para a API externa
app.get("/api/football/*", async (req, res) => {
  // Extrai o caminho original (ex: "teams?name=porto")
  const endpoint = req.originalUrl.replace("/api/football/", "");
  
  try {
    const response = await axios.get(`https://v3.football.api-sports.io/${endpoint}`, {
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "8aef53ef6b47d8f9683111aba314b507" // ATENÇÃO: Substitui pela tua chave real!
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Erro de ligação à API de desporto" });
  }
});

// Define as restantes rotas da API
require("./routes/auth.routes")(app);
require("./routes/favorite.routes")(app);
require("./routes/comparison.routes")(app);

// --- ARRANCAR O SERVIDOR ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}.`);
});