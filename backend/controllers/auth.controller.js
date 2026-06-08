// controllers/auth.controller.js
const db = require("../models");
const User = db.users;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Regista um novo utilizador
exports.register = async (req, res) => {
  try {
    // Verifica se o email já existe na base de dados
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).send({ message: "Erro: Este email já está em uso!" });
    }

    // Encripta a password com custo 10
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Guarda o utilizador no SQLite
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });

    res.status(201).send({ message: "Utilizador registado com sucesso!" });
  } catch (err) {
    res.status(500).send({ message: "Erro no servidor: " + err.message });
  }
};

// Faz o login e devolve o token
exports.login = async (req, res) => {
  try {
    // Procura o utilizador pelo email
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(404).send({ message: "Utilizador não encontrado." });

    // Compara a password enviada com a encriptada
    const passwordIsValid = await bcrypt.compare(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ message: "Password incorreta!" });

    // Gera o token JWT (segredo-do-olheiro) válido por 24 horas
    const token = jwt.sign({ id: user.id }, "segredo-do-olheiro", { expiresIn: 86400 });

    res.status(200).send({ 
      id: user.id, 
      username: user.username, 
      accessToken: token 
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};