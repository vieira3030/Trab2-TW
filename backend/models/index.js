const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

// Se for Postgres (produção no Render), usamos a URL da base de dados.
// Se for local, o Sequelize usa os campos configurados (host, user, etc).
const sequelize = dbConfig.url 
  ? new Sequelize(dbConfig.url, { dialect: dbConfig.dialect, pool: dbConfig.pool })
  : new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
      host: dbConfig.HOST,
      dialect: dbConfig.dialect,
      pool: dbConfig.pool
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Inicializa os modelos
db.users = require("./user.model.js")(sequelize, Sequelize);
db.favorites = require("./favorite.model.js")(sequelize, Sequelize);
db.comparisons = require("./comparison.model.js")(sequelize, Sequelize);

// Define as relações (isto mantém-se igual)
db.users.hasMany(db.favorites, { as: "favorites" });
db.favorites.belongsTo(db.users, { foreignKey: "userId", as: "user" });

db.users.hasMany(db.comparisons, { as: "comparisons" });
db.comparisons.belongsTo(db.users, { foreignKey: "userId", as: "user" });

module.exports = db;