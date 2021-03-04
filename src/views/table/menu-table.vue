<template>
  <div>
    <el-table :data="menus">
      <el-table-column label="ID" sortable="custom" align="center" width="80" >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Menu Name">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Menu Description" align="center">
        <template slot-scope="{row}">
          <span>{{ row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Language" align="center">
        <template slot-scope="{row}">
          <span>{{ row.language }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Approve Status" align="center">
        <template slot-scope="{row}">
          <span>{{ row.approveStatus }}</span>
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
      <el-form ref="editForm" :model="tempMenu" label-position="left" label-width="150px" class="dialog">
        <el-form-item label="ID">
          <el-input v-model="tempMenu.id" />
        </el-form-item>
        <el-form-item label="Menu Name">
          <el-input v-model="tempMenu.name" />
        </el-form-item>
        <el-form-item label="Menu Description">
          <el-input v-model="tempMenu.description" />
        </el-form-item>
        <el-form-item label="Language">
          <el-input v-model="tempMenu.language" />
        </el-form-item>
        <el-form-item label="Approval Status">
          <el-input v-model="tempMenu.approveStatus" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateMenu()">
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { ALL_MENUS_QUERY, UPDATE_MENU_MUTATION, DELETE_MENU_MUTATION, CREATE_MENU_MUTATION} from '@/graphql'

export default {
  data () {
    return {
      name: '',
      id: '',
      description: '',
      language:'',
      approveStatus:'',
      dialogFormVisible: false,
      dialogStatus: '',
      tempMenu: {
        id: undefined,
        name: '',
        description: '',
        language:'',
        approveStatus:'',
      }
    }
  },
  methods: {
    resetTempMenu() {
      this.tempMenu = {
        id: undefined,
        name: '',
        description: '',
        language:'',
        approveStatus:'',
      }
    },
    handleCreate() {
      this.resetTempMenu()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    createData() {
      this.$refs['editForm'].validate((valid) => {
      if (valid) {
          this.menus.unshift(this.tempMenu)
          this.dialogFormVisible = false
           this.$apollo.mutate({
            mutation: CREATE_MENU_MUTATION,
            variables: {
              data: {
                id:this.id,
                name: this.name,
                description:this.description,
                language:this.language,
                approveStatus:this.approveStatus
              }
            },
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
    handleUpdate(menus) {
      this.tempMenu = Object.assign({}, menus)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    updateMenu() {
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          const index = this.menus.findIndex(v => v.id === this.tempMenu.id)
          this.menus.splice(index, 1, this.tempMenu)
          this.dialogFormVisible = false
          this.$apollo.mutate({
            mutation: UPDATE_MENU_MUTATION,
            variables: {
              data:{
                id: this.id,
                name: this.name,
                description: this.description,
                language:this.language,
                approveStatus:this.approveStatus
              }
            }
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$apollo.mutate({
        mutation:DELETE_MENU_MUTATION,
        variables:{
          id:this.id
        }
      })
      this.menus.splice(index, 1)
    },
  },
  apollo: {
    menus: {
      query: ALL_MENUS_QUERY
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