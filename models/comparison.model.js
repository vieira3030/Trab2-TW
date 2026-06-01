// comparison.model.js
module.exports = (sequelize, Sequelize) => {
  const Comparison = sequelize.define("comparison", {
    player1Id: { type: Sequelize.INTEGER, allowNull: false },
    player1Name: { type: Sequelize.STRING, allowNull: false },
    player1Photo: { type: Sequelize.STRING },
    
    player2Id: { type: Sequelize.INTEGER, allowNull: false },
    player2Name: { type: Sequelize.STRING, allowNull: false },
    player2Photo: { type: Sequelize.STRING }
  });

  return Comparison;
};