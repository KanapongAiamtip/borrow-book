<template>
  <div>
    <main-header navsel="front"></main-header>
    <div class="header">
      <h3><i class="fas fa-tasks"></i> Borrowing details</h3>
    </div>
    <div class="container-fluid">
      <div class="container">
        <div class="blog-wrapper">
          <h4>
            <i class="far fa-clipboard"></i> Borrowing details of
            {{ borrow.nameLend }}
          </h4>
          <hr />
          <br />
          <span class="font2">
            <center>
              <div class="table-responsive">
                <table class="table table-bordered table-sm" style="width: 50%">
                  <tbody>
                    <tr>
                      <th
                        class="table-primary"
                        style="width: 5%; background: #d3d3d3"
                      >
                        <i class="fas fa-clipboard-list"></i>
                      </th>
                      <th
                        class="table-primary"
                        style="background: #d3d3d3"
                        width="30%"
                      >
                        Borrow ID:
                      </th>
                      <td style="text-indent: 0.5em">{{ borrow.id }}</td>
                    </tr>
                    <tr>
                      <th
                        class="table-primary"
                        style="width: 5%; background: #d3d3d3"
                      >
                        <i class="far fa-user-circle"></i>
                      </th>
                      <th class="table-primary" style="background: #d3d3d3">
                        Borrower:
                      </th>
                      <td style="text-indent: 0.5em">{{ borrow.nameLend }}</td>
                    </tr>
                    <tr>
                      <th
                        class="table-primary"
                        style="width: 5%; background: #d3d3d3"
                      >
                        <i class="fas fa-boxes"></i>
                      </th>
                      <th class="table-primary" style="background: #d3d3d3">
                        Book:
                      </th>
                      <td style="text-indent: 0.5em">{{ borrow.equipment }}</td>
                    </tr>
                    <tr>
                      <th
                        class="table-primary"
                        style="width: 5%; background: #d3d3d3"
                      >
                        <i class="fas fa-sort-numeric-up"></i>
                      </th>
                      <th class="table-primary" style="background: #d3d3d3">
                        Quantity:
                      </th>
                      <td style="text-indent: 0.5em">{{ borrow.number }}</td>
                    </tr>
                    <tr>
                      <th
                        class="table-primary"
                        style="width: 5%; background: #d3d3d3"
                      >
                        <i class="far fa-calendar-alt"></i>
                      </th>
                      <th class="table-primary" style="background: #d3d3d3">
                        Borrowed date:
                      </th>
                      <td style="text-indent: 0.5em">{{ borrow.dateLend | formatedDate }}</td>
                    </tr>
                    <tr>
                      <th
                        class="table-primary"
                        style="width: 5%; background: #d3d3d3"
                      >
                        <i class="far fa-calendar-check"></i>
                      </th>
                      <th class="table-primary" style="background: #d3d3d3">
                        Set back:
                      </th>
                      <td style="text-indent: 0.5em">
                        {{ borrow.dateReturn | formatedDate }}
                      </td>
                    </tr>
                    <tr>
                      <th
                        class="table-primary"
                        style="width: 5%; background: #d3d3d3"
                      >
                        <i class="fas fa-server"></i>
                      </th>
                      <th class="table-primary" style="background: #d3d3d3">
                        Status:
                      </th>
                      <td>
                        <div
                          v-if="borrow.status == 'pending review'"
                          class="badge badge-primary text-wrap"
                          style="width: 5rem"
                        >
                          <span style="font-size: 13.4px; color: #000000"
                            ><i class="fa fa-spinner"></i><br />{{
                              borrow.status
                            }}</span
                          >
                        </div>
                        <div
                          v-if="borrow.status == 'approved'"
                          class="badge badge-success text-wrap"
                          style="width: 5rem"
                        >
                          <span style="font-size: 14px; color: #000000"
                            ><i class="far fa-check-circle"></i><br />{{
                              borrow.status
                            }}</span
                          >
                        </div>
                        <div
                          v-if="borrow.status == 'disapproved'"
                          class="badge badge-danger text-wrap"
                          style="width: 5rem"
                        >
                          <span style="font-size: 14px; color: #000000"
                            ><i class="far fa-times-circle"></i><br />{{
                              borrow.status
                            }}</span
                          >
                        </div>
                        <div
                          v-if="borrow.status == 'return'"
                          class="badge badge-warning text-wrap"
                          style="width: 5rem"
                        >
                          <span style="font-size: 14px; color: #000000"
                            ><i class="fas fa-clipboard-check"></i><br />{{
                              borrow.status
                            }}</span
                          >
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th
                        class="table-primary"
                        style="width: 5%; background: #d3d3d3"
                      >
                        <i class="far fa-calendar-check"></i>
                      </th>
                      <th class="table-primary" style="background: #d3d3d3">
                        Transaction date
                      </th>
                      <td style="text-indent: 0.5em"> {{ borrow.createdAt | formatedDate }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button
                class="btn btn-warning"
                type="button"
                style="width: 100%"
                v-if="user.type == 'user'"
                v-on:click="navigateTo('/borrow/status')"
              >
                <i class="fas fa-angle-double-left"></i> Back
              </button>
            </center>
            <br /><br />
            <div v-if="user.type == 'admin'">
              <h4><i class="fas fa-clipboard-list"></i> Admin only</h4>
              <hr />
              <br />
              <center>
                <div style="width: 50%">
                  <form v-on:submit.prevent="editBorrow">
                    <div class="col" align="left">
                      <label for="input1">Admin Name</label>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1"
                            ><i class="fas fa-user-cog"></i
                          ></span>
                        </div>
                        <input
                          required
                          type="tet"
                          class="form-control"
                          placeholder="Name"
                          v-model="user.name"
                          disabled
                        />
                      </div>
                    </div>
                    <div class="col" align="left">
                      <label for="input1">select</label>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1"
                            ><i class="fas fa-list-ul"></i
                          ></span>
                        </div>
                        <select v-model="borrow.status" required>
                          <option disabled value="">select</option>
                          <option value="pending review">pending review</option>
                          <option value="approved">approve</option>
                          <option value="disapproved">disapproved</option>
                          <option value="return">return</option>
                        </select>
                      </div>
                    </div>
                    <br />
                    <div class="row">
                      <div class="col">
                        <button
                          type="submit"
                          class="btn btn-success"
                          style="width: 100%"
                        >
                          <i class="far fa-save"></i> Save
                        </button>
                      </div>
                      <div class="col">
                        <button
                          class="btn btn-warning"
                          type="button"
                          style="width: 100%"
                          v-on:click="navigateTo('/borrow/status')"
                        >
                          <i class="fas fa-angle-double-left"></i> Back
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </center>
            </div>
          </span>
        </div>
        <div class="footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import BorrowsService from "@/services/BorrowsService";
import moment from "moment";

export default {
  data() {
    return {
      borrow: {
        nameLend: "",
        date: "",
        dateLend: "",
        dateReturn: "",
        equipment: "",
        number: "",
        status: "",
      },
    };
  },
  filters: {
    formatedDate(value) {
      return moment(String(value)).format("DD-MM-YYYY");
    },
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"]),
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async editBorrow() {
      try {
        await BorrowsService.put(this.borrow);
        this.$router.push({
          name: "borrow-status",
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  async created() {
    try {
      let borrowId = this.$route.params.borrowId;
      this.borrow = (await BorrowsService.show(borrowId)).data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>>

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