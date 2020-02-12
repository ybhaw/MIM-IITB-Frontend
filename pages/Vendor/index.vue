<template>
  <div>
    <data-table
      name="Vendor"
      v-bind:headers="headers"
      v-bind:expand-props="compProps"
      expand-comp="foodType"
      edit-comp="foodEdit"
      create-comp="foodCreate"
    >
    </data-table>
    <template>

    </template>
  </div>
</template>

<script>
  export default {
    name: "Vendor",
    components: {
      "data-table": () => import("../../components/app/dataTable"),
    },
    data: function(){
      return {
        headers: [
          { text: "Name", value: "name" },
          { text: "Expirable", value: "expirable" },
          { text: "Total Amount", value: "totalValue" },
        ],
        compProps: {
          headers: [
            { text: "Name", value: "name" },
            { text: "Brand", value: "brand" },
            { text: "Expirable", value: "expirable" },
            { text: "Value", value: "value" }
          ],
          name: "FoodType",
        }
      }
    }
  }
</script>

<style scoped>

</style>
