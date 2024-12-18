<template>
  <div class="home col-5 mx-auto py-5 mt-5">
    <h1 class="text-center">Vaccine Registration</h1>
    <div class="card">
      <div class="card-body">
        <div class="form-group">
          <label for="first_name">First Name:</label>
          <input type="text" v-model="form.first_name" class="form-control" id="first_name" />
          <span class="text-danger" v-if="errors.first_name">
            {{ errors.first_name[0] }}
          </span>
        </div>

        <div class="form-group">
          <label for="last_name">Last Name:</label>
          <input type="text" v-model="form.last_name" class="form-control" id="last_name" />
          <span class="text-danger" v-if="errors.last_name">
            {{ errors.last_name[0] }}
          </span>
        </div>

        <div class="form-group">
          <label for="email">Email address:</label>
          <input type="email" v-model="form.email" class="form-control" id="email" />
          <span class="text-danger" v-if="errors.email">
            {{ errors.email[0] }}
          </span>
        </div>

        <!-- <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="form.password" class="form-control" id="password" />
          <span class="text-danger" v-if="errors.password">
            {{ errors.password[0] }}
          </span>
        </div>
        <div class="form-group">
          <label for="password_confirmation">Confirm Password:</label>
          <input type="password" v-model="form.password_confirmation" class="form-control" id="password_confirmation" />
          <span class="text-danger" v-if="errors.password_confirmation">
            {{ errors.password_confirmation[0] }}
          </span>
        </div> -->

        <div class="form-group">
          <label for="nid">NID:</label>
          <input type="text" v-model="form.nid" class="form-control" id="nid" />
          <span class="text-danger" v-if="errors.nid">
            {{ errors.nid[0] }}
          </span>
        </div>

        <div class="form-group">
          <label for="center_id">Center ID:</label>
          <select v-model="form.center_capacity_root_id" class="form-control" id="center_capacity_root_id">
            <option value="" disabled>Select a center</option>
            <option v-for="center in centers" :key="center.center_capacity_root_id" :value="center.center_capacity_root_id">
              {{ center.center_name }}
            </option>
          </select>
          <span class="text-danger" v-if="errors.center_capacity_root_id">
            {{ errors.center_capacity_root_id[0] }}
          </span>
        </div>

        <div class="form-group">
          <input type="hidden" v-model="form.schedule_date" />
        </div>

        <button type="submit" @click.prevent="register" class="btn btn-primary btn-block">
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../apis/User";

export default {
  data() {
  return {
    form: {
      first_name: "",
      last_name: "",
      email: "",
      //password: "",
      //password_confirmation: "",
      nid: "",
      center_capacity_root_id: "",
      center_name: "", // Add center_name to the form data
    },
    errors: [],
    centers: [], // Initialize centers array
  };
},
  created() {
    this.fetchCenters();
  },
  methods: {
    register() {
      User.registerUserFromUser(this.form)
        .then(() => {
          //this.$router.push({ name: "Login" });
          this.$router.push({name: "Success"});
        })
        .catch((error) => {
          console.log(error.response);

          //if (error.response.status === 422) {
          console.log(error);
            this.errors = error.response.data.message;
          //}
        });
    },
    fetchCenters() {
      User.getCenters()
        .then((response) => {
          console.log(response);
          this.centers = response.data.data; // Populate the centers list with API response
        })
        .catch((error) => {
          console.error("Failed to fetch centers:", error); // Handle and log any errors
        });
    }
  },
};
</script>
