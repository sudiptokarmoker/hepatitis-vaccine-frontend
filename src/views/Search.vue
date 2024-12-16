<template>
  <div class="search-form">
    <input
      v-model="searchQuery"
      type="text"
      class="search-input"
      placeholder="Search..."
      @keyup.enter="onSearch"
    />
    <button @click="onSearch" class="search-button">
      Search
    </button>

    <!-- Table for displaying search results -->
    <table v-if="results.length" class="results-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>NID</th>
          <th>Status</th>
          <th>Vaccine Scheduled Date</th>
          <th>Center Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in results" :key="result.id">
          <td>{{ result.first_name + ' ' + result.last_name}}</td>
          <td>{{ result.nid }}</td>
          <td>{{ result.status }}</td>
          <td>{{ result.vaccine_scheduled_date ? result.vaccine_scheduled_date: 'not assigned' }}</td>
          <td>{{ result.center_name ? result.center_name : 'center not assigned' }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Show message if no results -->
    <!-- <p v-else-if="searchQuery.trim()">No results found.</p> -->

    <div v-else-if="searchQuery.trim()" class="no-results">
      <p>No results found.</p>
      <a href="/register" class="register-link">Register Here</a>
    </div>
    
  </div>
</template>

<script>
//import Api from "@/services/Api"; // Import your API service (axios instance)

import Api from "./../../src/apis/Api";


export default {
  data() {
    return {
      searchQuery: '', // Store the search input value
      results: [], // Store the search results
    };
  },
  methods: {
    async onSearch() {
      // Trigger search and emit the search query to parent component
      if (this.searchQuery.trim()) {
        try {
          // const response = await Api.get("/api/search", {
          //   params: { query: this.searchQuery }, // Pass search query as query params
          // });

          const response = await Api.get(`/api/vaccine/search-nid/${this.searchQuery}`);

          // Store the search results in the results array
          this.results = response.data.data;
        } catch (error) {
          console.error("Search request failed:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
.search-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.search-input {
  padding: 8px;
  margin-right: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 200px;
}

.search-button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  margin-top: 10px;
}

.search-button:hover {
  background-color: #45a049;
}

.results-table {
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
}

.results-table th,
.results-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.results-table th {
  background-color: #f2f2f2;
}
</style>
