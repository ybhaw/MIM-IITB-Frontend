<template>
  <div class="container">
    <div class="wrapper">
      <div class="display-3 text-bold">Food</div>
      <div class="form-group pt-4">
        <label for="foodName">Food Name</label>
        <input type="text" class="form-control" id="foodName" placeholder="Food Name" v-model="food.name" :class="isRequired(food.name)"/>
      </div>
      <div class="form-group">
        <div class="form-check">
          <input class="form-check-input" v-model="food.expirable" type="checkbox" id="expirableFood"/>
          <label class="form-check-label" for="expirableFood">
            Is Expirable?
          </label>
        </div>
      </div>
    </div>
    <hr/>
    <div class="wrapper">
      <div class="display-4">Food Type</div>
    </div>
    <div class="wrapper mt-3 pt-2 border-top border-dark" v-for="(x,y) in food.foodTypes">
      <div class="row">
        <div class="col-md-10">
          <div class="h3">Food Item {{y+1}}</div>
        </div>
        <div class="col-md-2">
          <button type="submit" class="btn btn-primary mt-3" @click="removeFoodItem(y)">Remove Food Item</button>
        </div>
      </div>
      <div class="form-group pt-2">
        <label for="foodItemName">Name</label>
        <input type="text" class="form-control" id="foodItemName" placeholder="Ex. 1kg Bag" v-model="food.foodTypes[y].name" :class="isRequired(x.name)">
      </div>
      <div class="form-group">
        <label for="brandName">Brand</label>
        <input type="text" class="form-control" id="brandName" placeholder="Ex. Basmati"  v-model="food.foodTypes[y].brand" :class="isRequired(x.brand)"/>
      </div>
      <div class="form-row">
        <div class="form-group col-md-3">
          <label for="value">Value(in grams/mg)</label>
          <input type="number" class="form-control" id="value"  v-model="food.foodTypes[y].value" :class="isRequired(x.value)">
        </div>
        <div class="form-group col-md-2 mt-2 pt-3">
          <div class="form-check pt-3 mt-2">
            <input class="form-check-input" type="checkbox" id="expirable" v-model="food.foodTypes[y].expirable"/>
            <label class="form-check-label" for="expirable">
              Is Expirable?
            </label>
          </div>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary mt-3" @click="addFoodItem">+ Add Food-Type</button>
    <button type="submit" class="btn btn-primary mt-3" @click="submitForm" v-if="formValid()">Save</button>
  </div>
</template>

<script>
  export default {
    name: "add",
    data(){
      return {
        isWrong: true,
        food: {
          name: "Rice",
          expirable: false,
          foodTypes: [
            {
              name: "1kg bag",
              expirable: false,
              brand: "Basmati",
              value: 1000
            }
          ]
        },
        foodTypeTemplate: {
          name: null,
          expirable: false,
          brand: null,
          value: 0
        }
      }
    },
    created() {
    },
    methods: {
      addFoodItem: function(){
        this.food.foodTypes.push(Object.assign({},this.foodTypeTemplate));
      },
      removeFoodItem: function(y)
      {
        this.food.foodTypes.splice(y,1);
      },
      isRequired: function(v)
      {
        return (!v || /^\s*$/.test(v))?"is-invalid":"";
      },
      isEmpty: function(v)
      {
        return (!v || /^\s*$/.test(v));
      },
      formValid: function()
      {
        if(this.food.name==null) return false;
        if(this.food.foodTypes.length === 0) return false;
        for(let i = 0; i< this.food.foodTypes.length; i+=1)
        {
          let ft = this.food.foodTypes[i];
          if(this.isEmpty(ft.name) || this.isEmpty(ft.brand) || this.isEmpty(ft.value)) return false;
        }
        return true;
      },
      submitForm: function()
      {
        this.$axios.post("food",this.food, {progress: false})
          .then(r=>{
            console.log(r);
            this.$router.push({
              path: "/food"
            });
          });
      }
    }
  }
</script>

<style scoped>

</style>
