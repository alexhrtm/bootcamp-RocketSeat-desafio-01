const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

/******ROTAS******/

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
server.put("/projects/:id", (req, res) => {
  const { id } = req.body;

  const obj = projects.filter(ob => ob.id === id);

  obj.title = req.body.title;

  return res.json(projects);
});

// Deletar projeto
server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(p => p.id === id);

  projects.splice(projectIndex, 1);

  return res.send();
});

server.listen(5000, console.log("Servidor rodando"));
