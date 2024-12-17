<template>
  <div>
    <table border="1" cellspacing="0" cellpadding="10">
      <thead>
        <tr>
          <th>ID</th>
          <th>Center Name</th>
          <th>Date Schedule</th>
          <th>Capacity</th>
          <!-- <th>Actions</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in data" :key="record.id">
          <td>{{ record.center_id }}</td>
          <td>{{ record.center_name }}</td>
          <td>{{ record.scheduled_date }}</td>
          <td>{{ record.capacity_limit }}</td>
          <!-- <td><button @click="handleEdit(record.id)">Edit</button></td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
//import Api from "../apis/User"; // Import Api module
//import Api from "../apis/User";
import User from "../apis/User";

export default {
  data() {
    return {
      data: [], // Data will be populated with API response
    };
  },
  async mounted() {
    // Fetch data when the component is mounted
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const centers = await User.getCenterList(); // Using your Api service
        console.log(centers);
        this.data = centers.data; // Set the data to be displayed in the table
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    handleEdit(id) {
      console.log('Edit item with id:', id);
      // Add your edit logic here
    },
  },
};
</script>

<style scoped>
/* Add custom styles for the table */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f4f4f4;
}

button {
  padding: 6px 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
