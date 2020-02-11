<template>
  <data-table name="FoodType" v-bind:headers="headers" editComp="foodTypeEdit" v-bind:get="get"></data-table>
</template>

<script>
	export default {
		name: "foodType",
    components: {
		  "data-table": () => import("../app/dataTable"),
    },
    props: {
      get: String,
      post: String,
      put: String,
      delete: String,
      name: String,
      headers : Array,
      "show-expand" : Boolean,
      "component-properties": Object,
    }
  }
</script>

<style scoped>

</style>
