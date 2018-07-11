<template>
  <div class="home">
    <input type="text" v-model="name" @keyup.enter="submit" name="" value="" placeholder="Enter Your Name">
  </div>
</template>

<script>
import axios from '@/axios';

  export default {
    name: 'home',
    data () {
      return {
        name: ''
      }
    },
    methods: {
      submit () {
        const data = {
          name: this.name
        }
        axios.post('/name', JSON.stringify(data));
        this.$router.push({ name: 'todos'});
      }
    },
  }
</script>

<style scoped>
.home {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

input {
  border: none;
  border-bottom: 1px solid black;
  font-size: 20px;
}
</style>
