<template>
  <div v-if="isUserLoggedIn && user.type == 'admin'">
    <main-header navsel="back"></main-header>
    <div class="header">
      <h3><i class="fas fa-th-list"></i> Book list</h3>
    </div>
    <div class="container">
      <div class="blog-header">
        <div class="create-blog" style="width: 100%">
          <div style="padding: 10px">
            <div class="table-responsive">
              <table style="width: 100%">
                <td width="30%" align="center">
                  <span class="badge badge-primary" style="padding: 10px">
                    <div class="media" style="margin-top: 10px">
                      <h3><i class="fas fa-user-circle"></i></h3>
                      <div class="media-body" style="text-indent: 1em">
                        <h4>User {{ users.length }} peoples</h4>
                      </div>
                    </div>
                  </span>
                </td>
                <td width="30%" align="center">
                  <span class="badge badge-success" style="padding: 10px">
                    <div class="media" style="margin-top: 10px">
                      <h3><i class="fas fa-boxes"></i></h3>
                      <div class="media-body" style="text-indent: 1em">
                        <h4>Total Book {{ results.length }} Books</h4>
                      </div>
                    </div>
                  </span>
                </td>
                <td width="30%" align="center">
                  <span class="badge badge-danger" style="padding: 10px">
                    <div class="media" style="margin-top: 10px">
                      <h3><i class="fas fa-list"></i></h3>
                      <div class="media-body" style="text-indent: 1em">
                        <h4>Borrowing {{ borrows.length }} list</h4>
                      </div>
                    </div>
                  </span>
                </td>
              </table>
            </div>
          </div>
          <br />
          <form class="form-inline form-search">
            <p class="font2">All Book {{ results.length }} books</p>
            &nbsp;&nbsp;
            <div class="input-group mb-3" style="width: 30%">
              <input
                type="text"
                v-model="search"
                class="form-control font3"
                placeholder="Find The Book"
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
          <button
            type="button"
            class="btn btn-primary font2"
            v-on:click="navigateTo('/blog/create')"
          >
            <i class="fas fa-plus-circle"></i> Add Book
          </button>
        </div>
        <br />
        <div class="clearfix"></div>
      </div>
      <transition-group name="fade">
        <div v-for="blog in blogs" v-bind:key="blog.id" class="blog-list">
          <div class="blog-pic">
            <div class="thumbnail-pic" v-if="blog.thumbnail != 'null'">
              <img :src="BASE_URL + blog.thumbnail" alt="thumbnail" />
            </div>
          </div>
          <h3>{{ blog.title }}</h3>
          <div class="blog-info">
            <p>
              <span class="font2">Book Id:</span> {{ blog.id }}<br />
              <span class="font2">Category:</span> {{ blog.category }}<br />
              <span class="font2">Status:</span> {{ blog.status }}<br />
              <span class="font2">Apply on:</span>
              {{ blog.createdAt | formatedDate }}
            </p>
            <p class="font2">
              <button
                class="btn btn-sm btn-info"
                v-on:click="navigateTo('/blog/' + blog.id)"
              >
                <i class="far fa-eye"></i>
                 Watch Book
              </button>
              <button
                class="btn btn-sm btn-warning"
                v-on:click="navigateTo('/blog/edit/' + blog.id)"
              >
                <i class="far fa-edit"></i> Edit
              </button>
              <button
                class="btn btn-sm btn-danger"
                v-on:click="deleteBlog(blog)"
              >
                <i class="fas fa-trash-alt"></i> Delete
              </button>
            </p>
          </div>
          <div class="clearfix"></div>
        </div>
      </transition-group>
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
import _ from "lodash";
import ScrollMonitor from "scrollMonitor";
import moment from "moment";
import UsersService from "@/services/UsersService";
import BorrowsService from "@/services/BorrowsService";
import { mapState } from "vuex";

let LOAD_NUM = 3;
let pageWatcher;
export default {
  watch: {
    search: _.debounce(async function (value) {
      const route = {
        name: "blogs",
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
            if (this.category.indexOf(blog.category) === -1) {
              this.category.push(blog.category);
            }
          } else {
            this.category.push(blog.category);
          }
        });
        this.loading = false;
        this.search = value;
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
      users: [],
      borrows: [],
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"]),
  },
  async created() {
    this.users = (await UsersService.index()).data;
    this.borrows = (await BorrowsService.index()).data;
  },
  filters: {
    formatedDate(value) {
      return moment(String(value)).format("DD-MM-YYYY");
    },
  },
  methods: {
    wait(ms) {
      return (x) => {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
      };
    },
    appendResults: function () {
      if (this.blogs.length < this.results.length) {
        let toAppend = this.results.slice(
          this.blogs.length,
          LOAD_NUM + this.blogs.length
        );
        this.blogs = this.blogs.concat(toAppend);
      }
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteBlog(blog) {
      try {
        let result = confirm("คุณต้องการลบอุปกรณ์หรือไม่?");
        if (result) {
          await BlogsService.delete(blog);
          this.refreshData();
        }
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
.empty-blog {
  width: 100%;
  text-align: center;
  padding: 10px;
  background: darksalmon;
  color: white;
}
/* thumbnail */
.thumbnail-pic img {
  width: 200px;
  padding: 5px 10px 0px 0px;
}
.blog-info {
  float: left;
}
.blog-pic {
  float: left;
}
.clearfix {
  clear: both;
}
.blog-list {
  border: solid 1px #dfdfdf;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.blog-header {
  margin-left: auto;
  margin-right: auto;
}
#blog-list-bottom {
  padding-top: 4px;
}
.blog-load-finished {
  padding: 4px;
  text-align: center;
  background: seagreen;
  color: white;
}
.categories {
  margin-top: 10px;
  padding: 0;
  list-style: none;
  float: left;
}
.categories li {
  float: left;
  padding: 2px;
}
.categories li a {
  padding: 5px 10px 5px 10px;
  background: paleturquoise;
  color: black;
  text-decoration: none;
}
.categories li.clear a {
  background: tomato;
  color: white;
}
.create-blog {
  margin-top: 10px;
}
.header {
  margin-top: 0px;
  padding: 10px;
  position: relative;
  background-color: #ececec;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 -2px 1px rgba(0, 0, 0, 0.1) inset;
  text-shadow: 1px 1px 1px #fff;
}
</style>