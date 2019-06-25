const express = require("express");

const server = express();

server.use(express.json());

const projects = [];
let numOfReqs = 0;

// -------------MIDDLEWARES---------------
// Middleware que checa se o projeto existe
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id === id);

  !project ? res.status(400).json({ error: "Projeto não encontrado" }) : next();
}

// Middleware que conta o número de requisições
function logCounter(req, res, next) {
  numOfReqs++;

  console.log(`Número de requisições: ${numOfReqs}`);

  return next();
}

// Aplicando middleware que conta as requisições
server.use(logCounter);

// --------- ROTAS ---------
// Cadastrar um novo projeto
server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

// Listar todos os projetos
server.get("/projects", (req, res) => {
  return res.json(projects);
});

// Editar título do projeto
server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.title = title;

  return res.json(project);
});

// Deletar projeto
server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(p => p.id === id);
  console.log(index);

  projects.splice(index, 1);

  return res.send();
});

// Tasks
server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.tasks.push(title);

  return res.json(project);
});

// Conexão servidor
const PORT = 5000;
server.listen(PORT, () => console.log(`Servidor conectado na porta ${PORT}`));
