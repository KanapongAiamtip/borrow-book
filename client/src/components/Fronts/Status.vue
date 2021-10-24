<template>
  <div>
    <main-header navsel="front"></main-header>
    <div class="header">
      <h3><i class="fas fa-tasks"></i> Status</h3>
    </div>
    <div class="container-fluid">
      <div class="categories">
        <div>
          <p class="font2">Total: {{ borrows.length }} list</p>
        </div>
        <div class="blog-wrapper table-responsive">
          <span class="font2">
            <table class="table table-bordered" style="width: 100%">
              <thead class="table-bordered table-dark">
                <tr style="text-align: center">
                  <th scope="col">Brrow Id</th> 
                  <th scope="col">Book</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Brrow Date</th>
                  <th scope="col">Return Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Transaction date</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="borrow in borrows"
                  v-bind:key="borrow.id"
                  class="blog-list"
                  style="text-align: center"
                >
                  <th
                    v-if="user.name == borrow.nameLend || user.type == 'admin'"
                    scope="row"
                    width="7%"
                  >
                    {{ borrow.id }}
                  </th>
                  <td
                    v-if="user.name == borrow.nameLend || user.type == 'admin'"
                  >
                    {{ borrow.equipment }}
                  </td>
                  <td
                    v-if="user.name == borrow.nameLend || user.type == 'admin'"
                    width="5%"
                  >
                    {{ borrow.number }}
                  </td>
                  <td
                    v-if="user.name == borrow.nameLend || user.type == 'admin'"
                    width="10%"
                  >
                    {{ borrow.dateLend | formatedDate }}
                  </td>
                  <td
                    v-if="user.name == borrow.nameLend || user.type == 'admin'"
                    width="10%"
                  >
                    {{ borrow.dateReturn | formatedDate }}
                  </td>
                  <td
                    v-if="user.name == borrow.nameLend || user.type == 'admin'"
                    width="10%"
                  >
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
                  <td
                    v-if="user.name == borrow.nameLend || user.type == 'admin'"
                    width="10%"
                  >
                    {{ borrow.createdAt | formatedDate }}
                  </td>
                  <td
                    v-if="user.name == borrow.nameLend || user.type == 'admin'"
                    width="20%"
                  >
                    <div
                      class="btn-group btn-group-toggle"
                      data-toggle="buttons"
                    >
                      <label
                        class="btn"
                        style="background-color: #ff8800; border-color: #ff8800"
                      >
                        <input
                          type="radio"
                          name="options"
                          id="option1"
                          v-on:click="
                            navigateTo('/borrow/status/detail/' + borrow.id)
                          "
                        />
                        <span style="color: #ffffff"
                          ><i class="fas fa-info-circle"></i> Description</span
                        >
                      </label>
                      <label class="btn btn-success">
                        <input
                          type="radio"
                          name="options"
                          id="option2"
                          v-on:click="navigateTo('/borrow/edit/' + borrow.id)"
                        /><i class="far fa-edit"></i>
                        Edit
                      </label>
                      <label class="btn btn-danger">
                        <input
                          type="radio"
                          name="options"
                          id="option3"
                          v-on:click="deleteBorrow(borrow)"
                        /><i class="fas fa-trash-alt"></i>
                        Delete
                      </label>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </span>
        </div>
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
      borrows: [],
    };
  },
  async created() {
    this.borrows = (await BorrowsService.index()).data;
  },
  filters: {
    formatedDate(value) {
      return moment(String(value)).format("DD-MM-YYYY");
    },
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteBorrow(borrow) {
      try {
        let result = confirm("คุณต้องการยกเลิกการยืมอุปกรณ์หรือไม่?");
        if (result) {
          await BorrowsService.delete(borrow);
          this.refreshData();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async refreshData() {
      this.borrows = (await BorrowsService.index()).data;
    },
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"]),
  },
};
</script>>

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
.table .thead-dark th {
  color: #fff;
  background-color: palevioletred;
  border-color: palevioletred;
}
</style>