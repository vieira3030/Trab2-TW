const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  // O Angular vai enviar o token neste cabeçalho
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "Nenhum token fornecido! 🛑" });
  }

  // Verifica se o token é válido
  // ATENÇÃO: Se usaste uma palavra secreta diferente no Login, troca aqui!
  jwt.verify(token, "8aef53ef6b47d8f9683111aba314b507", (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Acesso não autorizado! 🚫" });
    }
    
    // Extrai o ID real do utilizador logado e guarda-o no pedido
    req.userId = decoded.id;
    next();
  });
};