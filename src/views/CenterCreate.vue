<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit">
      <!-- Form Heading -->
      <h2 class="form-title">Center Information</h2>

      <div class="form-group">
        <label for="center_name">Center Name:</label>
        <input
          type="text"
          id="center_name"
          v-model="formData.center_name"
          placeholder="Enter center name"
          class="form-input"
          required
        />
      </div>


      <div class="form-group">
        <label for="date_of_vaccination">Date of Vaccination:</label>
        <v-date-picker
          v-model="formData.date_of_vaccination"
          class="form-input"
          format="YYYY-MM-DD"
          required
          :min-date="minDate"
        />
      </div>

      <div class="form-group">
        <label for="capacity_limit">Capacity Limit:</label>
        <input
          type="number"
          id="capacity_limit"
          v-model="formData.capacity_limit"
          placeholder="Enter capacity limit"
          class="form-input"
          required
        />
      </div>


      <div class="form-group">
        <label class="checkbox-label">
          <input
            type="checkbox"
            id="status"
            name="status"
            v-model="formData.status"
            class="form-checkbox"
          />
          Active
        </label>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="form-button" :disabled="loading">
        {{ loading ? "Submitting..." : "Submit" }}
      </button>
    </form>

    <!-- Display Submission Response -->
    <div v-if="responseMessage" class="response-message">
      <h3>{{ responseStatus ? "Success!" : "Error!" }}</h3>
      <p>{{ responseMessage }}</p>
    </div>
  </div>
</template>

<script>
//import User from "../apis/User";
//import Api from "../apis/User"; // Import Api module
import User from "../apis/User";

import VCalendar from './../../node_modules/v-calendar';

export default {
  components: {
    VDatePicker: VCalendar.DatePicker // Register DatePicker component
   // mood: "dateTime"
  },
  data() {
    return {
      formData: {
        center_name: "", // Default value
        status: true,                      // Default checked
        date_of_vaccination: "",           // Empty string for date
        capacity_limit: 0     
      },
      loading: false,
      responseMessage: null,
      responseStatus: false,
            minDate: this.formatDate(new Date()), // Set today's date as the minimum date

    };
  },
  methods: {
    async handleSubmit() {
    this.loading = true; // Show loading state while submitting
    this.errors = [];    // Reset errors before making the request
    this.responseMessage = ""; // Reset the response message

    try {
        const response = await User.submitCenterData(this.formData); // Await the API call

        console.log(response);

        // Check if response is successful
        if (response.status === 200) {
        this.responseMessage = "Data submitted successfully!";
        this.responseStatus = true;
        }
    } catch (error) {
        // Handle API errors properly
        if (error.response) {
            this.responseMessage = error.response.data.message;
        } else {
        this.errors.push("Network error or API not reachable");
        }
    } finally {
        this.loading = false; // Hide loading state once done
    }
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  }
};
</script>

<style scoped>
/* Form Container */
.form-container {
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Form Title */
.form-title {
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.5rem;
  color: #333;
}

/* Form Group */
.form-group {
  margin-bottom: 20px;
}

/* Labels */
label {
  display: block;
  font-size: 1rem;
  color: #555;
  margin-bottom: 5px;
}

/* Input Styles */
.form-input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  border-color: #007bff;
  outline: none;
}

/* Checkbox Styles */
.checkbox-label {
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #555;
}

.form-checkbox {
  margin-right: 10px;
  width: 18px;
  height: 18px;
}

/* Button Styles */
.form-button {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.form-button:hover:enabled {
  background-color: #0056b3;
}

/* Response Message */
.response-message {
  margin-top: 20px;
  padding: 15px;
  background-color: #f1f1f1;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.response-message h3 {
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.response-message p {
  font-size: 1rem;
}
</style>
