const db = require("../models");
const Comparison = db.comparisons;

// Guardar nova comparação
exports.create = (req, res) => {
  const comp = {
    player1Id: req.body.player1Id,
    player1Name: req.body.player1Name,
    player1Photo: req.body.player1Photo,
    player2Id: req.body.player2Id,
    player2Name: req.body.player2Name,
    player2Photo: req.body.player2Photo,
    winner: req.body.winner, // <-- NOVA LINHA: Guarda o vencedor recebido do Angular
    userId: req.userId // Vem do mock de autenticação
  };

  Comparison.create(comp)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Listar comparações do utilizador
exports.findAll = (req, res) => {
  Comparison.findAll({ where: { userId: req.userId } })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Apagar uma comparação
exports.delete = (req, res) => {
  const id = req.params.id; // Apaga pelo ID da comparação

  Comparison.destroy({ where: { id: id, userId: req.userId } })
    .then(num => {
      if (num == 1) res.send({ message: "Comparação apagada com sucesso!" });
      else res.send({ message: "Comparação não encontrada." });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};