const db = require("../backend/models");
const Favorite = db.favorites;

// Guardar um novo jogador nos favoritos
exports.create = (req, res) => {
  if (!req.body.playerId || !req.body.playerName) {
    res.status(400).send({ message: "O ID e o nome do jogador são obrigatórios!" });
    return;
  }

  // Cria o objeto associado ao utilizador autenticado (req.userId vem do token)
  const favorite = {
    playerId: req.body.playerId,
    playerName: req.body.playerName,
    playerPhoto: req.body.playerPhoto,
    userId: req.userId 
  };

  Favorite.create(favorite)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({ message: err.message || "Erro ao guardar o jogador." });
    });
};

// Listar todos os favoritos do utilizador logado
exports.findAll = (req, res) => {
  Favorite.findAll({ where: { userId: req.userId } })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({ message: err.message || "Erro ao procurar favoritos." });
    });
};

// Apagar um favorito
exports.delete = (req, res) => {
  const playerId = req.params.playerId;

  Favorite.destroy({
    where: { playerId: playerId, userId: req.userId } // O userId garante que não apaga de outros!
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Jogador removido com sucesso!" });
      } else {
        res.send({ message: "Não foi possível remover. Jogador não encontrado." });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Erro ao tentar remover o jogador." });
    });
};