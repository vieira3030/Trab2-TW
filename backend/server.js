// server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios"); // Fazer pedidos externos
const db = require("./models");

const app = express();

app.use(cors()); 
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.json({ message: "Backend do Olheiro Pro Online!" });
});

// --- PONTE PARA A API DE FUTEBOL ---
// Usa app.use para apanhar qualquer pedido e evitar o erro do asterisco no Render
app.use("/api/football", async (req, res) => {
  try {
    // req.url contém a parte final do caminho (ex: /teams?name=porto)
    const response = await axios({
      method: req.method,
      url: `https://v3.football.api-sports.io${req.url}`,
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "8aef53ef6b47d8f9683111aba314b507" // Chave real da API
      }
    });
    // Devolve os dados com sucesso ao frontend
    res.json(response.data);
  } catch (error) {
    console.error("Erro na API de Futebol:", error.message);
    res.status(500).json({ error: "Erro de ligação à API de desporto" });
  }
});

// Define as rotas da base de dados e autenticação
require("./routes/auth.routes")(app);
require("./routes/favorite.routes")(app);
require("./routes/comparison.routes")(app);

// --- ARRANCAR O SERVIDOR ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}.`);
});