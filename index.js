const express = require('express');

const server = express();

server.use(express.json());

//Array de projetos
const projects= [];


//Midllewar que verifica se o id existe
function checkIdInArray(req, res, next){
  const project = projects[req.params.id];

  if(!project) {
    return res.status(400).json({error: 'Project doesn`t exists'});
  }

  req.project = project;

  return next();
}


//Midllewar que conta quantas requisições foram feitas até o momento
server.use((req, res, next) => {
  console.count('Requests');
  
  next();
})



//Rotas

//Retorna todos os projetos
server.get('/projects', (req,res) => {
  return res.json(projects);
})

//Retorna um projeto
server.get('/projects/:id', checkIdInArray, (req,res) => {
  return res.json(projects);
})

//Edita o nome de um projeto
server.put('/projects/:id', checkIdInArray, (req,res)=>{
  const {id} = req.params;
  const { title } = req.body;

  projects[id].title = title;

  return res.json(projects);
})

//cria um novo projeto
server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const dataToInsert ={ id, title, tasks: []}

  projects.push(dataToInsert);

  return res.json(projects);
})


//cria uma nova tarefa
server.post('/projects/:id/tasks', (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  projects[id].tasks.push(title);

  return res.json(projects);
})

//Deleta um projeto

server.delete('/projects/:id', checkIdInArray, (req,res)=>{
  const {id} = req.params;

  projects.splice(id, 1);

  return res.json(projects);
})

//Inicia o servidor na porta 3000
server.listen(3000);