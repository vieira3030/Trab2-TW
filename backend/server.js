// server.js
const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();

app.use(cors()); 
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.json({ message: "Backend do Olheiro Pro Online!" });
});

// Importante: garantir que as rotas usam /api
require("./routes/auth.routes")(app);
require("./routes/favorite.routes")(app);
require("./routes/comparison.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}.`);
});

require("./routes/auth.routes")(app);
require("./routes/favorite.routes")(app);
require("./routes/comparison.routes")(app);

// --- ARRANCAR O SERVIDOR ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}.`);
});