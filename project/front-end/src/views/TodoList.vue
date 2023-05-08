<template>
  <div class="todo-list">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">Todo List</h4>
      </div>
      <div class="card-content">
        <div class="card-body">
          <form @submit.prevent="addTask">
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Add new task" v-model="newTodo" />
              <div class="input-group-append">
                <button class="btn btn-primary" type="submit" :disabled="!newTodo">Add</button>
              </div>
            </div>
          </form>
          <ul class="list-group">
            <!-- <input type="checkbox" class="form-check-input" /> -->
            <li class="list-group-item" v-for="(todo, index) in todos" :key="index">
              <div class="d-flex justify-content-between">
                <div>{{ todo.taskName }}</div>
                <div>
                  <button class="btn btn-danger" @click="deleteTodo(index)">Delete</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from "../assets/js/baseAPI.js";
export default {
  data() {
    return {
      newTodo: "",
      todos: [],
    };
  },
  mounted() {
    this.getListTask();
  },
  methods: {
    getListTask() {
      console.log(1);
      HTTP.get(`task`)
        .then((response) => {
          this.todos = response.data;
          this.addTask();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addTask() {
      if (this.newTodo != "") {
        HTTP.get(`addTask`, {
          params: {
            id: 2,
            name: this.newTodo,
          },
        })
          .then(() => {
            // Thêm mới thành công, load lại danh sách
            this.getListTask();
            this.newTodo = "";
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    },
  },
};
</script>
<style scoped>
.form-check-input {
  vertical-align: middle;
  margin-top: 12px;
  margin-right: 10px;
}
input.form-control {
  margin-right: 10px;
  border-radius: 10px !important;
}
.btn-primary {
  color: #fff;
  background-color: #7367f0;
  border-color: #7367f0;
}
</style>