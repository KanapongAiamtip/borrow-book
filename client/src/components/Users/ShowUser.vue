<template>
  <div v-if="isUserLoggedIn && user.type == 'admin'">
    <main-header navsel="back"></main-header>
    <div class="header">
      <h3><i class="fas fa-user"></i> User</h3>
    </div>
    <div class="container-fluid">
      <div class="container">
        <div class="blog-wrapper">
          <h4>
            <i class="far fa-address-card"></i> 
            {{ user.name }} {{ user.lastname }}
          </h4>
          <hr />
          <br />
          <span class="font2">
            <p><span class="font2">id:</span> {{ user.id }}</p>
            <p>
              <span class="font2">Name-Lastname :</span> {{ user.name }}
              {{ user.lastname }}
            </p>
            <p><span class="font2">E-mail:</span> {{ user.email }}</p>
            <p><span class="font2">Status:</span> {{ user.status }}</p>
            <p>
              <span class="font2">Apply on:</span>
              {{ user.createdAt | formatedDate }}
            </p>
          </span>
          <center>
          <button
            class="btn btn-warning font2"
            type="button"
            style="width: 20%"
            v-on:click="navigateTo('/users')"
          >
            <i class="fas fa-angle-double-left"></i> Back
          </button>
          </center>
        </div>
        <div class="footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
import UsersService from "@/services/UsersService";
import moment from "moment";
import { mapState } from "vuex";

export default {
  data() {
    return {
      user: null,
    };
  },
  filters: {
    formatedDate(value) {
      return moment(String(value)).format("DD-MM-YYYY");
    },
  },
  async created() {
    try {
      let userId = this.$route.params.userId;
      this.user = (await UsersService.show(userId)).data;
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"]),
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>
<style scoped>
.header {
  margin-left: auto;
  margin-right: auto;
  margin-top: 0px;
  padding: 10px;
  position: relative;
  background-color: #ececec;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 -2px 1px rgba(0, 0, 0, 0.1) inset;
  text-shadow: 1px 1px 1px #fff;
}
.categories {
  margin-top: 10px;
  padding: 0;
  width: 100%;
}
.blog-wrapper {
  margin-top: 20px;
  padding: 40px;
  height: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.blog-tab {
  padding: 1px;
  background-color: #d3d3d3;
  text-align: left;
  text-indent: 0.5em;
}
.footer {
  margin-top: 50px;
}
</style>