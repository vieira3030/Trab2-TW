const favorites = require("../controllers/favorite.controller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Injeta o ID de utilizador 1 na requisição para contornar a ausência de autenticação
  const mockAuth = (req, res, next) => {
    req.userId = 1; 
    next();
  };

  // Encaminha requisições POST para a função de criação de favoritos
  app.post("/api/favorites", mockAuth, favorites.create);

  // Encaminha requisições GET para a função de listagem de favoritos
  app.get("/api/favorites", mockAuth, favorites.findAll);

  // Encaminha requisições DELETE para a função de remoção de favoritos
  app.delete("/api/favorites/:playerId", mockAuth, favorites.delete);
};