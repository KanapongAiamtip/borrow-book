<template>
  <div v-if="isUserLoggedIn && user.type == 'admin'">
    <main-header navsel="back"></main-header>
    <h1>Create User</h1>
    <form v-on:submit.prevent="createUser">
      <p>name: <input type="text" v-model="user.name" /></p>
      <p>lastname: <input type="text" v-model="user.lastname" /></p>
      <p>email: <input type="text" v-model="user.email" /></p>
      <p>password: <input type="text" v-model="user.password" /></p>
      <p><button type="submit">create user</button></p>
    </form>
    <hr />
    <div>
      <p>name: {{ user.name }}</p>
      <p>lastname: {{ user.lastname }}</p>
      <p>email: {{ user.email }}</p>
      <p>password: {{ user.password }}</p>
    </div>
  </div>
</template>
<script>
import UsersService from "@/services/UsersService";

export default {
  data() {
    return {
      user: {
        name: "",
        lastname: "",
        email: "",
        password: "",
        status: "active",
      },
    };
  },
  methods: {
    async createUser() {
      try {
        await UsersService.post(this.user);
        this.$router.push({
          name: "users",
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style scoped>
</style>