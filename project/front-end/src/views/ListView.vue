<template>
  <div>
    <select class="form-select">
      <option value disabled selected>Select an item</option>
      <option v-for="cate in category" :key="cate.id">{{ cate.cate_name }}</option>
    </select>

    <div class="table-responsive mt-4">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Product Namne</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in data" :key="data.id">
            <th scope="row">{{ data.ProductName }}</th>
            <td>{{ data.Description }}</td>
            <td>{{ data.Price }}</td>
            <td>{{ data.Quantity }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { HTTP } from "../assets/js/baseAPI.js";
export default {
  data() {
    return {
      data: [],
      category: [],
    };
  },
  mounted() {
    this.getdataProduct();
    this.getdataCategory();
  },
  methods: {
    getdataProduct() {
      HTTP.get(`home`)
        .then((response) => {
          this.data = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getdataCategory() {
      HTTP.get("category", {
        params: {
          test: "123",
        },
      })
        .then((response) => {
          this.category = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style>
@import "@/assets/css/bootstrap.min.css";
@import "@/assets/css/theme-default.css";
@import "@/assets/css/theme-default-dark.css";
@import "@/assets/css/core.css";
@import "@/assets/css/core-dark.css";
</style>