// server.js - Salve em: backend/server.js

// 1. Importações e Configurações
const express = require("express");
const cors = require("cors");
// Desestrutura os dados para uso direto
const { perfil, projetos, skills, formacao } = require("./data/portfolioData");

const app = express();
const PORT = 3000;

// Middleware (Interceptadores)
app.use(cors());
app.use(express.json());

// --- 2. ENDPOINTS (Rotas) ---

// Rota GET: /api/perfil
app.get("/api/perfil", (req, res) => {
  res.json(perfil);
});

// Rota GET: /api/projetos
app.get("/api/projetos", (req, res) => {
  res.json(projetos);
});

// Rota GET: /api/skills
app.get("/api/skills", (req, res) => {
  res.json(skills);
});

// Endpoint para Formação Acadêmica
app.get("/api/formacao", (req, res) => {
  res.json(formacao);
});

// Rota POST: /api/contato
// Recebe os dados do formulário de contato
app.post("/api/contato", (req, res) => {
  const { nome, email, mensagem } = req.body; // Simula o registro no console

  console.log(`\n--- NOVA MENSAGEM RECEBIDA ---`);
  console.log(`De: ${nome}`);
  console.log(`Email: ${email}`);
  console.log(`Mensagem: "${mensagem}"`);
  console.log(`-------------------------------\n`);

  res.status(200).json({
    status: "sucesso",
    mensagem: "Mensagem recebida com sucesso! Obrigado por entrar em contato.",
  });
});

// --- 3. INICIALIZAÇÃO DO SERVIDOR ---

app.listen(PORT, () => {
  console.log(`Servidor Node.js rodando em http://localhost:${PORT}`);
});
