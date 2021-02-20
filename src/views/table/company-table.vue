<template>
  <div>
    <table id="table" class="table">
      <tr>
        <th>ID</th>
        <th>Company Name</th>
        <th>Company Address</th>
        <th>Company E-mail</th>
        <th>Company GSM</th>
        <th>Actions</th>
      </tr>
      <tr v-for="row in rows" v-bind:key="row.id" class="table-rows">
        <td class="table-rows">{{ row.id }}</td>
        <td class="table-rows">{{ row.company }}</td>
        <td class="table-rows">{{ row.companyAddress }}</td>
        <td class="table-rows">{{ row.companyEmail }}</td>
        <td class="table-rows">{{ row.companyGSM }}</td>
        <td class="table-rows">
          <button class="button edit-button" v-on:click="handleUpdate(row)">Edit</button>
          <button class="button delete-button" @click="handleDelete()">Delete</button>
          <button class="button list-button" @click="handleList()">Employee
            List</button>
        </td>
      </tr>
    </table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="tempRow" label-position="left" label-width="150px" class="dialog">
        <el-form-item label="ID" prop="id">
          <el-input v-model="tempRow.id" />
        </el-form-item>
        <el-form-item label="Company Name" prop="company">
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
        <el-button type="primary" @click="dialogStatus==='update'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible2">
      <el-form ref="employee" :model="list" label-position="left" label-width="150px" class="dialog2">
        <table class="table">
          <tr>
            <th>ID</th>
            <th>Employee Name</th>
            <th>Employee Surname</th>
            <th>Employee Code</th>
            <th>Telephone</th>
            <th>Birth of Date</th>
            <th>Actions</th>
          </tr>
          <tr v-for="l in list" :key="l.pid" class="table-rows">
            <td class="table-rows">{{ l.pid }}</td>
            <td class="table-rows">{{ l.pname }}</td>
            <td class="table-rows">{{ l.psurname }}</td>
            <td class="table-rows">{{ l.code }}</td>
            <td class="table-rows">{{ l.telephone }}</td>
            <td class="table-rows">{{ l.birthDate }}</td>
            <td class="table-rows">
              <button class="button delete-button" @click="handleDelete()">Delete</button>
            </td>
          </tr>
        </table>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
  import {
    fetchList,
    fetchPv,
    createArticle,
    updateArticle
  } from '@/api/article'

  export default {
    el: '#table',
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
        list: [{
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
      handleUpdate(rows) {
        this.tempRow = Object.assign({}, rows)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleList() {
        this.dialogFormVisible2 = true
        this.dialogStatus = 'list'
        this.$nextTick(() => {
          this.$refs['employee'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const rowData = Object.assign({}, this.tempRow)
            updateArticle(rowData).then(() => {
              const index = this.list.findIndex(v => v.id === this.tempRow.id)
              this.list.splice(index, 1, this.tempRow)
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Update Successfully',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleDelete() {
        confirm("Do you want to delete?")
        for (e in this.list) {
          if (e.pid === l.pid) {
            this.list.splice(indexOf(e))
          }
        }
        this.$notify({
          title: 'Success',
          message: 'Delete Successfully',
          type: 'success',
          duration: 2000
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            createArticle(this.rows).then(() => {
              this.list.unshift(this.rows)
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
    },
  }

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

  .dialog {
    width: 500px;
    margin-left: 10px;
  }

  .dialog2 {
    width: fit-content;
  }

</style>
