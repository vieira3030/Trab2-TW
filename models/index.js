// models/index.js (ajuste para SQLite)
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  storage: dbConfig.storage, // Adiciona esta linha para o SQLite funcionar
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// 1. Inicializar os modelos
db.users = require("./user.model.js")(sequelize, Sequelize);
db.favorites = require("./favorite.model.js")(sequelize, Sequelize); // Novo modelo

// 2. Definir as relações (Chaves Estrangeiras)
// Um Utilizador pode ter vários Favoritos
db.users.hasMany(db.favorites, { as: "favorites" });

// Um Favorito pertence a um único Utilizador
db.favorites.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

module.exports = db;