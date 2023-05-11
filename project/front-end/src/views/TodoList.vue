<template>
  <div class="todo-list">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">Todo List</h4>
      </div>
      <div>
        <div class="totals _wrap text-left">
          <p class="totals _grand-total">
            <span class="totals _total-number">{{todos.length}}</span>
            <span class="totals _total-text">Task</span>
          </p>
          <div class="totals _detail">
            <p class="text-dark">{{ todos.filter((todo) => !todo.completed).length }} Active</p>
            <p class="text-dark">{{ todos.filter((todo) => todo.completed).length }} completed</p>                     
          </div>
        </div>
      </div>
      <div class="card-content">
        <div class="card-body">
          <form @submit.prevent="addTask">
            <div class="input-group mb-3">
              <input style="width:72%" type="text" class="form-control" placeholder="Add new task" v-model="newTodo" />
              <input type="date" class="form-control" v-model="selectedDate" />
              <div class="input-group-append">
                <button class="btn btn-primary" type="submit" :disabled="!newTodo">Add</button>
              </div>
            </div>
          </form>
          <div class="d-flex justify-content-between align-items-center" style="margin-bottom: 10px" v-for="(todo, index) in todos" :key="index">
            <input style="margin-top: 0" type="checkbox" class="form-check-input" v-model="todo.completed" v-on:change="updateTodo($event,index,'task')" />
            <ul class="list-group" style="width:100%">
              <li class="list-group-item">
                <div :class="{done: todo.completed}" class="d-flex justify-content-between align-items-center">
                  <div>
                    <input type="text" :class="{ 'active': index === selectedTodoIndex }" class="form-control inactive" placeholder="Enter text here" @blur="removeActiveClass" v-model="todo.taskName" v-on:click="selectedTodoIndex = index" v-on:keyup.enter="updateTodo($event,index,'task')" />
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <input type="date" class="form-control" :value="formatDateTime(todo.task_date)" v-on:change="updateTodo($event,index,'date')" />
                    <div class="trash-icon" @click="deleteTodo(todo._id)">
                      <i style="cursor: pointer" class="ti ti-md ti-trash text-danger"></i>
                      <span class="delete-text">Delete</span>
                    </div>
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
import Snackbar from "awesome-snackbar";
import { HTTP } from "../assets/js/baseAPI.js";

export default {
  data() {
    return {
      newTodo: "",
      todos: [],
      selectedTodoIndex: -1,
      selectedDate: null,
      newDate: null,
    };
  },
  mounted() {
    this.getListTask();
  },
  methods: {
    formatDateTime(date) {
      return this.$moment(date).format("YYYY-MM-DD");
    },
    removeActiveClass() {
      this.selectedTodoIndex = -1;
    },
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
        if (this.selectedDate == null) {
          this.selectedDate = new Date();
        }
        HTTP.post(`addTask`, {
          name: this.newTodo,
          task_date: this.selectedDate,
        })
          .then(() => {
            new Snackbar(`Add successfully`, {
              position: "bottom-right",
              theme: "light",
              style: {
                container: [
                  ["background-color", "#70a9a1"],
                  ["border-radius", "5px"],
                ],
                message: [["color", "#fff"]],
              },
            });
            this.getListTask();
            this.newTodo = "";
          })
          .catch((e) => {
            console.log(e);
            this.snackbarErorr();
          });
      }
    },
    snackbarErorr() {
      new Snackbar(`Error`, {
        position: "bottom-right",
        theme: "light",
        style: {
          container: [
            ["background-color", "red"],
            ["border-radius", "5px"],
          ],
          message: [["color", "#fff"]],
        },
      });
    },
    deleteTodo(id) {
      HTTP.post(`deleteTask`, {
        id: id,
      })
        .then(() => {
          this.getListTask();
          new Snackbar(`Deltete successfully`, {
            position: "bottom-right",
            theme: "light",
            style: {
              container: [
                ["background-color", "red"],
                ["border-radius", "5px"],
              ],
              message: [["color", "#fff"]],
            },
          });
        })
        .catch((e) => {
          console.log(e);
          this.snackbarErorr();
        });
    },
    updateStatusTask(index) {
      HTTP.post(`updateTask`, {
        _id: this.todos[index]._id,
        id: this.todos[index].taskId,
        name: this.todos[index].taskName,
        completed: this.todos[index].completed,
        task_date: this.todos[index].task_date,
      })
        .then(() => {
          this.selectedTodoIndex = -1;
          new Snackbar(`Update successfully`, {
            position: "bottom-right",
            theme: "light",
            style: {
              container: [
                ["background-color", "#1abc9c"],
                ["border-radius", "5px"],
              ],
              message: [["color", "#fff"]],
            },
          });
          this.getListTask();
          this.newTodo = "";
          this.selectedTodoIndex = -1;
        })
        .catch((e) => {
          console.log(e);
          this.snackbarErorr();
        });
    },
    updateDateTask(event, index) {
      HTTP.post(`updateTask`, {
        _id: this.todos[index]._id,
        id: this.todos[index].taskId,
        name: this.todos[index].taskName,
        completed: this.todos[index].completed,
        task_date: event.target.value,
      })
        .then(() => {
          this.selectedTodoIndex = -1;
          new Snackbar(`Update successfully`, {
            position: "bottom-right",
            theme: "light",
            style: {
              container: [
                ["background-color", "#1abc9c"],
                ["border-radius", "5px"],
              ],
              message: [["color", "#fff"]],
            },
          });
          this.getListTask();
          this.newTodo = "";
          this.selectedTodoIndex = -1;
        })
        .catch((e) => {
          console.log(e);
          this.snackbarErorr();
        });
    },
    updateTodo(event, index, role) {
      if (role == "task") {
        this.updateStatusTask(index);
      }
      if (role == "date") {
        this.updateDateTask(event, index);
      }
    },
  },
};
</script>

<style>
span.totals._total-number {
  display: block;
  font-size: 1.75rem;
}

.totals._wrap.text-left {
  display: flex;
  align-items: center !important
}
p.totals._grand-total {
  text-align: center;
  height: 71px;
  width: 72px;
  border-radius: 4px;
  padding: 6px 12px;
  background: #64b5f6;
  color: #fff;
  overflow: hidden;
  margin-right: 10px;
}

.text-left {
  text-align: left;
  margin-left: 50px;
}

.task-counter {
  flex: 1;
  padding: 10px;
  text-align: center;
  border: 1px solid #ccc;
}

input[type="date"]:focus {
  outline: none;
  box-shadow: none;
  outline-style: none;
}

.trash-icon {
  position: relative;
  display: inline-block;
}

.delete-text {
  position: absolute;
  top: -20px; /* Điều chỉnh vị trí theo nhu cầu */
  left: 50%; /* Điều chỉnh vị trí theo nhu cầu */
  transform: translateX(-50%);
  font-size: 12px; /* Điều chỉnh kích thước theo nhu cầu */
  opacity: 0;
  transition: opacity 0.3s ease;
}

.trash-icon:hover .delete-text {
  opacity: 1;
}

.inactive {
  border: 1px solid white !important;
  cursor: pointer;
}
.active {
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