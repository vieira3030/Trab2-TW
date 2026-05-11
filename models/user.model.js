// user.model.js - Define como os dados são guardados
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    // Coluna para o nome
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    // Coluna para o email (será o login)
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true // Impede emails duplicados
    },
    // Coluna para a password
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return User;
};