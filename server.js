// server.js - O ponto de entrada do teu backend
const express = require("express");
const cors = require("cors");
const db = require("./models"); // Importa a pasta de modelos que criaste

const app = express();

// Configurações básicas
app.use(cors()); // Permite que o Frontend do André aceda a este Backend
app.use(express.json()); // Permite ler dados em formato JSON

// --- LIGAÇÃO À BASE DE DADOS ---
// O .sync() olha para o teu user.model.js e cria a tabela se ela não existir
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

// --- ARRANCAR O SERVIDOR ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}.`);
});