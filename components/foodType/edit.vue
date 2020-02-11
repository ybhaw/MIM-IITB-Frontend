<template>
  <v-container>
    <v-dialog v-model="modelTrue" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Food</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Name" required v-model="updateData.name" hint="What is the property of this category"></v-text-field>
                <v-text-field label="Brand" required v-model="updateData.brand" hint="Name of the company"></v-text-field>
                <v-text-field label="Value" type="number" required v-model="updateData.value" hint="Value in grams/ml"></v-text-field>
                <v-checkbox label="Expirable" hint="Select if the item is expirable by default" v-model="updateData.expirable"></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Close</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    name: "edit",
    props: {
      data: Object,
      put: String
    },
    data: () => {
      return {
        modelTrue: true,
        initData: {},
        updateData: {}
      }
    },
    beforeMount() {
      this.initData = Object.assign({}, this.data);
      this.updateData = Object.assign({}, this.data);
    },
    methods: {
      close: function(){
        this.$emit('closeEdit', this.initData);
        this.dialog = false;
      },
      save: function()
      {
        let self = this;
        this.$axios.put(this.put,this.updateData)
          .then(r=>{
            self.$emit('saveAndCloseEdit', r.data);
            self.dialog = false;
          });
      }
    }
  }
</script>

<style scoped>
  .v-dialog__container{
    display: block;
  }
</style>
