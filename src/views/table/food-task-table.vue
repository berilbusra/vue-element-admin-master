<template>
  <div>
    <el-table :data="cuisines">
      <el-table-column label="ID" sortable="custom" align="center" width="80" >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Cuisine Name">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Cuisine Icon" align="center">
        <template slot-scope="{row}">
          <span>{{ row.icon }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Cuisine Order" align="center">
        <template slot-scope="{row}">
          <span>{{ row.order }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="350">
        <template slot-scope="{row,$index}">
          <el-button class="button edit-button" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button class="button delete-button" @click="handleDelete(row,$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <br><button class="button create-button" v-on:click="handleCreate()">Create New Row</button>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form ref="editForm" :rules="rules" :model="tempCuisine" label-position="left" label-width="150px" class="dialog">
        <el-form-item label="ID">
          <el-input v-model="tempCuisine.id" />
        </el-form-item>
        <el-form-item label="Cuisine Name">
          <el-input v-model="tempCuisine.name" />
        </el-form-item>
        <el-form-item label="Cuisine Icon">
          <el-input v-model="tempCuisine.icon" />
        </el-form-item>
        <el-form-item label="Cuisine Order No" prop="order">
          <el-input v-model="tempCuisine.order" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateCuisine()">
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ALL_CUISINES_QUERY,DELETE_CUISINE_MUTATION,UPDATE_CUISINE_MUTATION, CREATE_CUISINE_MUTATION } from '@/graphql'

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
      },
      rules: {
        order: [{ required: true, message: 'order is required', trigger: 'blur' }]
      },
    }
  },
  methods: {
    resetTempCuisine() {
      this.tempCuisine = {
        id: undefined,
        name: '',
        order: '',
        icon: ''
      }
    },
    handleCreate() {
      this.resetTempCuisine()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    createData() {
      //console.log("gg",this.tempCuisine)
      this.$refs['editForm'].validate((valid) => {
      if (valid) {
        this.cuisines.unshift(this.tempCuisine)
        this.dialogFormVisible = false
        this.$apollo.mutate({
          mutation: CREATE_CUISINE_MUTATION,
          variables: {
            data:this.tempCuisine
          }
        })
        this.$notify({
          title: 'Success',
          message: 'Created Successfully',
          type: 'success',
          duration: 2000
        })
      }
      })
    },
    handleUpdate(cuisines) {
      this.tempCuisine = Object.assign({}, cuisines)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    updateCuisine() {
      //console.log("gg",this.tempCuisine)
      delete this.tempCuisine.__typename
      delete this.tempCuisine.restaurants
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          const index = this.cuisines.findIndex(v => v.id === this.tempCuisine.id)
          this.cuisines.splice(index, 1, this.tempCuisine)
          this.dialogFormVisible = false
          this.$apollo.mutate({
            mutation: UPDATE_CUISINE_MUTATION,
            variables: {
             data:this.tempCuisine
            },
            
          })
        }
      })
    },
    handleDelete(cuisine, index) {
      this.$apollo.mutate({
        mutation:DELETE_CUISINE_MUTATION,
        variables:{
          id:cuisine.id
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

.create-button {
  background-color: rgb(238, 127, 36);
  width: 190px;
  font-size: 19px;
}
</style>
