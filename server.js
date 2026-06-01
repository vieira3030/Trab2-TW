// server.js - Ponto de entrada do backend
const express = require("express");
const cors = require("cors");
const db = require("./models"); // Importa os modelos da base de dados

const app = express();

// --- CONFIGURAÇÃO CORS ---
// Permite acessos do Angular (porta 4200)
const corsOptions = {
  origin: "http://localhost:4200"
};
app.use(cors(corsOptions)); 

app.use(express.json()); // Processa pedidos em formato JSON

// --- LIGAÇÃO À BASE DE DADOS ---
// Sincroniza os modelos e cria as tabelas caso não existam
db.sequelize.sync()
  .then(() => {
    console.log("Sucesso: Base de dados sincronizada e tabelas prontas!");
  })
  .catch((err) => {
    console.error("Erro ao ligar à base de dados: ", err.message);
  });

// --- ROTA DE TESTE ---
app.get("/", (req, res) => {
  res.json({ message: "O backend do Caderno de Olheiro está a funcionar!" });
});

// --- ROTAS DA APLICAÇÃO ---
require("./routes/auth.routes")(app); // Inicia rotas de autenticação
require("./routes/favorite.routes")(app); // Inicia rotas de favoritos
require("./routes/comparison.routes")(app); // Inicia rotas de comparações

// --- ARRANCAR O SERVIDOR ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}.`);
});