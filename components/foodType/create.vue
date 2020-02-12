<template>
  <v-container>
    <v-dialog v-model="modelTrue" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Create FoodType</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Name" required v-model="foodTypeData.name" hint="What is the property of this category"></v-text-field>
                <v-text-field label="Brand" required v-model="foodTypeData.brand" hint="What is the property of this category"></v-text-field>
              </v-col>
              <v-col cols="9">
                <v-text-field type="number" label="Value" required v-model="foodTypeData.value" hind="What is the net amount of the foodType"></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-checkbox label="Expirable" hint="Select if the item is expirable by default" v-model="foodTypeData.expirable"></v-checkbox>
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
    name: "create",
    props: {
      post: String,
      parentId: String
    },
    data: () => {
      return {
        modelTrue: true,
        foodTypeData: {
          name: '',
          brand: '',
          value: 0,
          expirable: false
        }
      }
    },
    beforeMount() {
      this.foodTypeData = {
        name : '',
        brand: '',
        value: '',
        expirable: false,
        foodId: this.parentId
      };
    },
    methods: {
      close: function(){
        this.$emit('closeCreate');
        this.dialog = false;
      },
      save: function()
      {
        let self = this;
        let food = this.foodTypeData;
        this.$axios.post(this.post,this.foodTypeData)
          .then(r=>{
            self.$emit('saveAndCloseCreate', r.data);
            self.dialog = false;
          });
      },
      addFoodType: function(){
        this.foodTypeData.foodTypes.push(Object.assign({}, this.foodTypeTemplate));
        this.foodTypeData = Object.assign({}, this.foodTypeData);
      },
      removeFoodType: function(x){
        this.foodTypeData.foodTypes.splice(this.foodTypeData.foodTypes.indexOf(x),1);
      }
    }
  }
</script>

<style scoped>
  .v-dialog__container{
    display:block;
  }
</style>
