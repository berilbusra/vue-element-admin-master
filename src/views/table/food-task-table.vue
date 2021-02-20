<template>
  <div class="apollo">
    <ul v-for="cuisine in cuisines" v-bind:key="cuisine.id">
      <li>{{cuisine.name}}</li>
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
