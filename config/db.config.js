// config/db.config.js
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "futgood_db",
  dialect: "sqlite", // Vamos usar sqlite para ser mais simples
  storage: "./database.sqlite", // Onde os dados vão ficar guardados
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};