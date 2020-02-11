<template>
  <div class="pt-5 bg-light h-100">
    <div class="table-wrapper p-5">
      <div class="table-title">
        <div class="row">
          <div class="col-sm-6">
            <h2>Manage <b>{{app}}</b></h2>
          </div>
          <div class="col-sm-6 text-right">
            <a href="#addEmployeeModal" class="btn btn-success" data-toggle="modal"><i class="material-icons"></i> <span>Add New {{app}}</span></a>
            <a href="#deleteEmployeeModal" class="btn btn-danger" data-toggle="modal"><i class="material-icons"></i> <span>Delete</span></a>
          </div>
        </div>
      </div>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="foods"
        item-key="id"
        show-select
      >
      </v-data-table>
    </div>
    <nuxt></nuxt>
  </div>
</template>

<script>
  export default {
    name: "crud",
    data(){
      return {
        selected: [],
        headers: [
          { text:'Name',value:'name'},
          { text: 'Total Value', value: 'totalValue' },
          { text: 'Expirable', value: 'expirable' },
          { id: 'Id', value: 'id'}
        ],
        foods: [
          {
            name: "Bornbita",
            totalValue: 0,
            expirable: false,
            id: "f9a78c51-c486-47d3-8d69-036039ef7f51",
            isDeleted: false,
            createdAt: "2020-02-06T12:10:54.7716179",
            updatedAt: "2020-02-06T12:10:54.7717454"
          },
        ],
      }
    },
    computed: {
      app: function(){
        return this.$store.state.env.crudApp.name
      },
      headers: function(){
        return this.$store.state.env.crudApp.headers
      },
      // values: function(){
      //   return this.$store.state.env.crudApp.data
      // }
    }
  }
</script>


<style>
  html,body, #__nuxt, #__layout, #__layout>div{
    height: 100%;
  }
  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
</style>
