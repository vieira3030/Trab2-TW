module.exports = {
  // Se estivermos no Render, ele usa a DATABASE_URL. Se estivermos no teu PC, usa a string abaixo.
  // IMPORTANTE: Quando criares a BD no Render, eles dão-te esta string.
  url: process.env.DATABASE_URL || "postgres://user:password@localhost:5432/futgood_db",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};