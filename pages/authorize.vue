<template>
  <div class="container">
    <form class="pt-5">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
      </div>
      <button type="button" class="btn btn-primary" @click="authorize">Submit</button>
      <nuxt-link to="/food/add" class="d-none" id="goout"></nuxt-link>
    </form>
  </div>
</template>

<script>
  export default {
    name: "authorize.vue",
    data(){
      return {
        email: null,
        password: null,
        remember : true
      }
    },
    methods: {
      authorize: function()
      {
        this.$axios.post("/User/Authenticate", {
          email: this.email,
          password: this.password,
          remember: this.remember
        })
        .then(r=>{
          this.$store.commit("user/setToken",r.data.token);
          this.$store.commit("user/setUser", r.data);
        });
      }
    }
  }
</script>

<style scoped>

</style>
