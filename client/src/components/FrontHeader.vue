<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" active-class="active" to="/front">
        <img
          src="../assets/logo.png"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt=""
          loading="lazy"
        />
        <span class="font1">&nbsp;Library Borrow Booking System</span>
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
          <li class="nav-item active">
            <router-link class="nav-link" active-class="active" to="/front"
              ><span class="font2" style="color: #fff"
                ><i class="fas fa-home"></i> Home</span
              ></router-link
            >
          </li>
          <li class="nav-item active" v-if="isUserLoggedIn">
            <router-link class="nav-link" active-class="active" to="/treasury"
              ><span class="font2" style="color: #fff"
                ><i class="fas fa-boxes"></i> Library Store</span
              ></router-link
            >
          </li>
          <li class="nav-item active" v-if="isUserLoggedIn">
            <router-link
              class="nav-link"
              active-class="active"
              to="/borrow/create"
              ><span class="font2" style="color: #fff"
                ><i class="fas fa-clipboard-list"></i> Make a loan</span
              ></router-link
            >
          </li>
          <li class="nav-item active" v-if="isUserLoggedIn">
            <router-link
              class="nav-link"
              active-class="active"
              to="/borrow/status"
              ><span class="font2" style="color: #fff"
                ><i class="fas fa-list-ul"></i> Borrow & Return Status</span
              ></router-link
            >
          </li>

          <li
            class="nav-item active"
            v-if="!isUserLoggedIn"
            role="presentation"
          >
            <a class="nav-link" href="#" v-on:click.prevent="showLogin = true"
              ><span class="font2" style="color: #fff"><i class="fas fa-user"></i> Login</span></a
            >
          </li>

          <li
            class="nav-item active"
            v-if="!isUserLoggedIn"
            role="presentation"
          >
            <a
              class="nav-link"
              href="#"
              v-on:click.prevent="showRegister = true"
              ><span class="font2" style="color: #fff"><i class="fas fa-user-plus"></i> Register</span></a
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
                v-on:click="navigateTo('/blogs')"
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

    <div class="modal" v-if="showLogin">
      <transition name="fade">
        <div class="login-wrapper">
          <h3>Login</h3>
          <center>
            <img
              src="../assets/package.png"
              width="15%"
              class="d-inline-block align-top"
              alt=""
              loading="lazy"
            />
          </center>
          <span class="font2">
            <form v-on:submit.prevent="clientLogin">
              <div class="form-group font3">
                <label for="exampleInputEmail1"
                  ><span class="font2">E-mail</span></label
                >
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      ><i class="fa fa-envelope"></i
                    ></span>
                  </div>
                  <input
                    required
                    type="email"
                    class="form-control"
                    placeholder="E-mail"
                    v-model="email"
                  />
                </div>
              </div>
              <div class="form-group font3">
                <label for="exampleInputEmail1"
                  ><span class="font2">Password</span></label
                >
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      ><i class="fas fa-key"></i
                    ></span>
                  </div>
                  <input
                    required
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    v-model="password"
                  />
                </div>
              </div>
              <div class="error" v-if="error">
                <p class="font2">{{ error }}</p>
              </div>
              <div class="row">
                <div class="col">
                  <button
                    required
                    type="submit"
                    class="btn btn-primary"
                    style="width: 100%"
                  >
                    <i class="fas fa-key"></i> Login
                  </button>
                </div>
                <div class="col">
                  <button
                    v-on:click.prevent="showLogin = false"
                    class="btn btn-danger"
                    type="button"
                    style="width: 100%"
                  >
                    <i class="fas fa-times-circle"></i> Close
                  </button>
                </div>
              </div>
            </form>
          </span>
        </div>
      </transition>
    </div>

    <div class="modal" v-if="showRegister">
      <transition name="fade">
        <div class="login-wrapper">
          <h3>Register</h3>
          <span class="font2">
            <form v-on:submit.prevent="clientRegister">
              <div class="form-group font3">
                <label for="exampleInputEmail1"
                  ><span class="font2">E-mail</span></label
                >
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      ><i class="fas fa-envelope"></i
                    ></span>
                  </div>
                  <input
                    required
                    type="email"
                    class="form-control"
                    placeholder="E-mail"
                    v-model="client.email"
                  />
                </div>
              </div>
              <div class="form-group font3">
                <label for="exampleInputEmail1"
                  ><span class="font2">Password</span></label
                >
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      ><i class="fas fa-key"></i
                    ></span>
                  </div>
                  <input
                    required
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    v-model="client.password"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputName">Name</label>
                  <div class="input-group mb-3 font3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        ><i class="fas fa-user-alt"></i
                      ></span>
                    </div>
                    <input
                      required
                      type="text"
                      class="form-control"
                      placeholder="Name"
                      v-model="client.name"
                    />
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputLastname">Lastname</label>
                  <div class="input-group mb-3 font3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        ><i class="fas fa-address-card"></i
                      ></span>
                    </div>
                    <input
                      required
                      type="text"
                      class="form-control"
                      placeholder="Lastname"
                      v-model="client.lastname"
                    />
                  </div>
                </div>
              </div>
              <div class="error" v-if="error">
                <p class="font2">{{ error }}</p>
              </div>
              <div class="row">
                <div class="col">
                  <button
                    type="submit"
                    class="btn btn-success"
                    style="width: 100%"
                  >
                    <i class="fas fa-user"></i> Register
                  </button>
                </div>
                <div class="col">
                  <button
                    v-on:click.prevent="showRegister = false"
                    class="btn btn-danger"
                    type="button"
                    style="width: 100%"
                  >
                    <i class="fas fa-times-circle"></i> Close
                  </button>
                </div>
              </div>
            </form>
          </span>
        </div>
      </transition>
    </div>

    <transition name="fade">
      <div v-if="resultUpdated != ''" class="popup-msg">
        <span class="font2">{{ resultUpdated }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AuthenService from "@/services/AuthenService";
import ClientService from "@/services/ClientService";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      showLogin: false,
      showRegister: false,
      resultUpdated: "",
      client: {
        name: "",
        lastname: "",
        email: "",
        password: "",
        status: "active",
        type: "user",
      },
    };
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
      this.resultUpdated = "ออกจากระบบสำเร็จ";
      setTimeout(() => (this.resultUpdated = ""), 5000);
      this.$router.push({
        name: "front",
      });
    },
    async clientLogin() {
      console.log(`acc: ${this.email} -${this.password}`);
      try {
        const response = await AuthenService.clientLogin({
          email: this.email,
          password: this.password,
        });
        this.error = "";
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        (this.email = ""), (this.password = ""), (this.showLogin = false);
        this.resultUpdated = "เข้าสู่ระบบสำเร็จ";
        setTimeout(() => (this.resultUpdated = ""), 5000);
      } catch (error) {
        console.log(error);
        this.error = error.response.data.error;
        this.email = "";
        this.password = "";
        setTimeout(() => (this.error = ""), 4000);
      }
    },
    async clientRegister() {
      try {
        alert("Successfully subscribed");
        await ClientService.post(this.client);
        this.$router.push({
          name: "front",
        });
      } catch (error) {
        console.log(error);
        this.client = {};
        this.error = error.response.data.error;
        setTimeout(() => (this.error = ""), 4000);
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  text-align: center;
}
.popup-msg {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  border: solid 1px #ddd;
  background: #fff;
  max-width: 200px;
  padding: 10px;
  position: fixed;
  bottom: 0;
  right: 0;
  border-radius: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
}
.bg-light {
  background-color: #ffbcfb !important;
  color: #fff !important;
}
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 10; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
.login-wrapper {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  border: solid 1px #ddd;
  width: 520px;
  padding: 30px 30px 40px 30px;
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  /* padding: 20px; */
  border-radius: 50px;
}
.login-wrapper h3 {
  text-align: center;
  padding-bottom: 10px;
}
</style>