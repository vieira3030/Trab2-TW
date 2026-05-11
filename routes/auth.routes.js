// auth.routes.js - Define os caminhos da API
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  // Rota para registo: POST http://localhost:8080/api/auth/register
  app.post("/api/auth/register", controller.register);

  // Rota para login: POST http://localhost:8080/api/auth/login
  app.post("/api/auth/login", controller.login);
};