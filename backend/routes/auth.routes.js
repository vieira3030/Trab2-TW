// auth.routes.js - Define os caminhos da API
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  // Rota para registo no Render: POST https://trab2-tw.onrender.com/api/auth/register
  app.post("/api/auth/register", controller.register);

  // Rota para login no Render: POST https://trab2-tw.onrender.com/api/auth/login
  app.post("/api/auth/login", controller.login);
};