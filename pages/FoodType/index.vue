<template>

</template>

<script>
  export default {
    name: "FoodType" ,
    template: 'default',
    data: function(){
      return {
        app: {
          name : "FoodType"
        },
        loading: true,
        search: '',
        selected: [],
        headers: [
          { text: 'Brand', value: 'brand' },
          { text:'Name',value:'name'},
          { text: 'Value', value: 'value' },
          { text: 'Expirable', value: 'expirable' },
          { text: 'food Name', value: 'food.name'}
        ],
        foodTypes: [
          {
            "name": "1kg bag",
            "brand": "Basmati",
            "expirable": false,
            "value": 1000,
            "foodId": "f9a78c51-c486-47d3-8d69-036039ef7f51",
            "id": "371474ee-f723-4e51-8c3f-8bf7411ddc29",
            "isDeleted": false,
            "createdAt": "2020-02-06T12:10:54.7898304",
            "updatedAt": "2020-02-06T12:10:54.7898333"
          }
        ]
      }
    },
    beforeMount() {
      this.$store.commit("env/crudUpdate", "food");
      this.$axios.get(this.app.name, {progress: true})
        .then(r=>{
          this.foodTypes = r.data;
          this.loading = true;
        });
    }
  }
</script>

<style scoped>

</style>
