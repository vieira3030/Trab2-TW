// favorite.model.js - Define a tabela de jogadores guardados
module.exports = (sequelize, Sequelize) => {
  const Favorite = sequelize.define("favorite", {
    // ID do jogador vindo da API externa
    playerId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    // Nome do jogador
    playerName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    // URL da fotografia do jogador (pode ser nulo caso a API não tenha foto)
    playerPhoto: {
      type: Sequelize.STRING
    }
  });

  return Favorite;
};