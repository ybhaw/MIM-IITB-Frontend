<template>
  <v-container>
    <v-card light f>
      <v-card-title>
        {{name}}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          label="Search"
          single-line
        ></v-text-field>
      </v-card-title>
      <v-container fluid>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="data"
          item-key="id"
          class="elevation-1"
          v-bind:loading="loading"
          v-bind:show-expand="showExpand"
          v-bind:hide-default-footer="data.length<10"
        >
          <template v-slot:expanded-item="{ headers, item }" v-if="showExpand"> <!-- If show expand is true, expand value -->
            <td :colspan="headers.length">
              <component v-bind:is="expandComp" v-bind="componentProperties(item)"></component>
            </td>
          </template>

          <template v-slot:item.action="{ item }">  <!-- Adds icons to each row -->
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)" color="red">mdi-delete</v-icon>
          </template>

          <template v-slot:no-data> <!-- Item to show when there is no data -->
            <v-btn color="primary">There is nothing to show here!</v-btn>
          </template>
        </v-data-table>
      </v-container>
    </v-card>
    <component v-bind:is="editComp" v-if="dialog" v-bind:put="putApi" v-bind:data="itemToModify" @closeEdit="closeEdit" @saveAndCloseEdit="saveAndCloseEdit"></component>
  </v-container>
</template>

<script>
  export default {
    name: "dataTable",
    data: function(){
      return {
        dialog: false,
        search: '',
        selected: [],
        data: [],
        loading: true,
        getApi: undefined,
        postApi: undefined,
        deleteApi: undefined,
        putApi: undefined,
        itemToModify: {},
        itemIdx: 0,
        deletingItem: {},
        compProps: undefined,
        showExpand: false
      }
    },
    components: {
      "foodType": () => import("../food/foodType.vue"),
      "foodEdit": () => import("../food/edit.vue"),
      "foodTypeEdit": () => import("../foodType/edit.vue")
    },
    props: {
      get: String,
      post: String,
      put: String,
      delete: String,
      name: String,
      headers : Array,
      expandProps: Object,
      expandComp: String,
      editComp: String
    },
    beforeMount: function () {
      this.getApi = this.get ? this.get : this.name;
      this.postApi = this.post ? this.post : this.name;
      this.deleteApi = ( this.delete ? this.delete : this.name ) + "/{0}";
      this.putApi = this.put? this.put: this.name;
      let found = false;
      if(this.headers !== undefined)
        for(let i=0; i<this.headers.length; i+=1)
          if(this.headers[i].value === 'action') {
            found = true;
            break;
          }
      if(this.headers!== undefined && !found)
        this.headers.push({text:'Action',value:'action'});
      this.compProps = this.expandProps;
      if(this.expandComp !== undefined && this.expandComp !== '')
        this.showExpand = true;
    },
    mounted: function () {
      this.$axios.get(this.getApi)
        .then(r => {
          r.data.forEach(c=>{
            c['action'] = '';
          });
          this.data = r.data;
          this.loading = false;
        });
    },
    methods: {
      editItem: function(item){
        this.itemIdx = this.data.indexOf(item);
        console.log(this.itemIdx);
        this.itemToModify = Object.assign({}, item);
        this.dialog = true;
      },
      deleteItem: function(item){
        if(!confirm('Are you sure you want to delete this item?')) return true;
        this.$axios.delete(this.deleteApi.format(item.id))
          .then(r=>{
            this.data.splice(this.data.indexOf(item),1);
          });
      },
      componentProperties: function(item){
        if(this.name==="Food")
        {
          let t = this.compProps;
          t.get = "FoodType/food/" + item.id;
          return t;
        }
        return undefined;
      },
      closeEdit: function(initialItem)
      {
        this.$set(this.data[this.itemIdx], initialItem);
        this.dialog = false;
      },
      saveAndCloseEdit: function(updatedItem){
        Object.assign(this.data[this.itemIdx] , updatedItem);
        this.dialog = false;
      }
    },
  }
</script>

<style scoped>
  .v-dialog__container{
    display:block;
  }
</style>
