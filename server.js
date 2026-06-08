// server.js - Ponto de entrada do backend
const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();

// --- CONFIGURAÇÃO CORS ---
// Em produção, o Render pode alterar a origem. 
// O cors() sem argumentos permite qualquer origem, o que facilita o deploy.
app.use(cors()); 

app.use(express.json());

// --- LIGAÇÃO À BASE DE DADOS ---
// Usamos { force: false } para não apagar os dados existentes ao reiniciar
db.sequelize.sync({ force: false })
  .then(() => {
    console.log("Sucesso: Base de dados sincronizada!");
  })
  .catch((err) => {
    console.error("Erro na base de dados: ", err.message);
  });

// --- ROTAS ---
app.get("/", (req, res) => {
  res.json({ message: "O backend do Olheiro Pro está online!" });
});

require("./routes/auth.routes")(app);
require("./routes/favorite.routes")(app);
require("./routes/comparison.routes")(app);

// --- ARRANCAR O SERVIDOR ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}.`);
});