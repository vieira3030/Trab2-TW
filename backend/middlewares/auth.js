const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  // Recebe o token enviado pelo Angular
  const token = req.headers["x-access-token"];

  // Bloqueia se o token não existir
  if (!token) {
    return res.status(403).send({ message: "Nenhum token fornecido! 🛑" });
  }

  // Verifica a validade do token com a palavra secreta do projeto
  jwt.verify(token, "segredo-do-olheiro", (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Acesso não autorizado! 🚫" });
    }
    
    // Guarda o ID do utilizador no pedido
    req.userId = decoded.id;
    next();
  });
};