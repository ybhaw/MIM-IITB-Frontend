<template>
  <v-container>
    <v-dialog v-model="modelTrue" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Create Food</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Name" required v-model="foodData.name" hint="What is the property of this category"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-checkbox label="Expirable" hint="Select if the item is expirable by default" v-model="foodData.expirable"></v-checkbox>
              </v-col>
              <v-col cols="6" class="p-4 align-items-end">
                <v-btn color="#00f" class="align-self-center float-right" @click="addFoodType">Add FoodType</v-btn>
              </v-col>
              <template v-for="(x,y) in foodData.foodTypes">
                <v-col cols="12">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Food Item {{y+1}}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-text-field label="Name" required v-model="x.name" hint="Name of the food type"></v-text-field>
                      <v-text-field label="Brand" required v-model="x.brand" hint="Name of the food type"></v-text-field>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field type="number" required v-model="x.value" hint="Amount of the food unit this represents"></v-text-field>
                        </v-col>
                        <v-col cols="3">
                          <v-checkbox label="Expirable" hint="Select if the food type is expirable" v-model="x.expirable"></v-checkbox>
                        </v-col>
                        <v-col cols="3" class="p-4">
                          <v-btn color="#f00" fab small @click="removeFoodType(x)" class="float-right">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </template>
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
      post: String
    },
    data: () => {
      return {
        modelTrue: true,
        foodData: {
        },
        foodTypeTemplate: {
          name: '',
          brand: '',
          value: 0,
          expirable: false
        }
      }
    },
    beforeMount() {
      this.foodData = {
        name : '',
        expirable: false,
        foodTypes: []
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
        let food = this.foodData;
        this.$axios.post(this.post,this.foodData)
          .then(r=>{
            self.$emit('saveAndCloseCreate', r.data);
            self.dialog = false;
          });
      },
      addFoodType: function(){
        this.foodData.foodTypes.push(Object.assign({}, this.foodTypeTemplate));
        this.foodData = Object.assign({}, this.foodData);
      },
      removeFoodType: function(x){
        this.foodData.foodTypes.splice(this.foodData.foodTypes.indexOf(x),1);
      }
    }
  }
</script>

<style scoped>
  .v-dialog__container{
    display:block;
  }
</style>
