// comparison.model.js
module.exports = (sequelize, Sequelize) => {
  const Comparison = sequelize.define("comparison", {
    // Dados do Jogador 1
    player1Id: { type: Sequelize.INTEGER, allowNull: false },
    player1Name: { type: Sequelize.STRING, allowNull: false },
    player1Photo: { type: Sequelize.STRING },
    
    // Dados do Jogador 2
    player2Id: { type: Sequelize.INTEGER, allowNull: false },
    player2Name: { type: Sequelize.STRING, allowNull: false },
    player2Photo: { type: Sequelize.STRING },

    // Nova coluna que guarda o nome do vencedor do duelo
    winner: { type: Sequelize.STRING }
  });

  return Comparison;
};