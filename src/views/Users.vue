<template>
  <div>
    <h1>User List</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>First  Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.first_name }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "UserList",
  data() {
    return {
      users: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    fetchUsers() {
      this.loading = true;
      this.error = null;
      axios
        .get("/api/vaccine/user-lists") // Your actual API endpoint
        .then((response) => {
          this.users = response.data; // Adjust according to your API response format
        })
        .catch((error) => {
          this.error = "Failed to fetch users: " + error.message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f4f4f4;
}
</style>
