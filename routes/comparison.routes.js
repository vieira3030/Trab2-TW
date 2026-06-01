const comparisons = require("../controllers/comparison.controller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  const mockAuth = (req, res, next) => {
    req.userId = 1; 
    next();
  };

  app.post("/api/comparisons", mockAuth, comparisons.create);
  app.get("/api/comparisons", mockAuth, comparisons.findAll);
  app.delete("/api/comparisons/:id", mockAuth, comparisons.delete);
};