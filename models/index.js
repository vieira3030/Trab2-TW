// models/index.js (ajuste para SQLite)
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

// Configura e inicializa a ligação à base de dados SQLite
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  storage: dbConfig.storage, // Define o caminho do ficheiro de base de dados SQLite
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

// Inicializa os modelos da base de dados
db.users = require("./user.model.js")(sequelize, Sequelize);
db.favorites = require("./favorite.model.js")(sequelize, Sequelize);
db.comparisons = require("./comparison.model.js")(sequelize, Sequelize); // Inicializa o modelo das comparações

// Define a relação 1:N entre Utilizadores e Favoritos
db.users.hasMany(db.favorites, { as: "favorites" });
db.favorites.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

// Define a relação 1:N entre Utilizadores e Comparações
db.users.hasMany(db.comparisons, { as: "comparisons" });
db.comparisons.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

module.exports = db;