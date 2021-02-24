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
          <button class="button edit-button" v-on:click="handleUpdate(cuisine)">Edit</button>
          <button class="button delete-button" v-on:click="handleDelete(cuisines,$index)">Delete</button>
        </td>
      </tr>
    </table>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form ref="editForm" :model="tempCuisine" label-position="left" label-width="150px" class="dialog">
        <el-form-item label="ID">
          <el-input v-model="tempCuisine.id" />
        </el-form-item>
        <el-form-item label="Cuisine Name">
          <el-input v-model="tempCuisine.name" />
        </el-form-item>
        <el-form-item label="Cuisine Icon">
          <el-input v-model="tempCuisine.icon" />
        </el-form-item>
        <el-form-item label="Cuisine Order">
          <el-input v-model="tempCuisine.order" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="updateCuisine(cuisine)">
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createArticle, updateArticle } from '@/api/article'
import { ALL_CUISINES_QUERY,DELETE_CUISINE_MUTATION,UPDATE_CUISINE_MUTATION } from '@/graphql'

export default {
  data () {
    return {
      name: '',
      id: '',
      order: '',
      icon:'',
      dialogFormVisible: false,
      dialogStatus: '',
      tempCuisine: {
        id: undefined,
        name: '',
        order: '',
        icon: ''
      }
    }
  },
  methods: {
    handleUpdate(cuisines) {
      this.tempCuisine = Object.assign({}, cuisines)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['editForm'].clearValidate()
      })
    },
    updateCuisine() {
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          const cuisineData = Object.assign({}, this.tempCuisine)
          updateArticle(cuisineData).then(() => {
            const index = this.cuisines.findIndex(v => v.id === this.tempCuisine.id)
            this.cuisines.splice(index, 1, this.tempCuisine)
            this.dialogFormVisible = false
          })
          this.$apollo.mutate({
            mutation: UPDATE_CUISINE_MUTATION,
            variables: {
              name: this.name,
              id: this.id,
              order: this.order,
              icon:this.icon
            },
            
          })
        }
      })
    },
    handleDelete(cuisine, index) {
      this.$apollo.mutate({
        mutation:DELETE_CUISINE_MUTATION,
        variables:{
          id:this.id
        }
      })
      this.cuisines.splice(index, 1)
    },
  },
  apollo: {
    cuisines: {
      query: ALL_CUISINES_QUERY 
    }
  }
}
</script>

<style scoped>
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
