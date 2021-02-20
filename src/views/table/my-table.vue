<template>
  <div>
    <table id="table" class="table-style">
      <tr>
        <th>Date</th>
        <th>ID</th>
        <th>Company</th>
        <th>Category</th>
        <th>Flight Time</th>
        <th>Tail No.</th>
        <th>Flight No.</th>
        <th>PAX</th>
      </tr>
      <tr class="table-content" v-for="row in rows" :key="row.id">
        <td class="table-content">{{ row.date }}</td>
        <td class="table-content">{{ row.id }}</td>
        <td class="table-content">
          <div v-if="row.company === 'THY'" class="blue-background">
            {{row.company}}
          </div>
          <div v-if="row.company === 'CRNDN'" class="green-background">
            {{row.company}}
          </div>
          <div v-if="row.company === 'PEGAS'" class="red-background">
            {{row.company}}
          </div>
        </td>
        <td class="table-content">{{ row.category }}</td>
        <td class="table-content">{{ row.flightTime }}</td>
        <td class="table-content">{{ row.tailNo }}</td>
        <td class="table-content">{{ row.flightNo }}</td>
        <td class="table-content">{{ row.pax }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  el: '#table',
    data() {
      return {
        rows: [{
            date: '',
            id: 1,
            company: 'THY',
            category: '',
            flightTime: '',
            tailNo: '',
            flightNo: '',
            pax: ''
          },
          {
            date: '',
            id: 2,
            company: 'CRNDN',
            category: '',
            flightTime: '',
            tailNo: '',
            flightNo: '',
            pax: ''
          },
          {
            date: '',
            id: 3,
            company: 'CRNDN',
            category: '',
            flightTime: '',
            tailNo: '',
            flightNo: '',
            pax: ''
          },
          {
            date: '',
            id: 4,
            company: 'CRNDN',
            category: '',
            flightTime: '',
            tailNo: '',
            flightNo: '',
            pax: ''
          },
          {
            date: '',
            id: 5,
            company: 'PEGAS',
            category: '',
            flightTime: '',
            tailNo: '',
            flightNo: '',
            pax: ''
          },
          {
            date: '',
            id: 6,
            company: 'PEGAS',
            category: '',
            flightTime: '',
            tailNo: '',
            flightNo: '',
            pax: ''
          },
          {
            date: '',
            id: 7,
            company: 'PEGAS',
            category: '',
            flightTime: '',
            tailNo: '',
            flightNo: '',
            pax: ''
          },
          {
            date: '',
            id: 8,
            company: 'PEGAS',
            category: '',
            flightTime: '',
            tailNo: 'XR2653',
            flightNo: '',
            pax: ''
          },
          {
            date: '',
            id: 9,
            company: 'PEGAS',
            category: '',
            flightTime: '',
            tailNo: '',
            flightNo: '',
            pax: ''
          },
          {
            date: '',
            id: 10,
            company: 'CRNDN',
            category: '',
            flightTime: '',
            tailNo: '',
            flightNo: '',
            pax: ''
          },
          {
            date: '',
            id: 11,
            company: 'THY',
            category: '',
            flightTime: '',
            tailNo: '',
            flightNo: '',
            pax: ''
          },
          {
            date: '',
            id: 12,
            company: 'THY',
            category: '',
            flightTime: '',
            tailNo: '',
            flightNo: '',
            pax: ''
          },
          {
            date: '',
            id: 13,
            company: 'PEGAS',
            category: '',
            flightTime: '',
            tailNo: 'XR3746',
            flightNo: '',
            pax: ''
          },
          {
            date: '',
            id: 14,
            company: 'CRNDN',
            category: '',
            flightTime: '',
            tailNo: '',
            flightNo: '',
            pax: ''
          },
          {
            date: '',
            id: 15,
            company: 'CRNDN',
            category: '',
            flightTime: '',
            tailNo: '',
            flightNo: '',
            pax: ''
          },
          {
            date: '',
            id: 16,
            company: 'CRNDN',
            category: '',
            flightTime: '',
            tailNo: '',
            flightNo: '',
            pax: ''
          },
          {
            date: '',
            id: 17,
            company: 'THY',
            category: '',
            flightTime: '',
            tailNo: '',
            flightNo: '',
            pax: ''
          },
          {
            date: '',
            id: 18,
            company: 'THY',
            category: '',
            flightTime: '',
            tailNo: '',
            flightNo: '',
            pax: ''
          },
          {
            date: '',
            id: 19,
            company: 'THY',
            category: '',
            flightTime: '',
            tailNo: '',
            flightNo: '',
            pax: ''
          },
          {
            date: '',
            id: 20,
            company: 'THY',
            category: '',
            flightTime: '',
            tailNo: '',
            flightNo: '',
            pax: ''
          },
          {
            date: '',
            id: 21,
            company: 'PEGAS',
            category: '',
            flightTime: '',
            tailNo: '',
            flightNo: '',
            pax: ''
          }
        ]
      }
    },
    methods: {
      
    }

}
</script>

<style>
.table-style {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-left: 10px;
  margin-top: 10px;
  margin-right: 5px;
}
.table-content{
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
  width: 150px;
  }
.blue-background {
  background-color: rgb(245, 76, 76);
  display: inline-block;
  border-radius: 4px;
  border: none;
  width: 200px;
  padding: 5px;
}
.green-background {
  background-color: rgb(167, 84, 206);
  display: inline-block;
  border-radius: 4px;
  width: 200px;
  padding: 5px;
}
.red-background {
  background-color: rgb(241, 178, 83);
  display: inline-block;
  border-radius: 4px;
  border: none;
  width: 200px;
  padding: 5px;
}
</style>