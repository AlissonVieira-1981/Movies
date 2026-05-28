const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3001;
const JWT_SECRET = "nexus_movie_secret_key";

app.use(cors());
app.use(express.json());

const db = new Database("nexus-users.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )
`).run();

const existingAdmin = db
  .prepare("SELECT * FROM users WHERE username = ?")
  .get("admin");

if (!existingAdmin) {
  const hashedPassword = bcrypt.hashSync("admin123", 10);

  db.prepare(`
    INSERT INTO users (name, username, password)
    VALUES (?, ?, ?)
  `).run("Administrador", "admin", hashedPassword);
}

app.post("/api/register", (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(400).json({ message: "Preencha todos os campos." });
  }

  const userExists = db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get(username);

  if (userExists) {
    return res.status(409).json({ message: "Usuário já existe." });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.prepare(`
    INSERT INTO users (name, username, password)
    VALUES (?, ?, ?)
  `).run(name, username, hashedPassword);

  return res.status(201).json({ message: "Usuário criado com sucesso." });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Informe usuário e senha." });
  }

  const user = db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get(username);

  if (!user) {
    return res.status(401).json({ message: "Usuário ou senha inválidos." });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).json({ message: "Usuário ou senha inválidos." });
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      username: user.username,
    },
    JWT_SECRET,
    { expiresIn: "2h" }
  );

  return res.json({
    message: "Login realizado com sucesso.",
    token,
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});