<template>
  <div>
    <el-table :data="rows">
      <el-table-column label="ID" sortable="custom" align="center" width="80" >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Company">
        <template slot-scope="{row}">
          <span @click="handleUpdate(row)">{{ row.company }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Company Address" align="center">
        <template slot-scope="{row}">
          <span>{{ row.companyAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Company Email" align="center">
        <template slot-scope="{row}">
          <span>{{ row.companyEmail }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Company GSM" align="center">
        <template slot-scope="{row}">
          <span>{{ row.companyGSM }}</span>
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
          <el-button class="button list-button"  @click="handlePList()">
            Employee List
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-button class="button create-button" v-on:click="handleCreate()">Create New Row</el-button>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="tempRow" label-position="left" label-width="150px" class="dialog">
        <el-form-item label="ID">
          <el-input v-model="tempRow.id" />
        </el-form-item>
        <el-form-item label="Company Name">
          <el-input v-model="tempRow.company" />
        </el-form-item>
        <el-form-item label="Company Address">
          <el-input v-model="tempRow.companyAddress" />
        </el-form-item>
        <el-form-item label="Company E-mail">
          <el-input v-model="tempRow.companyEmail" />
        </el-form-item>
        <el-form-item label="Company GSM">
          <el-input v-model="tempRow.companyGSM" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible2">
      <el-form ref="employee"  label-position="left" >
        <el-table :data="plist">
      <el-table-column label="ID" sortable="custom" align="center" width="80" >
        <template slot-scope="{row}">
          <span>{{ row.pid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Employee Name">
        <template slot-scope="{row}">
          <span>{{ row.pname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Employee Surname" align="center">
        <template slot-scope="{row}">
          <span>{{ row.psurname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Employee Code" align="center">
        <template slot-scope="{row}">
          <span>{{ row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Telephone" align="center">
        <template slot-scope="{row}">
          <span>{{ row.telephone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Birth Date" align="center">
        <template slot-scope="{row}">
          <span>{{ row.birthDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center">
        <template slot-scope="{row,$index}">
          <el-button class="button delete-button" @click="handleDeleteEmployee(row,$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {
    createArticle,
    updateArticle
  } from '@/api/article'
  export default {
    data() {
      return {
        rows: [{
            id: 1,
            company: 'THY',
            companyAddress: 'ISTANBUL',
            companyEmail: 'thy@thy.com',
            companyGSM: '+902124636363',
          },
          {
            id: 2,
            company: 'CRNDN',
            companyAddress: 'ANTALYA',
            companyEmail: 'corendon@corendon.com',
            companyGSM: '+902164737',
          },
          {
            id: 3,
            company: 'PEGAS',
            companyAddress: 'ISTANBUL',
            companyEmail: 'pegasus@pegasus.com',
            companyGSM: '08882281212',
          },
        ],
        plist: [{
            pid: 1,
            pname: 'David',
            psurname: 'Cash',
            code: 'DCA',
            telephone: '+905338564452',
            birthDate: ''
          },
          {
            pid: 2,
            pname: 'Rose',
            psurname: 'Dawson',
            code: 'ROD',
            telephone: '+905387652532',
            birthDate: ''
          },
          {
            pid: 3,
            pname: 'Tessa',
            psurname: 'Abigail',
            code: 'TEA',
            telephone: '+905337996522',
            birthDate: ''
          }
        ],
        temp: {
          pid: undefined,
          pname: '',
          psurname: '',
          code: '',
          telephone: '',
          birthDate: ''
        },
        tempRow: {
          id: undefined,
          company: '',
          companyAddress: '',
          companyEmail: '',
          companyGSM: '',
        },
        dialogFormVisible: false,
        dialogFormVisible2: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          list: 'List',
          create: 'Create'
        },
      }
    },
    methods: {
      handlePList() {
        this.dialogFormVisible2 = true
        this.dialogStatus = 'list'
        this.$nextTick(() => {
          this.$refs['employee'].clearValidate()
        })
      },
      resetTempRow() {
        this.tempRow = {
          id: undefined,
          company: '',
          companyAddress: '',
          companyEmail: '',
          companyGSM: '',
        }
      },
      handleCreate() {
        this.resetTempRow()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            createArticle(this.tempRow).then(() => {
              this.rows.unshift(this.tempRow)
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Created Successfully',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleUpdate(rows) {
        this.tempRow = Object.assign({}, rows)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const index = this.rows.findIndex(v => v.id === this.tempRow.id)
            this.rows.splice(index, 1, this.tempRow)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleDelete(row, ind) {
        this.$notify({
          title: 'Success',
          message: 'Delete Successfully',
          type: 'success',
          duration: 2000
        })
        this.rows.splice(ind, 1)
      },
      handleDeleteEmployee(row, ind) {
        this.$notify({
          title: 'Success',
          message: 'Delete Successfully',
          type: 'success',
          duration: 2000
        })
        this.plist.splice(ind, 1)
      }
    }
  };

</script>

<style>
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

  .list-button {
    background-color: darkgray;
  }

  .create-button {
    background-color: rgb(238, 127, 36);
    width: 190px;
    font-size: 19px;
    margin-left: 1024px;
  }

  .dialog {
    width: 500px;
    margin-left: 10px;
  }

  .dialog2 {
    width: fit-content;
  }

</style>
