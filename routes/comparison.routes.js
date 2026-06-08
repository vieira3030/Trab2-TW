const comparisons = require("../controllers/comparison.controller.js");
const { verifyToken } = require("../middlewares/auth.js"); // Importa o teu novo porteiro

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  // O mockAuth foi substituído pelo verifyToken
  app.post("/api/comparisons", verifyToken, comparisons.create);
  app.get("/api/comparisons", verifyToken, comparisons.findAll);
  app.delete("/api/comparisons/:id", verifyToken, comparisons.delete);
};