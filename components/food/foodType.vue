<template>
  <data-table
    name="FoodType"
    v-bind:headers="headers"
    v-bind:get="get"
    v-bind:parentId="parentId"
    edit-comp="foodTypeEdit"
    create-comp="foodTypeCreate"/>
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
      parentId: String,
      "show-expand" : Boolean,
      "component-properties": Object,
    }
  }
</script>

<style scoped>

</style>
