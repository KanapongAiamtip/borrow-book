<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" active-class="active" to="/blogs">
        <img
          src="../assets/logo.png"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt=""
          loading="lazy"
        />
        <span class="font1">&nbsp;Library Borrow Booking System</span>
        <div class="badge text-wrap" style="width: 7rem; background: #ff3333">
          <span class="font3" style="font-size: 13px; color: #ffffff"
            ><i class="fas fa-user-cog"></i> Backend</span
          >
        </div>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active" v-if="isUserLoggedIn">
            <router-link class="nav-link" active-class="active" to="/blogs"
              ><span class="font2" style="color: #fff"
                ><i class="fas fa-boxes"></i> Library Store</span
              ></router-link
            >
          </li>
          <li class="nav-item active" v-if="isUserLoggedIn">
            <router-link class="nav-link" active-class="active" to="/Users"
              ><span class="font2" style="color: #fff"
                ><i class="fas fa-user-friends"></i> User </span
              ></router-link
            >
          </li>
          <li class="nav-item active" v-if="isUserLoggedIn">
            <router-link
              class="nav-link"
              active-class="active"
              to="/back/status"
              ><span class="font2" style="color: #fff"
                ><i class="fas fa-list-ul"></i> Borrow & Return Status </span
              ></router-link
            >
          </li>

          <li
            class="nav-item active"
            v-if="!isUserLoggedIn"
            role="presentation"
          >
            <router-link class="nav-link" active-class="active" to="/login"
              ><span class="font2" style="color: #fff"
                ><i class="fas fa-user"></i> Login</span
              ></router-link
            >
          </li>

          <li class="nav-item active" v-if="isUserLoggedIn" role="presentation">
            <a class="nav-link" href="#" v-on:click.prevent="logout"
              ><span class="font2" style="color: #fff"><i class="fas fa-sign-in-alt"></i> Logout</span></a
            >
          </li>
        </ul>
        <li v-if="isUserLoggedIn" class="nav-item dropdown form-inline">
          <div class="dropdown">
            <span class="font2">Welcome&nbsp;</span>
            <span
              class="dropdown font2"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ user.name }} {{ user.lastname }}
            </span>
            <span class="font3" v-if="user.type == 'admin'"
              >&nbsp;&nbsp;<i class="fas fa-user-cog"></i> Admin</span
            >
            <span class="font3" v-if="user.type == 'user'"
              >&nbsp;&nbsp;<i class="fas fa-user"></i> User</span
            >
            <div
              class="dropdown-menu dropdown-menu-right font2"
              aria-labelledby="dropdownMenuButton"
            >
              <a
                v-if="user.type == 'admin'"
                class="dropdown-item"
                href=""
                v-on:click="navigateTo('/front')"
                ><i class="fas fa-home"></i> Backend</a
              >
              <a
                class="dropdown-item"
                href=""
                v-on:click="navigateTo('/borrow/profile/' + user.id)"
                ><i class="far fa-edit"></i> Edit profile</a
              >
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#" v-on:click.prevent="logout"
                ><i class="fas fa-sign-in-alt"></i> Logout</a
              >
            </div>
          </div>
        </li>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AuthenService from "@/services/AuthenService";
import ClientService from "@/services/ClientService";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"]),
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "login",
      });
    },
  },
};
</script>

<style scoped>
.bg-light {
  background-color: #9b55fc !important;
  color: #fff !important;
}
</style>