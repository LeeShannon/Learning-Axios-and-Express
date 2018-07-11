import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import fs from 'fs'; //file system to read files

const app = express();
const host = '127.0.0.1';
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());

//getting route
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/name', (req, res) => {
  fs.writeFileSync('todos.json', JSON.stringify(req.body, null, '\t'), 'utf8');
});

app.get('/todo', (req, res) => {
  // read JSON file
  const data = fs.readFileSync('todos.json');
  const todos = JSON.parse(data);
  res.send(todos);
});

app.post('/todo/add', (req, res) => {
  let data = JSON.parse(fs.readFileSync('todos.json'));
  // Check if object 'todos' exist
  if (!data.todos){
    data.todos = [];
  }
  data.todos.push(req.body.todo);
  fs.writeFileSync('todos.json', JSON.stringify(data, null, '\t'), 'utf8');
  res.sendStatus(200);
});

app.delete('/todo/delete', (req, res) => {
  let data = JSON.parse(fs.readFileSync('todos.json'));
  //filters out whatever is already there to delete it
  data = data.todos.filter(todo => todo !== req.body.todo);
  fs.writeFileSync('todos.json', JSON.stringify(data, null, '\t'), 'utf8');
  res.sendStatus(200);
});

app.listen(port, host)
console.log(`Server listening on port 3000`);
