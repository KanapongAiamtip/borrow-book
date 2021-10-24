<template>
  <div>
    <main-header navsel="front"></main-header>
    <div class="header">
      <h3><i class="fas fa-th-list"></i> Book list</h3>
    </div>
    <div class="container-fluid">
      <div class="categories">
        <div style="width: 100%">
          <form class="form-inline form-search">
            <p class="font2">Total: {{ results.length }} books</p>
            &nbsp;&nbsp;
            <div class="input-group mb-3" style="width: 20%">
              <input
                type="text"
                v-model="search"
                class="form-control font3"
                placeholder="Search for Books ,Category ,Status"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append">
                <span class="input-group-text" id="basic-addon2"
                  ><i class="fas fa-search"></i
                ></span>
              </div>
            </div>
          </form>
        </div>
        <div class="blog-wrapper table-responsive" style="margin-top: 20px">
          <span class="font2">
            <table class="table table-bordered" style="width: 100%">
              <thead class="table-bordered thead-dark">
                <tr style="text-align: center">
                  <th scope="col">Book Id</th>
                  <th scope="col">Picture</th>
                  <th scope="col">Book Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Status</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="blog in blogs"
                  v-bind:key="blog.id"
                  class="blog-list"
                  style="text-align: center"
                >
                  <th scope="row" width="6%">{{ blog.id }}</th>
                  <td width="15%">
                    <img
                      :src="BASE_URL + blog.thumbnail"
                      alt="thumbnail"
                      width="100%"
                    />
                  </td>
                  <td>{{ blog.title }}</td>
                  <td width="15%">{{ blog.category }}</td>
                  <td width="15%">
                    <div
                      v-if="blog.status == 'Yes'"
                      class="badge badge-success text-wrap"
                      style="width: 5rem"
                    >
                      <span style="font-size: 14px; color: #000000"
                        ><i class="far fa-check-circle"></i><br />{{
                          blog.status
                        }}</span
                      >
                    </div>
                    <div
                      v-if="blog.status == 'No'"
                      class="badge badge-danger text-wrap"
                      style="width: 5rem"
                    >
                      <span style="font-size: 14px; color: #000000"
                        ><i class="far fa-times-circle"></i><br />{{
                          blog.status
                        }}</span
                      >
                    </div>
                  </td>
                  <td width="20%">
                    <button
                      type="button"
                      class="btn btn-sm"
                      style="background-color: #ff8800; border-color: #ff8800"
                      v-on:click="navigateTo('/front/read/' + blog.id)"
                    >
                      <span style="color: #ffffff"
                        ><i class="fas fa-info-circle"></i> Description</span
                      >
                    </button>
                    <button
                      v-if="user.type == 'admin'"
                      type="button"
                      class="btn btn-success btn-sm"
                      v-on:click="navigateTo('/blog/edit/' + blog.id)"
                    >
                      <i class="far fa-edit"></i>Edit
                    </button>
                    <button
                      v-if="user.type == 'admin'"
                      type="button"
                      class="btn btn-danger btn-sm"
                      v-on:click="deleteBlog(blog)"
                    >
                      <i class="fas fa-trash-alt"></i> Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </span>
        </div>
      </div>
      <span class="font3">
        <div
          v-if="blogs.length === 0 && loading === false"
          class="blog-load-Notfound"
        >
          *** Not found data ***
        </div>
        <div id="blog-list-bottom">
          <div
            class="blog-load-finished"
            v-if="blogs.length === results.length && results.length > 0"
          >
            The data has been loaded
          </div>
        </div>
      </span>
    </div>
  </div>
</template>
<script>
import BlogsService from "@/services/BlogsService";
import { mapState } from "vuex";
import _ from "lodash";
import ScrollMonitor from "scrollMonitor";
let LOAD_NUM = 3;
let pageWatcher;
export default {
  watch: {
    search: _.debounce(async function (value) {
      const route = {
        name: "treasury",
      };
      if (this.search !== "") {
        route.query = {
          search: this.search,
        };
      }
      console.log("search: " + this.search);
      this.$router.push(route);
    }, 700),
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        this.blogs = [];
        this.results = [];
        this.loading = true;
        this.results = (await BlogsService.index(value)).data;
        this.appendResults();
        this.results.forEach((blog) => {
          if (this.category.length > 0) {
            // console.log(this.category.indexOf(blog.category))
            if (this.category.indexOf(blog.category) === -1) {
              this.category.push(blog.category);
            }
          } else {
            this.category.push(blog.category);
          }
        });
        this.loading = false;
        this.search = value;
        // console.log(this.category)
      },
    },
  },
  data() {
    return {
      blogs: [],
      BASE_URL: "http://localhost:8081/assets/uploads/",
      search: "",
      results: [],
      category: [],
      loading: false,
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"]),
  },
  methods: {
    wait(ms) {
      return (x) => {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
      };
    },
    appendResults: function () {
      if (this.blogs.length < this.results.length) {
        let toAppend = this.results.slice(this.blogs.length);
        this.blogs = this.blogs.concat(toAppend);
      }
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteBlog(blog) {
      try {
        await BlogsService.delete(blog);
        this.refreshData();
      } catch (err) {
        console.log(err);
      }
    },
    async refreshData() {
      this.blogs = (await BlogsService.index()).data;
    },
    setCategory(keyword) {
      if (keyword === " ") {
        this.search = "";
        console.log("null");
      } else {
        this.search = keyword;
      }
    },
    async deleteBlog(blog) {
      try {
        let result = confirm("Do you want to delete a book?");
        if (result) {
          await BlogsService.delete(blog);
          this.refreshData();
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  updated() {
    let sens = document.querySelector("#blog-list-bottom");
    pageWatcher = ScrollMonitor.create(sens);
    pageWatcher.enterViewport(this.appendResults);
  },
  beforeUpdated() {
    if (pageWatcher) {
      pageWatcher.destroy();
      pageWatcher = null;
    }
  },
};
</script>
<style scoped>
.header {
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
  height: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
.input-group-text {
  background-color: #28a745 !important;
  color: #fff;
}
.blog-load-finished {
  margin-top: 20px;
  padding: 4px;
  text-align: center;
  background: seagreen;
  color: white;
}
.blog-load-Notfound {
  margin-top: 20px;
  padding: 4px;
  text-align: center;
  background: #b22222;
  color: white;
}
.table .thead-dark th {
  color: #fff;
  background-color: #000033;
  border-color: #000033;
}
</style>