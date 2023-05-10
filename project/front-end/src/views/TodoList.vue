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
          <div class="container-task" v-for="(todo, index) in todos" :key="index">
            <input type="checkbox" class="form-check-input" v-model="todo.completed" />
            <ul class="list-group" style="width:100%">
              <li class="list-group-item">
                <div :class="{done: todo.completed}" class="d-flex justify-content-between">
                  <div>
                    <input type="text" :class="{ 'hoverr': index === selectedTodoIndex }" class="form-control" placeholder="Enter text here" v-model="todo.taskName" v-on:click="selectedTodoIndex = index" v-on:keyup.enter="updateTodo(index)" />
                  </div>
                  <div>
                    <button class="btn btn-danger" @click="deleteTodo(todo._id)">Delete</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
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
      selectedTodoIndex: -1,
    };
  },
  mounted() {
    this.getListTask();
  },
  methods: {
    getListTask() {
      HTTP.get(`task`)
        .then((response) => {
          this.todos = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addTask() {
      if (this.newTodo != "") {
        HTTP.post(`addTask`, {
          id: 2,
          name: this.newTodo,
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
    deleteTodo(id) {
      HTTP.post(`deleteTask`, {
        id: id,
      })
        .then(() => {
          this.getListTask();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateTodo(index) {
      HTTP.post(`updateTask`, {
        _id: this.todos[index]._id,
        id: this.todos[index].taskId,
        name: this.todos[index].taskName,
        completed: true,
        task_date: this.todos[index].task_date,
      })
        .then(() => {
          // Thêm mới thành công, load lại danh sách
          this.getListTask();
          this.newTodo = "";
          this.index1 = -1;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
.hoverr {
  border: 1px solid #d8d6de !important;
}
/* .hoverr:hover {
  border: 1px solid #d8d6de !important;
} */
.done {
  text-decoration: line-through;
}
.container-task {
  display: flex;
  margin-bottom: 10px;
}
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