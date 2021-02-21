<template>
  <div>
    <ul v-for="cuisine in cuisines" v-bind:key="cuisine.id">
      <li>{{cuisine.id}}</li>
      <li>{{cuisine.name}}</li>
      <li>{{cuisine.icon}}</li>
      <li>{{cuisine.order}}</li>
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  apollo: {
    cuisines: gql`query 
    {
      cuisines{
        id
        name
        icon
        order
      }
    }`  
   }
}
</script>
