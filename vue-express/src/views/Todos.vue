<template>
  <div class="todos">
    <h1>Hello {{ name }}</h1>
    <div class="content">
      <input type="text" name="" value="" @keyup.enter="newTask" v-model="newTodo" placeholder="Add a new task">
      <h3>Your Tasks:</h3>
      <ul v-for="(todo, i) in todos">
        <li @click="remove(todo)" :key="i">{{ todo }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from '@/axios';

export default {
  name: 'todos',
  data() {
    return {
      newTodo: '',
      todos: [],
      name: '',
    };
  },
  methods: {
    init(res) {
      this.name = res.data.name;
      if (res.data.todos){
        this.todos = res.data.todos
      }else {
        this.todos = "No tasks"
      }
    },
    newTask(){
      const data = {
        todo: this.newTodo
      }
      axios.post('/todo/add', JSON.stringify(data)).then((r) => {
        axios.get('/todo').then((res) => {
          this.init(res);
          this.newTodo = '';
        }).catch((err) => new Error(err));
      });
    },
    remove(todo){
      const data = {
        todo
      }
      axios.delete('/todo/delete', JSON.stringify(data)).then((r) => {
        axios.get('/todo').then((res) => {
          this.init(res)
        }).catch((err) => new Error(err))
      });
    },
  },
  created() {
    axios.get('/todo').then((res) => {
      this.init(res);
    }).catch((err) => new Error(err));
  }
};
</script>

<style scoped>
  .todos {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: sans-serif;
    text-align: center;
  }

  h1 {
    font-weight: lighter;
  }

  .content {
    text-align: center;
    width: 600px;
  }

  input {
    border: 1px solid black;
    border-radius: 50px;
    font-size: 20px;
    padding-left: 7px;
    padding-right: 7px;
  }

  ul {
    list-style: none;
    padding: 0;
  }
</style>
