<template>
  <div>
    <table class="table">
      <tr class="table-rows">
        <th>ID</th>
        <th>Cuisine Name</th>
        <th>Cuisine Icon</th>
        <th>Cuisine Order</th>
        <th>Actions</th>
      </tr>
      <tr v-for="cuisine in cuisines" v-bind:key="cuisine.id">
      <th class="table-rows">{{cuisine.id}}</th>
      <th class="table-rows">{{cuisine.name}}</th>
      <th class="table-rows">{{cuisine.icon}}</th>
      <th class="table-rows">{{cuisine.order}}</th>
      <td class="table-rows">
          <button class="button edit-button">Edit</button>
          <button class="button delete-button">Delete</button>
        </td>
      </tr>
    </table>
    <!-- Example lists-->
    <ul v-for="cuisine in cuisines" v-bind:key="cuisine.id">
      <li>{{cuisine.id}}</li>
      <li>{{cuisine.name}}</li>
      <li>{{cuisine.icon}}</li>
      <li>{{cuisine.order}}</li>
      <li>{{cuisine.restaurants}}</li>
    </ul>
  </div>
</template>

<script>
import { ALL_CUISINES_QUERY } from '@/graphql'
import { UPDATECUISINE_MUTATION } from '@/graphql'

export default {
  name: 'SignUp',
  data () {
    return {
      name: '',
      id: '',
      order: '',
      icon:''
    }
  },
  methods: {
    updatecuisine() {
      this.$apollo
        .mutate({
          mutation: UPDATECUISINE_MUTATION,
          variables: {
            name: this.name,
            id: this.id,
            order: this.order,
            icon:this.icon
          }
        })
    }
  },
  apollo: {
    cuisines: {
      query: ALL_CUISINES_QUERY 
    }
  }
}
</script>

<style scoped>
ul {
  font-weight: bold;
  background-color: #da9841;
  padding: 0.5rem;
  color: #1f1f1f;
}

li {
  margin: 1rem 0;
  color: #1f1f1f;
}

.table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  padding: 5px;
  margin-left: 10px;
  margin-top: 10px;
  margin-right: 5px;
}

.table-rows {
  border: 1px solid #dddcdc;
  text-align: center;
  padding: 5px;
}

.button {
  display: inline-block;
  border-radius: 4px;
  border: none;
  color: #FFFFFF;
  font-size: 15px;
  padding: 5px;
  width: 75px;
  transition: all 0.5s;
  margin: 5px;
}

.edit-button {
  background-color: #2f993f;
}

.delete-button {
  background-color: #d81717;
}
</style>
