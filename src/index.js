const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  // Complete aqui
  const { username } = request.headers;
  const userAccountAlreadyExist = users.some(user => user.username === username)

   if(!userAccountAlreadyExist) {
     return response.status(400).json({ error: 'User account not exist'});
   }
   
   request.username = username

   next()
}

app.post('/users', (request, response) => {
  // Complete aqui
  const { name, username } = request.body;

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: []
  }

  users.push(user)
  return response.json(user)
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const { username } = request
  const user = users.find(user => user.username === username)

  return response.json(user.todos)
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const { username } = request;
  const { title, deadline } = request.body;

  const user = users.find(user => user.username === username);
  
  const todo = {
    id: uuidv4(),
    title,
    deadline: new Date(deadline),
    done: false,
    created_at: new Date()
  }

  user.todos.push(todo);

  return response.json(todo)

});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;